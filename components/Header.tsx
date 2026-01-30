"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function useIsMobile(breakpoint = 860) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const calc = () => setIsMobile(window.innerWidth <= breakpoint);
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [breakpoint]);

  return isMobile;
}

export default function Header() {
  const pathname = usePathname();
  const isMobile = useIsMobile(860);

  const nav = [
    { href: "/#trips", label: "Trips" },
    { href: "/#book", label: "Book" },
    { href: "/contact", label: "Contact" },
    { href: "/admin/login", label: "Admin" },
  ];

  // ✅ Reserve space for the logo on mobile so nav never goes underneath it
  const LOGO_BLOCK_PX = 84; // white square size
  const LOGO_LEFT_PX = 12;  // left offset
  const LOGO_GAP_PX = 12;   // breathing space between logo and nav
  const mobileNavLeftPadding = LOGO_LEFT_PX + LOGO_BLOCK_PX + LOGO_GAP_PX;

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
          position: "relative",
          height: 100,
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* LOGO (absolute, always left) */}
        <Link
          href="/"
          style={{
            position: "absolute",
            left: LOGO_LEFT_PX,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            color: "rgba(255,255,255,0.92)",
            fontWeight: 950,
            letterSpacing: -0.2,
            whiteSpace: "nowrap",
            pointerEvents: "auto",
          }}
        >
          <div
            style={{
              height: LOGO_BLOCK_PX,
              width: LOGO_BLOCK_PX,
              borderRadius: 18,
              display: "grid",
              placeItems: "center",
              background: "#ffffff",
              border: "2px solid rgba(0,0,0,0.15)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
              flex: "0 0 auto",
            }}
          >
            <img
              src="/transparent-logo.webp"
              alt="ion boats"
              style={{
                height: 76,
                width: "auto",
                display: "block",
                transform: "scale(1.55)",
                transformOrigin: "center",
                filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.35))",
              }}
            />
          </div>

          {/* ✅ On mobile hide the text so it doesn’t eat header width */}
          {!isMobile && (
            <span style={{ fontSize: 15, fontWeight: 900, opacity: 0.85 }}>
              ion boats
            </span>
          )}
        </Link>

        {/* NAV CONTAINER */}
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "8px 14px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",

            // ✅ key: push nav to the right on mobile so it never sits under the logo
            paddingLeft: isMobile ? mobileNavLeftPadding : 14,
            boxSizing: "border-box",
          }}
        >
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
              const active =
                pathname === x.href ||
                (x.href !== "/" && pathname?.startsWith(x.href));

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
                    background: active
                      ? "rgba(98,208,255,0.18)"
                      : "rgba(255,255,255,0.06)",
                    border: active
                      ? "1px solid rgba(98,208,255,0.35)"
                      : "1px solid rgba(255,255,255,0.12)",
                    transition: "transform 120ms ease, filter 120ms ease",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.transform =
                      "scale(1.03)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.transform =
                      "scale(1)";
                  }}
                >
                  {x.label}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}

