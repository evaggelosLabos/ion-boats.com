import BookingWidget from "../components/booking/BookingWidget";
import Link from "next/link";


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
          className="heroGrid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr)",
            gap: 18,
            alignItems: "start",
          }}
        >
          {/* LEFT COLUMN */}
          <div style={{ minWidth: 0 }}>
            {/* TOP PILL */}
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
              <span>Instant confirmation • Online payment • Pay on arrival</span>
            </div>

            {/* TITLE */}
            <h1
  style={{
    fontFamily: "var(--font-serif)",
    fontWeight: 600,
    letterSpacing: "-0.4px",
  }}
>
  ION Boats
</h1>


            {/* DESCRIPTION */}
           <p
  style={{
    fontFamily: "var(--font-sans)",
    fontSize: "clamp(16px, 2.1vw, 18px)",
    lineHeight: 1.7,
    letterSpacing: "0.1px",
    color: "rgba(255,255,255,0.78)",
    maxWidth: 680,
  }}
>
  Experience Corfu by boat with a focus on comfort, privacy, and thoughtful
  planning. Our trips are designed for guests who value a relaxed pace,
  well-chosen routes, and the feeling of having everything taken care of from
  the moment they arrive. Departing from Benitses Marina, each journey is
  planned with weather conditions, smooth sailing, and quality swim stops in
  mind, making it ideal for couples, families, and private groups alike. Fixed
  departure times, experienced skippers, and clear pricing ensure a predictable
  and stress-free experience, while flexible options allow you to choose
  between shared outings or fully private cruises. Check real-time availability,
  select your preferred time slot, and confirm your trip in minutes — with
  instant confirmation, local support, and a strong emphasis on safety,
  comfort, and peace of mind.
</p>


            {/* CTA BUTTONS */}
            <div
              style={{
                marginTop: 18,
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
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
                  color: "#fff",
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
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: 800,
                  width: "min(320px, 100%)",
                }}
              >
                View trips
              </a>
            </div>

            {/* CHECKMARKS */}
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

            {/* CHIPS */}
            <div
              style={{
                marginTop: 12,
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {[
                "Departures from Benitses Marina",
                "Skipper included",
                "Wind-safe route planning",
                "WhatsApp support",
                "Snorkeling masks available",
                "Bring sunscreen & water",
              ].map((t) => (
                <span
                  key={t}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 12px",
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.14)",
                    background: "rgba(0,0,0,0.18)",
                    color: "rgba(255,255,255,0.80)",
                    fontSize: 13,
                    fontWeight: 800,
                    lineHeight: 1,
                  }}
                >
                  <span style={{ color: "rgba(98,208,255,0.95)" }}>✓</span>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN — BOOKING */}
          <div>
            <BookingWidget />
          </div>
        </div>

        {/* DESKTOP GRID */}
        <style>{`
          @media (min-width: 900px) {
            .heroGrid {
              grid-template-columns: 1.2fr 0.8fr !important;
              gap: 28px !important;
            }
          }
        `}</style>

        {/* TRIPS */}
        <div id="trips" style={{ marginTop: "clamp(34px, 6vw, 54px)" }}>
          <h2 style={{ fontSize: "clamp(20px, 3vw, 26px)" }}>Popular trips</h2>

          <div
            style={{
              marginTop: 14,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 14,
            }}
          >
    {[
  { slug: "paleokastritsa", title: "Paleokastritsa", desc: "Caves, turquoise bays, iconic coastline." },
  { slug: "north-east-corfu", title: "North-East Corfu", desc: "Hidden coves, calm waters, scenic swim stops." },
  { slug: "custom-private", title: "Custom Private Trip", desc: "Tell us what you want — we plan the route." },
  { slug: "paxos-antipaxos", title: "Paxos & Antipaxos Day Cruise", desc: "Emerald waters, Antipaxos beaches and the famous Blue Caves — a full-day island escape." },
  { slug: "blue-lagoon", title: "Blue Lagoon & Mainland Beach Tour", desc: "Crystal-clear lagoon waters and secluded mainland beaches, ideal for relaxed swimming." },
].map((x) => (
  <Link key={x.slug} href={`/trips/${x.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
    <div
      style={{
        padding: 16,
        borderRadius: 18,
        border: "1px solid rgba(255,255,255,0.14)",
        background: "rgba(255,255,255,0.06)",
        cursor: "pointer",
      }}
    >
      <div style={{ fontWeight: 900, marginBottom: 8 }}>{x.title}</div>
      <div style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.45 }}>{x.desc}</div>
      <div style={{ marginTop: 12, fontWeight: 900, fontSize: 13, color: "rgba(98,208,255,0.95)" }}>
        View details →
      </div>
    </div>
  </Link>
))}

          </div>
        </div>
      </div>

      <style>{`
        html, body { max-width: 100%; overflow-x: hidden; }
      `}</style>
    </main>
  );
}
