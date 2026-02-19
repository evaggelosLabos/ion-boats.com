// app/api/booking/hold/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "../../../../lib/db/mongoose";

import { Hold } from "../../../../models/Hold";
import { TRIPS, buildSlotsForTrip, type TripId, type BookingMode } from "../../../../lib/booking/catalog";

type HoldRequest = {
  tripId: TripId;
  date: string; // YYYY-MM-DD
  slotId: string;
  bookingMode: BookingMode; // "private" (individual) | "shared" (couples)
  quantity: number; // ✅ NEW: group quantity (private = people, shared = couples)
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
};

function isTripId(x: unknown): x is TripId {
  return x === "paleo" || x === "ne" || x === "private" || x === "paxos" || x === "blue-lagoon";
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
  const n = typeof x === "number" ? x : typeof x === "string" ? Number(x) : NaN;
  if (!Number.isFinite(n)) return fallback;
  const i = Math.floor(n);
  return i > 0 ? i : fallback;
}

function seatsFor(mode: BookingMode, quantity: number) {
  return mode === "shared" ? quantity * 2 : quantity; // shared = couples -> 2 seats each
}

export async function POST(req: Request) {
  let bodyUnknown: unknown;
  try {
    bodyUnknown = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const b = bodyUnknown as Partial<HoldRequest>;

  if (!isTripId(b.tripId)) return NextResponse.json({ error: "Invalid tripId" }, { status: 400 });
  if (!isISODate(b.date)) return NextResponse.json({ error: "Invalid date (YYYY-MM-DD)" }, { status: 400 });
  if (!isNonEmptyString(b.slotId)) return NextResponse.json({ error: "Invalid slotId" }, { status: 400 });
  if (!isBookingMode(b.bookingMode)) return NextResponse.json({ error: "Invalid bookingMode" }, { status: 400 });

  const quantity = toPositiveInt(b.quantity, 1);

  if (!b.customer || typeof b.customer !== "object") {
    return NextResponse.json({ error: "Missing customer" }, { status: 400 });
  }

  const name = safeText((b.customer as { name?: unknown }).name);
  const phone = safeText((b.customer as { phone?: unknown }).phone);
  const email = safeText((b.customer as { email?: unknown }).email);

  if (name.length < 2) return NextResponse.json({ error: "Name required" }, { status: 400 });
  if (phone.length < 6) return NextResponse.json({ error: "Phone required" }, { status: 400 });

  const trip = TRIPS.find((t) => t.id === b.tripId);
  if (!trip) return NextResponse.json({ error: "Trip not found" }, { status: 404 });

  // Slot must exist in our deterministic catalog (later: DB slots)
  const slots = buildSlotsForTrip(b.tripId);
  const slot = slots.find((s) => s.id === b.slotId);
  if (!slot) return NextResponse.json({ error: "Slot not found" }, { status: 404 });

  // Optional: block shared if pricing doesn't support it
  // (adjust this condition to your real catalog)
  if (b.bookingMode === "shared" && Number(trip.pricing?.sharedCouplePrice ?? 0) <= 0) {
    return NextResponse.json({ error: "Shared (couples) booking not available for this trip" }, { status: 400 });
  }

  // Optional: block individual if pricing doesn't support it
  if (b.bookingMode === "private" && Number(trip.pricing?.privatePrice ?? 0) <= 0) {
    return NextResponse.json({ error: "Individual booking not available for this trip" }, { status: 400 });
  }

  await dbConnect();

  const now = new Date();

  // ✅ Option B: total seat pool per slot (defaults to 2 boats * 10 seats = 20)
  // If you already have these in catalog, great. If not, this fallback works now.
  const seatsPerBoat = toPositiveInt((trip.pricing as any)?.seatsPerBoat, 10);
  const boatsPerSlot = toPositiveInt((trip.pricing as any)?.boatsPerSlot, 2);
  const totalSeats = seatsPerBoat * boatsPerSlot;

  // Read active holds for this slot (NOT expired)
  const activeHolds = await Hold.find({
    tripId: b.tripId,
    date: b.date,
    slotId: b.slotId,
    status: "hold",
    expiresAt: { $gt: now },
  }).select({ bookingMode: 1, quantity: 1 });

  // ✅ Sum seats already held
  const heldSeats = activeHolds.reduce((sum, h) => {
    const mode = String(h.bookingMode) as BookingMode;
    const q = Number((h as any).quantity ?? 1);
    const safeQ = Number.isFinite(q) && q > 0 ? Math.floor(q) : 1;
    return sum + seatsFor(mode, safeQ);
  }, 0);

  // TODO (critical): subtract confirmed seats too (reservations)
  // const confirmedSeats = ...
  const confirmedSeats = 0;

  const remainingSeats = Math.max(0, totalSeats - confirmedSeats - heldSeats);

  const seatsNeeded = seatsFor(b.bookingMode, quantity);

  // Quantity bounds by mode (for nicer error messages)
  const maxIndividualsBookable = remainingSeats;
  const maxCouplesBookable = Math.floor(remainingSeats / 2);

  if (b.bookingMode === "private") {
    if (quantity > maxIndividualsBookable) {
      return NextResponse.json(
        {
          error: "Not enough seats left for an individual group booking.",
          remainingSeats,
          maxIndividualsBookable,
        },
        { status: 409 }
      );
    }
  } else {
    if (quantity > maxCouplesBookable) {
      return NextResponse.json(
        {
          error: "Not enough seats left for couples in this slot.",
          remainingSeats,
          maxCouplesBookable,
        },
        { status: 409 }
      );
    }
  }

  // Final universal check (covers everything)
  if (seatsNeeded > remainingSeats) {
    return NextResponse.json(
      { error: "Not enough seats left for this slot.", remainingSeats },
      { status: 409 }
    );
  }

  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  try {
    const doc = await Hold.create({
      tripId: b.tripId,
      date: b.date,
      slotId: b.slotId,
      bookingMode: b.bookingMode,
      quantity, // ✅ group quantity stored
      status: "hold",
      customer: { name, phone, ...(email ? { email } : {}) },
      expiresAt,
      // Optional: store seats explicitly if your schema allows it
      // seats: seatsNeeded,
    });

    return NextResponse.json({
      holdId: String(doc._id),
      expiresAt: doc.expiresAt.getTime(),
      seatsHeld: seatsNeeded,
      remainingSeatsAfterHold: Math.max(0, remainingSeats - seatsNeeded),
      message: "Hold created. Complete booking before it expires.",
    });
  } catch (e: unknown) {
    const err = e as { code?: unknown };
    if (err && err.code === 11000) {
      return NextResponse.json({ error: "Slot is currently held. Try another time." }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to create hold" }, { status: 500 });
  }
}
