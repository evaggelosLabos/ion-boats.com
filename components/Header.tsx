"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const nav = [
    { href: "/#trips", label: "Trips" },
    { href: "/#book", label: "Book" },
    { href: "/contact", label: "Contact" },
    { href: "/admin/login", label: "Admin" },

  ];

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        background: "rgba(16, 60, 40, 0.62)",

        borderBottom: "1px solid rgba(255,255,255,0.10)",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "12px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        {/* Brand */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            color: "rgba(255,255,255,0.92)",
            fontWeight: 950,
            letterSpacing: -0.2,
          }}
        >
          <span
            style={{
              height: 34,
              width: 34,
              borderRadius: 12,
              display: "grid",
              placeItems: "center",
              background: "rgba(98,208,255,0.16)",
              border: "1px solid rgba(98,208,255,0.35)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              fontSize: 16,
            }}
            aria-hidden
          >
            ⛵
          </span>
          <span style={{ lineHeight: 1.05 }}>
            ION Boats
            <span style={{ display: "block", fontSize: 12, fontWeight: 800, opacity: 0.7 }}>
              Corfu Boat Trips
            </span>
          </span>
        </Link>

        {/* Nav */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}
        >
          {nav.map((x) => {
            const active = pathname === x.href || (x.href !== "/" && pathname?.startsWith(x.href));
            return (
              <a
                key={x.href}
                href={x.href}
                style={{
                  height: 38,
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0 12px",
                  borderRadius: 999,
                  textDecoration: "none",
                  fontWeight: 900,
                  fontSize: 13,
                  color: "rgba(255,255,255,0.88)",
                  background: active ? "rgba(98,208,255,0.18)" : "rgba(255,255,255,0.06)",
                  border: active ? "1px solid rgba(98,208,255,0.35)" : "1px solid rgba(255,255,255,0.12)",
                  transition: "transform 120ms ease, filter 120ms ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.03)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
                }}
              >
                {x.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
