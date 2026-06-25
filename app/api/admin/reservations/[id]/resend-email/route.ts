import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { dbConnect } from "../../../../../../lib/db/mongoose";
import { Reservation } from "../../../../../../models/Reservation";
import { TRIPS } from "../../../../../../lib/booking/catalog";
import { sendBrevoEmail } from "../../../../../../lib/email/brevo";
import { getCookieName, verifySession } from "../../../../../../lib/admin/auth";

export async function POST(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  // ✅ Admin auth (Node runtime, crypto OK)
  const cookieStore = await cookies();
  const token = cookieStore.get(getCookieName())?.value;
  const session = verifySession(token);
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  await dbConnect();

  const { id } = await context.params;

  const r = await Reservation.findById(id).lean();
  if (!r) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });

  const email = (r.customer?.email || "").trim();
  if (!email) return NextResponse.json({ ok: true, skipped: true });

  const trip = TRIPS.find((t) => t.id === r.tripId);
  const subject = `Booking request received — ${trip?.title || "ION Boats"}`;

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5">
      <h2>Booking request received</h2>
      <p>Thank you for choosing us. We will reply back to you to confirm your booking request.</p>
      <hr/>
      <p><strong>Request ID:</strong> ${String(r._id)}</p>
      <p><strong>Trip:</strong> ${trip?.title || r.tripId}</p>
      <p><strong>Date:</strong> ${r.date}</p>
      <p><strong>Slot:</strong> ${r.slotId}</p>
      <p><strong>Mode:</strong> ${r.bookingMode}</p>
      <p><strong>Price:</strong> €${r.priceEur}</p>
      <hr/>
      <p>If you have any questions, reply to this email.</p>
    </div>
  `;

  await sendBrevoEmail({
    toEmail: email,
    toName: r.customer?.name || undefined,
    subject,
    html,
    text: `Booking request received. Thank you for choosing us. We will reply back to you to confirm your booking request. Trip: ${trip?.title || r.tripId}. Date: ${r.date}. Slot: ${r.slotId}. Mode: ${r.bookingMode}. Estimated price: €${r.priceEur}. Request ID: ${String(r._id)}`,
    reservationId: String(r._id),
  });

  return NextResponse.json({ ok: true });
}
