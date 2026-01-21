// app/api/booking/confirm/route.ts
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbConnect } from "../../../../lib/db/mongoose";
import { Hold } from "../../../../models/Hold";
import { Reservation } from "../../../../models/Reservation";
import { TRIPS, type TripId } from "../../../../lib/booking/catalog";

type ConfirmResponse =
  | {
      ok: true;
      reservationId: string;
      priceEur: number;
      tripId: TripId;
      date: string;
      slotId: string;
      bookingMode: "private" | "shared";
      message: string;
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

      const expMs = new Date(hold.expiresAt).getTime();
      if (!Number.isFinite(expMs) || expMs <= Date.now()) {
        await Hold.deleteOne({ _id: holdId }).session(session);
        return { ok: false, error: "Hold expired. Please create a new hold." };
      }

      const trip = getTripOrThrow(hold.tripId as TripId);

      // Block by confirmed PRIVATE reservation
      const hasPrivateReservation = await Reservation.exists({
        tripId: hold.tripId,
        date: hold.date,
        slotId: hold.slotId,
        bookingMode: "private",
        status: "confirmed",
      }).session(session);

      if (hasPrivateReservation) {
        return { ok: false, error: "This slot is already booked privately." };
      }

      // Block by OTHER active PRIVATE hold
      const hasOtherPrivateHold = await Hold.exists({
        _id: { $ne: holdId },
        tripId: hold.tripId,
        date: hold.date,
        slotId: hold.slotId,
        bookingMode: "private",
        status: "hold",
        expiresAt: { $gt: now },
      }).session(session);

      if (hasOtherPrivateHold) {
        return { ok: false, error: "This slot is currently held privately by another user." };
      }

      // Sum confirmed shared reservations quantity (always 1, but future-proof)
      const sharedConfirmedAgg = await Reservation.aggregate<{ total: number }>([
        {
          $match: {
            tripId: hold.tripId,
            date: hold.date,
            slotId: hold.slotId,
            bookingMode: "shared",
            status: "confirmed",
          },
        },
        { $group: { _id: null, total: { $sum: "$quantity" } } },
      ]).session(session);

      const sharedConfirmedQty = sharedConfirmedAgg[0]?.total ?? 0;

      // Sum OTHER active shared holds quantity (exclude this hold)
      const otherSharedAgg = await Hold.aggregate<{ total: number }>([
        {
          $match: {
            _id: { $ne: new mongoose.Types.ObjectId(holdId) },
            tripId: hold.tripId,
            date: hold.date,
            slotId: hold.slotId,
            bookingMode: "shared",
            status: "hold",
            expiresAt: { $gt: now },
          },
        },
        { $group: { _id: null, total: { $sum: "$quantity" } } },
      ]).session(session);

      const otherSharedHoldsQty = otherSharedAgg[0]?.total ?? 0;

      // PRIVATE confirm rules
      if (hold.bookingMode === "private") {
        if (sharedConfirmedQty > 0) {
          return { ok: false, error: "This slot already has shared bookings." };
        }

        // If any other (shared/private) hold exists, reject private confirm
        const anyOtherHold = await Hold.exists({
          _id: { $ne: holdId },
          tripId: hold.tripId,
          date: hold.date,
          slotId: hold.slotId,
          status: "hold",
          expiresAt: { $gt: now },
        }).session(session);

        if (anyOtherHold) {
          return { ok: false, error: "This slot is currently held by another user." };
        }
      }

      // SHARED confirm rules
      if (hold.bookingMode === "shared") {
        const maxCouples = trip.pricing.maxCouples;

        if (!Number.isFinite(maxCouples) || maxCouples <= 0) {
          return { ok: false, error: "Shared booking is not available for this trip." };
        }

        const remaining = Math.max(0, maxCouples - (sharedConfirmedQty + otherSharedHoldsQty));

        if (remaining <= 0) {
          return { ok: false, error: "No shared capacity left for this slot." };
        }
      }

      const priceEur =
        hold.bookingMode === "private" ? trip.pricing.privatePrice : trip.pricing.sharedCouplePrice;

      const created = await Reservation.create(
        [
          {
            tripId: hold.tripId,
            date: hold.date,
            slotId: hold.slotId,
            bookingMode: hold.bookingMode,
            quantity: 1,
            priceEur,
            status: "confirmed",
            customer: hold.customer,
          },
        ],
        { session }
      );

      await Hold.deleteOne({ _id: holdId }).session(session);

      return {
        ok: true,
        reservationId: String(created[0]._id),
        priceEur,
        tripId: hold.tripId as TripId,
        date: hold.date,
        slotId: hold.slotId,
        bookingMode: hold.bookingMode,
        message: "Booking confirmed ✅",
      };
    });

    // withTransaction can return undefined if it aborts before callback completes
    if (!response) {
      const r: ConfirmResponse = { ok: false, error: "Transaction aborted" };
      return NextResponse.json(r, { status: 500 });
    }

    if (!response.ok) {
      const status =
        response.error.includes("expired") ? 410 :
        response.error.includes("not found") ? 404 :
        response.error.includes("Missing") ? 400 :
        409;

      return NextResponse.json(response, { status });
    }

    return NextResponse.json(response);
  } catch (e: unknown) {
    if (isDupKeyError(e)) {
      const r: ConfirmResponse = { ok: false, error: "This slot is already booked privately." };
      return NextResponse.json(r, { status: 409 });
    }

    const msg = e instanceof Error ? e.message : "Server error";
    const r: ConfirmResponse = { ok: false, error: msg };
    return NextResponse.json(r, { status: 500 });
  } finally {
    session.endSession();
  }
}
