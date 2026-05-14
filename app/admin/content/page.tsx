import Link from "next/link";
import { TRIP_PAGES } from "../../../lib/trips/trips";

const editPages = [
  { href: "/?ionTextEdit=1", label: "Homepage" },
  { href: "/boat?ionTextEdit=1", label: "Boat page" },
  { href: "/contact?ionTextEdit=1", label: "Contact page" },
  ...TRIP_PAGES.map((trip) => ({
    href: `/trips/${trip.slug}?ionTextEdit=1`,
    label: trip.title,
  })),
];

export default function AdminContentPage() {
  return (
    <main style={pageStyle}>
      <section style={shellStyle}>
        <div style={eyebrowStyle}>ION Boats Admin</div>
        <h1 style={titleStyle}>Text editor</h1>
        <p style={subtitleStyle}>
          Open a page in edit mode, click the text you want to change, then save. Visitors never see the editing tools.
        </p>

        <div style={actionsStyle}>
          <Link href="/admin/media" style={secondaryLinkStyle}>Photo manager</Link>
        </div>

        <div style={gridStyle}>
          {editPages.map((page) => (
            <Link key={page.href} href={page.href} style={cardStyle}>
              <span>{page.label}</span>
              <strong>Open editor</strong>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, #06121a 0%, #071b25 70%, #06121a 100%)",
  color: "#fff",
  padding: "34px 14px 64px",
};

const shellStyle: React.CSSProperties = { maxWidth: 980, margin: "0 auto" };
const eyebrowStyle: React.CSSProperties = { fontSize: 12, fontWeight: 900, letterSpacing: 1.2, opacity: 0.72, textTransform: "uppercase" };
const titleStyle: React.CSSProperties = { margin: "6px 0 8px", fontSize: "clamp(30px, 4vw, 46px)", fontFamily: "var(--font-serif)", fontWeight: 650 };
const subtitleStyle: React.CSSProperties = { margin: 0, maxWidth: 720, lineHeight: 1.6, color: "rgba(255,255,255,0.72)" };
const actionsStyle: React.CSSProperties = { margin: "18px 0 20px", display: "flex", gap: 10, flexWrap: "wrap" };
const secondaryLinkStyle: React.CSSProperties = { color: "#fff", textDecoration: "none", fontWeight: 900, border: "1px solid rgba(255,255,255,0.16)", borderRadius: 999, padding: "10px 14px", background: "rgba(255,255,255,0.07)" };
const gridStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 };
const cardStyle: React.CSSProperties = {
  display: "grid",
  gap: 8,
  minHeight: 110,
  padding: 16,
  borderRadius: 16,
  color: "#fff",
  textDecoration: "none",
  background: "rgba(255,255,255,0.07)",
  border: "1px solid rgba(255,255,255,0.13)",
};
