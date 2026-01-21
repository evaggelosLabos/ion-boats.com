// app/api/booking/hold/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "../../../../lib/db/mongoose";

import { Hold } from "../../../../models/Hold";
import { TRIPS, buildSlotsForTrip, type TripId, type BookingMode } from "../../../../lib/booking/catalog";

type HoldRequest = {
  tripId: TripId;
  date: string; // YYYY-MM-DD
  slotId: string;
  bookingMode: BookingMode; // "private" | "shared"
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
};

function isTripId(x: unknown): x is TripId {
  return x === "paleo" || x === "ne" || x === "private";
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

  // If trip has shared disabled, block shared
  if (b.bookingMode === "shared" && trip.pricing.maxCouples <= 0) {
    return NextResponse.json({ error: "Shared booking not available for this trip" }, { status: 400 });
  }

  await dbConnect();

  const now = new Date();

  // Read active holds for this slot
  const activeHolds = await Hold.find({
    tripId: b.tripId,
    date: b.date,
    slotId: b.slotId,
    status: "hold",
    expiresAt: { $gt: now },
  }).select({ bookingMode: 1 });

  const hasPrivateHold = activeHolds.some((h) => String(h.bookingMode) === "private");
  const sharedHoldCount = activeHolds.filter((h) => String(h.bookingMode) === "shared").length;

  // Rule: any private hold blocks everything
  if (hasPrivateHold) {
    return NextResponse.json({ error: "Slot is currently held as private. Try another time." }, { status: 409 });
  }

  // If user wants private but shared holds exist, block (slot is partially filled)
  if (b.bookingMode === "private" && sharedHoldCount > 0) {
    return NextResponse.json({ error: "Slot already has shared bookings. Choose another time." }, { status: 409 });
  }

  // Shared capacity check
  if (b.bookingMode === "shared") {
    const remainingCouples = Math.max(0, trip.pricing.maxCouples - sharedHoldCount);
    if (remainingCouples <= 0) {
      return NextResponse.json({ error: "No shared spots left for this slot." }, { status: 409 });
    }
  }

  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  try {
    const doc = await Hold.create({
      tripId: b.tripId,
      date: b.date,
      slotId: b.slotId,
      bookingMode: b.bookingMode,
      quantity: 1,
      status: "hold",
      customer: { name, phone, ...(email ? { email } : {}) },
      expiresAt,
    });

    return NextResponse.json({
      holdId: String(doc._id),
      expiresAt: doc.expiresAt.getTime(),
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