
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
  status: "pending" | "confirmed" | "cancelled";
  customer: { name: string; phone: string; email?: string };
  createdAt?: string;
};

type ReservationsResponse =
  | { ok: true; date: string; reservations: Reservation[] }
  | { ok: true; startDate: string; endDate: string; reservations: Reservation[] }
  | { ok: false; error?: string };

type Announcement = {
  enabled: boolean;
  badge: string;
  title: string;
  message: string;
  buttonLabel: string;
  buttonHref: string;
};

type AnnouncementResponse =
  | { ok: true; announcement: any }
  | { ok: false; error?: string };

function todayISO(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function addDaysISO(baseISO: string, days: number): string {
  const [year, month, day] = baseISO.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  d.setDate(d.getDate() + days);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function nextDays(count: number): string[] {
  const today = todayISO();
  return Array.from({ length: count }, (_, i) => addDaysISO(today, i));
}

function formatDayLabel(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  }).format(new Date(year, month - 1, day));
}

export default function AdminClient() {
  const [view, setView] = useState<"reservations" | "announcement">("reservations");

  // Reservations state
  const [date, setDate] = useState(todayISO());
  const [loading, setLoading] = useState(false);
  const [rangeLoading, setRangeLoading] = useState(false);
  const [error, setError] = useState("");
  const [rangeError, setRangeError] = useState("");
  const [rows, setRows] = useState<Reservation[]>([]);
  const [rangeRows, setRangeRows] = useState<Reservation[]>([]);

  // Announcement state
  const [annLoading, setAnnLoading] = useState(false);
  const [annSaving, setAnnSaving] = useState(false);
  const [annError, setAnnError] = useState("");
  const [annStatus, setAnnStatus] = useState("");
  const [ann, setAnn] = useState<Announcement>({
    enabled: true,
    badge: "NEW",
    title: "Onboard Comfort & Personal Requests",
    message:
      "Our boats are fully equipped to provide a comfortable and premium experience at sea.\n\nIf you would like something more personalized (specific wine/champagne, snacks, or any special request), our team will do its best to arrange it for you.\n\nOur goal is to make your experience exactly the way you imagine it.",
    buttonLabel: "Request Extras",
    buttonHref: "/contact",
  });

  async function load(nextDate: string) {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/reservations?date=${encodeURIComponent(nextDate)}`, {
        headers: { accept: "application/json" },
        cache: "no-store",
        credentials: "include",
      });

      const data: ReservationsResponse = (await res.json().catch(() => ({ ok: false }))) as ReservationsResponse;

      if (!res.ok || data.ok === false) {
        setError(data.ok === false && data.error ? data.error : "Failed to load reservations");
        setRows([]);
        return;
      }

      setRows(Array.isArray(data.reservations) ? data.reservations : []);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Network error";
      setError(msg);
      setRows([]);
    } finally {
      setLoading(false);
    }
  }

  async function loadNext15Days() {
    const days = nextDays(15);
    const startDate = days[0];
    const endDate = days[days.length - 1];

    setRangeLoading(true);
    setRangeError("");

    try {
      const res = await fetch(
        `/api/admin/reservations?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`,
        {
          headers: { accept: "application/json" },
          cache: "no-store",
          credentials: "include",
        }
      );

      const data: ReservationsResponse = (await res.json().catch(() => ({ ok: false }))) as ReservationsResponse;

      if (!res.ok || data.ok === false) {
        setRangeError(data.ok === false && data.error ? data.error : "Failed to load upcoming reservations");
        setRangeRows([]);
        return;
      }

      setRangeRows(Array.isArray(data.reservations) ? data.reservations : []);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Network error";
      setRangeError(msg);
      setRangeRows([]);
    } finally {
      setRangeLoading(false);
    }
  }

  async function loadAnnouncement() {
    setAnnLoading(true);
    setAnnError("");
    setAnnStatus("");

    try {
      const res = await fetch(`/api/admin/announcement`, {
        headers: { accept: "application/json" },
        cache: "no-store",
        credentials: "include",
      });

      const data: AnnouncementResponse = (await res.json().catch(() => ({ ok: false }))) as AnnouncementResponse;

      if (!res.ok || data.ok === false) {
        setAnnError(data.ok === false && data.error ? data.error : "Failed to load announcement");
        return;
      }

      const a = (data as any).announcement || {};
      setAnn({
        enabled: !!a.enabled,
        badge: a.badge || "NEW",
        title: a.title || "",
        message: a.message || "",
        buttonLabel: a.buttonLabel || "Request Extras",
        buttonHref: a.buttonHref || "/contact",
      });

      setAnnStatus("Loaded ✅");
    } catch (e: any) {
      setAnnError(e?.message || "Network error");
    } finally {
      setAnnLoading(false);
    }
  }

  async function saveAnnouncement() {
    setAnnSaving(true);
    setAnnError("");
    setAnnStatus("");

    try {
      const res = await fetch(`/api/admin/announcement`, {
        method: "PUT",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        cache: "no-store",
        credentials: "include",
        body: JSON.stringify(ann),
      });

      const data: AnnouncementResponse = (await res.json().catch(() => ({ ok: false }))) as AnnouncementResponse;

      if (!res.ok || data.ok === false) {
        setAnnError(data.ok === false && data.error ? data.error : "Failed to save announcement");
        return;
      }

      setAnnStatus("Saved ✅ (refresh homepage to verify)");
    } catch (e: any) {
      setAnnError(e?.message || "Network error");
    } finally {
      setAnnSaving(false);
    }
  }

  useEffect(() => {
    if (view === "reservations") void load(date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, view]);

  useEffect(() => {
    if (view === "reservations") void loadNext15Days();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  useEffect(() => {
    if (view === "announcement") void loadAnnouncement();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  return (
    <main style={{ width: "100%", minHeight: "100vh", background: "#ffffff", color: "#0a0a0a" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: 18 }}>
        {/* Header row */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "end", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 26, fontWeight: 900 }}>Admin Dashboard</h1>
            <div style={{ marginTop: 6, color: "rgba(0,0,0,0.65)", fontSize: 13 }}>
              Manage reservations and homepage announcement.
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "end", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={async () => {
                await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
                window.location.href = "/admin/login";
              }}
              style={{
                height: 42,
                padding: "0 14px",
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.15)",
                background: "#ffffff",
                color: "#0a0a0a",
                fontWeight: 900,
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={() => setView("reservations")}
            style={{
              height: 40,
              padding: "0 14px",
              borderRadius: 999,
              border: "1px solid rgba(0,0,0,0.15)",
              background: view === "reservations" ? "rgba(13,91,215,0.10)" : "#fff",
              fontWeight: 900,
              cursor: "pointer",
            }}
          >
            Reservations
          </button>

          <button
            type="button"
            onClick={() => setView("announcement")}
            style={{
              height: 40,
              padding: "0 14px",
              borderRadius: 999,
              border: "1px solid rgba(0,0,0,0.15)",
              background: view === "announcement" ? "rgba(13,91,215,0.10)" : "#fff",
              fontWeight: 900,
              cursor: "pointer",
            }}
          >
            Home Announcement
          </button>
        </div>

        {/* ============== RESERVATIONS VIEW ============== */}
        {view === "reservations" ? (
          <>
            <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 950 }}>Next 15 days</div>
                  <div style={{ marginTop: 3, color: "rgba(0,0,0,0.58)", fontSize: 13 }}>
                    See upcoming requests and reservations without checking dates one by one.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={loadNext15Days}
                  disabled={rangeLoading}
                  style={{
                    height: 38,
                    padding: "0 12px",
                    borderRadius: 12,
                    border: "1px solid rgba(0,0,0,0.15)",
                    background: "#ffffff",
                    color: "#0a0a0a",
                    fontWeight: 900,
                    cursor: rangeLoading ? "not-allowed" : "pointer",
                    opacity: rangeLoading ? 0.7 : 1,
                  }}
                >
                  {rangeLoading ? "Loading..." : "Refresh overview"}
                </button>
              </div>

              {rangeError ? (
                <div
                  style={{
                    padding: 12,
                    borderRadius: 12,
                    border: "1px solid rgba(255, 80, 80, 0.35)",
                    background: "rgba(255, 80, 80, 0.08)",
                    fontWeight: 800,
                    color: "#0a0a0a",
                  }}
                >
                  {rangeError}
                </div>
              ) : null}

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 10 }}>
                {nextDays(15).map((day) => {
                  const dayRows = rangeRows.filter((r) => r.date === day);
                  const pending = dayRows.filter((r) => r.status === "pending").length;
                  const confirmed = dayRows.filter((r) => r.status === "confirmed").length;
                  const cancelled = dayRows.filter((r) => r.status === "cancelled").length;
                  const active = day === date;
                  const hasRows = dayRows.length > 0;

                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setDate(day)}
                      style={{
                        minHeight: 124,
                        padding: 12,
                        borderRadius: 14,
                        border: active ? "2px solid rgba(13,91,215,0.72)" : "1px solid rgba(0,0,0,0.12)",
                        background: hasRows ? "rgba(255,248,232,0.95)" : "#ffffff",
                        color: "#0a0a0a",
                        textAlign: "left",
                        cursor: "pointer",
                        boxShadow: hasRows ? "0 8px 24px rgba(0,0,0,0.07)" : "none",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "start" }}>
                        <div>
                          <div style={{ fontWeight: 950 }}>{formatDayLabel(day)}</div>
                          <div style={{ marginTop: 2, fontSize: 12, color: "rgba(0,0,0,0.55)", fontWeight: 800 }}>{day}</div>
                        </div>
                        <div
                          style={{
                            minWidth: 28,
                            height: 28,
                            borderRadius: 999,
                            display: "grid",
                            placeItems: "center",
                            background: hasRows ? "rgba(255,180,80,0.28)" : "rgba(0,0,0,0.06)",
                            fontSize: 12,
                            fontWeight: 950,
                          }}
                        >
                          {dayRows.length}
                        </div>
                      </div>

                      {hasRows ? (
                        <div style={{ marginTop: 10, display: "grid", gap: 6 }}>
                          <div style={{ fontSize: 12, color: "rgba(0,0,0,0.7)", fontWeight: 850 }}>
                            {pending} pending · {confirmed} confirmed · {cancelled} cancelled
                          </div>
                          <div style={{ display: "grid", gap: 4 }}>
                            {dayRows.slice(0, 2).map((r) => (
                              <div key={r._id} style={{ fontSize: 12, color: "rgba(0,0,0,0.74)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {r.tripId} · {r.bookingMode} · {r.customer?.name || "Guest"}
                              </div>
                            ))}
                            {dayRows.length > 2 ? (
                              <div style={{ fontSize: 12, fontWeight: 900, color: "rgba(0,0,0,0.55)" }}>+{dayRows.length - 2} more</div>
                            ) : null}
                          </div>
                        </div>
                      ) : (
                        <div style={{ marginTop: 18, fontSize: 12, color: "rgba(0,0,0,0.48)", fontWeight: 800 }}>
                          No reservations
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ marginTop: 14, display: "flex", gap: 10, alignItems: "end", flexWrap: "wrap" }}>
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
                    background: "#ffffff",
                    color: "#0a0a0a",
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
                  background: "#ffffff",
                  color: "#0a0a0a",
                  fontWeight: 900,
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? "Loading…" : "Refresh"}
              </button>
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
                  color: "#0a0a0a",
                }}
              >
                {error}
              </div>
            ) : null}

            <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
              {rows.length === 0 && !loading ? (
                <div style={{ padding: 14, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)", color: "rgba(0,0,0,0.85)" }}>
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
                    background: "#ffffff",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                    display: "grid",
                    gap: 8,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                    <div style={{ fontWeight: 900, color: "#0a0a0a" }}>
                      {r.slotId} • {r.tripId} • {r.bookingMode} • €{r.priceEur}
                    </div>

                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 900,
                        padding: "6px 10px",
                        borderRadius: 999,
                        border: "1px solid rgba(0,0,0,0.12)",
                        background:
                          r.status === "cancelled"
                            ? "rgba(255,80,80,0.12)"
                            : r.status === "pending"
                            ? "rgba(255,180,80,0.18)"
                            : "rgba(80,200,120,0.18)",
                        color: "#0a0a0a",
                      }}
                    >
                      {r.status}
                    </div>
                  </div>

                  <div style={{ color: "rgba(0,0,0,0.78)" }}>
                    <b>{r.customer?.name}</b> • {r.customer?.phone}
                    {r.customer?.email ? ` • ${r.customer.email}` : ""}
                  </div>

                  <div style={{ fontSize: 12, color: "rgba(0,0,0,0.55)" }}>ID: {r._id}</div>
                </div>
              ))}
            </div>
          </>
        ) : null}

        {/* ============== ANNOUNCEMENT VIEW ============== */}
        {view === "announcement" ? (
          <div style={{ marginTop: 14 }}>
            {(annError || annStatus) && (
              <div
                style={{
                  marginBottom: 12,
                  padding: 12,
                  borderRadius: 12,
                  border: annError ? "1px solid rgba(255, 80, 80, 0.35)" : "1px solid rgba(80,200,120,0.40)",
                  background: annError ? "rgba(255, 80, 80, 0.08)" : "rgba(80,200,120,0.14)",
                  fontWeight: 800,
                  color: "#0a0a0a",
                }}
              >
                {annError || annStatus}
              </div>
            )}

            <div style={{ padding: 14, borderRadius: 14, border: "1px solid rgba(0,0,0,0.12)", background: "#fff" }}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 950 }}>Homepage Announcement</div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button
                    type="button"
                    onClick={loadAnnouncement}
                    disabled={annLoading}
                    style={{
                      height: 42,
                      padding: "0 14px",
                      borderRadius: 12,
                      border: "1px solid rgba(0,0,0,0.15)",
                      background: "#ffffff",
                      color: "#0a0a0a",
                      fontWeight: 900,
                      cursor: annLoading ? "not-allowed" : "pointer",
                      opacity: annLoading ? 0.7 : 1,
                    }}
                  >
                    {annLoading ? "Loading…" : "Reload"}
                  </button>

                  <button
                    type="button"
                    onClick={saveAnnouncement}
                    disabled={annSaving}
                    style={{
                      height: 42,
                      padding: "0 14px",
                      borderRadius: 12,
                      border: "1px solid rgba(0,0,0,0.15)",
                      background: "linear-gradient(135deg, #1e88ff, #0d5bd7)",
                      color: "#fff",
                      fontWeight: 950,
                      cursor: annSaving ? "not-allowed" : "pointer",
                      opacity: annSaving ? 0.8 : 1,
                    }}
                  >
                    {annSaving ? "Saving…" : "Save"}
                  </button>
                </div>
              </div>

              <div style={{ height: 12 }} />

              <label style={{ display: "flex", gap: 10, alignItems: "center", fontWeight: 900 }}>
                <input
                  type="checkbox"
                  checked={ann.enabled}
                  onChange={(e) => setAnn({ ...ann, enabled: e.target.checked })}
                />
                Show announcement on homepage
              </label>

              <div style={{ height: 12 }} />

              <div style={{ display: "grid", gap: 10 }}>
                <div style={{ display: "grid", gap: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 900, color: "rgba(0,0,0,0.65)" }}>Badge</div>
                  <input
                    value={ann.badge}
                    onChange={(e) => setAnn({ ...ann, badge: e.target.value })}
                    style={input}
                    placeholder="NEW"
                  />
                </div>

                <div style={{ display: "grid", gap: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 900, color: "rgba(0,0,0,0.65)" }}>Title</div>
                  <input
                    value={ann.title}
                    onChange={(e) => setAnn({ ...ann, title: e.target.value })}
                    style={input}
                    placeholder="Onboard Comfort & Personal Requests"
                  />
                </div>

                <div style={{ display: "grid", gap: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 900, color: "rgba(0,0,0,0.65)" }}>Message</div>
                  <textarea
                    value={ann.message}
                    onChange={(e) => setAnn({ ...ann, message: e.target.value })}
                    style={textarea}
                    placeholder="Write the announcement message..."
                  />
                </div>

                <div style={{ display: "grid", gap: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 900, color: "rgba(0,0,0,0.65)" }}>Button label</div>
                  <input
                    value={ann.buttonLabel}
                    onChange={(e) => setAnn({ ...ann, buttonLabel: e.target.value })}
                    style={input}
                    placeholder="Request Extras"
                  />
                </div>

                <div style={{ display: "grid", gap: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 900, color: "rgba(0,0,0,0.65)" }}>Button link</div>
                  <input
                    value={ann.buttonHref}
                    onChange={(e) => setAnn({ ...ann, buttonHref: e.target.value })}
                    style={input}
                    placeholder="/contact"
                  />
                </div>
              </div>

              <div style={{ height: 14 }} />

              <div style={{ fontSize: 12, color: "rgba(0,0,0,0.65)" }}>
                Tip: You can use line breaks in the message (press Enter). The homepage shows them nicely.
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}

const input: React.CSSProperties = {
  height: 42,
  padding: "0 12px",
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.15)",
  fontWeight: 800,
  outline: "none",
  background: "#ffffff",
  color: "#0a0a0a",
};

const textarea: React.CSSProperties = {
  minHeight: 160,
  padding: 12,
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.15)",
  fontWeight: 700,
  outline: "none",
  background: "#ffffff",
  color: "#0a0a0a",
  resize: "vertical",
};
