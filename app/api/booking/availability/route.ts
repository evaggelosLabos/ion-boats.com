// app/api/booking/availability/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "../../../../lib/db/mongoose";
import { Hold } from "../../../../models/Hold";
import { Reservation } from "../../../../models/Reservation";
import {
  TRIPS,
  buildSlotsForTrip,
  type TripId,
  type Slot,
  type Trip,
} from "../../../../lib/booking/catalog";

function isTripId(x: string): x is TripId {
  return (
    x === "sunset" ||
    x === "ne" ||
    x === "private" ||
    x === "paxos" ||
    x === "blue-lagoon"
  );
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

function seatsFor(mode: string, partySize: number, seatsPerBoat: number) {
  // ✅ Shared = seats equal to number of people
  if (mode === "shared") return partySize;

  // ✅ Private = consumes a whole boat regardless of party size
  if (mode === "private") return seatsPerBoat;

  return 0;
}

/**
 * Convert an Athens-local date+time (YYYY-MM-DD + HH:MM) into UTC milliseconds.
 * Avoids server timezone drift and handles DST for Europe/Athens.
 */
function tzOffsetMinutes(date: Date, timeZone: string) {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = dtf.formatToParts(date);
  const map: Record<string, string> = {};
  for (const p of parts) map[p.type] = p.value;

  const asUTC = Date.UTC(
    Number(map.year),
    Number(map.month) - 1,
    Number(map.day),
    Number(map.hour),
    Number(map.minute),
    Number(map.second)
  );

  return (asUTC - date.getTime()) / 60000;
}

function athensLocalToUtcMs(dateISO: string, timeHHMM: string) {
  const [y, m, d] = dateISO.split("-").map(Number);
  const [hh, mm] = timeHHMM.split(":").map(Number);

  const guessUtcMs = Date.UTC(y, m - 1, d, hh, mm, 0);
  const offMin = tzOffsetMinutes(new Date(guessUtcMs), "Europe/Athens");
  return guessUtcMs - offMin * 60 * 1000;
}

type SlotAvailability = Slot & {
  // ✅ Core inventory fields
  totalSeats: number;
  usedSeats: number;
  remainingSeats: number;

  // ✅ UI helpers:
  // shared (people) -> 1..remainingSeats
  maxIndividualsBookable: number;

  // legacy field name (your UI still expects it):
  // we now use this as "max private people allowed IF a boat is available"
  // 0 means private is not available for this slot
  maxCouplesBookable: number;

  // ✅ NEW: Phase 1 rule flags (UI should display only)
  sharedEnabled: boolean;
  sharedCutoffHours: number;
  sharedClosedByCutoff: boolean;
  sharedMinPeopleToRun: number; // informational for now

  // Debug breakdown (optional)
  heldSeats: number;
  reservedSeats: number;
  heldSharedPeople: number;
  reservedSharedPeople: number;
  heldPrivateBookings: number;
  reservedPrivateBookings: number;

  // Legacy compatibility (keep)
  isPrivateHeld: boolean;
  isPrivateReserved: boolean;
  hasAnySharedReserved: boolean;
  sharedMaxCouples: number;
  remainingCouples: number;

  maxPeople: number;
  remainingPeople: number;
};

export async function GET(req: Request) {
  const url = new URL(req.url);
  const tripIdRaw = url.searchParams.get("tripId") ?? "";
  const dateRaw = url.searchParams.get("date") ?? "";

  if (!isTripId(tripIdRaw))
    return NextResponse.json({ error: "Invalid tripId" }, { status: 400 });
  if (!isISODate(dateRaw))
    return NextResponse.json(
      { error: "Invalid date (expected YYYY-MM-DD)" },
      { status: 400 }
    );

  const trip = TRIPS.find((t: Trip) => t.id === tripIdRaw);
  if (!trip) return NextResponse.json({ error: "Trip not found" }, { status: 404 });

  const baseSlots: Slot[] = buildSlotsForTrip(tripIdRaw);

  await dbConnect();

  const now = new Date();

  // ✅ seat pool per slot (defaults to 2 boats * 10 seats = 20)
  const seatsPerBoat = toPositiveInt((trip.pricing as any)?.seatsPerBoat, 10);
  const boatsPerSlot = toPositiveInt((trip.pricing as any)?.boatsPerSlot, 2);
  const totalSeats = seatsPerBoat * boatsPerSlot;

  // ✅ shared enable switch (Phase 1)
  const sharedEnabled =
    Number(trip.pricing?.maxPeopleShared ?? 0) > 0 &&
    Number((trip.pricing as any)?.sharedPersonPrice ?? 0) > 0;

  // Phase 1 fixed values (you can later move to trip.pricing.sharedCutoffHours, etc.)
  const sharedCutoffHours = 48;
  const sharedMinPeopleToRun = 6;

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
  const heldSharedPeople = new Map<string, number>(); // shared == people
  const heldPrivateBookings = new Map<string, number>(); // count of private holds (optional)
  const heldSeatsBySlot = new Map<string, number>();

  for (const h of activeHolds) {
    const slotId = String((h as any).slotId);
    const mode = String((h as any).bookingMode);
    const qtyRaw = (h as any).quantity;
    const qty =
      typeof qtyRaw === "number" && Number.isFinite(qtyRaw)
        ? Math.max(1, Math.floor(qtyRaw))
        : 1;

    if (mode === "shared") {
      heldSharedPeople.set(slotId, (heldSharedPeople.get(slotId) ?? 0) + qty);
    } else if (mode === "private") {
      heldPrivateBookings.set(slotId, (heldPrivateBookings.get(slotId) ?? 0) + 1);
    }

    heldSeatsBySlot.set(
      slotId,
      (heldSeatsBySlot.get(slotId) ?? 0) + seatsFor(mode, qty, seatsPerBoat)
    );
  }

  // ---- Aggregate reservations by slot ----
  const reservedSharedPeople = new Map<string, number>();
  const reservedPrivateBookings = new Map<string, number>();
  const reservedSeatsBySlot = new Map<string, number>();
  const hasSharedReserved = new Set<string>();

  for (const r of reservations) {
    const slotId = String((r as any).slotId);
    const mode = String((r as any).bookingMode);
    const qtyRaw = (r as any).quantity;
    const qty =
      typeof qtyRaw === "number" && Number.isFinite(qtyRaw)
        ? Math.max(1, Math.floor(qtyRaw))
        : 1;

    if (mode === "shared") {
      hasSharedReserved.add(slotId);
      reservedSharedPeople.set(slotId, (reservedSharedPeople.get(slotId) ?? 0) + qty);
    } else if (mode === "private") {
      reservedPrivateBookings.set(slotId, (reservedPrivateBookings.get(slotId) ?? 0) + 1);
    }

    reservedSeatsBySlot.set(
      slotId,
      (reservedSeatsBySlot.get(slotId) ?? 0) + seatsFor(mode, qty, seatsPerBoat)
    );
  }

  const slots: SlotAvailability[] = baseSlots.map((s) => {
    const slotId = s.id;

    const hs = heldSeatsBySlot.get(slotId) ?? 0;
    const rs = reservedSeatsBySlot.get(slotId) ?? 0;

    const usedSeats = hs + rs;
    const remainingSeats = Math.max(0, totalSeats - usedSeats);

    // ✅ Shared (people)
    const maxIndividualsBookable = remainingSeats;

    // ✅ Private: only if at least one whole boat worth of seats is free
    // We keep the name to avoid frontend changes.
    const maxCouplesBookable = remainingSeats >= seatsPerBoat ? seatsPerBoat : 0;

    // ✅ Shared cutoff flag (Athens time)
    let sharedClosedByCutoff = true;
    if (sharedEnabled) {
      const slotStartUtcMs = athensLocalToUtcMs(dateRaw, s.start);
      const cutoffUtcMs = slotStartUtcMs - sharedCutoffHours * 60 * 60 * 1000;
      sharedClosedByCutoff = Date.now() >= cutoffUtcMs;
    }

    // Legacy compatibility fields:
    const maxPeople = totalSeats;
    const remainingPeople = remainingSeats;
    const remainingCouplesLegacy = Math.floor(remainingSeats / 2);
    const sharedMaxCouplesLegacy = Math.floor(totalSeats / 2);

    return {
      ...s,

      totalSeats,
      usedSeats,
      remainingSeats,
      maxIndividualsBookable,
      maxCouplesBookable,

      // ✅ new rule flags for UI
      sharedEnabled,
      sharedCutoffHours,
      sharedClosedByCutoff,
      sharedMinPeopleToRun,

      heldSeats: hs,
      reservedSeats: rs,
      heldSharedPeople: heldSharedPeople.get(slotId) ?? 0,
      reservedSharedPeople: reservedSharedPeople.get(slotId) ?? 0,
      heldPrivateBookings: heldPrivateBookings.get(slotId) ?? 0,
      reservedPrivateBookings: reservedPrivateBookings.get(slotId) ?? 0,

      // Legacy: keep, but we are not using them for blocking anymore
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