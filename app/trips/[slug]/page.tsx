import { notFound } from "next/navigation";
import BookingWidget from "../../../components/booking/BookingWidget";
import { TRIP_PAGES } from "../../../lib/trips/trips";
import Paxos from "../../../components/Paxos";
import Paxos1 from "../../../components/Paxos1"


export default async function TripPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const trip = TRIP_PAGES.find((t) => t.slug === slug);
  if (!trip) return notFound();
   const DEFAULT_TRIP_IMAGES = [
  "/trips/default1.jpeg",
  "/trips/default2.jpeg",
];

const TripExtraComponent =
  slug === "paxos-antipaxos" ? (
    <>
      <Paxos />
      <Paxos1 />
    </>
  ) : null;



  const images = trip.images?.length
  ? trip.images
  : DEFAULT_TRIP_IMAGES;

 



 const heroImg =
  slug === "paxos-antipaxos"
    ? "/trips/paxosmainimage.jpeg" // ✅ put your new first image here
    : images[0];


  return (
  <main style={{ width: "100%", background: "#ffffff", color: "#0b1d26" }}>


      {/* HERO */}
      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: "clamp(420px, 60vh, 720px)",
          overflow: "hidden",
        }}
      >
        <img
          src={heroImg}
          alt={trip.title}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            transform: "translateZ(0)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
  "linear-gradient(180deg, rgba(0,0,0,0.40) 0%, rgba(0,0,0,0.22) 55%, rgba(0,0,0,0.00) 100%)",

          }}
        />

        <div
          style={{
            position: "relative",
            maxWidth: 1100,
            margin: "0 auto",
            padding: "clamp(18px, 4vw, 32px) 16px",
            height: "100%",
            display: "grid",
            alignItems: "end",
            color: "#ffffff",

          }}
        >
          <div style={{ paddingBottom: "clamp(18px, 3.2vw, 34px)" }}>
            <div
              style={{
                display: "inline-flex",
                gap: 10,
                alignItems: "center",
                padding: "8px 12px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(0,0,0,0.22)",
                backdropFilter: "blur(10px)",
                fontWeight: 900,
                fontSize: 12,
                letterSpacing: "0.2px",
              }}
            >
             <img
  src="/transparent-logo.webp"
  alt="Ion Boats"
  style={{ height: 16, width: "auto", display: "block" }}
/>


              <span style={{ opacity: 0.75 }}>•</span>
              <span style={{ opacity: 0.9 }}>{trip.duration}</span>
            </div>

            <h1
              style={{
                margin: "14px 0 10px 0",
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(34px, 5.2vw, 56px)",
                lineHeight: 1.05,
                letterSpacing: "-0.35px",
              }}
            >
              {trip.title}
            </h1>

            <p
              style={{
                margin: 0,
                fontSize: "clamp(15px, 2vw, 18px)",
                lineHeight: 1.7,
                opacity: 0.88,
                maxWidth: 780,
              }}
            >
              {trip.subtitle}
            </p>

            <div style={{ marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap", opacity: 0.92 }}>
              <div
                style={{
                  padding: "10px 12px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.16)",
                  background: "rgba(0,0,0,0.20)",
                  backdropFilter: "blur(10px)",
                  fontWeight: 900,
                  fontSize: 13,
                }}
              >
                ⏱ {trip.duration}
              </div>
              <div
                style={{
                  padding: "10px 12px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.16)",
                  background: "rgba(0,0,0,0.20)",
                  backdropFilter: "blur(10px)",
                  fontWeight: 900,
                  fontSize: 13,
                }}
              >
                📍 {trip.departure}
              </div>
            </div>
          </div>
        </div>
      </section>

      {TripExtraComponent}


      {/* CONTENT */}
      <section
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "clamp(22px, 4vw, 56px) 16px",
        }}
      >
        <div
          className="tripGrid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 22,
            alignItems: "start",
          }}
        >
          {/* LEFT — IMAGES (stacked vertically on desktop too) */}
          <div style={{ minWidth: 0 }}>
            <div style={{ display: "grid", gap: 14 }}>
              {images.map((src, idx) => (
                <div
                  key={`${src}-${idx}`}
                  style={{
                    borderRadius: 22,
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "#ffffff",

                    aspectRatio: "16 / 10",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
                  }}
                >
                  <img
                    src={src}
                    alt={`${trip.title} photo ${idx + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
          

          {/* RIGHT — TEXT */}
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                borderRadius: 22,
                background: "#ffffff",
border: "1px solid rgba(0,0,0,0.08)",

                boxShadow: "0 24px 70px rgba(0,0,0,0.35)",
                padding: "clamp(16px, 2.6vw, 22px)",
              }}
            >

              
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 20,
                  fontWeight: 650,
                  letterSpacing: "-0.2px",
                  marginBottom: 10,
                }}
              >
                About this trip
              </div>

              <div style={{ display: "grid", gap: 12 }}>
                {trip.description.map((p) => (
                  <p
                    key={p}
                    style={{
                      margin: 0,
                      fontSize: 16,
                      lineHeight: 1.8,
                      opacity: 0.86,
                    }}
                  >
                    {p}
                  </p>
                ))}
              </div>

              <div style={{ marginTop: 18, height: 1, background: "rgba(0,0,0,0.08)"
 }} />

              <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap", opacity: 0.92 }}>
                {["Skipper", "Fuel", "Swim stops", "Photo moments"].map((x) => (
                  <span
                    key={x}
                    style={{
                      padding: "8px 10px",
                      borderRadius: 999,
                      border: "1px solid rgba(0,0,0,0.10)",
background: "rgba(30,136,255,0.06)",
color: "#0b1d26",

                      fontWeight: 900,
                      fontSize: 12,
                    }}
                  >
                    ✓ {x}
                  </span>
                ))}
              </div>
            </div>

            {/* ONE booking widget only */}
            <div
  style={{
    marginTop: 16,
    borderRadius: 22,
    padding: 18,
    border: "1px solid rgba(0,0,0,0.10)",
    background: "linear-gradient(180deg, rgba(6,18,26,0.96) 0%, rgba(7,27,37,0.96) 100%)",
    boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
  }}
>

              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 18,
                  fontWeight: 650,
                  marginBottom: 10,
                  letterSpacing: "-0.15px",
                }}
              >
                Reserve your trip
              </div>

              <BookingWidget initialTripId={trip.bookingTripId} hideTripSelector />

              


              <div style={{ marginTop: 10, opacity: 0.78, fontSize: 12, lineHeight: 1.6 }}>
                Secure request — we’ll confirm availability and details shortly.
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 900px) {
            .tripGrid {
  grid-template-columns: 1.3fr 0.7fr !important;
}

          }
        `}</style>
      </section>
    </main>
  );
}
