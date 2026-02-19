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

function toPositiveInt(x: unknown, fallback: number) {
  const n = typeof x === "number" ? x : typeof x === "string" ? Number(x) : NaN;
  if (!Number.isFinite(n)) return fallback;
  const i = Math.floor(n);
  return i > 0 ? i : fallback;
}

function seatsFor(mode: string, quantity: number) {
  return mode === "shared" ? quantity * 2 : quantity; // shared=couples => 2 seats each
}

type SlotAvailability = Slot & {
  // ✅ Option B fields (use these in UI)
  totalSeats: number;
  usedSeats: number;
  remainingSeats: number;
  maxIndividualsBookable: number; // 1..remainingSeats
  maxCouplesBookable: number; // 1..floor(remainingSeats/2)

  // Optional helpful breakdown/debug
  heldSeats: number;
  reservedSeats: number;
  heldCouples: number;
  reservedCouples: number;
  heldIndividuals: number;
  reservedIndividuals: number;

  // Legacy fields (keep for compatibility; always false / non-blocking)
  isPrivateHeld: boolean;
  isPrivateReserved: boolean;
  hasAnySharedReserved: boolean;
  sharedMaxCouples: number;
  remainingCouples: number;

  // Legacy people fields (derived from seats)
  maxPeople: number;
  remainingPeople: number;
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

  // ✅ Option B: seat pool per slot (defaults to 2 boats * 10 seats = 20)
  const seatsPerBoat = toPositiveInt((trip.pricing as any)?.seatsPerBoat, 10);
  const boatsPerSlot = toPositiveInt((trip.pricing as any)?.boatsPerSlot, 2);
  const totalSeats = seatsPerBoat * boatsPerSlot;

  // Active holds for this date (not expired)
  const activeHolds = await Hold.find({
    tripId: tripIdRaw,
    date: dateRaw,
    status: "hold",
    expiresAt: { $gt: now },
  })
    .select({ slotId: 1, bookingMode: 1, quantity: 1 })
    .lean();

  // Confirmed reservations for this date
  const reservations = await Reservation.find({
    tripId: tripIdRaw,
    date: dateRaw,
    status: "confirmed",
  })
    .select({ slotId: 1, bookingMode: 1, quantity: 1 })
    .lean();

  // ---- Aggregate holds by slot ----
  const heldCouples = new Map<string, number>();
  const heldIndividuals = new Map<string, number>();
  const heldSeatsBySlot = new Map<string, number>();

  for (const h of activeHolds) {
    const slotId = String((h as any).slotId);
    const mode = String((h as any).bookingMode);
    const qtyRaw = (h as any).quantity;
    const qty = typeof qtyRaw === "number" && Number.isFinite(qtyRaw) ? Math.max(1, Math.floor(qtyRaw)) : 1;

    if (mode === "shared") {
      heldCouples.set(slotId, (heldCouples.get(slotId) ?? 0) + qty);
    } else if (mode === "private") {
      heldIndividuals.set(slotId, (heldIndividuals.get(slotId) ?? 0) + qty);
    }

    heldSeatsBySlot.set(slotId, (heldSeatsBySlot.get(slotId) ?? 0) + seatsFor(mode, qty));
  }

  // ---- Aggregate reservations by slot ----
  const reservedCouples = new Map<string, number>();
  const reservedIndividuals = new Map<string, number>();
  const reservedSeatsBySlot = new Map<string, number>();
  const hasSharedReserved = new Set<string>();

  for (const r of reservations) {
    const slotId = String((r as any).slotId);
    const mode = String((r as any).bookingMode);
    const qtyRaw = (r as any).quantity;
    const qty = typeof qtyRaw === "number" && Number.isFinite(qtyRaw) ? Math.max(1, Math.floor(qtyRaw)) : 1;

    if (mode === "shared") {
      hasSharedReserved.add(slotId);
      reservedCouples.set(slotId, (reservedCouples.get(slotId) ?? 0) + qty);
    } else if (mode === "private") {
      reservedIndividuals.set(slotId, (reservedIndividuals.get(slotId) ?? 0) + qty);
    }

    reservedSeatsBySlot.set(slotId, (reservedSeatsBySlot.get(slotId) ?? 0) + seatsFor(mode, qty));
  }

  const slots: SlotAvailability[] = baseSlots.map((s) => {
    const slotId = s.id;

    const hs = heldSeatsBySlot.get(slotId) ?? 0;
    const rs = reservedSeatsBySlot.get(slotId) ?? 0;

    const usedSeats = hs + rs;
    const remainingSeats = Math.max(0, totalSeats - usedSeats);

    const maxIndividualsBookable = remainingSeats; // ✅ individuals can pick 1..remainingSeats
    const maxCouplesBookable = Math.floor(remainingSeats / 2); // ✅ couples can pick 1..floor(remaining/2)

    // Legacy compatibility fields:
    const maxPeople = totalSeats;
    const remainingPeople = remainingSeats;
    const remainingCouplesLegacy = Math.floor(remainingSeats / 2);

    // If you still need something resembling "sharedMaxCouples" for old UI, derive from totalSeats
    const sharedMaxCouplesLegacy = Math.floor(totalSeats / 2);

    return {
      ...s,

      totalSeats,
      usedSeats,
      remainingSeats,
      maxIndividualsBookable,
      maxCouplesBookable,

      heldSeats: hs,
      reservedSeats: rs,
      heldCouples: heldCouples.get(slotId) ?? 0,
      reservedCouples: reservedCouples.get(slotId) ?? 0,
      heldIndividuals: heldIndividuals.get(slotId) ?? 0,
      reservedIndividuals: reservedIndividuals.get(slotId) ?? 0,

      // Legacy: always non-blocking in Option B
      isPrivateHeld: false,
      isPrivateReserved: false,
      hasAnySharedReserved: hasSharedReserved.has(slotId),
      sharedMaxCouples: sharedMaxCouplesLegacy,
      remainingCouples: remainingCouplesLegacy,

      maxPeople,
      remainingPeople,
    };
  });

  return NextResponse.json({
    trip,
    date: dateRaw,
    slots,
  });
}
