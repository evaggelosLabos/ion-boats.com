
import Link from "next/link";
import BookingWidget from "../components/booking/BookingWidget";

export default function HomePage() {
  return (
    <>
      {/* HERO IMAGE – clean, no dark bg */}
      <section
  className="heroImage"
  style={{
    position: "relative",
    width: "100%",
    overflow: "hidden",
  }}
>


        <img
          src="/ocean.jpg"
          alt="ION Boats calm sea"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        {/* HERO OVERLAY TEXT */}
<div
  style={{
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "flex-start",
paddingTop: "21vh",

    justifyContent: "center",
    pointerEvents: "none",
  }}
>
  <h2
    style={{
      fontFamily: "var(--font-serif)",
      fontWeight: 500,
      fontSize: "clamp(26px, 4.5vw, 56px)",
      letterSpacing: "-0.4px",
      color: "#ffffff",
      textAlign: "center",
      textShadow: "0 6px 30px rgba(0,0,0,0.35)",
      padding: "0 16px",
      maxWidth: 900,
    }}
  >
    Rent a boat for your next adventure
  </h2>
</div>


        {/* soft luxury fade into content */}
        
      </section>

      {/* TRUST STRIP */}
{/* TRUST STRIP – hero-safe */}
<section
  style={{
    width: "100%",
    background: "rgba(255,255,255,0.78)",
    backdropFilter: "blur(10px)",
    borderTop: "1px solid rgba(0,0,0,0.08)",
    borderBottom: "1px solid rgba(0,0,0,0.08)",
  }}
>
  <div
    style={{
      maxWidth: 1100,
      margin: "0 auto",
      padding: "14px clamp(14px, 3vw, 20px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      flexWrap: "wrap",
    }}
  >
    {/* LEFT */}
    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
      {/* Rating */}
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 12px",
          borderRadius: 999,
          border: "1px solid rgba(0,0,0,0.12)",
          background: "rgba(255,255,255,0.9)",
          color: "#0b1d26",
          fontWeight: 800,
          fontSize: 13,
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ color: "#f5b301" }}>★</span> 4.9 rating
      </span>

      {/* Guests */}
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 12px",
          borderRadius: 999,
          border: "1px solid rgba(0,0,0,0.12)",
          background: "rgba(255,255,255,0.9)",
          color: "#0b1d26",
          fontWeight: 800,
          fontSize: 13,
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ color: "#0ea5e9" }}>●</span> 1200+ guests
      </span>

      {/* Licensed */}
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 12px",
          borderRadius: 999,
          border: "1px solid rgba(0,0,0,0.12)",
          background: "rgba(255,255,255,0.9)",
          color: "#0b1d26",
          fontWeight: 800,
          fontSize: 13,
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ color: "#16a34a" }}>✓</span> Licensed & insured
      </span>
    </div>

    {/* RIGHT CTA */}
    <a
      href="#book"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 42,
        padding: "10px 14px",
        borderRadius: 999,
        background: "#0b1d26",
        color: "#fff",
        textDecoration: "none",
        fontWeight: 800,
        fontSize: 13,
        whiteSpace: "nowrap",
      }}
    >
      Check availability →
    </a>
  </div>
</section>



      {/* DARK CONTENT STARTS HERE */}
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

            

          {/* TRIPS */}
<div id="trips" style={{ marginTop: "clamp(34px, 6vw, 54px)" }}>
  <div
    style={{
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: 14,
      flexWrap: "wrap",
    }}
  >
    <div>
      <h2
        style={{
          fontSize: "clamp(20px, 3vw, 28px)",
          margin: 0,
          fontFamily: "var(--font-serif)",
          letterSpacing: "-0.3px",
        }}
      >
        Popular trips
      </h2>
      <div
        style={{
          marginTop: 6,
          color: "rgba(255,255,255,0.70)",
          fontSize: 14,
          lineHeight: 1.5,
          maxWidth: 720,
        }}
      >
        Calm routes, thoughtful swim stops, and clear planning — designed for couples, families, and private groups.
      </div>
    </div>

    <a
      href="#book"
      style={{
        textDecoration: "none",
        color: "rgba(255,255,255,0.92)",
        fontWeight: 900,
        fontSize: 13,
        padding: "10px 12px",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.14)",
        background: "rgba(255,255,255,0.06)",
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ color: "rgba(98,208,255,0.95)" }}>●</span>
      Check availability
    </a>
  </div>

  <div
    style={{
      marginTop: 16,
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: 14,
    }}
  >
    {[
      {
        slug: "paleokastritsa",
        title: "Paleokastritsa",
        desc: "Caves, turquoise bays, iconic coastline.",
        tag: "Most popular",
        meta: ["Half-day", "Shared or Private", "Benitses"],
      },
      {
        slug: "north-east-corfu",
        title: "North-East Corfu",
        desc: "Hidden coves, calm waters, scenic swim stops.",
        tag: "Calm waters",
        meta: ["Half-day", "Family-friendly", "Benitses"],
      },
      {
        slug: "custom-private",
        title: "Custom Private Trip",
        desc: "Tell us what you want — we plan the route.",
        tag: "Private",
        meta: ["Flexible", "Your pace", "Benitses"],
      },
      {
        slug: "paxos-antipaxos",
        title: "Paxos & Antipaxos Day Cruise",
        desc: "Emerald waters, Antipaxos beaches and Blue Caves — a full-day island escape.",
        tag: "Full day",
        meta: ["Day cruise", "Iconic spots", "Early start"],
      },
      {
        slug: "blue-lagoon",
        title: "Blue Lagoon & Mainland Beach Tour",
        desc: "Crystal-clear lagoon waters and secluded mainland beaches, ideal for relaxed swimming.",
        tag: "Swim stops",
        meta: ["Half/Full", "Relaxed", "Weather-aware"],
      },
    ].map((x) => (
      <Link key={x.slug} href={`/trips/${x.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
        <div
          style={{
            height: "100%",
            padding: 18,
            borderRadius: 22,
            border: "1px solid rgba(255,255,255,0.14)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.20) 100%)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            transition: "transform 180ms ease, border-color 180ms ease, background 180ms ease",
          }}
          className="tripCard"
        >
          {/* subtle highlight */}
          <div
            style={{
              position: "absolute",
              inset: -2,
              background:
                "radial-gradient(600px 220px at 20% 0%, rgba(98,208,255,0.16), transparent 55%), radial-gradient(520px 220px at 80% 10%, rgba(209,183,110,0.12), transparent 55%)",
              pointerEvents: "none",
            }}
          />

          {/* tag */}
          <div
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 12px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(0,0,0,0.18)",
              color: "rgba(255,255,255,0.86)",
              fontSize: 12,
              fontWeight: 900,
              marginBottom: 12,
            }}
          >
            <span style={{ color: "rgba(98,208,255,0.95)" }}>✓</span>
            {x.tag}
          </div>

          {/* title */}
          <div
            style={{
              position: "relative",
              fontFamily: "var(--font-serif)",
              fontWeight: 650,
              letterSpacing: "-0.25px",
              fontSize: 18,
              lineHeight: 1.2,
              marginBottom: 8,
            }}
          >
            {x.title}
          </div>

          {/* desc */}
          <div
            style={{
              position: "relative",
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.55,
              fontSize: 14,
              marginBottom: 14,
            }}
          >
            {x.desc}
          </div>

          {/* meta row */}
          <div
            style={{
              position: "relative",
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 14,
            }}
          >
            {x.meta.map((m) => (
              <span
                key={m}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "7px 10px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.05)",
                  color: "rgba(255,255,255,0.78)",
                  fontSize: 12,
                  fontWeight: 800,
                  lineHeight: 1,
                }}
              >
                {m}
              </span>
            ))}
          </div>

          {/* bottom CTA */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              marginTop: "auto",
            }}
          >
            <div style={{ color: "rgba(255,255,255,0.62)", fontSize: 12, fontWeight: 800 }}>
              View route & details
            </div>

            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 999,
                border: "1px solid rgba(98,208,255,0.45)",
                background: "rgba(98,208,255,0.14)",
                color: "rgba(255,255,255,0.95)",
                fontWeight: 900,
                fontSize: 13,
                whiteSpace: "nowrap",
              }}
            >
              Explore <span style={{ opacity: 0.9 }}>→</span>
            </span>
          </div>
        </div>
      </Link>
    ))}
  </div>
</div>

<style>{`
  .tripCard:hover{
    transform: translateY(-2px);
    border-color: rgba(98,208,255,0.32);
    background: linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0.22) 100%);
  }
`}</style>
{/* HOW IT WORKS */}
<section
  style={{
    marginTop: "clamp(44px, 8vw, 72px)",
    padding: "clamp(28px, 6vw, 44px) 0",
    borderTop: "1px solid rgba(255,255,255,0.10)",
    borderBottom: "1px solid rgba(255,255,255,0.10)",
  }}
>
  <div
    style={{
      maxWidth: 1100,
      margin: "0 auto",
      padding: "0 clamp(14px, 3vw, 20px)",
    }}
  >
    {/* Header */}
    <div style={{ maxWidth: 720, marginBottom: 26 }}>
      <h2
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(22px, 3.2vw, 30px)",
          margin: "0 0 10px 0",
          letterSpacing: "-0.3px",
        }}
      >
        How it works
      </h2>
      <p
        style={{
          margin: 0,
          fontSize: 15,
          lineHeight: 1.7,
          color: "rgba(255,255,255,0.72)",
        }}
      >
        A simple, predictable process — designed to keep things relaxed and stress-free from the first click to the final swim stop.
      </p>
    </div>

    {/* Steps */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 16,
      }}
    >
      {[
        {
          n: "01",
          title: "Choose your trip",
          text: "Browse our curated routes or select a private option tailored to your pace and preferences.",
        },
        {
          n: "02",
          title: "Pick date & guests",
          text: "Check real-time availability, select your time slot, and confirm in minutes with clear pricing.",
        },
        {
          n: "03",
          title: "Enjoy the sea",
          text: "Arrive at Benitses Marina, meet your skipper, and relax — everything is prepared in advance.",
        },
      ].map((s) => (
        <div
          key={s.n}
          style={{
            padding: 20,
            borderRadius: 22,
            border: "1px solid rgba(255,255,255,0.14)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.18) 100%)",
            position: "relative",
            boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
          }}
        >
          {/* Step number */}
          <div
            style={{
              fontSize: 12,
              fontWeight: 900,
              letterSpacing: "1.6px",
              color: "rgba(98,208,255,0.95)",
              marginBottom: 10,
            }}
          >
            {s.n}
          </div>

          {/* Title */}
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: "-0.2px",
              marginBottom: 8,
            }}
          >
            {s.title}
          </div>

          {/* Text */}
          <div
            style={{
              fontSize: 14,
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.72)",
            }}
          >
            {s.text}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

  {/* TITLE */}
              <h1
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 600,
                  letterSpacing: "-0.4px",
                  margin: "0 0 14px 0",
                  fontSize: "clamp(30px, 5.2vw, 48px)",
                  lineHeight: 1.05,
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
                  
                  margin: 0,
                }}
              >
                Experience Corfu by boat with a focus on comfort, privacy, and thoughtful planning. Our trips are designed for
                guests who value a relaxed pace, well-chosen routes, and the feeling of having everything taken care of from
                the moment they arrive. Departing from Benitses Marina, each journey is planned with weather conditions, smooth
                sailing, and quality swim stops in mind, making it ideal for couples, families, and private groups alike.
                Fixed departure times, experienced skippers, and clear pricing ensure a predictable and stress-free experience,
                while flexible options allow you to choose between shared outings or fully private cruises. Check real-time
                availability, select your preferred time slot, and confirm your trip in minutes — with instant confirmation,
                local support, and a strong emphasis on safety, comfort, and peace of mind.
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
            {/* QUICK BOOKING (full-width section) */}
<section
  style={{
    width: "100%",
    marginTop: "clamp(18px, 3vw, 26px)",
    padding: "clamp(18px, 3vw, 26px) 0",
    background:
      "radial-gradient(1200px 600px at 50% 0%, rgba(98,208,255,0.12), transparent 60%)",
  }}
>
  <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(14px, 3vw, 20px)" }}>
    <div
  style={{
    width: "100%",
    maxWidth: "none",        // IMPORTANT
    margin: "0 auto",
    padding: "clamp(12px, 2vw, 16px)",
    borderRadius: 26,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(255,255,255,0.06)",
    boxShadow: "0 16px 50px rgba(0,0,0,0.35)",
  }}
>
  <div style={{ width: "100%" }}>
    <BookingWidget />
  </div>
</div>

  </div>
</section>

</div>

          {/* DESKTOP GRID */}
          


          {/* BOOKING ANCHOR */}
          <div id="book" style={{ marginTop: "clamp(34px, 6vw, 54px)", paddingBottom: 40 }} />
        </div>

        <style>{`

        .heroImage{
  height: clamp(260px, 42vh, 520px); /* mobile + default */
}

@media (min-width: 900px){
  .heroImage{
    height: min(88vh, 980px); /* desktop taller */
  }
}


          html, body { max-width: 100%; overflow-x: hidden; }
        `}</style>
      </main>
    </>
  );
}
