export const metadata = {
  title: "Privacy Policy | ION Boats",
  description: "Privacy policy for ION Boats (GDPR).",
};

export default function PrivacyPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(1200px 800px at 20% 10%, rgba(98,208,255,0.20), transparent 60%), radial-gradient(900px 600px at 80% 30%, rgba(209,183,110,0.18), transparent 55%), linear-gradient(180deg, #06121a 0%, #071b25 60%, #06121a 100%)",
        color: "rgba(255,255,255,0.92)",
      }}
    >
      <div
        style={{
          maxWidth: 980,
          margin: "0 auto",
          padding: "clamp(24px, 4vw, 64px) 16px",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(30px, 5vw, 46px)",
            margin: "0 0 10px 0",
          }}
        >
          Privacy Policy
        </h1>

        <p style={{ margin: 0, opacity: 0.82, lineHeight: 1.7 }}>
          This Privacy Policy explains how ION Boats (“we”, “us”) collects and uses personal data when you use our website and booking services.
        </p>

        <div style={{ marginTop: 18, display: "grid", gap: 14, lineHeight: 1.75, opacity: 0.84 }}>
          <section>
            <h2 style={{ margin: "0 0 6px 0", fontSize: 18 }}>What data we collect</h2>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              <li>Booking details (trip, date, time slot, shared/private selection).</li>
              <li>Contact details (name, phone, and optional email).</li>
              <li>Technical data (basic logs for security and performance).</li>
            </ul>
          </section>

          <section>
            <h2 style={{ margin: "0 0 6px 0", fontSize: 18 }}>Why we use your data</h2>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              <li>To process bookings and communicate booking status.</li>
              <li>To provide customer support (e.g. phone/email/WhatsApp).</li>
              <li>To prevent abuse/fraud and keep the service secure.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ margin: "0 0 6px 0", fontSize: 18 }}>Retention</h2>
            <p style={{ margin: 0 }}>
              We keep personal data only as long as necessary for bookings, support, and legal/tax obligations.
            </p>
          </section>

          <section>
            <h2 style={{ margin: "0 0 6px 0", fontSize: 18 }}>Your rights</h2>
            <p style={{ margin: 0 }}>
              You may request access, correction, or deletion of your data where applicable. Contact us at{" "}
              <a href="mailto:bookings@ion-boats.com" style={{ color: "rgba(98,208,255,0.95)" }}>
                bookings@ion-boats.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
