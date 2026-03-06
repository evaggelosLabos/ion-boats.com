
import Link from "next/link";
import BookingWidget from "../components/booking/BookingWidget";
import CorfuMapSection from "../components/CorfuMapSection";
import CorfuJewelSection from "../components/CorfuJewelSection";
import Boatsspecifics from "../components/Boatspecifics"
import Homeannouncement1 from "../components/Homeannouncement1";
import HomeAnnouncement from "../components/HomeAnnouncement"

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

{/* HERO BACKGROUND LAYERS */}
{/* HERO VIDEO BACKGROUND */}
<video
  autoPlay
  muted
  loop
  playsInline
  preload="metadata"
  style={{
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    pointerEvents: "none",
  }}
>
  <source src="/videos/0250-0674.mp4" type="video/mp4" />
</video>

{/* subtle dark overlay for readability */}
<div
  style={{
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.35) 100%)",
  }}
/>




        {/* HERO OVERLAY TEXT */}
<div
  className="heroText"
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

      <CorfuJewelSection />
      <HomeAnnouncement />

      <Homeannouncement1 />


      

      


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
<div
  id="trips"
  style={{
    marginTop: "clamp(34px, 6vw, 54px)",
    scrollMarginTop: 190, // same offset as booking
  }}
>

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
  id="tripsGrid"
  style={{
    marginTop: 16,
    display: "grid",
    gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
    gap: 14,
  }}
>
  {[
    {
      slug: "paxos-antipaxos",
      title: "Paxos & Antipaxos Day Cruise",
      image: "/trips/paxosmainimage.jpeg",
    },
    {
      slug: "blue-lagoon",
      title: "Sivota & Blue Lagoon Beach Cruise",
      image: "/trips/Sivota.jpeg",
    },
    {
      slug: "north-east-corfu",
      title: "North-East Corfu",
      image: "/trips/northeast.jpeg",
    },
    {
      slug: "sunset",
      title: "Halfday Sunset Cruise",
      image: "/trips/sunsetheader.jpg",
    },
    {
      slug: "custom-private",
      title: "Halfday Beach Cruise",
      image: "/trips/halfdayheader.jpg",
    },
  ].map((x) => (
    <Link key={x.slug} href={`/trips/${x.slug}`} style={{ textDecoration: "none" }}>
      <div
        className="tripSimple"
        style={{
          height: "100%",
          padding: 16,
          borderRadius: 22,
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(255,255,255,0.06)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.22)",
          cursor: "pointer",
          overflow: "hidden",
          transition: "transform 180ms ease, border-color 180ms ease, background 180ms ease",
        }}
      >
        {/* IMAGE */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9",
            borderRadius: 16,
            overflow: "hidden",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.10)",
          }}
        >
          <img
            src={x.image}
            alt={x.title}
            loading="lazy"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transform: "scale(1.01)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.00) 55%, rgba(0,0,0,0.25) 100%)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* TITLE */}
        <div
          style={{
            marginTop: 12,
            fontFamily: "var(--font-serif)",
            fontWeight: 650,
            letterSpacing: "-0.25px",
            fontSize: 18,
            lineHeight: 1.2,
            color: "rgba(255,255,255,0.92)",
          }}
        >
          {x.title}
        </div>
      </div>
    </Link>
  ))}
</div>

<style>{`
  .tripSimple:hover{
    transform: translateY(-2px);
    border-color: rgba(98,208,255,0.32);
    background: rgba(255,255,255,0.08);
  }

  /* ✅ Mobile friendly grid */
  @media (max-width: 1100px){
    #tripsGrid{ grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
  }
  @media (max-width: 820px){
    #tripsGrid{ grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
  }
  @media (max-width: 520px){
    #tripsGrid{ grid-template-columns: 1fr !important; }
  }
`}</style>


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

{/* OUR BOATS (small reassurance block) */}
<section
  style={{
    marginTop: "clamp(34px, 6vw, 54px)",
    padding: "clamp(22px, 4vw, 34px) 0",
    borderTop: "1px solid rgba(255,255,255,0.10)",
    borderBottom: "1px solid rgba(255,255,255,0.10)",
  }}
>
  <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(14px, 3vw, 20px)" }}>
    <div
      style={{
        padding: "clamp(16px, 3vw, 22px)",
        borderRadius: 24,
        border: "1px solid rgba(255,255,255,0.14)",
        background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.18) 100%)",
        boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
        display: "grid",
        gap: 10,
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "8px 12px",
          borderRadius: 999,
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(0,0,0,0.18)",
          width: "fit-content",
          fontWeight: 950,
          fontSize: 12,
          letterSpacing: 0.3,
          color: "rgba(255,255,255,0.88)",
        }}
      >
        <span style={{ color: "rgba(98,208,255,0.95)" }}>✓</span>
        Our boats
      </div>

      {/* IMAGE FRAME */}
<div
  style={{
    marginTop: 16,
    padding: "14px",                 // ✅ frame thickness
    borderRadius: 28,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
  }}
>
  <div
    style={{
      borderRadius: 20,
      overflow: "hidden",
      width: "100%",
      aspectRatio: "16 / 9",
      background: "#000",
      boxShadow: "0 14px 40px rgba(0,0,0,0.35)",
    }}
  >
    <img
      src="/boat.webp"
      alt="ION Boats – comfortable day boat in Corfu"
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        objectFit: "cover",
      }}
    />
  </div>
</div>



      <div
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(18px, 2.6vw, 24px)",
          fontWeight: 650,
          letterSpacing: "-0.2px",
          marginTop: 2,
        }}
      >
        Two identical boats. One consistent experience.
      </div>

      <div style={{ fontSize: 14, lineHeight: 1.75, color: "rgba(255,255,255,0.76)", maxWidth: 900 }}>
        All trips are operated with <b>two identical, modern 7.5-meter boats</b>, ensuring consistent comfort, smooth handling,
        and reliable departures.
      </div>

      <div style={{ fontSize: 14, lineHeight: 1.75, color: "rgba(255,255,255,0.76)", maxWidth: 900 }}>
        Designed for relaxed cruising, safe swimming stops, and a calm experience for couples, families, and private groups.
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 6 }}>
        {[
          "✓ Reliable departures",
          "✓ Comfortable cruising",
          "✓ Calm experience",
          "✓ Ideal for couples & families",
        ].map((t) => (
          <span
            key={t}
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "8px 12px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.82)",
              fontSize: 13,
              fontWeight: 800,
              lineHeight: 1,
            }}
          >
            {t}
          </span>
        ))}
      </div>
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
                ion-boats
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
  "Departures from Gouvia Marina",
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

            <Boatsspecifics />
            

            {/* RIGHT COLUMN — BOOKING */}
            {/* QUICK BOOKING (full-width section) */}
<section
id="book"

  style={{
     
    width: "100%",
    scrollMarginTop: 190,
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
          
        </div>

        <style>{`

        .oceanMotion{
  animation: oceanWave 10s ease-in-out infinite;
  will-change: transform, background-position;
}

@keyframes oceanWave{
  0%{
    transform: scale(1.08) translateY(0px) translateX(0px);
    background-position: 50% 50%;
  }
  50%{
    transform: scale(1.12) translateY(-18px) translateX(10px);
    background-position: 55% 45%;
  }
  100%{
    transform: scale(1.08) translateY(0px) translateX(0px);
    background-position: 50% 50%;
  }
}
  /* Base */
.heroBg--next{
  transform: scale(1.06);
  filter: saturate(1.05) contrast(1.02);
}

/* Top ocean layer: calm → then “destroy” → reveal next image → reset */
.heroBg--ocean{
  animation: heroDestroyReveal 6s ease-in-out infinite;
}

/* The effect timeline:
   0–45%   calm ocean (subtle motion)
   45–70%  destruction (tearing / shattering feel)
   70–90%  second image visible
   90–100% reset back to full ocean
*/
@keyframes heroDestroyReveal{
  /* Calm ocean */
  0%{
    opacity: 1;
    filter: blur(0px) saturate(1.0) contrast(1.0);
    transform: scale(1.08) translateY(0px) translateX(0px);
    background-position: 50% 50%;
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  }
  25%{
    transform: scale(1.10) translateY(-10px) translateX(6px);
    background-position: 54% 46%;
  }
  45%{
    transform: scale(1.12) translateY(-18px) translateX(10px);
    background-position: 55% 45%;
  }

  /* Destruction starts (looks like it breaks away into jagged chunks) */
  55%{
    opacity: 0.95;
    filter: blur(1.2px) saturate(1.15) contrast(1.08);
    transform: scale(1.14) rotate(-0.4deg);
    clip-path: polygon(
      0% 0%,
      100% 0%,
      100% 55%,
      92% 52%,
      84% 62%,
      70% 56%,
      58% 66%,
      44% 58%,
      30% 68%,
      18% 60%,
      0% 72%
    );
  }
  62%{
    opacity: 0.72;
    filter: blur(2.2px) saturate(1.2) contrast(1.1);
    transform: scale(1.16) translateX(12px) rotate(0.6deg);
    clip-path: polygon(
      0% 0%,
      100% 0%,
      100% 34%,
      86% 46%,
      72% 30%,
      60% 48%,
      46% 30%,
      34% 52%,
      20% 34%,
      0% 48%
    );
  }
  70%{
    opacity: 0.15;
    filter: blur(4px) saturate(1.3) contrast(1.12);
    transform: scale(1.18) translateY(-8px) translateX(20px) rotate(1.2deg);
    clip-path: polygon(
      0% 0%,
      100% 0%,
      100% 20%,
      0% 35%
    );
  }

  /* Reveal time (second image is now fully visible) */
  78%{
    opacity: 0.0;
    filter: blur(6px);
    transform: scale(1.18) translateX(26px);
    clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);
  }
  88%{
    opacity: 0.0;
    clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);
  }

  /* Reset back to full ocean quickly (no one notices) */
  100%{
    opacity: 1;
    filter: blur(0px) saturate(1.0) contrast(1.0);
    transform: scale(1.08) translateY(0px) translateX(0px);
    background-position: 50% 50%;
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  }
}

.heroText{
  animation: heroTextFade 6s ease-in-out infinite;
  will-change: opacity, transform, filter;
}

@keyframes heroTextFade{
  /* Visible during calm ocean */
  0%{
    opacity: 1;
    transform: translateY(0px);
    filter: blur(0px);
  }
  35%{
    opacity: 1;
    transform: translateY(0px);
    filter: blur(0px);
  }

  /* Fade out as destruction begins */
  48%{
    opacity: 0.85;
    transform: translateY(-6px);
    filter: blur(0.6px);
  }
  58%{
    opacity: 0.25;
    transform: translateY(-14px);
    filter: blur(1.4px);
  }

  /* Fully hidden while second image is visible */
  64%{
    opacity: 0;
    transform: translateY(-18px);
    filter: blur(2px);
  }
  82%{
    opacity: 0;
  }

  /* Return smoothly before loop resets */
  100%{
    opacity: 1;
    transform: translateY(0px);
    filter: blur(0px);
  }
}

@media (max-width: 900px){
  .heroBg--next{
    /* keep full image visible */
    background-size: contain !important;
    background-position: center !important;
    background-repeat: no-repeat !important;

    /* premium stripes fill + image on top */
    background-image:
      url(/firstimage.webp),
      radial-gradient(1200px 800px at 20% 10%, rgba(98,208,255,0.20), transparent 60%),
      radial-gradient(900px 600px at 80% 30%, rgba(209,183,110,0.18), transparent 55%),
      linear-gradient(180deg, #06121a 0%, #071b25 60%, #06121a 100%) !important;

    /* per-layer sizing & positioning */
    background-size:
      contain,
      cover,
      cover,
      cover !important;

    background-position:
      center,
      center,
      center,
      center !important;

    background-repeat:
      no-repeat,
      no-repeat,
      no-repeat,
      no-repeat !important;
  }
}










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
