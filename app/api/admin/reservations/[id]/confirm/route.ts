import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { dbConnect } from "../../../../../../lib/db/mongoose";
import { Reservation } from "../../../../../../models/Reservation";
import { TRIPS, buildSlotsForTrip } from "../../../../../../lib/booking/catalog";
import { sendBrevoEmail } from "../../../../../../lib/email/brevo";
import { getCookieName, verifySession } from "../../../../../../lib/admin/auth";

export async function POST(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const token = cookieStore.get(getCookieName())?.value;
  const session = verifySession(token);
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  await dbConnect();

  const { id } = await context.params;
  const r = await Reservation.findById(id);
  if (!r) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });

  r.status = "confirmed";
  await r.save();

  const email = (r.customer?.email || "").trim();
  if (!email) return NextResponse.json({ ok: true, skippedEmail: true });

  const trip = TRIPS.find((t) => t.id === r.tripId);
  const slot = buildSlotsForTrip(r.tripId).find((s) => s.id === r.slotId);
  const slotLabel = slot?.start && slot?.end ? `${slot.start}-${slot.end}` : slot?.label || r.slotId;
  const tripTitle = trip?.title || r.tripId;

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5">
      <h2>Your booking is confirmed</h2>
      <p>Thank you for choosing ION Boats. Your booking request has been confirmed.</p>
      <hr/>
      <p><strong>Reservation ID:</strong> ${String(r._id)}</p>
      <p><strong>Trip:</strong> ${tripTitle}</p>
      <p><strong>Date:</strong> ${r.date}</p>
      <p><strong>Departure:</strong> ${slotLabel}</p>
      <p><strong>Booking type:</strong> ${r.bookingMode}</p>
      <p><strong>Guests:</strong> ${r.quantity}</p>
      <p><strong>Total:</strong> EUR ${r.priceEur}</p>
      <p><strong>Meeting point:</strong> ${trip?.meetingPoint || "To be confirmed"}</p>
      <hr/>
      <p>If you have any questions, reply to this email.</p>
    </div>
  `;

  await sendBrevoEmail({
    toEmail: email,
    toName: r.customer?.name || undefined,
    subject: `Booking confirmed - ${tripTitle}`,
    html,
    text:
      `Your booking is confirmed.\n` +
      `Trip: ${tripTitle}\n` +
      `Date: ${r.date}\n` +
      `Departure: ${slotLabel}\n` +
      `Booking type: ${r.bookingMode}\n` +
      `Guests: ${r.quantity}\n` +
      `Total: EUR ${r.priceEur}\n` +
      `Meeting point: ${trip?.meetingPoint || "To be confirmed"}\n` +
      `Reservation ID: ${String(r._id)}\n`,
    reservationId: String(r._id),
  });

  return NextResponse.json({ ok: true, skippedEmail: false });
}
