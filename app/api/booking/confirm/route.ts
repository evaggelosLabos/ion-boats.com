import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbConnect } from "../../../../lib/db/mongoose";
import { Hold } from "../../../../models/Hold";
import { Reservation } from "../../../../models/Reservation";
import { TRIPS, type TripId, type BookingMode } from "../../../../lib/booking/catalog";
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
      quantity: number;
      seats: number;
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

function seatsFor(mode: BookingMode, quantity: number) {
  return mode === "shared" ? quantity * 2 : quantity; // shared=couples => 2 seats each
}

function totalSeatsForTrip(trip: any) {
  // Option B defaults: 2 boats x 10 seats = 20
  const seatsPerBoat = toPositiveInt(trip?.pricing?.seatsPerBoat, 10);
  const boatsPerSlot = toPositiveInt(trip?.pricing?.boatsPerSlot, 2);
  return seatsPerBoat * boatsPerSlot;
}

function computeTotalPriceEur(trip: any, bookingMode: BookingMode, quantity: number) {
  // total price for the group booking
  if (bookingMode === "shared") {
    const perCouple = Number(trip?.pricing?.sharedCouplePrice ?? 0);
    return perCouple * quantity;
  }
  const perPerson = Number(trip?.pricing?.privatePrice ?? 0);
  return perPerson * quantity;
}

export async function POST(req: Request) {
  await dbConnect();

  const bodyUnknown: unknown = await req.json();
  const holdId =
    isObj(bodyUnknown) && typeof bodyUnknown.holdId === "string" ? bodyUnknown.holdId : "";

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
      const quantity = toPositiveInt((hold as any).quantity, 1);

      const totalSeats = totalSeatsForTrip(trip);
      const seatsNeeded = seatsFor(bookingMode, quantity);

      // 1) Sum CONFIRMED seats for this slot (both modes)
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
                { $eq: ["$bookingMode", "shared"] },
                { $multiply: ["$quantity", 2] },
                "$quantity",
              ],
            },
          },
        },
        { $group: { _id: null, total: { $sum: "$seats" } } },
      ]).session(session);

      const confirmedSeats = confirmedAgg[0]?.total ?? 0;

      // 2) Sum OTHER active hold seats for this slot (exclude this hold)
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
                { $eq: ["$bookingMode", "shared"] },
                { $multiply: ["$quantity", 2] },
                "$quantity",
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

      const priceEur = computeTotalPriceEur(trip, bookingMode, quantity);

      const created = await Reservation.create(
        [
          {
            tripId: (hold as any).tripId,
            date: (hold as any).date,
            slotId: (hold as any).slotId,
            bookingMode,
            quantity, // ✅ group quantity preserved
            priceEur, // ✅ total price for the group
            status: "confirmed",
            customer: (hold as any).customer,
            // Optional if your schema allows it:
            // seats: seatsNeeded,
          },
        ],
        { session }
      );

      await Hold.deleteOne({ _id: holdId }).session(session);

      const remainingAfter = Math.max(0, remainingSeats - seatsNeeded);

      return {
        ok: true,
        reservationId: String(created[0]._id),
        priceEur,
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

    // ✅ NON-BLOCKING EMAIL (after successful transaction)
    const toEmail = response.customer?.email;
    const toName = response.customer?.name;

    if (toEmail) {
      const tripTitle = TRIPS.find((t) => t.id === response.tripId)?.title ?? String(response.tripId);

      const { subject, html, text } = bookingConfirmedTemplate({
        brand: "ION Boats",
        tripTitle,
        tripId: response.tripId,
        date: response.date,
        slotId: response.slotId,
        bookingMode: response.bookingMode,
        priceEur: response.priceEur,
        reservationId: response.reservationId,
        customerName: toName || undefined,
        supportEmail: "bookings@ion-boats.com",
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
