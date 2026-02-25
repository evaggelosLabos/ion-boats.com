import { NextResponse } from "next/server";
import { getAgentFromRequest } from "../../../../lib/agent/auth";
import { connectMongoose } from "../../../../lib/db/mongoose";
import { Reservation } from "../../../../models/Reservation";
import { TRIPS, type TripId, type Trip, type BookingMode } from "../../../../lib/booking/catalog";

function isTripId(x: string): x is TripId {
  return x === "paleo" || x === "ne" || x === "private";
}

function findSlot(payload: any, slotId: string) {
  const slots = payload?.slots;
  if (!Array.isArray(slots)) return null;
  return slots.find((s: any) => String(s?.id) === String(slotId)) || null;
}

async function fetchJson(url: string) {
  const res = await fetch(url, { cache: "no-store", headers: { accept: "application/json" } });
  let json: any = {};
  try {
    json = await res.json();
  } catch {
    json = {};
  }
  return { res, json };
}

export async function POST(req: Request) {
  const agent = await getAgentFromRequest();
  if (!agent) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();

    const tripIdRaw = String(body?.tripId || "");
    const date = String(body?.date || "");
    const slotId = String(body?.slotId || "");

    const bookingMode: BookingMode = body?.bookingMode === "private" ? "private" : "shared";

    const customerName = String(body?.customerName || "").trim();
    const customerPhone = String(body?.customerPhone || "").trim();
    const customerEmail = body?.customerEmail ? String(body.customerEmail).trim() : undefined;

    const paymentStatus = String(body?.paymentStatus || "pay_on_arrival") as
      | "pay_on_arrival"
      | "paid_to_agent"
      | "invoice";

    const notes = body?.notes ? String(body.notes).trim() : undefined;

    // ✅ schema requires quantity === 1 (enum: [1])
    const quantity = 1;

    if (!isTripId(tripIdRaw)) {
      return NextResponse.json({ error: "Invalid tripId." }, { status: 400 });
    }
    const tripId: TripId = tripIdRaw;

    if (!date || !slotId) {
      return NextResponse.json({ error: "Missing date or slot." }, { status: 400 });
    }
    if (!customerName || !customerPhone) {
      return NextResponse.json({ error: "Missing customer name or phone." }, { status: 400 });
    }
    if (!["pay_on_arrival", "paid_to_agent", "invoice"].includes(paymentStatus)) {
      return NextResponse.json({ error: "Invalid paymentStatus." }, { status: 400 });
    }

    // ✅ Server-to-server fetch: VS Code port-forward uses https://localhost:3001 but dev server is http
    const internalBase =
      process.env.INTERNAL_BASE_URL?.trim() ||
      new URL(req.url).origin.replace(/^https:/, "http:");

    // ✅ availability check (same endpoint as BookingWidget)
    const availUrl = new URL(`${internalBase}/api/booking/availability`);
    availUrl.searchParams.set("tripId", tripId);
    availUrl.searchParams.set("date", date);

    const { res: availabilityRes, json: availabilityPayload } = await fetchJson(availUrl.toString());
    if (!availabilityRes.ok) {
      return NextResponse.json(
        { error: availabilityPayload?.error || "Availability check failed.", debugUrl: availUrl.toString() },
        { status: 502 }
      );
    }

    const slot = findSlot(availabilityPayload, slotId);
    if (!slot) return NextResponse.json({ error: "Slot not found." }, { status: 400 });

    const isPrivateHeld = Boolean(slot?.isPrivateHeld);
    const isPrivateReserved = Boolean(slot?.isPrivateReserved);
    if (isPrivateHeld || isPrivateReserved) {
      return NextResponse.json({ error: "Slot is not available (private hold/reservation)." }, { status: 409 });
    }

    // shared must have remainingCouples >= 1
    if (bookingMode === "shared") {
      const remainingCouples = Number(slot?.remainingCouples);
      if (!Number.isFinite(remainingCouples)) {
        return NextResponse.json({ error: "Cannot read remainingCouples for this slot." }, { status: 500 });
      }
      if (remainingCouples < 1) {
        return NextResponse.json({ error: "No shared availability left." }, { status: 409 });
      }
    }

    // ✅ compute priceEur from catalog
    const trip = TRIPS.find((t: Trip) => t.id === tripId)!;
    const priceEur = bookingMode === "private" ? trip.pricing.privatePrice : trip.pricing.sharedPersonPrice;

    await connectMongoose();

    // ✅ write into the REAL Reservation model
    const reservation = await Reservation.create({
      tripId,
      date,
      slotId,

      bookingMode,
      quantity, // always 1
      priceEur,

      status: "confirmed",

      customer: {
        name: customerName,
        phone: customerPhone,
        ...(customerEmail ? { email: customerEmail } : {}),
      },

      // optional agent metadata (only if your schema supports it later)
      // source: "agent",
      // agentId: agent.id,
      // paymentStatus,
      // notes,
    });

    return NextResponse.json(
      {
        ok: true,
        reservation: {
          id: String(reservation._id),
          tripId,
          date,
          slotId,
          bookingMode,
          quantity,
          priceEur,
          status: reservation.status,
          customer: reservation.customer,
          createdAt: reservation.createdAt,
          updatedAt: reservation.updatedAt,
          // paymentStatus,
          // notes,
        },
      },
      { status: 200 }
    );
  } catch (e: any) {
    console.error("AGENT_RESERVE_ERROR:", e);
    return NextResponse.json({ error: "Server error.", detail: String(e?.message || e) }, { status: 500 });
  }
}
