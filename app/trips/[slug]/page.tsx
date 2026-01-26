import { notFound } from "next/navigation";
import BookingWidget from "../../../components/booking/BookingWidget";
import { TRIP_PAGES } from "../../../lib/trips/trips";

export default async function TripPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const trip = TRIP_PAGES.find((t) => t.slug === slug);
  if (!trip) return notFound();

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(24px, 4vw, 64px) 16px", color: "rgba(255,255,255,0.92)" }}>
      <div className="tripGrid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 28, alignItems: "start" }}>
        <div style={{ minWidth: 0 }}>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(32px, 5vw, 48px)", margin: "0 0 10px 0" }}>
            {trip.title}
          </h1>
          <p style={{ margin: 0, fontSize: 18, lineHeight: 1.7, opacity: 0.82, maxWidth: 760 }}>
            {trip.subtitle}
          </p>

          <div style={{ marginTop: 16, display: "flex", gap: 12, flexWrap: "wrap", opacity: 0.85, fontSize: 14 }}>
            <span>⏱ {trip.duration}</span>
            <span>📍 {trip.departure}</span>
          </div>

          <div style={{ marginTop: 18, display: "grid", gap: 12, maxWidth: 780 }}>
            {trip.description.map((p) => (
              <p key={p} style={{ margin: 0, fontSize: 16, lineHeight: 1.75, opacity: 0.78 }}>
                {p}
              </p>
            ))}
          </div>
        </div>

        <div
  style={{
    background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
    borderRadius: 28,
    padding: 18,
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
  }}
>
  <BookingWidget />
</div>

      </div>

      <style>{`
        @media (min-width: 900px) {
          .tripGrid { grid-template-columns: 1.2fr 0.8fr !important; gap: 28px !important; }
        }
      `}</style>
    </main>
  );
}
