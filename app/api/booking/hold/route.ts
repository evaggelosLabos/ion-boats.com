// app/api/booking/hold/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "../../../../lib/db/mongoose";

import { Hold } from "../../../../models/Hold";
import { Reservation } from "../../../../models/Reservation";
import {
  TRIPS,
  buildSlotsForTrip,
  type TripId,
  type BookingMode,
} from "../../../../lib/booking/catalog";
import { getPrivatePriceForDate } from "../../../../lib/booking/pricing";

type HoldRequest = {
  tripId: TripId;
  date: string; // YYYY-MM-DD
  slotId: string;
  bookingMode: BookingMode; // "private" | "shared"
  quantity: number; // shared = people count, private = people count
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
};

function isTripId(x: unknown): x is TripId {
  return (
    x === "sunset" ||
    x === "ne" ||
    x === "private" ||
    x === "paxos" ||
    x === "blue-lagoon"
  );
}

function isBookingMode(x: unknown): x is BookingMode {
  return x === "private" || x === "shared";
}

function isISODate(x: unknown): x is string {
  return typeof x === "string" && /^\d{4}-\d{2}-\d{2}$/.test(x);
}

function isNonEmptyString(x: unknown): x is string {
  return typeof x === "string" && x.trim().length > 0;
}

function safeText(x: unknown): string {
  return typeof x === "string" ? x.trim() : "";
}

function toPositiveInt(x: unknown, fallback: number) {
  const n =
    typeof x === "number" ? x : typeof x === "string" ? Number(x) : NaN;
  if (!Number.isFinite(n)) return fallback;
  const i = Math.floor(n);
  return i > 0 ? i : fallback;
}

/**
 * Inventory rule you’re using now:
 * - shared = consumes seats equal to party size (people)
 * - private = consumes a whole boat (seatsPerBoat), regardless of party size
 */
function seatsFor(mode: BookingMode, partySize: number, seatsPerBoat: number) {
  if (mode === "shared") return partySize;
  if (mode === "private") return seatsPerBoat;
  return 0;
}

/**
 * Convert an Athens-local date+time (YYYY-MM-DD + HH:MM) into UTC milliseconds.
 * This avoids server-timezone drift and handles DST correctly for Europe/Athens.
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

  // First guess: treat local time as if it were UTC
  const guessUtcMs = Date.UTC(y, m - 1, d, hh, mm, 0);

  // Find offset in Athens at that instant (handles DST)
  const offMin = tzOffsetMinutes(new Date(guessUtcMs), "Europe/Athens");

  // local = utc + offset  =>  utc = local - offset
  return guessUtcMs - offMin * 60 * 1000;
}

export async function POST(req: Request) {
  let bodyUnknown: unknown;
  try {
    bodyUnknown = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const b = bodyUnknown as Partial<HoldRequest>;

  if (!isTripId(b.tripId))
    return NextResponse.json({ error: "Invalid tripId" }, { status: 400 });
  if (!isISODate(b.date))
    return NextResponse.json(
      { error: "Invalid date (YYYY-MM-DD)" },
      { status: 400 }
    );
  if (!isNonEmptyString(b.slotId))
    return NextResponse.json({ error: "Invalid slotId" }, { status: 400 });
  if (!isBookingMode(b.bookingMode))
    return NextResponse.json({ error: "Invalid bookingMode" }, { status: 400 });

  const quantity = toPositiveInt(b.quantity, 1);

  if (!b.customer || typeof b.customer !== "object") {
    return NextResponse.json({ error: "Missing customer" }, { status: 400 });
  }

  const name = safeText((b.customer as { name?: unknown }).name);
  const phone = safeText((b.customer as { phone?: unknown }).phone);
  const email = safeText((b.customer as { email?: unknown }).email);

  if (name.length < 2)
    return NextResponse.json({ error: "Name required" }, { status: 400 });
  if (phone.length < 6)
    return NextResponse.json({ error: "Phone required" }, { status: 400 });

  const trip = TRIPS.find((t) => t.id === b.tripId);
  if (!trip) return NextResponse.json({ error: "Trip not found" }, { status: 404 });

  // Slot must exist in our deterministic catalog
  const slots = buildSlotsForTrip(b.tripId);
  const slot = slots.find((s) => s.id === b.slotId);
  if (!slot) return NextResponse.json({ error: "Slot not found" }, { status: 404 });

  // ✅ Block booking for slots that already started (Athens time)
{
  const slotStartUtcMs = athensLocalToUtcMs(b.date, slot.start);
  if (!Number.isFinite(slotStartUtcMs)) {
    return NextResponse.json({ error: "Invalid slot start time" }, { status: 500 });
  }

  if (Date.now() >= slotStartUtcMs) {
    return NextResponse.json(
      { error: "This departure time has already started (or passed)." },
      { status: 409 }
    );
  }
}

  // ✅ Phase 1: shared is enabled only if maxPeopleShared > 0 AND sharedPersonPrice > 0
  if (
    b.bookingMode === "shared" &&
    (Number(trip.pricing?.maxPeopleShared ?? 0) <= 0 ||
      Number((trip.pricing as any)?.sharedPersonPrice ?? 0) <= 0)
  ) {
    return NextResponse.json(
      { error: "Shared booking is not available for this trip." },
      { status: 400 }
    );
  }

  // ✅ Private enabled only if privatePrice > 0
  if (b.bookingMode === "private" && Number(trip.pricing?.privatePrice ?? 0) <= 0) {
    return NextResponse.json(
      { error: "Private booking is not available for this trip." },
      { status: 400 }
    );
  }

  // ✅ Enforce shared 48h cutoff (Athens time)
  if (b.bookingMode === "shared") {
    const cutoffHours = 48;

    const slotStartUtcMs = athensLocalToUtcMs(b.date, slot.start);
    if (!Number.isFinite(slotStartUtcMs)) {
      return NextResponse.json(
        { error: "Invalid slot start time" },
        { status: 500 }
      );
    }

    const cutoffUtcMs = slotStartUtcMs - cutoffHours * 60 * 60 * 1000;

    if (Date.now() >= cutoffUtcMs) {
      return NextResponse.json(
        { error: `Shared booking closes ${cutoffHours} hours before departure.` },
        { status: 409 }
      );
    }
  }

  await dbConnect();

  const now = new Date();

  // Seat pool per slot (defaults)
  const seatsPerBoat = toPositiveInt((trip.pricing as any)?.seatsPerBoat, 10);
  const boatsPerSlot = toPositiveInt((trip.pricing as any)?.boatsPerSlot, 2);
  const totalSeats = seatsPerBoat * boatsPerSlot;

  // ✅ Shared booking cannot exceed ONE BOAT per booking (prevents 12/20 etc.)
if (b.bookingMode === "shared" && quantity > seatsPerBoat) {
  return NextResponse.json(
    { error: `Shared booking max is ${seatsPerBoat} people per booking.` },
    { status: 409 }
  );
}

  // Active holds (NOT expired)
  const activeHolds = await Hold.find({
    tripId: b.tripId,
    date: b.date,
    slotId: b.slotId,
    status: "hold",
    expiresAt: { $gt: now },
  }).select({ bookingMode: 1, quantity: 1 });

  const heldSeats = activeHolds.reduce((sum, h) => {
    const mode = String(h.bookingMode) as BookingMode;
    const q = Number((h as any).quantity ?? 1);
    const safeQ = Number.isFinite(q) && q > 0 ? Math.floor(q) : 1;
    return sum + seatsFor(mode, safeQ, seatsPerBoat);
  }, 0);

  // ✅ subtract confirmed reservations too (so private/full-boat works correctly)
  const confirmedAgg = await Reservation.aggregate<{ total: number }>([
    {
      $match: {
        tripId: b.tripId,
        date: b.date,
        slotId: b.slotId,
        status: "confirmed",
      },
    },
    {
      $project: {
        seats: {
          $cond: [
            { $eq: ["$bookingMode", "private"] },
            { $literal: seatsPerBoat },
            "$quantity",
          ],
        },
      },
    },
    { $group: { _id: null, total: { $sum: "$seats" } } },
  ]);

  const confirmedSeats = confirmedAgg[0]?.total ?? 0;

  const remainingSeats = Math.max(0, totalSeats - confirmedSeats - heldSeats);

  const seatsNeeded = seatsFor(b.bookingMode, quantity, seatsPerBoat);

  // Shared: can book 1..remainingSeats people
  const maxSharedPeopleBookable = remainingSeats;

  // Private: only if a FULL BOAT is available
  const privateAvailable = remainingSeats >= seatsPerBoat;

  // Mode-specific checks
  if (b.bookingMode === "shared") {
    if (quantity > maxSharedPeopleBookable) {
      return NextResponse.json(
        {
          error: "Not enough shared seats left for this slot.",
          remainingSeats,
          maxSharedPeopleBookable,
        },
        { status: 409 }
      );
    }
  } else {
    if (!privateAvailable) {
      return NextResponse.json(
        { error: "Private boat is not available for this slot.", remainingSeats },
        { status: 409 }
      );
    }
    if (quantity > seatsPerBoat) {
      return NextResponse.json(
        { error: `Max ${seatsPerBoat} people on a private boat.` },
        { status: 409 }
      );
    }
  }

  // Universal safety check
  if (seatsNeeded > remainingSeats) {
    return NextResponse.json(
      { error: "Not enough seats left for this slot.", remainingSeats },
      { status: 409 }
    );
  }

  const unitPriceEur =
  b.bookingMode === "private"
    ? getPrivatePriceForDate(
        b.date,
        trip.pricing.privatePrice,
        trip.pricing.privateSeasonalPrices
      )
    : Number(trip.pricing.sharedPersonPrice ?? 0);

const totalPriceEur =
  b.bookingMode === "private"
    ? unitPriceEur
    : unitPriceEur * quantity;

const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  try {
    const doc = await Hold.create({
  tripId: b.tripId,
  date: b.date,
  slotId: b.slotId,
  bookingMode: b.bookingMode,
  quantity,
  status: "hold",
  customer: { name, phone, ...(email ? { email } : {}) },
  currency: "EUR",
  unitPriceEur,
  totalPriceEur,
  expiresAt,
});

    return NextResponse.json({
  holdId: String(doc._id),
  expiresAt: doc.expiresAt.getTime(),
  seatsHeld: seatsNeeded,
  remainingSeatsAfterHold: Math.max(0, remainingSeats - seatsNeeded),
  currency: doc.currency,
  unitPriceEur: doc.unitPriceEur,
  totalPriceEur: doc.totalPriceEur,
  message: "Hold created. Complete booking before it expires.",
});
  } catch (e: unknown) {
    const err = e as { code?: unknown };
    if (err && err.code === 11000) {
      return NextResponse.json(
        { error: "Slot is currently held. Try another time." },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: "Failed to create hold" }, { status: 500 });
  }
}