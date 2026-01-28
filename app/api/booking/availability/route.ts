// app/api/booking/availability/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "../../../../lib/db/mongoose";
import { Hold } from "../../../../models/Hold";
import { Reservation } from "../../../../models/Reservation";
import { TRIPS, buildSlotsForTrip, type TripId, type Slot, type Trip } from "../../../../lib/booking/catalog";

function isTripId(x: string): x is TripId {
  return x === "paleo" || x === "ne" || x === "private" || x === "paxos" || x === "blue-lagoon";
}

function isISODate(x: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(x);
}

type SlotAvailability = Slot & {
  isPrivateHeld: boolean;
  isPrivateReserved: boolean;
  hasAnySharedReserved: boolean;
  sharedMaxCouples: number;
  remainingCouples: number;
};

export async function GET(req: Request) {
  const url = new URL(req.url);
  const tripIdRaw = url.searchParams.get("tripId") ?? "";
  const dateRaw = url.searchParams.get("date") ?? "";

  if (!isTripId(tripIdRaw)) return NextResponse.json({ error: "Invalid tripId" }, { status: 400 });
  if (!isISODate(dateRaw)) return NextResponse.json({ error: "Invalid date (expected YYYY-MM-DD)" }, { status: 400 });

  const trip = TRIPS.find((t: Trip) => t.id === tripIdRaw);
  if (!trip) return NextResponse.json({ error: "Trip not found" }, { status: 404 });

  const baseSlots: Slot[] = buildSlotsForTrip(tripIdRaw);

  await dbConnect();

  const now = new Date();

  const activeHolds = await Hold.find({
    tripId: tripIdRaw,
    date: dateRaw,
    status: "hold",
    expiresAt: { $gt: now },
  })
    .select({ slotId: 1, bookingMode: 1, quantity: 1 })
    .lean();

  const reservations = await Reservation.find({
    tripId: tripIdRaw,
    date: dateRaw,
    status: "confirmed",
  })
    .select({ slotId: 1, bookingMode: 1, quantity: 1 })
    .lean();

  const privateHeld = new Set<string>();
  const sharedHeldQty = new Map<string, number>();

  for (const h of activeHolds) {
    const slotId = String(h.slotId);
    const mode = String(h.bookingMode);

    if (mode === "private") {
      privateHeld.add(slotId);
    } else if (mode === "shared") {
      const qty = typeof h.quantity === "number" ? h.quantity : 1;
      sharedHeldQty.set(slotId, (sharedHeldQty.get(slotId) ?? 0) + qty);
    }
  }

  const privateReserved = new Set<string>();
  const sharedReservedQty = new Map<string, number>();
  const hasSharedReserved = new Set<string>();

  for (const r of reservations) {
    const slotId = String(r.slotId);
    const mode = String(r.bookingMode);

    if (mode === "private") {
      privateReserved.add(slotId);
      continue;
    }

    if (mode === "shared") {
      hasSharedReserved.add(slotId);
      const qty = typeof r.quantity === "number" ? r.quantity : 1;
      sharedReservedQty.set(slotId, (sharedReservedQty.get(slotId) ?? 0) + qty);
    }
  }

  const maxCouples = trip.pricing.maxCouples;

  const slots: SlotAvailability[] = baseSlots.map((s) => {
    const slotId = s.id;

    const isPrivateHeld = privateHeld.has(slotId);
    const isPrivateReserved = privateReserved.has(slotId);
    const hasAnySharedReserved = hasSharedReserved.has(slotId);

    const hardBlocked = isPrivateHeld || isPrivateReserved;

    const heldShared = sharedHeldQty.get(slotId) ?? 0;
    const reservedShared = sharedReservedQty.get(slotId) ?? 0;

    const remainingCouples =
      maxCouples > 0 && !hardBlocked ? Math.max(0, maxCouples - (heldShared + reservedShared)) : 0;

    return {
      ...s,
      isPrivateHeld,
      isPrivateReserved,
      hasAnySharedReserved,
      sharedMaxCouples: maxCouples,
      remainingCouples,
    };
  });

  return NextResponse.json({ trip, date: dateRaw, slots });
}
