"use client";

export default function IonBoatsIntroSection() {
  return (
    <section
      style={{
        width: "100%",
        background: "#3d9bb1",
        padding: "clamp(18px, 2.4vw, 30px) 14px",
      }}
    >
      <div
        className="ionIntroWrap"
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          position: "relative",
        }}
      >
        {/* RIGHT SIDE IMAGES */}
        <div className="ionVisualArea">
          <div className="ionChampagne">
            <img
              src="/glasses.png"
              alt="Champagne on board"
              loading="lazy"
              style={imgStyle}
            />
          </div>

          <div className="ionHarbor">
            <img
              src="/trips/ion-corfu-harbor.jpg"
              alt="Corfu harbor"
              loading="lazy"
              style={imgStyle}
            />
          </div>

          <div className="ionBeach">
            <img
              src="/trips/ion-beach-aerial.jpg"
              alt="Aerial beach"
              loading="lazy"
              style={imgStyle}
            />
          </div>
        </div>

        {/* TEXT OVERLAY */}
        <div className="ionTextBlock">
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(48px, 6.2vw, 82px)",
              lineHeight: 0.92,
              fontWeight: 500,
              color: "#f4efe7",
              letterSpacing: "-1.5px",
              textShadow: "0 3px 10px rgba(0,0,0,0.20)",
              marginBottom: 16,
            }}
          >
            ion-boats
          </div>

          <div
            style={{
              fontSize: "clamp(16px, 1.45vw, 19px)",
              lineHeight: 1.62,
              color: "rgba(255,255,255,0.95)",
              maxWidth: 470,
            }}
          >
            Experience Corfu by boat with a focus on comfort, privacy, and
            thoughtful planning. Our trips are designed for guests who value a
            relaxed pace, well-chosen routes, and the feeling of having
            everything taken care of from the moment they arrive. Departing from
            Benitses Marina, each journey is planned with weather conditions,
            smooth sailing, and quality swim stops in mind, making it ideal for
            couples, families, and private groups alike. Fixed departure times,
            experienced skippers, and clear pricing ensure a predictable and
            stress-free experience, while flexible options allow you to choose
            between shared outings or fully private cruises. Check real-time
            availability, select your preferred time slot, and confirm your trip
            in minutes — with instant confirmation, local support, and a strong
            emphasis on safety, comfort, and peace of mind.
          </div>
        </div>
      </div>

      <style>{`
        .ionIntroWrap {
          min-height: 760px;
        }

        .ionVisualArea {
          position: relative;
          width: 100%;
          min-height: 760px;
        }

        .ionChampagne {
          position: absolute;
          top: 44px;
          left: 42%;
          width: 22%;
          height: 460px;
          overflow: hidden;
        }

        .ionHarbor {
          position: absolute;
          top: 44px;
          right: 0;
          width: 38%;
          height: 717px;
          overflow: hidden;
        }

        .ionBeach {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 61%;
          height: 235px;
          overflow: hidden;
        }

        .ionTextBlock {
          position: absolute;
          top: 38px;
          left: 0;
          width: 40%;
          z-index: 3;
        }

        @media (max-width: 980px) {
          .ionIntroWrap,
          .ionVisualArea {
            min-height: auto;
          }

          .ionTextBlock {
            position: relative;
            top: auto;
            left: auto;
            width: 100%;
            margin-bottom: 18px;
          }

          .ionVisualArea {
            display: grid;
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .ionChampagne,
          .ionHarbor,
          .ionBeach {
            position: relative;
            top: auto;
            left: auto;
            right: auto;
            bottom: auto;
            width: 100%;
            height: auto;
          }

          .ionChampagne img,
          .ionHarbor img,
          .ionBeach img {
            width: 100%;
            height: auto !important;
            display: block;
          }
        }
      `}</style>
    </section>
  );
}

const imgStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};