export const metadata = {
  title: "Cookies Policy | ION Boats",
  description: "Information about cookies and how you can control them.",
};

export default function CookiesPage() {
  return (
    <main
  style={{
    minHeight: "100vh",
    background:
      "radial-gradient(1200px 800px at 20% 10%, rgba(98,208,255,0.20), transparent 60%), radial-gradient(900px 600px at 80% 30%, rgba(209,183,110,0.18), transparent 55%), linear-gradient(180deg, #06121a 0%, #071b25 60%, #06121a 100%)",
    color: "rgba(255,255,255,0.92)",
  }}
>
  <div style={{ maxWidth: 980, margin: "0 auto", padding: "clamp(24px, 4vw, 64px) 16px" }}>

      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(30px, 5vw, 46px)", margin: "0 0 10px 0" }}>
        Cookies Policy
      </h1>
      <p style={{ margin: 0, opacity: 0.8, lineHeight: 1.7 }}>
        Cookies are small text files stored on your device. We use them to make the site work properly and improve your experience.
      </p>

      <div style={{ marginTop: 18, display: "grid", gap: 14, lineHeight: 1.75, opacity: 0.82 }}>
        <section>
          <h2 style={{ margin: "0 0 6px 0", fontSize: 18 }}>Essential cookies</h2>
          <p style={{ margin: 0 }}>Required for core functionality (e.g. security, basic preferences).</p>
        </section>

        <section>
          <h2 style={{ margin: "0 0 6px 0", fontSize: 18 }}>Analytics / marketing cookies</h2>
          <p style={{ margin: 0 }}>
            If you use analytics or marketing tools, list them here and only enable them after consent (if required).
          </p>
        </section>

        <section>
          <h2 style={{ margin: "0 0 6px 0", fontSize: 18 }}>How to control cookies</h2>
          <p style={{ margin: 0 }}>
            You can control cookies via your browser settings. You can also change your consent using the cookie banner when available.
          </p>
        </section>
      </div>
      </div>
    </main>
  );
}
