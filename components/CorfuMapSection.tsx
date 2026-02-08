"use client";

import { useMemo, useState } from "react";

type Pin = {
  id: string;
  name: string;
  leftPct: number; // 0..100 (x position on the map)
  topPct: number;  // 0..100 (y position on the map)
  desc: string;
  images?: string[];
};

export default function CorfuMapSection() {
  const pins = useMemo<Pin[]>(
    () => [
      { id: "benitses", name: "Benitses Marina", leftPct: 58, topPct: 63, desc: "Main departure point.", images: [] },
      { id: "paleokastritsa", name: "Paleokastritsa", leftPct: 36, topPct: 43, desc: "Caves & turquoise bays.", images: [] },
      { id: "ne-corfu", name: "North-East Corfu", leftPct: 62, topPct: 28, desc: "Calm coves and scenic coast.", images: [] },
      { id: "paxos", name: "Paxos", leftPct: 18, topPct: 66, desc: "Blue caves and Antipaxos swim stop.", images: [] },
      { id: "sivota", name: "Sivota / Blue Lagoon", leftPct: 10, topPct: 73, desc: "Mainland beaches + lagoon waters.", images: [] },
    ],
    []
  );

  const [activeId, setActiveId] = useState<string>(pins[0]?.id ?? "");
  const active = pins.find((p) => p.id === activeId) ?? pins[0];

  // ✅ tweak this if you want more/less vertical crop
  const MAP_OBJECT_POSITION = "50% 38%";

  return (
    <section
      style={{
        width: "100%",
        background: "#ffffff",
        borderTop: "1px solid rgba(0,0,0,0.08)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      {/* BOXED HEADER (keeps your nice typography aligned) */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "clamp(18px, 3vw, 28px) clamp(14px, 3vw, 20px)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 650,
                letterSpacing: "-0.25px",
                fontSize: "clamp(20px, 3vw, 28px)",
                color: "#0b1d26",
              }}
            >
              Explore Corfu & nearby highlights
            </div>
            <div
              style={{
                marginTop: 8,
                color: "rgba(0,0,0,0.65)",
                fontSize: 14,
                lineHeight: 1.6,
                maxWidth: 720,
              }}
            >
              Click a pin to preview the place. (You can add real photos later — pins stay the same.)
            </div>
          </div>

          <a
            href="#trips"
            style={{
              alignSelf: "flex-end",
              textDecoration: "none",
              color: "#0b1d26",
              fontWeight: 900,
              fontSize: 13,
              padding: "10px 12px",
              borderRadius: 999,
              border: "1px solid rgba(0,0,0,0.14)",
              background: "rgba(255,255,255,0.9)",
              whiteSpace: "nowrap",
            }}
          >
            See trips →
          </a>
        </div>
      </div>

      {/* ✅ FULL-BLEED GRID (removes horizontal gaps) */}
      <div
        style={{
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
          padding: "0 0 clamp(18px, 3vw, 28px)", // no left/right padding
        }}
      >
        <div
          style={{
            marginTop: 0,
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr)",
            gap: 14,
            width: "100%",
          }}
        >
          {/* MAP (full width) */}
          <div
  style={{
    borderRadius: 0,
    overflow: "hidden",
    position: "relative",
    background: "lime", // ← shows uncovered area
    width: "100%",
marginLeft: 0,

    height: "clamp(440px, 78vh, 820px)",

    lineHeight: 0,

    outline: "2px solid red",
  }}
>

            <img
              src="/maps/corfu-sat-4k.webp?v=1"

              alt="Corfu satellite map"
             style={{
  position: "absolute",
  left: 0,
  right: 0,
  top: -2,
  bottom: -2,
  width: "100%",
  height: "calc(100% + 4px)",
  objectFit: "cover",
  

  objectPosition: "50% 45%",
  display: "block",
}}


            />

            {/* overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(900px 460px at 25% 10%, rgba(255,255,255,0.14), transparent 55%), linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.18) 100%)",
                pointerEvents: "none",
              }}
            />

            {/* pins */}
            {pins.map((p) => {
              const isActive = p.id === activeId;

              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActiveId(p.id)}
                  title={p.name}
                  style={{
                    position: "absolute",
                    left: `${p.leftPct}%`,
                    top: `${p.topPct}%`,
                    transform: "translate(-50%, -100%)",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  <div
                    style={{
                      height: isActive ? 18 : 16,
                      width: isActive ? 18 : 16,
                      borderRadius: 999,
                      background: isActive ? "#1e88ff" : "#ffffff",
                      border: isActive ? "2px solid rgba(255,255,255,0.95)" : "2px solid rgba(0,0,0,0.25)",
                      boxShadow: isActive ? "0 10px 24px rgba(30,136,255,0.45)" : "0 10px 20px rgba(0,0,0,0.35)",
                    }}
                  />
                  <div
                    style={{
                      marginTop: 6,
                      padding: "6px 10px",
                      borderRadius: 999,
                      background: isActive ? "rgba(30,136,255,0.92)" : "rgba(0,0,0,0.55)",
                      color: "#fff",
                      fontSize: 12,
                      fontWeight: 900,
                      whiteSpace: "nowrap",
                      border: "1px solid rgba(255,255,255,0.14)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {p.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* INFO PANEL (kept boxed so it doesn’t look weird on ultrawide) */}
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              width: "calc(100% - 28px)",
              borderRadius: 22,
              border: "1px solid rgba(0,0,0,0.12)",
              background: "rgba(255,255,255,0.92)",
              boxShadow: "0 16px 50px rgba(0,0,0,0.10)",
              padding: "clamp(14px, 2.5vw, 18px)",
              display: "grid",
              gap: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 20,
                  fontWeight: 650,
                  letterSpacing: "-0.2px",
                  color: "#0b1d26",
                }}
              >
                {active?.name}
              </div>

              <div
                style={{
                  padding: "8px 12px",
                  borderRadius: 999,
                  border: "1px solid rgba(0,0,0,0.12)",
                  background: "#ffffff",
                  fontWeight: 900,
                  fontSize: 12,
                  color: "#0b1d26",
                }}
              >
                Click pins on the map
              </div>
            </div>

            <div style={{ color: "rgba(0,0,0,0.70)", fontSize: 14, lineHeight: 1.7 }}>{active?.desc}</div>

            <div
              style={{
                marginTop: 6,
                borderRadius: 18,
                border: "1px solid rgba(0,0,0,0.10)",
                overflow: "hidden",
                background: "linear-gradient(180deg, rgba(30,136,255,0.08), rgba(11,29,38,0.03))",
                aspectRatio: "16 / 9",
                display: "grid",
                placeItems: "center",
                color: "rgba(0,0,0,0.55)",
                fontWeight: 900,
                fontSize: 13,
              }}
            >
              Add photos later (optional)
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 6 }}>
              {pins.map((p) => {
                const on = p.id === activeId;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setActiveId(p.id)}
                    style={{
                      padding: "10px 12px",
                      borderRadius: 999,
                      border: on ? "1px solid rgba(30,136,255,0.40)" : "1px solid rgba(0,0,0,0.12)",
                      background: on ? "rgba(30,136,255,0.12)" : "#ffffff",
                      color: "#0b1d26",
                      fontWeight: 900,
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    {p.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 900px) {
            /* map + panel side-by-side on desktop */
            section > div + div > div {
              grid-template-columns: 1.55fr 1fr;
              align-items: stretch;
              padding-left: 14px;
              padding-right: 14px;
              box-sizing: border-box;
            }
            /* restore premium rounding on desktop only (optional) */
            section > div + div > div > div:first-child {
              border-radius: 22px;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
