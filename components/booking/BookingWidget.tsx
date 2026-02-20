"use client";

import { useEffect, useMemo, useState } from "react";
import type { Trip, TripId } from "../../lib/booking/catalog";
import { TRIPS } from "../../lib/booking/catalog";

type SlotAvailability = {
  id: string;
  label: string;
  start: string;
  end?: string;

  // ✅ Option B fields (from new availability API)
  totalSeats: number;
  remainingSeats: number;
  maxIndividualsBookable: number; // = remainingSeats
  maxCouplesBookable: number;     // = floor(remainingSeats/2)
};


type AvailabilityResponse = {
  trip: Trip;
  date: string;
  slots: SlotAvailability[];
};

type HoldResponse = {
  holdId: string;
  expiresAt: number;
  message: string;
};

type BookingMode = "private" | "shared";



type ConfirmResponse =
  | { ok: true; reservationId: string; message: string; priceEur: number }
  | { ok: false; error: string };

function todayISO(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function formatMMSS(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

function parseError(payload: unknown, fallback: string): string {
  if (typeof payload === "object" && payload !== null && "error" in payload) {
    const v = (payload as { error?: unknown }).error;
    if (typeof v === "string" && v.trim().length > 0) return v;
  }
  return fallback;
}

function SelectedTripCard({
  t,
  active,
  onClick,
}: {
  t: Trip;
  active: boolean;
  onClick?: () => void;
}) {
  const meta =
    t.id === "paleo"
      ? {
          tag: "Most popular",
          accent: "rgba(98,208,255,0.95)",
          bg: "linear-gradient(135deg, rgba(98,208,255,0.18), rgba(255,255,255,0.04) 55%, rgba(0,0,0,0.12))",
          bullets: ["18:30–22:30","Sea caves & turquoise bays", "Iconic coastline views", "Great for photos & swim stops"],
        }
      : t.id === "ne"
      ? {
          tag: "Calm waters",
          accent: "rgba(120,160,255,0.95)",
          bg: "linear-gradient(135deg, rgba(120,160,255,0.16), rgba(255,255,255,0.04) 55%, rgba(0,0,0,0.12))",
          bullets: ["Hidden coves & quiet beaches", "Relaxed swimming pace", "Scenic coastline route"],
        }
      : t.id === "paxos"
      ? {
          tag: "Full day",
          accent: "rgba(98,208,255,0.95)",
          bg: "linear-gradient(135deg, rgba(98,208,255,0.14), rgba(255,255,255,0.04) 55%, rgba(0,0,0,0.12))",
          bullets: ["Blue caves pass", "Antipaxos swim stop", "Best island day escape"],
        }
      : t.id === "blue-lagoon"
      ? {
          tag: "Swim stops",
          accent: "rgba(120,160,255,0.95)",
          bg: "linear-gradient(135deg, rgba(120,160,255,0.14), rgba(255,255,255,0.04) 55%, rgba(0,0,0,0.12))",
          bullets: ["Blue Lagoon waters", "Mainland beach stop", "Easy, relaxed day"],
        }
      : {
          tag: "Private only",
          accent: "rgba(209,183,110,0.95)",
          bg: "linear-gradient(135deg, rgba(209,183,110,0.16), rgba(255,255,255,0.04) 55%, rgba(0,0,0,0.12))",
          bullets: ["10:00–14:30","Your route, your time", "Ideal for families / couples", "Message us after booking"],
        };

  const sharedAllowed = (t.pricing?.maxCouples ?? 0) > 0;

  return (
    <div
      role={onClick ? "button" : undefined}
      onClick={onClick}
      style={{
        textAlign: "left",
        width: "100%",
        padding: 0,
        borderRadius: 18,
        border: active ? `1px solid ${meta.accent}` : "1px solid rgba(255,255,255,0.14)",
        background: active ? meta.bg : "rgba(255,255,255,0.05)",
        color: "rgba(255,255,255,0.95)",
        overflow: "hidden",
        boxShadow: active ? "0 18px 45px rgba(0,0,0,0.35)" : "none",
      }}
    >
      {/* top accent */}
      <div style={{ height: 3, background: active ? meta.accent : "rgba(255,255,255,0.14)" }} />

      {/* ✅ BIG IMAGE ON TOP */}
      <div
        style={{
          width: "100%",
          aspectRatio: "16 / 9", // change to "1 / 1" if you want perfectly square
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(180deg, rgba(6,18,26,0.96) 0%, rgba(7,27,37,0.96) 100%)",

          borderBottom: "1px solid rgba(255,255,255,0.10)",
        }}
      >
        <img
          src={t.image}
          alt={t.title}
          loading="lazy"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transform: "scale(1.02)",
          }}
        />

        {/* fade for readability */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.14) 0%, rgba(0,0,0,0.00) 55%, rgba(0,0,0,0.34) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* tag pill */}
        <div
          style={{
            position: "absolute",
            left: 12,
            bottom: 12,
            padding: "7px 12px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 950,
            background: "rgba(0,0,0,0.36)",
            border: "1px solid rgba(255,255,255,0.18)",
            color: "rgba(255,255,255,0.95)",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ color: meta.accent, marginRight: 8 }}>✓</span>
          {meta.tag}
        </div>
      </div>

      {/* ✅ CONTENT BELOW */}
      <div style={{ padding: 14 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontWeight: 950,
                fontSize: 16,
                letterSpacing: -0.2,
                lineHeight: 1.2,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {t.title}
            </div>

            <div style={{ fontSize: 12, opacity: 0.78, marginTop: 4 }}>
              {sharedAllowed ? "Shared or Private" : "Private only"}
            </div>
          </div>

          {active ? (
            <div
              style={{
                padding: "7px 11px",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 950,
                background: "rgba(255,255,255,0.10)",
                border: `1px solid ${meta.accent}`,
                color: "rgba(255,255,255,0.95)",
                flex: "0 0 auto",
              }}
            >
              Selected
            </div>
          ) : null}
        </div>

        {/* bullets */}
        <div style={{ marginTop: 10, display: "grid", gap: 6 }}>
          {meta.bullets.slice(0, 3).map((b) => (
            <div key={b} style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 12, opacity: 0.9 }}>
              <span
                style={{
                  height: 18,
                  width: 18,
                  borderRadius: 6,
                  display: "grid",
                  placeItems: "center",
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.06)",
                  flex: "0 0 auto",
                  fontWeight: 950,
                  color: meta.accent,
                }}
              >
                ✓
              </span>
              <span style={{ lineHeight: 1.2 }}>{b}</span>
            </div>
          ))}
        </div>

        {/* prices */}
        <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <div
            style={{
              padding: "7px 10px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 950,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.14)",
            }}
          >
            Private: <span style={{ color: meta.accent }}>€{t.pricing.privatePrice}</span>
          </div>

          <div
            style={{
              padding: "7px 10px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 950,
              opacity: sharedAllowed ? 1 : 0.45,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.14)",
            }}
          >
            Shared:{" "}
            <span style={{ color: sharedAllowed ? "rgba(98,208,255,0.95)" : "rgba(255,255,255,0.55)" }}>
              {sharedAllowed ? `€${t.pricing.sharedCouplePrice}/couple` : "Not available"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}




export default function BookingWidget({
  initialTripId,
  hideTripSelector,
}: {
  initialTripId?: TripId;
  hideTripSelector?: boolean;
}) {


 const [tripId, setTripId] = useState<TripId>(initialTripId ?? "ne");

  const [bookingMode, setBookingMode] = useState<BookingMode>("private");
  const [quantity, setQuantity] = useState<number>(1);

  const [date, setDate] = useState<string>(todayISO());

  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const [availability, setAvailability] = useState<AvailabilityResponse | null>(null);
  const [error, setError] = useState<string>("");

  const [selectedSlotId, setSelectedSlotId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [hold, setHold] = useState<HoldResponse | null>(null);
  const [confirmed, setConfirmed] = useState<{ reservationId: string; priceEur: number } | null>(null);

  const [nowTick, setNowTick] = useState<number>(Date.now());

  const remainingMs = useMemo(() => {
    if (!hold) return 0;
    return Math.max(0, hold.expiresAt - nowTick);
  }, [hold, nowTick]);

  useEffect(() => {
    if (!hold) return;
    const t = window.setInterval(() => setNowTick(Date.now()), 500);
    return () => window.clearInterval(t);
  }, [hold]);

  useEffect(() => {
  if (!availability?.slots?.length) return;

  const sel =
    availability.slots.find((x) => x.id === selectedSlotId) ??
    availability.slots[0];

  const max =
    bookingMode === "private"
      ? (sel?.maxIndividualsBookable ?? 0)
      : (sel?.maxCouplesBookable ?? 0);

  const safeMax = Math.max(0, max);
  const next = Math.min(quantity, safeMax || 1);

  if (next !== quantity) setQuantity(next);
}, [availability, selectedSlotId, bookingMode, quantity]);


  const slotBtn = (active: boolean, disabled: boolean): React.CSSProperties => ({
    height: 44,
    padding: "0 14px",
    borderRadius: 999,
    border: active ? "2px solid rgba(98,208,255,0.9)" : "1px solid rgba(255,255,255,0.14)",
    background: active ? "rgba(98,208,255,0.30)" : "rgba(255,255,255,0.06)",
    color: "rgba(255,255,255,0.95)",
    fontWeight: 900,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    outline: "none",
    transition: "all 120ms ease",
    width: "100%",
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  });

  const fieldWrap: React.CSSProperties = { display: "grid", gap: 6 };
  const fieldLabel: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: 0.2,
    color: "rgba(255,255,255,0.75)",
  };
  const fieldInput: React.CSSProperties = {
    height: 46,
    padding: "0 14px",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.22)",
    background: "rgba(0,0,0,0.45)",
    color: "rgba(255,255,255,0.95)",
    fontSize: 14,
    outline: "none",
    width: "100%",
  };

  const btnBase: React.CSSProperties = {
    height: 46,
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(255,255,255,0.10)",
    color: "rgba(255,255,255,0.95)",
    fontWeight: 900,
    cursor: "pointer",
    width: "100%",
  };

  const primaryBtn: React.CSSProperties = {
    ...btnBase,
    border: "1px solid rgba(98,208,255,0.45)",
    background: "rgba(98,208,255,0.20)",
  };

  const confirmBtn: React.CSSProperties = {
    ...btnBase,
    border: "1px solid rgba(209,183,110,0.45)",
    background: "rgba(209,183,110,0.18)",
  };

  async function fetchAvailability(nextTripId: TripId, nextDate: string) {
    setLoading(true);
    setError("");
    setAvailability(null);
    setSelectedSlotId("");
    // IMPORTANT: do NOT clear hold here anymore globally if you want UI continuity
    // but we DO clear hold when user changes trip/date.
    // setHold(null);

    try {
      const res = await fetch(
        `/api/booking/availability?tripId=${encodeURIComponent(nextTripId)}&date=${encodeURIComponent(nextDate)}`,
        { headers: { accept: "application/json" } }
      );
      const dataUnknown: unknown = await res.json();

      if (!res.ok) {
        throw new Error(parseError(dataUnknown, "Failed to load availability"));
      }

      setAvailability(dataUnknown as AvailabilityResponse);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
  void fetchAvailability(tripId, date);
}, [tripId, date]);

useEffect(() => {
  if (availability?.slots?.length && !selectedSlotId) {
    setSelectedSlotId(availability.slots[0].id);
  }
}, [availability]);



  async function onCheck() {
    void fetchAvailability(tripId, date);
  }

async function onBookNow() {
  setError("");
  setConfirmed(null);

  if (!selectedSlotId) return setError("Select a time slot first.");
  if (name.trim().length < 2) return setError("Enter your name.");
  if (phone.trim().length < 6) return setError("Enter your phone.");

  setLoading(true);

  try {
    // 1) Create hold
    const holdRes = await fetch("/api/booking/hold", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        tripId,
        date,
        slotId: selectedSlotId,
        bookingMode,
        quantity,
        customer: {
          name: name.trim(),
          phone: phone.trim(),
          ...(email.trim() ? { email: email.trim() } : {}),
        },
      }),
    });

    const holdDataUnknown: unknown = await holdRes.json();
    if (!holdRes.ok) throw new Error(parseError(holdDataUnknown, "Could not book"));

    const holdData = holdDataUnknown as HoldResponse;

    // 2) Immediately confirm
    const confirmRes = await fetch("/api/booking/confirm", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ holdId: holdData.holdId }),
    });

    const confirmDataUnknown: unknown = await confirmRes.json();
    if (!confirmRes.ok) throw new Error(parseError(confirmDataUnknown, "Could not confirm booking"));

    const confirmData = confirmDataUnknown as ConfirmResponse;
    if (!("ok" in confirmData) || confirmData.ok !== true) {
      throw new Error(parseError(confirmDataUnknown, "Could not confirm booking"));
    }

    // ✅ Success UI
    setConfirmed({ reservationId: confirmData.reservationId, priceEur: confirmData.priceEur });
    setHold(null);
    setSelectedSlotId("");

    void fetchAvailability(tripId, date);
  } catch (e: unknown) {
    setError(e instanceof Error ? e.message : "Something went wrong");
  } finally {
    setLoading(false);
  }
}

  async function onConfirm() {
    setError("");
    setConfirmed(null);

    if (!hold?.holdId) {
      setError("Create a hold first.");
      return;
    }

    setConfirming(true);
    try {
      const res = await fetch("/api/booking/confirm", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ holdId: hold.holdId }),
      });

      const dataUnknown: unknown = await res.json();

      if (!res.ok) {
        throw new Error(parseError(dataUnknown, "Could not confirm booking"));
      }

      const data = dataUnknown as ConfirmResponse;
      if (!("ok" in data) || data.ok !== true) {
        throw new Error(parseError(dataUnknown, "Could not confirm booking"));
      }

      setConfirmed({ reservationId: data.reservationId, priceEur: data.priceEur });
      setHold(null);
      setSelectedSlotId("");

      void fetchAvailability(tripId, date);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setConfirming(false);
    }
  }

  const trip = TRIPS.find((t) => t.id === tripId)!;

  const unitPrice = bookingMode === "private" ? trip.pricing.privatePrice : trip.pricing.sharedCouplePrice;
const price = unitPrice * quantity;


  return (
    <div
      style={{
        borderRadius: 22,
        padding: 16,
        border: "1px solid rgba(255,255,255,0.14)",
        background: "rgba(255,255,255,0.06)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
        width: "100%",
        maxWidth: "none",
      }}
    >
      <div style={{ fontWeight: 900, marginBottom: 10 }}>Quick booking</div>

      {/* Trip */}
      {/* Trip (CARDS) */}
{/* Trip (STRONGLY DISTINGUISHED CARDS) */}
{/* Trip */}
{hideTripSelector ? (
  <div style={{ marginBottom: 12 }}>
    <SelectedTripCard t={trip} active={true} />
  </div>
) : (
  <div style={{ marginBottom: 12 }}>
    <div
      style={{
        fontSize: 12,
        fontWeight: 900,
        letterSpacing: 0.2,
        color: "rgba(255,255,255,0.75)",
        marginBottom: 8,
      }}
    >
      Choose your trip
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
      {TRIPS.map((t) => {
        const active = tripId === t.id;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => {
              setTripId(t.id);
              setAvailability(null);
              setSelectedSlotId("");
              setHold(null);
              setConfirmed(null);
              if (t.pricing.maxCouples === 0) setBookingMode("private");
              void fetchAvailability(t.id, date);
            }}
            style={{
              textAlign: "left",
              width: "100%",
              padding: 0,
              borderRadius: 18,
              border: active ? "2px solid rgba(98,208,255,0.9)" : "1px solid rgba(255,255,255,0.14)",
              background: active ? "rgba(98,208,255,0.14)" : "rgba(255,255,255,0.05)",
              color: "rgba(255,255,255,0.95)",
              cursor: "pointer",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: 14 }}>
              <div style={{ fontWeight: 950, fontSize: 16 }}>{t.title}</div>
              <div style={{ fontSize: 12, opacity: 0.78, marginTop: 3 }}>
                {t.pricing.maxCouples > 0 ? "Shared or Private" : "Private only"}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  </div>
)}



      {/* Booking mode */}
<div style={{ marginBottom: 12 }}>
  <button
    type="button"
    onClick={() => {
  setBookingMode("private");
  setQuantity(1);
}}

    style={{
      marginRight: 8,
      padding: "10px 14px",
      borderRadius: 999,
      fontWeight: 800,
      background: bookingMode === "private" ? "rgba(98,208,255,0.2)" : "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.14)",
      color: "#fff",
      cursor: "pointer",
    }}
  >
    Individual (per person)
  </button>

  <button
    type="button"
    disabled={trip.pricing.maxCouples === 0}
    onClick={() => setBookingMode("shared")}
    style={{
      padding: "10px 14px",
      borderRadius: 999,
      fontWeight: 800,
      opacity: trip.pricing.maxCouples === 0 ? 0.4 : 1,
      background: bookingMode === "shared" ? "rgba(98,208,255,0.2)" : "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.14)",
      color: "#fff",
      cursor: trip.pricing.maxCouples === 0 ? "not-allowed" : "pointer",
    }}
  >
    Shared (per couple)
  </button>
</div>

{/* Quantity (group booking) */}
{availability ? (
  <div style={{ marginBottom: 12 }}>
    <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: 0.2, color: "rgba(255,255,255,0.75)", marginBottom: 6 }}>
      {bookingMode === "private" ? "People" : "Couples"}
    </div>

    {(() => {
      const sel =
  availability.slots.find((x) => x.id === selectedSlotId) ??
  availability.slots[0];

      const max =
        bookingMode === "private"
          ? (sel?.maxIndividualsBookable ?? 0)
          : (sel?.maxCouplesBookable ?? 0);

      const safeMax = Math.max(0, max);
      const safeValue = Math.min(quantity, safeMax || 1);

      // keep quantity in range automatically
   

      return (
        <select
          value={safeValue}
          onChange={(e) => setQuantity(Number(e.target.value))}
          disabled={!selectedSlotId || safeMax <= 0}
          style={{
            height: 46,
            padding: "0 14px",
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.22)",
            background: "rgba(0,0,0,0.45)",
            color: "rgba(255,255,255,0.95)",
            fontSize: 14,
            outline: "none",
            width: "100%",
            opacity: !selectedSlotId || safeMax <= 0 ? 0.55 : 1,
            cursor: !selectedSlotId || safeMax <= 0 ? "not-allowed" : "pointer",
          }}
        >
          {Array.from({ length: safeMax }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      );
    })()}
  </div>
) : null}



      {/* Price */}
      <div
        style={{
          marginBottom: 12,
          padding: 12,
          borderRadius: 14,
          background: "rgba(20,30,40,0.75)",

          border: "1px solid rgba(209,183,110,0.28)",
        }}
      >
       <b>€{price}</b>{" "}
<span style={{ fontSize: 12 }}>
  {bookingMode === "private"
    ? `${quantity} × €${trip.pricing.privatePrice} per person`
    : `${quantity} × €${trip.pricing.sharedCouplePrice} per couple`}
</span>


      </div>

      {/* Date + Check */}
      <div className="dateCheckGrid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10, marginBottom: 12 }}>
        <div style={{ position: "relative" }}>
          <input
            id="booking-date"
            type="date"
            value={date}
            onChange={(e) => {
  const next = e.target.value;
  setDate(next);
  setHold(null);
  setConfirmed(null);
  setAvailability(null);
  setSelectedSlotId("");
  void fetchAvailability(tripId, next); // ✅ instant refresh
}}

            style={{
              ...fieldInput,
              paddingRight: 52,
              appearance: "none",
              WebkitAppearance: "none",
            }}
          />

          <button
            className="calBtn"
            type="button"
            onClick={() => {
              const el = document.getElementById("booking-date") as HTMLInputElement | null;
              if (!el) return;

              const maybe = el as unknown as { showPicker?: () => void };
              if (typeof maybe.showPicker === "function") {
                maybe.showPicker();
                return;
              }

              el.focus();
              el.click();
            }}
            aria-label="Open calendar"
            style={{
              position: "absolute",
              top: "50%",
              right: 10,
              transform: "translateY(-50%)",
              height: 34,
              width: 38,
              borderRadius: 10,
              border: "1px solid rgba(98,208,255,0.55)",
              background: "rgba(98,208,255,0.20)",
              color: "rgba(255,255,255,0.95)",
              cursor: "pointer",
              display: "grid",
              placeItems: "center",
              fontSize: 16,
              fontWeight: 900,
              userSelect: "none",
            }}
          >
            📅
          </button>
        </div>

        <button type="button" onClick={onCheck} disabled={loading} style={{ ...btnBase, cursor: loading ? "not-allowed" : "pointer" }}>
          {loading ? "Loading..." : "Check availability"}
        </button>
      </div>

      {/* Slots */}
      <div style={{ display: "grid", gap: 10, marginBottom: 12 }}>
        {availability ? (
          availability.slots.map((s) => {
            const active = selectedSlotId === s.id;
          const disabled =
  (bookingMode === "shared" && s.maxCouplesBookable <= 0) ||
  (bookingMode === "private" && s.maxIndividualsBookable <= 0);


            return (
              <button key={s.id} type="button" disabled={disabled} onClick={() => setSelectedSlotId(s.id)} style={slotBtn(active, disabled)}>
              <span>{s.start && s.end ? `${s.start}–${s.end}` : (s.label || s.start)}</span>

                <span style={{ fontSize: 12, opacity: 0.75, whiteSpace: "nowrap" }}>
                 {bookingMode === "shared"
  ? `${s.maxCouplesBookable} couples max (${s.remainingSeats}/${s.totalSeats} seats left)`
  : `${s.maxIndividualsBookable} people max (${s.remainingSeats}/${s.totalSeats} seats left)`}


                </span>
              </button>
            );
          })
        ) : (
          <div style={{ fontSize: 13, opacity: 0.8 }}>Select trip/date and check availability.</div>
        )}
      </div>

      {/* Customer */}
      <div style={{ display: "grid", gap: 12, marginBottom: 12 }}>
        <div style={fieldWrap}>
          <label style={fieldLabel}>Full name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" style={fieldInput} />
        </div>

        <div style={fieldWrap}>
          <label style={fieldLabel}>Phone (WhatsApp)</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+30 69…" style={fieldInput} />
        </div>

        <div style={fieldWrap}>
          <label style={fieldLabel}>Email (optional)</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" style={fieldInput} />
        </div>
      </div>

      {/* Hold */}
      <button
  type="button"
  onClick={onBookNow}
  disabled={loading || !selectedSlotId}
  style={{
    ...primaryBtn,
    opacity: loading || !selectedSlotId ? 0.55 : 1,
    cursor: loading || !selectedSlotId ? "not-allowed" : "pointer",
  }}
>
  {loading ? "Booking..." : "Book now"}
</button>

     

      {confirmed ? (
        <div
          style={{
            marginTop: 12,
            padding: 12,
            borderRadius: 14,
            background: "rgba(98,208,255,0.16)",
            border: "1px solid rgba(98,208,255,0.35)",
            color: "rgba(255,255,255,0.95)",
            fontWeight: 900,
            lineHeight: 1.35,
          }}
        >
          Booking confirmed ✅
          <div style={{ marginTop: 6, fontSize: 12, opacity: 0.8, fontWeight: 700 }}>
            Reservation ID: <b>{confirmed.reservationId}</b>
            <br />
            Total: <b>€{confirmed.priceEur}</b>
          </div>
        </div>
      ) : null}

      {error ? (
        <div
          style={{
            marginTop: 12,
            padding: 12,
            borderRadius: 14,
            background: "rgba(255, 80, 80, 0.10)",
            border: "1px solid rgba(255, 80, 80, 0.25)",
            color: "rgba(255,255,255,0.92)",
            fontWeight: 800,
            fontSize: 13,
            lineHeight: 1.4,
          }}
        >
          {error}
        </div>
      ) : null}

      <style>{`
        .calBtn:hover { filter: brightness(1.1); }
        .calBtn:active { transform: translateY(-50%) scale(0.98); }

        /* hide native icon, we use our own */
        input[type="date"]::-webkit-calendar-picker-indicator { opacity: 0; display: none; }

        input::placeholder{
  color: rgba(255,255,255,0.55) !important;
  opacity: 1 !important;
}


        @media (min-width: 720px) {
          .dateCheckGrid {
            grid-template-columns: 1fr 220px !important;
            align-items: end;
          }
        }
      `}</style>
    </div>
  );
}
