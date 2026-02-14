"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Pin = {
  id: string;
  name: string;
  leftPct: number; // 0..100 (x on IMAGE)
  topPct: number;  // 0..100 (y on IMAGE)
  desc: string;
  images?: string[]; // ✅ URLs from /public, e.g. "/trips/paxos1.jpeg"
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function parseObjectPosition(pos: string) {
  const parts = pos.trim().split(/\s+/);
  const xRaw = parts[0] ?? "50%";
  const yRaw = parts[1] ?? "50%";
  const x = xRaw.endsWith("%") ? parseFloat(xRaw) / 100 : 0.5;
  const y = yRaw.endsWith("%") ? parseFloat(yRaw) / 100 : 0.5;
  return {
    x: clamp(Number.isFinite(x) ? x : 0.5, 0, 1),
    y: clamp(Number.isFinite(y) ? y : 0.5, 0, 1),
  };
}

export default function CorfuMapSection() {
  // ✅ IMPORTANT: images are URL paths (because /public)
  // Example you gave: /var/www/ion-boats/public/trips/paxos1.jpeg  ->  "/trips/paxos1.jpeg"
  const initialPins = useMemo<Pin[]>(
    () => [
      {
        id: "benitses",
        name: "Benitses Marina",
        "leftPct": 66.1318060320223,
    "topPct": 56.157904681808404,
        desc: "Main departure point.",
        images: ["/trips/benitses1.jpeg"],
      },
      {
        id: "paleokastritsa",
        name: "Paleokastritsa",
        "leftPct": 45.07163411225152,
    "topPct": 38.2673151626218,
        desc: "Caves & turquoise bays.",
        images: ["/trips/paleokastritsa1.jpeg"],
      },
      {
        id: "ne-corfu",
        name: "North-East Corfu",
         "leftPct": 59.971347579300236,
    "topPct": 32.656466734840585,
        desc: "Calm coves and scenic coast.",
        images: ["/trips/northeast.jpeg"],
      },
      {
        id: "paxos",
        name: "Paxos",
        "leftPct": 80.74498654778161,
    "topPct": 98.86447818265886,
        desc: "Blue caves and Antipaxos swim stop.",
        images: ["/trips/paxos1.jpeg",
           "/trips/paxos1.jpeg",
    "/trips/paxos2.jpeg",
    "/trips/paxos3.jpeg",
     "/trips/paxos4.jpeg",
    "/trips/paxos5.jpeg",
    "/trips/paxos6.jpeg",
     "/trips/paxos7.jpeg",
    "/trips/paxos8.jpeg",
    
         ] // ✅ your real file
      },
      {
        id: "sivota",
        name: "Sivota / Blue Lagoon",
         "leftPct": 97.7936971495008,
    "topPct": 78.50511388756703,
        desc: "Mainland beaches + lagoon waters.",
        images: ["/trips/sivota1.jpeg"],
      },
    ],
    []
  );

  // ======= MAP RENDER-BOX (fixes pin drift with objectFit: contain) =======
  const MAP_OBJECT_POSITION = "50% 50%";
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [renderBox, setRenderBox] = useState({ left: 0, top: 0, width: 0, height: 0 });

  useEffect(() => {
    const compute = () => {
      if (!wrapRef.current || !imgRef.current) return;

      const wrapW = wrapRef.current.clientWidth;
      const wrapH = wrapRef.current.clientHeight;

      const natW = imgRef.current.naturalWidth;
      const natH = imgRef.current.naturalHeight;
      if (!wrapW || !wrapH || !natW || !natH) return;

      // object-fit: contain
      const scale = Math.min(wrapW / natW, wrapH / natH);
      const rendW = natW * scale;
      const rendH = natH * scale;

      const extraX = wrapW - rendW;
      const extraY = wrapH - rendH;

      const { x: posX, y: posY } = parseObjectPosition(MAP_OBJECT_POSITION);

      setRenderBox({
        left: extraX * posX,
        top: extraY * posY,
        width: rendW,
        height: rendH,
      });
    };

    compute();
    window.addEventListener("resize", compute);

    const img = imgRef.current;
    img?.addEventListener("load", compute);

    return () => {
      window.removeEventListener("resize", compute);
      img?.removeEventListener("load", compute);
    };
  }, []);

  // ======= EDIT MODE + PINS STATE =======
  const [pinsState, setPinsState] = useState<Pin[]>(initialPins);
  const [editMode, setEditMode] = useState(false);
  const [editPinId, setEditPinId] = useState<string>(initialPins[3]?.id ?? "");

  // ======= ACTIVE PIN + IMAGE NAV =======
  const [activeId, setActiveId] = useState<string>(initialPins[3]?.id ?? "");
  const active = pinsState.find((p) => p.id === activeId) ?? pinsState[0];
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  // scroll to info panel on pin click
  const infoRef = useRef<HTMLDivElement | null>(null);

  const selectPin = (id: string, shouldScroll = true) => {
    setActiveId(id);
    setActiveImgIdx(0);

    if (shouldScroll) {
      requestAnimationFrame(() => {
        infoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  };

  // When you click the map in edit mode, update selected pin coordinates RELATIVE TO THE IMAGE (renderBox)
  function handleMapClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!editMode) return;
    if (!wrapRef.current) return;
    if (renderBox.width <= 0 || renderBox.height <= 0) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // convert click point -> percentage inside rendered image
    const localX = clamp((x - renderBox.left) / renderBox.width, 0, 1);
    const localY = clamp((y - renderBox.top) / renderBox.height, 0, 1);

    const leftPct = clamp(localX * 100, 0, 100);
    const topPct = clamp(localY * 100, 0, 100);

    setPinsState((prev) => prev.map((p) => (p.id === editPinId ? { ...p, leftPct, topPct } : p)));

    console.log("UPDATED PIN:", editPinId, { leftPct, topPct });
    // If you want instant JSON of the latest state:
    // setPinsState is async; so print from a callback:
    // (keep it simple: use the Print button below)
  }

  return (
    <section
      style={{
        width: "100%",
        background: "#ffffff",
        borderTop: "1px solid rgba(0,0,0,0.08)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      {/* HEADER */}
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
              Click a pin to preview the place (photos below).
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

      {/* FULL-BLEED WRAP */}
      <div
        style={{
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
          padding: "0 0 clamp(18px, 3vw, 28px)",
        }}
      >
        <div
          data-corfu-map-grid
          style={{
            marginTop: 0,
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr)",
            gap: 14,
            width: "100%",
          }}
        >
          {/* MAP */}
          <div
            ref={wrapRef}
            onClick={handleMapClick}
            style={{
              borderRadius: 26,
              overflow: "hidden",
              position: "relative",
              background: "linear-gradient(180deg, #ffffff 0%, #f6fbff 100%)",
              width: "min(100%, 700px)",
              margin: "0 auto",
              aspectRatio: "3800 / 3396",
              isolation: "isolate",
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 18px 55px rgba(0,0,0,0.12)",
              cursor: editMode ? "crosshair" : "default",
            }}
          >
            <img
              ref={imgRef}
              src="/maps/new-corfu-map@2x.webp?v=1"
              alt="Corfu map"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                display: "block",
                objectFit: "contain",
                objectPosition: MAP_OBJECT_POSITION,
                transform: "translateZ(0)",
                pointerEvents: "none", // ✅ clicks go to container
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

            {/* EDIT TOOLBAR (shows only when editMode is ON) */}
            <div
              style={{
                position: "absolute",
                left: 12,
                top: 12,
                display: "none",
                gap: 10,
                flexWrap: "wrap",
                zIndex: 6,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setEditMode((v) => !v)}
                style={{
                  padding: "10px 12px",
                  borderRadius: 999,
                  border: "1px solid rgba(0,0,0,0.12)",
                  background: editMode ? "rgba(30,136,255,0.14)" : "#ffffff",
                  fontWeight: 900,
                  cursor: "pointer",
                }}
              >
                {editMode ? "Pin edit: ON" : "Pin edit: OFF"}
              </button>

              {editMode && (
                <>
                  <select
                    value={editPinId}
                    onChange={(e) => setEditPinId(e.target.value)}
                    style={{
                      padding: "10px 12px",
                      borderRadius: 999,
                      border: "1px solid rgba(0,0,0,0.12)",
                      fontWeight: 900,
                      cursor: "pointer",
                      background: "#fff",
                    }}
                  >
                    {pinsState.map((p) => (
                      <option key={p.id} value={p.id}>
                        Move: {p.name}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => {
  const json = JSON.stringify(pinsState, null, 2);
  console.log("FINAL PINS JSON:\n", json);
  navigator.clipboard?.writeText(json).catch(() => {});
  alert("Pins JSON copied to clipboard ✅");
}}

                  >
                    Print final JSON
                  </button>
                </>
              )}
            </div>

            {/* pins (positioned on the REAL rendered image area) */}
            {pinsState.map((p) => {
              const isActive = p.id === activeId;

              // ✅ map pin percent -> pixel inside the rendered image box
              const x = renderBox.left + (p.leftPct / 100) * renderBox.width;
              const y = renderBox.top + (p.topPct / 100) * renderBox.height;

              const labelLeft = p.id === "paxos" || p.id === "sivota";

              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    selectPin(p.id, true);
                  }}
                  title={p.name}
                  style={{
                    position: "absolute",
                    left: x,
                    top: y,
                    transform: "translate(-50%, -100%)",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    padding: 0,
                    zIndex: 5,
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
                      transform: labelLeft ? "translateX(-100%)" : "translateX(0)",
                      marginLeft: labelLeft ? -10 : 0,
                    }}
                  >
                    {p.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* INFO PANEL */}
          <div
            ref={infoRef}
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
              scrollMarginTop: 90,
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
                Photos
              </div>
            </div>

            <div style={{ color: "rgba(0,0,0,0.70)", fontSize: 14, lineHeight: 1.7 }}>{active?.desc}</div>

            {/* MAIN IMAGE */}
            <div
              style={{
                marginTop: 6,
                borderRadius: 18,
                border: "1px solid rgba(0,0,0,0.10)",
                overflow: "hidden",
                background: "rgba(0,0,0,0.04)",
                aspectRatio: "16 / 9",
                position: "relative",
              }}
            >
              {active?.images?.length ? (
                <img
                  src={active.images[activeImgIdx] ?? active.images[0]}
                  alt={`${active.name} photo ${activeImgIdx + 1}`}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              ) : (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "grid",
                    placeItems: "center",
                    color: "rgba(0,0,0,0.55)",
                    fontWeight: 900,
                    fontSize: 13,
                  }}
                >
                  Add photos for this location
                </div>
              )}
            </div>

            {/* THUMBNAILS */}
            {active?.images?.length ? (
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
                {active.images.map((src, idx) => {
                  const on = idx === activeImgIdx;
                  return (
                    <button
                      key={`${src}-${idx}`}
                      type="button"
                      onClick={() => setActiveImgIdx(idx)}
                      style={{
                        width: 92,
                        height: 60,
                        borderRadius: 12,
                        overflow: "hidden",
                        border: on ? "2px solid rgba(30,136,255,0.75)" : "1px solid rgba(0,0,0,0.14)",
                        padding: 0,
                        cursor: "pointer",
                        background: "#fff",
                      }}
                      title={`Photo ${idx + 1}`}
                    >
                      <img
                        src={src}
                        alt={`${active.name} thumb ${idx + 1}`}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    </button>
                  );
                })}
              </div>
            ) : null}

            {/* QUICK SWITCH CHIPS */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
              {pinsState.map((p) => {
                const on = p.id === activeId;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => selectPin(p.id, false)}
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
            [data-corfu-map-grid] {
              grid-template-columns: 1.55fr 1fr;
              align-items: start;
              padding-left: 14px;
              padding-right: 14px;
              box-sizing: border-box;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
