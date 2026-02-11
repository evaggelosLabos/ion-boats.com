"use client";

export default function CorfuJewelSection() {
  return (
    <section
      style={{
        width: "100%",
        background: "#ffffff",
        borderTop: "1px solid rgba(0,0,0,0.08)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "clamp(22px, 3.2vw, 42px) clamp(14px, 3vw, 20px)",
        }}
      >
        {/* TEXT */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 650,
              letterSpacing: "-0.35px",
              color: "#0b1d26",
              fontSize: "clamp(26px, 3.4vw, 42px)",
              lineHeight: 1.1,
            }}
          >
            Corfu — the jewel of the Ionian Sea
          </div>

          <div
            style={{
              margin: "12px auto 0",
              maxWidth: 760,
              color: "rgba(0,0,0,0.68)",
              fontSize: "clamp(14px, 1.5vw, 16px)",
              lineHeight: 1.75,
            }}
          >
            Emerald coves, crystal lagoons, and cinematic sunsets. Discover iconic coastlines and hidden
            bays — curated for unforgettable days on the water.
          </div>
        </div>

       {/* FULL WIDTH IMAGES */}
<div
  style={{
    marginTop: "clamp(20px, 3vw, 40px)",
    width: "100vw",
    marginLeft: "50%",
    transform: "translateX(-50%)",
    display: "grid",
    gap: 18,
  }}
>
  <div className="corfuJewelGrid">
    {[
      { src: "/trips/Corfutown.jpeg", label: "The Ionian capital of elegance." },
      { src: "/trips/corfuoldtown.png", label: "Timeless old town charm" },
      { src: "/corfu/sunset.jpg", label: "Golden sunsets" },
    ].map((img, i) => (
      <div
  key={i}
  className="corfuJewelTile"
  style={{
    position: "relative",
    overflow: "hidden",
  }}
>

        <img
          src={img.src}
          alt={img.label}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            
          }}
        />

        {/* cinematic overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.45))",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: 18,
            left: 22,
            color: "#fff",
            fontWeight: 800,
            fontSize: 18,
            letterSpacing: "0.5px",
          }}
        >
          {img.label}
        </div>
      </div>
    ))}
  </div>
</div>

        {/* CTA ROW */}
        <div
          style={{
            marginTop: 18,
            display: "flex",
            justifyContent: "center",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <a
            href="#trips"
            style={{
              textDecoration: "none",
              color: "#0b1d26",
              fontWeight: 900,
              fontSize: 13,
              padding: "11px 14px",
              borderRadius: 999,
              border: "1px solid rgba(0,0,0,0.14)",
              background: "#ffffff",
            }}
          >
            Explore trips →
          </a>

          <a
            href="#map"
            style={{
              textDecoration: "none",
              color: "#0b1d26",
              fontWeight: 900,
              fontSize: 13,
              padding: "11px 14px",
              borderRadius: 999,
              border: "1px solid rgba(0,0,0,0.14)",
              background: "rgba(30,136,255,0.10)",
            }}
          >
            View the map →
          </a>
        </div>
      </div>

      <style>{`
  .corfuJewelGrid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
  }

  /* DESKTOP — much taller */
  .corfuJewelTile {
    height: clamp(550px, 45vw, 820px);

  }

  @media (max-width: 900px) {
    .corfuJewelGrid {
      grid-template-columns: 1fr;
    }

    /* MOBILE — also tall */
    .corfuJewelTile {
      height: clamp(590px, 70vw, 650px);
    }
  }
`}</style>



    </section>
  );
}
