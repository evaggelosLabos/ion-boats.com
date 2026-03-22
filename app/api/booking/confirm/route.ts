// app/api/booking/confirm/route.ts
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbConnect } from "../../../../lib/db/mongoose";
import { Hold } from "../../../../models/Hold";
import { Reservation } from "../../../../models/Reservation";
import { TRIPS, buildSlotsForTrip, type TripId, type BookingMode } from "../../../../lib/booking/catalog";
import { sendBrevoEmail } from "../../../../lib/email/brevo";
import { bookingConfirmedTemplate } from "../../../../lib/email/templates/bookingConfirmed";

type ConfirmResponse =
  | {
      ok: true;
      reservationId: string;
      priceEur: number;
      tripId: TripId;
      date: string;
      slotId: string;
      bookingMode: "private" | "shared";
      quantity: number; // party size (people)
      seats: number; // seats consumed from inventory
      totalSeats: number;
      remainingSeatsAfter: number;
      message: string;
      customer?: {
        name?: string;
        email?: string;
        phone?: string;
      };
    }
  | { ok: false; error: string };

function isObj(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function getTripOrThrow(tripId: TripId) {
  const trip = TRIPS.find((t) => t.id === tripId);
  if (!trip) throw new Error("Unknown tripId");
  return trip;
}

function isDupKeyError(e: unknown): boolean {
  return isObj(e) && (e as { code?: unknown }).code === 11000;
}

function toPositiveInt(x: unknown, fallback: number) {
  const n = typeof x === "number" ? x : typeof x === "string" ? Number(x) : NaN;
  if (!Number.isFinite(n)) return fallback;
  const i = Math.floor(n);
  return i > 0 ? i : fallback;
}

function seatsPerBoatForTrip(trip: any) {
  return toPositiveInt(trip?.pricing?.seatsPerBoat, 10);
}

function totalSeatsForTrip(trip: any) {
  const seatsPerBoat = seatsPerBoatForTrip(trip);
  const boatsPerSlot = toPositiveInt(trip?.pricing?.boatsPerSlot, 2);
  return seatsPerBoat * boatsPerSlot;
}

function seatsFor(mode: BookingMode, partySize: number, seatsPerBoat: number) {
  // Shared = consumes seats equal to number of people
  if (mode === "shared") return partySize;

  // Private = consumes a whole boat regardless of party size
  if (mode === "private") return seatsPerBoat;

  return 0;
}



export async function POST(req: Request) {
  await dbConnect();

  const bodyUnknown: unknown = await req.json();
  const holdId = isObj(bodyUnknown) && typeof bodyUnknown.holdId === "string" ? bodyUnknown.holdId : "";

  if (!holdId) {
    const r: ConfirmResponse = { ok: false, error: "Missing holdId" };
    return NextResponse.json(r, { status: 400 });
  }

  const now = new Date();
  const session = await mongoose.startSession();

  try {
    const response = await session.withTransaction<ConfirmResponse>(async () => {
      const hold = await Hold.findById(holdId).session(session).lean();

      if (!hold) {
        return { ok: false, error: "Hold not found (it may have expired)." };
      }

      const expMs = new Date((hold as any).expiresAt).getTime();
      if (!Number.isFinite(expMs) || expMs <= Date.now()) {
        await Hold.deleteOne({ _id: holdId }).session(session);
        return { ok: false, error: "Hold expired. Please create a new hold." };
      }

      const trip = getTripOrThrow((hold as any).tripId as TripId);

      const bookingMode = String((hold as any).bookingMode) as BookingMode;
      const quantity = toPositiveInt((hold as any).quantity, 1); // party size (people)

      const seatsPerBoat = seatsPerBoatForTrip(trip);
      const totalSeats = totalSeatsForTrip(trip);

      // ✅ SAFETY: never allow > seatsPerBoat people on a private boat
      if (bookingMode === "private" && quantity > seatsPerBoat) {
        return { ok: false, error: `Max ${seatsPerBoat} people on a private boat.` };
      }

      const seatsNeeded = seatsFor(bookingMode, quantity, seatsPerBoat);

      // 1) CONFIRMED seats for this slot
      const confirmedAgg = await Reservation.aggregate<{ total: number }>([
        {
          $match: {
            tripId: (hold as any).tripId,
            date: (hold as any).date,
            slotId: (hold as any).slotId,
            status: "confirmed",
          },
        },
        {
          $project: {
            seats: {
              $cond: [
                { $eq: ["$bookingMode", "private"] },
                { $literal: seatsPerBoat }, // private = full boat
                "$quantity", // shared = people
              ],
            },
          },
        },
        { $group: { _id: null, total: { $sum: "$seats" } } },
      ]).session(session);

      const confirmedSeats = confirmedAgg[0]?.total ?? 0;

      // 2) OTHER active holds for this slot (exclude this hold)
      const otherHoldsAgg = await Hold.aggregate<{ total: number }>([
        {
          $match: {
            _id: { $ne: new mongoose.Types.ObjectId(holdId) },
            tripId: (hold as any).tripId,
            date: (hold as any).date,
            slotId: (hold as any).slotId,
            status: "hold",
            expiresAt: { $gt: now },
          },
        },
        {
          $project: {
            seats: {
              $cond: [
                { $eq: ["$bookingMode", "private"] },
                { $literal: seatsPerBoat }, // private = full boat
                "$quantity", // shared = people
              ],
            },
          },
        },
        { $group: { _id: null, total: { $sum: "$seats" } } },
      ]).session(session);

      const otherHoldSeats = otherHoldsAgg[0]?.total ?? 0;

      const remainingSeats = Math.max(0, totalSeats - confirmedSeats - otherHoldSeats);

      if (seatsNeeded > remainingSeats) {
        return {
          ok: false,
          error: `Not enough seats left for this slot. Remaining: ${remainingSeats}, needed: ${seatsNeeded}.`,
        };
      }

      const unitPriceEur = Number((hold as any).unitPriceEur ?? 0);
const totalPriceEur = Number((hold as any).totalPriceEur ?? 0);

if (!Number.isFinite(unitPriceEur) || unitPriceEur < 0) {
  return { ok: false, error: "Invalid hold unit price." };
}

if (!Number.isFinite(totalPriceEur) || totalPriceEur < 0) {
  return { ok: false, error: "Invalid hold total price." };
}

    const created = await Reservation.create(
  [
    {
      tripId: (hold as any).tripId,
      date: (hold as any).date,
      slotId: (hold as any).slotId,
      bookingMode,
      quantity,
      priceEur: totalPriceEur,
      status: "confirmed",
      customer: (hold as any).customer,
    },
  ],
  { session }
);

      await Hold.deleteOne({ _id: holdId }).session(session);

      const remainingAfter = Math.max(0, remainingSeats - seatsNeeded);

      return {
        ok: true,
        reservationId: String(created[0]._id),
        priceEur: totalPriceEur,
        tripId: (hold as any).tripId as TripId,
        date: (hold as any).date,
        slotId: (hold as any).slotId,
        bookingMode: bookingMode as "private" | "shared",
        quantity,
        seats: seatsNeeded,
        totalSeats,
        remainingSeatsAfter: remainingAfter,
        message: "Booking confirmed ✅",
        customer: {
          name: ((hold as any).customer as any)?.name,
          email: ((hold as any).customer as any)?.email,
          phone: ((hold as any).customer as any)?.phone,
        },
      };
    });

    if (!response) {
      const r: ConfirmResponse = { ok: false, error: "Transaction aborted" };
      return NextResponse.json(r, { status: 500 });
    }

    if (!response.ok) {
      const status =
        response.error.toLowerCase().includes("expired")
          ? 410
          : response.error.toLowerCase().includes("not found")
          ? 404
          : response.error.toLowerCase().includes("missing")
          ? 400
          : 409;

      return NextResponse.json(response, { status });
    }

    // ✅ NON-BLOCKING EMAIL after success
    const toEmail = response.customer?.email;
    const toName = response.customer?.name;

    if (toEmail) {
  const tripObj = TRIPS.find((t) => t.id === response.tripId);
  const tripTitle = tripObj?.title ?? String(response.tripId);

  const slotObj = buildSlotsForTrip(response.tripId).find((s) => s.id === response.slotId);
  const slotLabel =
    slotObj?.start && slotObj?.end
      ? `${slotObj.start}–${slotObj.end}`
      : slotObj?.label || slotObj?.start || response.slotId;

  const { subject, html, text } = bookingConfirmedTemplate({
    brand: "ION Boats",
    tripTitle,
    tripId: response.tripId,
    date: response.date,
    slotId: response.slotId,
    slotLabel,
    bookingMode: response.bookingMode,
    priceEur: response.priceEur,
    reservationId: response.reservationId,
    customerName: toName || undefined,
    supportEmail: "bookings@ion-boats.com",
    meetingPoint: tripObj?.meetingPoint,
    quantity: response.quantity,
  });
      void sendBrevoEmail({
        toEmail,
        toName: toName || undefined,
        subject,
        html,
        text,
        reservationId: response.reservationId,
      })
        .then((res: any) =>
          console.log("[BREVO] confirm email result", res?.messageId ? { messageId: res.messageId } : res)
        )
        .catch((err: any) => console.error("[BREVO] confirm email failed", err?.message || err));
    } else {
      console.warn("[BREVO] No customer email found; skipping confirmation email", {
        reservationId: response.reservationId,
      });
    }

    return NextResponse.json(response, { status: 200 });
  } catch (e: unknown) {
    console.error("Confirm error:", e);

    if (isDupKeyError(e)) {
      const r: ConfirmResponse = { ok: false, error: "Already confirmed (duplicate)." };
      return NextResponse.json(r, { status: 409 });
    }

    const r: ConfirmResponse = { ok: false, error: "Server error" };
    return NextResponse.json(r, { status: 500 });
  } finally {
    session.endSession();
  }
}