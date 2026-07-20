export const metadata = {
  title: "Terms & Conditions | ION Boats",
  description: "Booking terms, cancellations, no-show policy and important conditions.",
};

export default function TermsPage() {
  return (
   <main
  style={{
    minHeight: "100vh",
    background:
      "radial-gradient(1200px 800px at 20% 10%, rgba(98,208,255,0.20), transparent 60%), radial-gradient(900px 600px at 80% 30%, rgba(209,183,110,0.18), transparent 55%), linear-gradient(180deg, #06121a 0%, #071b25 60%, #06121a 100%)",
    color: "rgba(255,255,255,0.92)",
  }}
>
  <div style={{ maxWidth: 980, margin: "0 auto", padding: "clamp(24px, 4vw, 64px) 16px" }}>

      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(30px, 5vw, 46px)", margin: "0 0 10px 0" }}>
        Terms & Conditions
      </h1>
      <p style={{ margin: 0, opacity: 0.8, lineHeight: 1.7 }}>
        These Terms apply to all bookings made through our website. By booking, you agree to these Terms.
      </p>

      <div style={{ marginTop: 18, display: "grid", gap: 14, lineHeight: 1.75, opacity: 0.82 }}>
        <section>
          <h2 style={{ margin: "0 0 6px 0", fontSize: 18 }}>Bookings</h2>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li>Booking requests are not confirmed automatically. We will reply to confirm availability and details.</li>
            <li>Shared booking requests are per person unless stated otherwise on the booking form.</li>
            <li>Private booking requests are for the full boat, subject to final confirmation from our team.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ margin: "0 0 6px 0", fontSize: 18 }}>Meeting point & timing</h2>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li>Meeting point: typically Benitses Marina (unless your trip page says otherwise).</li>
            <li>Please arrive 10–15 minutes early.</li>
            <li>Late arrival may be treated as a no-show depending on schedule constraints.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ margin: "0 0 6px 0", fontSize: 18 }}>Weather & safety</h2>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li>Routes and stops may change due to sea conditions for safety.</li>
            <li>If conditions are unsafe, we may reschedule or cancel.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ margin: "0 0 6px 0", fontSize: 18 }}>Cancellations & refunds</h2>
          <p style={{ margin: 0 }}>
            Add your final policy here (this part depends on your real business rules). Example:
          </p>
          <ul style={{ margin: "8px 0 0 0", paddingLeft: 18 }}>
            <li>Free cancellation up to 24 hours before departure.</li>
            <li>Less than 24 hours: partial or no refund.</li>
            <li>No-show: no refund.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ margin: "0 0 6px 0", fontSize: 18 }}>Liability</h2>
          <p style={{ margin: 0 }}>
            Guests participate at their own risk. We are not responsible for lost items or issues outside our reasonable control.
          </p>
        </section>

        <section>
          <h2 style={{ margin: "0 0 6px 0", fontSize: 18 }}>Contact</h2>
          <p style={{ margin: 0 }}>
            For questions: <b>bookings@ion-boats.com</b>
          </p>
        </section>
      </div>
      </div>
    </main>
  );
}
