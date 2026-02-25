"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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

type NavItem = { href: string; label: string; cta?: boolean };

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useIsMobile(860);

  const [agentLoggedIn, setAgentLoggedIn] = useState(false);

  useEffect(() => {
    fetch("/api/agent/me", { cache: "no-store", credentials: "same-origin" })
      .then((r) => setAgentLoggedIn(r.ok))
      .catch(() => {});
  }, []);

  const nav: NavItem[] = [
    { href: "/#trips", label: "Trips" },
    { href: "/#book", label: "Book now", cta: true },
    { href: "/contact", label: "Contact" },
    agentLoggedIn
      ? { href: "/agent/login", label: "Agent Dashboard" }
      : { href: "/agent/login", label: "Agents" },
    { href: "/admin/login", label: "Admin" },
  ];

  const LOGO_BLOCK_PX = 84;
  const LOGO_LEFT_PX = 12;
  const LOGO_GAP_PX = 12;
  const mobileNavLeftPadding = LOGO_LEFT_PX + LOGO_BLOCK_PX + LOGO_GAP_PX;

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "#ffffff",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      <div style={{ position: "relative", height: 100, display: "flex", alignItems: "center" }}>
        {/* LOGO */}
        <Link
          href="/"
          onClick={(e) => {
            // If already on homepage, just scroll to top smoothly
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              return;
            }
            // If not on homepage, let Link do the navigation.
            // Then scroll to top after route change.
            // (Small delay so it happens after navigation)
            setTimeout(() => {
              window.scrollTo({ top: 0, left: 0, behavior: "auto" });
            }, 0);
          }}
          style={{
            position: "absolute",
            left: LOGO_LEFT_PX,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            color: "#111",
            fontWeight: 950,
            letterSpacing: -0.2,
            whiteSpace: "nowrap",
            pointerEvents: "auto",
            zIndex: 5,
          }}
        >
          <div style={{ height: 60, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img
              src="/newlogo.jpeg"
              alt="Ion Boats"
              style={{
                height: 70,
                width: "auto",
                display: "block",
                transform: "scale(1.2)",
                transformOrigin: "center",
              }}
            />
          </div>

          {!isMobile && <span style={{ fontSize: 15, fontWeight: 900, opacity: 0.9 }} />}
        </Link>

        {/* NAV */}
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "8px 14px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingLeft: isMobile ? mobileNavLeftPadding : 14,
            boxSizing: "border-box",
          }}
        >
          <nav style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
            {nav.map((x) => {
              const isCta = !!x.cta;
              const active = pathname === x.href || (x.href !== "/" && pathname?.startsWith(x.href));

              return (
                <a
                  key={x.href}
                  href={x.href}
                  style={{
                    height: 38,
                    display: "inline-flex",
                    alignItems: "center",
                    padding: isCta ? "0 16px" : "0 12px",
                    borderRadius: 999,
                    textDecoration: "none",
                    fontWeight: 900,
                    fontSize: 13,
                    whiteSpace: "nowrap",
                    color: isCta ? "#fff" : "#111",
                    background: isCta
                      ? "linear-gradient(135deg, #1e88ff, #0d5bd7)"
                      : active
                      ? "rgba(13,91,215,0.08)"
                      : "#ffffff",
                    border: isCta
                      ? "1px solid rgba(0,0,0,0.08)"
                      : active
                      ? "1px solid rgba(13,91,215,0.22)"
                      : "1px solid rgba(0,0,0,0.12)",
                    boxShadow: isCta ? "0 8px 20px rgba(30,136,255,0.28)" : "none",
                    transition: "transform 120ms ease, box-shadow 120ms ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.04)";
                    if (isCta) e.currentTarget.style.boxShadow = "0 10px 26px rgba(30,136,255,0.35)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    if (isCta) e.currentTarget.style.boxShadow = "0 8px 20px rgba(30,136,255,0.28)";
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