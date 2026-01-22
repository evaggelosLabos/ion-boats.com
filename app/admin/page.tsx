"use client";

import { useEffect, useState } from "react";

type Reservation = {
  _id: string;
  tripId: string;
  date: string;
  slotId: string;
  bookingMode: "private" | "shared";
  quantity: number;
  priceEur: number;
  status: "confirmed" | "cancelled";
  customer: { name: string; phone: string; email?: string };
  createdAt?: string;
};

function todayISO(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function AdminPage() {
  const [date, setDate] = useState(todayISO());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rows, setRows] = useState<Reservation[]>([]);

  async function load(nextDate: string) {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/reservations?date=${encodeURIComponent(nextDate)}`, {
        headers: { accept: "application/json" },
        cache: "no-store",
      });

      if (res.status === 401) {
        window.location.href = `/admin/login?next=${encodeURIComponent("/admin")}`;
        return;
      }

      const data = (await res.json()) as any;

      if (!res.ok) {
        setError(data?.error || "Failed to load reservations");
        setRows([]);
        return;
      }

      setRows(Array.isArray(data?.reservations) ? data.reservations : []);
    } catch (e: any) {
      setError(e?.message || "Network error");
      setRows([]);
    } finally {
      setLoading(false);
    }
  }

  // ✅ refetch whenever date changes
  useEffect(() => {
    void load(date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: 18 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "end", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 900 }}>Admin — Reservations</h1>
          <div style={{ marginTop: 6, color: "rgba(0,0,0,0.65)", fontSize: 13 }}>
            Select a date to view reservations.
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "end", flexWrap: "wrap" }}>
          <div style={{ display: "grid", gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 800, color: "rgba(0,0,0,0.65)" }}>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                height: 42,
                padding: "0 12px",
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.15)",
                fontWeight: 800,
                outline: "none",
              }}
            />
          </div>

          <button
            type="button"
            onClick={() => load(date)}
            disabled={loading}
            style={{
              height: 42,
              padding: "0 14px",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.15)",
              background: "white",
              fontWeight: 900,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Loading…" : "Refresh"}
          </button>
        </div>
      </div>

      {error ? (
        <div
          style={{
            marginTop: 14,
            padding: 12,
            borderRadius: 12,
            border: "1px solid rgba(255, 80, 80, 0.35)",
            background: "rgba(255, 80, 80, 0.08)",
            fontWeight: 800,
          }}
        >
          {error}
        </div>
      ) : null}

      <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
        {rows.length === 0 && !loading ? (
          <div style={{ padding: 14, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}>
            No reservations for <b>{date}</b>.
          </div>
        ) : null}

        {rows.map((r) => (
          <div
            key={r._id}
            style={{
              padding: 14,
              borderRadius: 14,
              border: "1px solid rgba(0,0,0,0.12)",
              display: "grid",
              gap: 8,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <div style={{ fontWeight: 900 }}>
                {r.slotId} • {r.tripId} • {r.bookingMode} • €{r.priceEur}
              </div>

              <div
                style={{
                  fontSize: 12,
                  fontWeight: 900,
                  padding: "6px 10px",
                  borderRadius: 999,
                  border: "1px solid rgba(0,0,0,0.12)",
                  background: r.status === "cancelled" ? "rgba(255,80,80,0.10)" : "rgba(80,200,120,0.10)",
                }}
              >
                {r.status}
              </div>
            </div>

            <div style={{ color: "rgba(0,0,0,0.75)" }}>
              <b>{r.customer?.name}</b> • {r.customer?.phone}
              {r.customer?.email ? ` • ${r.customer.email}` : ""}
            </div>

            <div style={{ fontSize: 12, color: "rgba(0,0,0,0.55)" }}>ID: {r._id}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
