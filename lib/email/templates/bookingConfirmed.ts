import type { TripId } from "../../booking/catalog";

export function bookingConfirmedTemplate(opts: {
  brand: string;
  tripTitle: string;
  tripId: TripId;
  date: string;
  slotId: string;
  slotLabel?: string;
  bookingMode: "private" | "shared";
  priceEur: number;
  reservationId: string;
  quantity?: number;
  meetingPoint?: string;
  customerName?: string;
  supportEmail: string;
}) {
  const subject = `Booking request received — ${opts.tripTitle} (${opts.date})`;

  const html = `
  <!doctype html>
  <html>
    <body style="margin:0;padding:0;background:#f6f7fb;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f7fb;padding:24px 12px;">
        <tr>
          <td align="center">
            <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 6px 22px rgba(20, 20, 40, 0.08);">
              <tr>
                <td style="padding:22px;background:#0f3f57;">
                  <div style="font-family:Arial,sans-serif;color:#cfe9f5;font-size:13px;letter-spacing:0.6px;">
                    ${opts.brand}
                  </div>
                  <div style="font-family:Arial,sans-serif;color:#ffffff;font-size:22px;font-weight:700;margin-top:6px;">
                    Booking request received
                  </div>
                  <div style="font-family:Arial,sans-serif;color:#d9eef7;font-size:14px;margin-top:6px;line-height:1.4;">
                    Thanks${opts.customerName ? `, ${opts.customerName}` : ""}! Thank you for choosing us. We will reply back to you to confirm your booking request.
                  </div>
                </td>
              </tr>

              <tr>
                <td style="padding:22px;">
                  <div style="font-family:Arial,sans-serif;color:#111827;font-size:16px;font-weight:700;margin:0 0 10px;">
                    Booking details
                  </div>

                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eef0f4;border-radius:14px;">
                    <tr>
                      <td style="padding:14px;font-family:Arial,sans-serif;">
                        <div style="color:#6b7280;font-size:12px;">Trip</div>
                        <div style="color:#111827;font-size:18px;font-weight:700;margin-top:4px;">${opts.tripTitle}</div>
                        <div style="height:12px;"></div>

                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #eef0f4;">
                          <tr>
                            <td style="padding:10px 0;">
                              <div style="color:#6b7280;font-size:12px;">Date</div>
                              <div style="color:#111827;font-size:14px;font-weight:700;">${opts.date}</div>
                            </td>
                            <td style="padding:10px 0;">
                              <div style="color:#6b7280;font-size:12px;">Departure time</div>
<div style="color:#111827;font-size:14px;font-weight:700;">${opts.slotLabel ?? opts.slotId}</div>
                            </td>
                          </tr>
                          <tr>
  <td style="padding:10px 0;border-top:1px solid #eef0f4;">
    <div style="color:#6b7280;font-size:12px;">Booking type</div>
    <div style="color:#111827;font-size:14px;font-weight:700;">
      ${opts.bookingMode === "private" ? "Private boat" : "Shared trip"}
    </div>
  </td>
  <td style="padding:10px 0;border-top:1px solid #eef0f4;">
    <div style="color:#6b7280;font-size:12px;">Guests</div>
    <div style="color:#111827;font-size:14px;font-weight:700;">${opts.quantity ?? "-"}</div>
  </td>
</tr>
<tr>
  <td style="padding:10px 0;border-top:1px solid #eef0f4;">
    <div style="color:#6b7280;font-size:12px;">Meeting point</div>
    <div style="color:#111827;font-size:14px;font-weight:700;">${opts.meetingPoint ?? "To be confirmed"}</div>
  </td>
  <td style="padding:10px 0;border-top:1px solid #eef0f4;">
    <div style="color:#6b7280;font-size:12px;">Total</div>
    <div style="color:#111827;font-size:14px;font-weight:700;">€${opts.priceEur}</div>
  </td>
</tr>
<tr>
  <td colspan="2" style="padding:10px 0;border-top:1px solid #eef0f4;">
    <div style="color:#6b7280;font-size:12px;">Request ID</div>
    <div style="color:#111827;font-size:13px;font-weight:700;">${opts.reservationId}</div>
  </td>
</tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <div style="margin-top:16px;padding:14px;border-radius:14px;background:#f7fbff;border:1px solid #e6f2ff;">
                    <div style="font-family:Arial,sans-serif;color:#0f3f57;font-size:14px;font-weight:700;margin-bottom:6px;">
                      Need help?
                    </div>
                    <div style="font-family:Arial,sans-serif;color:#375264;font-size:13px;line-height:1.5;">
                      Reply to this email or contact us at
                      <a href="mailto:${opts.supportEmail}" style="color:#0f3f57;font-weight:700;text-decoration:none;">${opts.supportEmail}</a>.
                    </div>
                  </div>

                  <div style="font-family:Arial,sans-serif;color:#9aa3b2;font-size:12px;line-height:1.6;margin-top:18px;">
                    © ${new Date().getFullYear()} ${opts.brand}
                  </div>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;

 const text =
  `Booking request received.\n` +
  `Thank you for choosing us. We will reply back to you to confirm your booking request.\n` +
  `Trip: ${opts.tripTitle}\n` +
  `Date: ${opts.date}\n` +
  `Departure time: ${opts.slotLabel ?? opts.slotId}\n` +
  `Booking type: ${opts.bookingMode === "private" ? "Private boat" : "Shared trip"}\n` +
  `Guests: ${opts.quantity ?? "-"}\n` +
  `Meeting point: ${opts.meetingPoint ?? "To be confirmed"}\n` +
  `Total: €${opts.priceEur}\n` +
  `Request ID: ${opts.reservationId}\n` +
  `Support: ${opts.supportEmail}\n`;
  return { subject, html, text };
}
