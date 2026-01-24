"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { TRIPS, type TripId } from "../../lib/booking/catalog";

type SlotView = {
  id: string;
  label: string;
  start?: string;
  end?: string;
  isPrivateHeld?: boolean;
  isPrivateReserved?: boolean;
  sharedMaxCouples?: number;
  remainingCouples?: number;
};

type BookingMode = "shared" | "private";

function formatTodayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function AgentDashboardPage() {
  const router = useRouter();

  const [agentName, setAgentName] = useState<string>("");

  const [tripId, setTripId] = useState<TripId>("paleo");
  const [date, setDate] = useState<string>(formatTodayISO());

  const [bookingMode, setBookingMode] = useState<BookingMode>("shared");
  const [slotId, setSlotId] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1); // couples when shared, “1” for private

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<"pay_on_arrival" | "paid_to_agent" | "invoice">("pay_on_arrival");
  const [notes, setNotes] = useState("");

  const [slots, setSlots] = useState<SlotView[]>([]);
  const [loadingAvail, setLoadingAvail] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const trip = useMemo(() => TRIPS.find((t) => t.id === tripId)!, [tripId]);

  // auth gate
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/agent/me", { cache: "no-store" });
      if (!res.ok) {
        router.replace("/agent/login");
        return;
      }
      const data = await res.json();
      setAgentName(data?.agent?.name || "");
    })();
  }, [router]);

  async function loadAvailability(nextTripId = tripId, nextDate = date, opts?: { keepMsg?: boolean }) {
  if (!opts?.keepMsg) setMsg(null);
  setLoadingAvail(true);
  setSlots([]);
  setSlotId("");

  try {
    const res = await fetch(
      `/api/booking/availability?tripId=${encodeURIComponent(nextTripId)}&date=${encodeURIComponent(nextDate)}`,
      { cache: "no-store", headers: { accept: "application/json" } }
    );

    const data = await res.json();

    if (!res.ok) {
      setMsg(data?.error || "Failed to load availability.");
      return;
    }

    const arr = Array.isArray(data?.slots) ? data.slots : [];
    const normalized = arr
      .map((s: any) => ({
        id: String(s?.id ?? ""),
        label: String(s?.label ?? s?.start ?? s?.id ?? ""),
        start: s?.start ? String(s.start) : undefined,
        end: s?.end ? String(s.end) : undefined,
        isPrivateHeld: Boolean(s?.isPrivateHeld),
        isPrivateReserved: Boolean(s?.isPrivateReserved),
        sharedMaxCouples: typeof s?.sharedMaxCouples === "number" ? s.sharedMaxCouples : Number(s?.sharedMaxCouples),
        remainingCouples: typeof s?.remainingCouples === "number" ? s.remainingCouples : Number(s?.remainingCouples),
      }))
      .filter((x: any) => x.id);

    setSlots(normalized);

    const firstUsable = normalized.find((s: any) => !(s.isPrivateHeld || s.isPrivateReserved)) || normalized[0] || null;
    if (firstUsable) setSlotId(firstUsable.id);
  } catch {
    setMsg("Failed to load availability.");
  } finally {
    setLoadingAvail(false);
  }
}


  // auto-load when trip/date changes
  useEffect(() => {
    void loadAvailability(tripId, date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripId, date]);

  const selectedSlot = useMemo(() => slots.find((s) => s.id === slotId) || null, [slots, slotId]);

  async function logout() {
    await fetch("/api/agent/logout", { method: "POST" }).catch(() => {});
    router.replace("/agent/login");
  }

  async function confirmReservation() {
  setMsg(null);

  if (!tripId || !date || !slotId) {
    setMsg("Select trip, date and slot.");
    return;
  }
  if (!customerName.trim() || !customerPhone.trim()) {
    setMsg("Customer name and phone are required.");
    return;
  }

  setSubmitting(true);
  try {
    const res = await fetch("/api/agent/reserve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tripId,
        date,
        slotId,
        bookingMode,
        quantity: 1, // schema forces 1
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim() ? customerEmail.trim() : undefined,
        paymentStatus,
        notes: notes.trim() ? notes.trim() : undefined,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      setMsg(result?.error || result?.detail || "Reservation failed.");
      return;
    }

    setMsg(`✅ Confirmed (${result?.reservation?.id || "OK"})`);

    setCustomerName("");
    setCustomerPhone("");
    setCustomerEmail("");
    setNotes("");

    // refresh availability but keep success message
    await loadAvailability(tripId, date, { keepMsg: true });
  } catch {
    setMsg("Network error.");
  } finally {
    setSubmitting(false);
  }
}


  return (
    <main style={{ minHeight: "100vh", background: "#fff", padding: 16 }}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 22 }}>Agent Dashboard</h1>
            <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>
              Logged in as: <strong>{agentName || "Agent"}</strong>
            </div>
          </div>

          <button
            onClick={logout}
            style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #ddd", background: "#fff", cursor: "pointer", fontWeight: 700 }}
          >
            Logout
          </button>
        </div>

        <div style={{ border: "1px solid #e6e6e6", borderRadius: 12, padding: 14, boxShadow: "0 6px 22px rgba(0,0,0,0.05)", marginBottom: 14 }}>
          <h2 style={{ margin: 0, marginBottom: 10, fontSize: 16 }}>1) Select Trip & Date</h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 10 }}>
            <div>
              <div style={{ fontSize: 13, marginBottom: 6 }}>Trip</div>
              <select
                value={tripId}
                onChange={(e) => setTripId(e.target.value as TripId)}
                style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #d8d8d8", outline: "none", background: "#fff" }}
              >
                {TRIPS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title} — {t.durationLabel} — {t.meetingPoint}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div style={{ fontSize: 13, marginBottom: 6 }}>Date</div>
              <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="date"
                style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #d8d8d8", outline: "none" }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "end" }}>
              <button
                onClick={() => loadAvailability(tripId, date)}
                disabled={loadingAvail}
                style={{ padding: "10px 12px", borderRadius: 10, border: "none", background: "#111", color: "#fff", cursor: loadingAvail ? "not-allowed" : "pointer", fontWeight: 800, width: 150 }}
              >
                {loadingAvail ? "Loading..." : "Load slots"}
              </button>
            </div>
          </div>

          <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => setBookingMode("shared")}
              disabled={trip.pricing.maxCouples === 0}
              style={{
                padding: "10px 12px",
                borderRadius: 999,
                border: "1px solid #ddd",
                background: bookingMode === "shared" ? "#111" : "#fff",
                color: bookingMode === "shared" ? "#fff" : "#111",
                cursor: trip.pricing.maxCouples === 0 ? "not-allowed" : "pointer",
                fontWeight: 800,
                opacity: trip.pricing.maxCouples === 0 ? 0.5 : 1,
              }}
            >
              Shared (€{trip.pricing.sharedCouplePrice}/couple)
            </button>

            <button
              type="button"
              onClick={() => setBookingMode("private")}
              style={{
                padding: "10px 12px",
                borderRadius: 999,
                border: "1px solid #ddd",
                background: bookingMode === "private" ? "#111" : "#fff",
                color: bookingMode === "private" ? "#fff" : "#111",
                cursor: "pointer",
                fontWeight: 800,
              }}
            >
              Private (€{trip.pricing.privatePrice})
            </button>
          </div>
        </div>

        <div style={{ border: "1px solid #e6e6e6", borderRadius: 12, padding: 14, boxShadow: "0 6px 22px rgba(0,0,0,0.05)", marginBottom: 14 }}>
          <h2 style={{ margin: 0, marginBottom: 10, fontSize: 16 }}>2) Slot & Quantity</h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 180px", gap: 10 }}>
            <div>
              <div style={{ fontSize: 13, marginBottom: 6 }}>Slot</div>
              <select
                value={slotId}
                onChange={(e) => setSlotId(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #d8d8d8", outline: "none", background: "#fff" }}
              >
                <option value="">Select a slot</option>
                {slots.map((s) => {
                  const blocked = s.isPrivateHeld || s.isPrivateReserved;
                  const rem = Number.isFinite(s.remainingCouples as number) ? (s.remainingCouples as number) : null;
                  const max = Number.isFinite(s.sharedMaxCouples as number) ? (s.sharedMaxCouples as number) : null;

                  const suffix =
                    bookingMode === "shared"
                      ? blocked
                        ? " — BLOCKED"
                        : rem != null && max != null
                        ? ` — ${rem}/${max} couples`
                        : ""
                      : blocked
                      ? " — BLOCKED"
                      : "";

                  return (
                    <option key={s.id} value={s.id}>
                      {(s.start && s.end ? `${s.start}–${s.end}` : s.label) + suffix}
                    </option>
                  );
                })}
              </select>

              {selectedSlot ? (
                <div style={{ marginTop: 8, fontSize: 13, color: "#555" }}>
                  Time: <strong>{selectedSlot.start && selectedSlot.end ? `${selectedSlot.start}–${selectedSlot.end}` : selectedSlot.label}</strong>
                  {bookingMode === "shared" ? (
                    <>
                      {" "}
                      • Couples left:{" "}
                      <strong>
                        {Number.isFinite(selectedSlot.remainingCouples as number) ? selectedSlot.remainingCouples : "?"}
                      </strong>
                    </>
                  ) : null}
                </div>
              ) : null}
            </div>

            <div>
              <div style={{ fontSize: 13, marginBottom: 6 }}>{bookingMode === "shared" ? "Qty (couples)" : "Qty"}</div>
              <input
                value={bookingMode === "private" ? 1 : quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                type="number"
                min={1}
                disabled={bookingMode === "private"}
                style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #d8d8d8", outline: "none", opacity: bookingMode === "private" ? 0.6 : 1 }}
              />
            </div>
          </div>
        </div>

        <div style={{ border: "1px solid #e6e6e6", borderRadius: 12, padding: 14, boxShadow: "0 6px 22px rgba(0,0,0,0.05)" }}>
          <h2 style={{ margin: 0, marginBottom: 10, fontSize: 16 }}>3) Customer details & Confirm</h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <div style={{ fontSize: 13, marginBottom: 6 }}>Customer Name</div>
              <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #d8d8d8", outline: "none" }} />
            </div>

            <div>
              <div style={{ fontSize: 13, marginBottom: 6 }}>Customer Phone</div>
              <input value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #d8d8d8", outline: "none" }} />
            </div>

            <div>
              <div style={{ fontSize: 13, marginBottom: 6 }}>Customer Email (optional)</div>
              <input value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} type="email" style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #d8d8d8", outline: "none" }} />
            </div>

            <div>
              <div style={{ fontSize: 13, marginBottom: 6 }}>Payment Status</div>
              <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value as any)} style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #d8d8d8", outline: "none", background: "#fff" }}>
                <option value="pay_on_arrival">Pay on arrival</option>
                <option value="paid_to_agent">Paid to agent</option>
                <option value="invoice">Invoice</option>
              </select>
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <div style={{ fontSize: 13, marginBottom: 6 }}>Notes (optional)</div>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #d8d8d8", outline: "none", resize: "vertical" }} />
            </div>
          </div>

          {msg ? (
            <div style={{ marginTop: 12, padding: 10, borderRadius: 10, background: msg.startsWith("✅") ? "#f1fff2" : "#fff6f6", border: msg.startsWith("✅") ? "1px solid #c9f1cc" : "1px solid #ffd6d6", color: msg.startsWith("✅") ? "#1b6b23" : "#8a1f1f", fontSize: 14 }}>
              {msg}
            </div>
          ) : null}

          <button onClick={confirmReservation} disabled={submitting} style={{ marginTop: 12, width: "100%", padding: "12px 12px", borderRadius: 10, border: "none", cursor: submitting ? "not-allowed" : "pointer", background: "#111", color: "#fff", fontWeight: 900 }}>
            {submitting ? "Confirming..." : "Confirm Reservation"}
          </button>
        </div>
      </div>
    </main>
  );
}
