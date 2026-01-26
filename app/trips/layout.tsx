export default function TripsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(1200px 800px at 20% 10%, rgba(98,208,255,0.20), transparent 60%), radial-gradient(900px 600px at 80% 30%, rgba(209,183,110,0.18), transparent 55%), linear-gradient(180deg, #06121a 0%, #071b25 60%, #06121a 100%)",
        color: "rgba(255,255,255,0.92)",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "clamp(22px, 4vw, 64px) clamp(14px, 3vw, 20px)",
        }}
      >
        {children}
      </div>

      {/* prevent accidental horizontal scroll */}
      <style>{`html, body { max-width: 100%; overflow-x: hidden; }`}</style>
    </main>
  );
}
