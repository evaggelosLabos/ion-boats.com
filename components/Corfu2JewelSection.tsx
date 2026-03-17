"use client";

export default function CorfuPdfStyleSection() {
  const images = {
    left: "/trips/leftimagecorfujewel2.jpg",
    rightTop: "/trips/topright.jpg",
    rightBottom: "/trips/bottomright.jpg",
    logo: "/newlogo-transparent.png",
  };

  return (
    <section
      style={{
        width: "100%",
        background: "#d8d0c6",
        padding: "clamp(28px, 4vw, 48px) 16px",
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
        }}
      >
        {/* logo */}
        <div
          style={{
            marginBottom: "clamp(20px, 2.5vw, 30px)",
            paddingLeft: "clamp(4px, 1vw, 10px)",
          }}
        >
          <img
            src={images.logo}
            alt="Ion Boats"
            style={{
              width: "clamp(52px, 6vw, 78px)",
              height: "auto",
              display: "block",
            }}
          />
        </div>

        {/* main grid */}
        <div className="corfuPdfGrid">
          {/* left tall image */}
          <div
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <img
              src={images.left}
              alt="Corfu coastal view"
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          {/* center text card */}
          <div
            style={{
              background: "#0898b2",
              color: "#f7f2ea",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: "clamp(24px, 4vw, 44px) clamp(18px, 3vw, 30px)",
              minHeight: "100%",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(40px, 6vw, 78px)",
                lineHeight: 1,
                fontWeight: 500,
                letterSpacing: "1px",
                marginBottom: "clamp(16px, 2vw, 22px)",
              }}
            >
              CORFU
            </div>

            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(18px, 2vw, 30px)",
                lineHeight: 1.25,
                fontWeight: 500,
                marginBottom: 6,
              }}
            >
              The Ionian Capital of Exelence
            </div>

            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(16px, 1.8vw, 28px)",
                lineHeight: 1.25,
                fontWeight: 500,
                marginBottom: "clamp(20px, 3vw, 34px)",
              }}
            >
              the Jewel of the ionian sea
            </div>

            <div
              style={{
                maxWidth: 420,
                fontSize: "clamp(15px, 1.3vw, 18px)",
                lineHeight: 1.9,
                color: "rgba(255,255,255,0.95)",
                fontWeight: 400,
              }}
            >
              Corfu is one of the most beautiful islands of the Ionian Sea,
              known for its emerald waters, lush landscapes, and rich history.
              With its charming villages, stunning beaches, and UNESCO-listed
              Old Town, it offers a unique blend of natural beauty and cultural
              heritage.
            </div>
          </div>

          {/* right stacked images */}
          <div
            style={{
              display: "grid",
              gridTemplateRows: "1fr 1fr",
              gap: "clamp(14px, 1.6vw, 18px)",
              height: "100%",
            }}
          >
            <div
              style={{
                width: "100%",
                overflow: "hidden",
              }}
            >
              <img
                src={images.rightTop}
                alt="Corfu old town street"
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>

            <div
              style={{
                width: "100%",
                overflow: "hidden",
              }}
            >
              <img
                src={images.rightBottom}
                alt="Corfu panoramic view"
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .corfuPdfGrid {
          display: grid;
          grid-template-columns: 1.05fr 1.15fr 0.95fr;
          gap: 18px;
          align-items: stretch;
        }

        .corfuPdfGrid > div {
          min-height: 560px;
        }

        @media (max-width: 980px) {
          .corfuPdfGrid {
            grid-template-columns: 1fr;
          }

          .corfuPdfGrid > div {
            min-height: auto;
          }

          .corfuPdfGrid img {
            height: auto !important;
            max-height: none !important;
          }
        }
      `}</style>
    </section>
  );
}