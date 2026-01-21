import BookingWidget from "../components/booking/BookingWidget";

export default function HomePage() {
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
          maxWidth: 1100,
          margin: "0 auto",
          padding: "clamp(22px, 4vw, 64px) clamp(14px, 3vw, 20px)",

        }}
      >
        {/* HERO */}
        <div
        data-hero-grid
  className="heroGrid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr)",
            gap: 18,
            alignItems: "start",
          }}
        >
          {/* LEFT */}
          <div style={{ minWidth: 0 }}>
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
                maxWidth: "100%",
                flexWrap: "wrap",
              }}
            >
              <span style={{ color: "#d1b76e" }}>●</span>
              <span style={{ display: "inline" }}>Instant confirmation • Online payment • Pay on arrival</span>
            </div>

            <h1
              style={{
                fontSize: "clamp(30px, 5.2vw, 48px)",
                lineHeight: 1.05,
                margin: "0 0 14px 0",
                letterSpacing: -0.6,
                wordBreak: "break-word",
              }}
            >
              ION Boats — Boat Trips in Corfu
            </h1>

            <p
              style={{
                margin: 0,
                fontSize: "clamp(15px, 2.2vw, 18px)",
                lineHeight: 1.55,
                color: "rgba(255,255,255,0.78)",
                maxWidth: 640,
              }}
            >
              Explore Paleokastritsa, North-East Corfu and hidden coves with a fast, premium booking experience.
              Choose your trip, select a time slot, and confirm in seconds.
            </p>

            <div
              style={{
                marginTop: 18,
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <a
                href="#book"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 46,
                  padding: "12px 16px",
                  borderRadius: 14,
                  background: "rgba(98,208,255,0.20)",
                  border: "1px solid rgba(98,208,255,0.45)",
                  color: "rgba(255,255,255,0.92)",
                  textDecoration: "none",
                  fontWeight: 800,
                  width: "min(320px, 100%)",
                }}
              >
                Check availability
              </a>

              <a
                href="#trips"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 46,
                  padding: "12px 16px",
                  borderRadius: 14,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  color: "rgba(255,255,255,0.86)",
                  textDecoration: "none",
                  fontWeight: 800,
                  width: "min(320px, 100%)",
                }}
              >
                View trips
              </a>
            </div>

            <div
              style={{
                marginTop: 14,
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                color: "rgba(255,255,255,0.70)",
                fontSize: 13,
              }}
            >
              <span>✔ Fixed time slots</span>
              <span>✔ 2 boats available</span>
              <span>✔ Agent reservations</span>
              <span>✔ Weather-safe policies</span>
            </div>
          </div>

          {/* RIGHT (booking card) */}
          <div>
  <BookingWidget />
</div>

        </div>

        {/* Desktop+ only: switch hero to 2 columns */}
        <style>{`
          @media (min-width: 900px) {
  .heroGrid {
    grid-template-columns: 1.2fr 0.8fr !important;
    gap: 28px !important;
    align-items: start !important;
  }
}

            }
          }
        `}</style>

        {/* Apply the class via wrapper re-render trick (no refactor) */}
        <div style={{ display: "none" }} />

        {/* TRIPS */}
        <div id="trips" style={{ marginTop: "clamp(34px, 6vw, 54px)" }}>
          <h2 style={{ margin: 0, fontSize: "clamp(20px, 3vw, 26px)", letterSpacing: -0.3 }}>
            Popular trips
          </h2>

          <div
            style={{
              marginTop: 14,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 14,
            }}
          >
            {[
              { title: "Paleokastritsa", desc: "Caves, turquoise bays, iconic coastline." },
              { title: "North-East Corfu", desc: "Hidden coves, calm waters, scenic swim stops." },
              { title: "Custom Private Trip", desc: "Tell us what you want — we plan the route." },
            ].map((x) => (
              <div
                key={x.title}
                style={{
                  padding: 16,
                  borderRadius: 18,
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.06)",
                }}
              >
                <div style={{ fontWeight: 900, marginBottom: 8 }}>{x.title}</div>
                <div style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.45 }}>{x.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* BOOKING */}
        <div id="book" style={{ marginTop: "clamp(34px, 6vw, 54px)", paddingBottom: 40 }}>
          <h2 style={{ margin: 0, fontSize: "clamp(20px, 3vw, 26px)", letterSpacing: -0.3 }}>
            Booking
          </h2>
          <p style={{ marginTop: 10, color: "rgba(255,255,255,0.74)", maxWidth: 720, lineHeight: 1.55 }}>
            Next step: we’ll replace the demo box with the real booking widget (trip → date → slot → hold → checkout).
          </p>
        </div>
      </div>

      {/* One tiny safe global override: prevent accidental horizontal scroll */}
      <style>{`
        html, body { max-width: 100%; overflow-x: hidden; }
      `}</style>

      {/* IMPORTANT: apply heroGrid class without restructuring */}
      
    </main>
  );
}
