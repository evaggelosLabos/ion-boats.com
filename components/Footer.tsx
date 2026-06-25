import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: 40,
        borderTop: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(10, 42, 28, 0.75)",

      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "26px 14px",
          display: "grid",
          gap: 18,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 14,
          }}
        >
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 950, fontSize: 16 }}>ion-boats</div>
            <div style={{ marginTop: 8, opacity: 0.75, lineHeight: 1.55, fontSize: 13 }}>
              Premium boat trips in Corfu. Fast booking requests, clear time slots, and local support.
            </div>

            <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a
                href="mailto:bookings@ion-boats.com"
                style={{
                  textDecoration: "none",
                  color: "rgba(255,255,255,0.88)",
                  fontWeight: 900,
                  fontSize: 13,
                  padding: "8px 10px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.06)",
                }}
              >
                bookings@ion-boats.com
              </a>
              <a
                href="tel:+306900000000"
                style={{
                  textDecoration: "none",
                  color: "rgba(255,255,255,0.88)",
                  fontWeight: 900,
                  fontSize: 13,
                  padding: "8px 10px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.06)",
                }}
              >
                +30 69 0000 0000
              </a>
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 950, fontSize: 14, marginBottom: 8 }}>Explore</div>
            <div style={{ display: "grid", gap: 8, fontSize: 13 }}>
             <Link href="/#trips" style={{ color: "rgba(255,255,255,0.82)", textDecoration: "none" }}>
  Trips
</Link>
             <Link href="/#book" style={{ color: "rgba(255,255,255,0.82)", textDecoration: "none" }}>
  Booking
</Link>
              <Link href="/contact" style={{ color: "rgba(255,255,255,0.82)", textDecoration: "none" }}>
                Contact
              </Link>
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 950, fontSize: 14, marginBottom: 8 }}>Admin</div>
            <div style={{ display: "grid", gap: 8, fontSize: 13 }}>
              <Link href="/admin/login" style={{ color: "rgba(255,255,255,0.82)", textDecoration: "none" }}>
                Reservations dashboard
              </Link>
              <Link href="/admin/login" style={{ color: "rgba(255,255,255,0.82)", textDecoration: "none" }}>
                Admin 
              </Link>
              <Link href="/agent/login" style={{ color: "rgba(255,255,255,0.82)", textDecoration: "none" }}>
                Agent 
              </Link>
            </div>
          </div>
        </div>

        

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
            opacity: 0.75,
            fontSize: 12,
            borderTop: "1px solid rgba(255,255,255,0.10)",
            paddingTop: 14,
          }}
        >
          <div>© {new Date().getFullYear()} ion-boats. All rights reserved.</div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
  <Link href="/terms-and-conditions" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>
    Terms
  </Link>
  <Link href="/privacy-policy" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>
    Privacy
  </Link>
  <Link href="/cookies" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>
    Cookies
  </Link>
</div>

        </div>
      </div>
    </footer>
  );
}
