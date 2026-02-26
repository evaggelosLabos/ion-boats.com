export const metadata = {
  title: "Contact — ION Boats",
  description: "Contact ION Boats for boat trips in Corfu. Phone, WhatsApp and email support.",
};

export default function ContactPage() {
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
          padding: "clamp(22px, 4vw, 64px) clamp(14px, 3vw, 20px)",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 12px",
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: 999,
            background: "rgba(255,255,255,0.06)",
            marginBottom: 16,
            fontSize: 13,
            color: "rgba(255,255,255,0.78)",
            flexWrap: "wrap",
          }}
        >
          <span style={{ color: "#d1b76e" }}>●</span>
          <span>Fast reply • WhatsApp friendly • Easy booking support</span>
        </div>

        <h1
          style={{
            fontSize: "clamp(30px, 5.2vw, 46px)",
            lineHeight: 1.05,
            margin: "0 0 14px 0",
            letterSpacing: -0.6,
          }}
        >
          Contact ion-boats
        </h1>

        <p
          style={{
            margin: 0,
            fontSize: "clamp(15px, 2.2vw, 18px)",
            lineHeight: 1.55,
            color: "rgba(255,255,255,0.78)",
            maxWidth: 760,
          }}
        >
          Need help with a booking, want a custom private trip, or have a question about schedules?
          Send us a message and we’ll get back to you as soon as possible.
        </p>

        <div
          style={{
            marginTop: 22,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 14,
          }}
        >
          {/* Email */}
          <div
            style={{
              padding: 16,
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.06)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.22)",
            }}
          >
            <div style={{ fontWeight: 950, fontSize: 14 }}>Email</div>
            <div style={{ marginTop: 8, opacity: 0.8, lineHeight: 1.5, fontSize: 13 }}>
              Best for confirmations, invoices and detailed requests.
            </div>

            <a
              href="mailto:bookings@ion-boats.com"
              style={{
                marginTop: 12,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 44,
                padding: "10px 14px",
                borderRadius: 14,
                background: "rgba(98,208,255,0.20)",
                border: "1px solid rgba(98,208,255,0.45)",
                color: "rgba(255,255,255,0.92)",
                textDecoration: "none",
                fontWeight: 950,
                width: "100%",
              }}
            >
              bookings@ion-boats.com
            </a>
          </div>

          {/* Phone */}
          <div
            style={{
              padding: 16,
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.06)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.22)",
            }}
          >
            <div style={{ fontWeight: 950, fontSize: 14 }}>Phone / WhatsApp</div>
            <div style={{ marginTop: 8, opacity: 0.8, lineHeight: 1.5, fontSize: 13 }}>
              Quick questions, directions, same-day info.
            </div>

            <a
              href="tel:+306900000000"
              style={{
                marginTop: 12,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 44,
                padding: "10px 14px",
                borderRadius: 14,
                background: "rgba(209,183,110,0.16)",
                border: "1px solid rgba(209,183,110,0.40)",
                color: "rgba(255,255,255,0.92)",
                textDecoration: "none",
                fontWeight: 950,
                width: "100%",
              }}
            >
              +30 69 0000 0000
            </a>

            <div style={{ marginTop: 10, fontSize: 12, opacity: 0.75 }}>
              Replace the phone number with your real one.
            </div>
          </div>

          {/* Location / Meeting point */}
          <div
            style={{
              padding: 16,
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.06)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.22)",
            }}
          >
            <div style={{ fontWeight: 950, fontSize: 14 }}>Meeting point</div>
            <div style={{ marginTop: 8, opacity: 0.8, lineHeight: 1.5, fontSize: 13 }}>
              We’ll send the exact meeting location in your booking email. If you need help, message us.
            </div>

            <div
              style={{
                marginTop: 12,
                padding: 12,
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(0,0,0,0.25)",
                fontSize: 13,
                opacity: 0.85,
                lineHeight: 1.55,
              }}
            >
              Corfu, Greece
              <br />
              (Exact spot depends on trip & date)
            </div>
          </div>
        </div>

        {/* Small FAQ */}
        <div style={{ marginTop: 28 }}>
          <h2 style={{ margin: "0 0 10px 0", fontSize: "clamp(18px, 2.6vw, 22px)" }}>Quick help</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 14,
            }}
          >
            {[
              {
                q: "I didn’t receive the confirmation email",
                a: "Check Spam/Promotions. If still missing, message us with your name and date — we’ll resend it.",
              },
              {
                q: "Can I change my time slot?",
                a: "If availability allows, yes. Contact us ASAP and we’ll help you move it.",
              },
              {
                q: "Bad weather policy?",
                a: "Safety first. If conditions aren’t safe, we’ll reschedule or refund based on the situation.",
              },
            ].map((x) => (
              <div
                key={x.q}
                style={{
                  padding: 16,
                  borderRadius: 18,
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.06)",
                }}
              >
                <div style={{ fontWeight: 950, marginBottom: 8 }}>{x.q}</div>
                <div style={{ color: "rgba(255,255,255,0.74)", lineHeight: 1.55 }}>{x.a}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 26, opacity: 0.75, fontSize: 12 }}>
          Tip: if you want a contact form (with MongoDB + spam protection), tell me and I’ll add the API route + UI.
        </div>
      </div>

      <style>{`html, body { max-width: 100%; overflow-x: hidden; }`}</style>
    </main>
  );
}
