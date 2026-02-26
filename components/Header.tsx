"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

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
  const isMobile = useIsMobile(860);

  const [agentLoggedIn, setAgentLoggedIn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    fetch("/api/agent/me", { cache: "no-store", credentials: "same-origin" })
      .then((r) => setAgentLoggedIn(r.ok))
      .catch(() => {});
  }, []);

  // Close mobile menu when switching to desktop
  useEffect(() => {
    if (!isMobile) setMobileOpen(false);
  }, [isMobile]);

  // Close on ESC
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const nav: NavItem[] = useMemo(
    () => [
      { href: "/#trips", label: "Trips" },
      { href: "/boat", label: "Our Boats" },
      { href: "/#book", label: "Book now", cta: true },
      { href: "/contact", label: "Contact" },
      agentLoggedIn
        ? { href: "/agent/login", label: "Agent Dashboard" }
        : { href: "/agent/login", label: "Agents" },
      { href: "/admin/login", label: "Admin" },
    ],
    [agentLoggedIn]
  );

  function isActive(href: string) {
    // hash links should only be "active" when on homepage
    if (href.startsWith("/#")) return pathname === "/";

    // normal pages
    if (href === "/boat") return pathname === "/boat" || pathname?.startsWith("/boat/");
    return pathname === href || (href !== "/" && pathname?.startsWith(href));
  }

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
      {/* Top bar */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "10px 12px",
          height: 76,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          boxSizing: "border-box",
        }}
      >
        {/* LOGO = HOME */}
        <Link
          href="/"
          onClick={(e) => {
            // If already on homepage, just scroll to top smoothly
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              setMobileOpen(false);
              return;
            }
            setMobileOpen(false);
            setTimeout(() => {
              window.scrollTo({ top: 0, left: 0, behavior: "auto" });
            }, 0);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            color: "#111",
            fontWeight: 950,
            letterSpacing: -0.2,
            whiteSpace: "nowrap",
          }}
        >
          <img
            src="/newlogo.jpeg"
            alt="Ion Boats"
            style={{
              height: 56,
              width: "auto",
              display: "block",
              transform: "scale(1.08)",
              transformOrigin: "left center",
            }}
          />
        </Link>

        {/* DESKTOP NAV */}
        {!isMobile ? (
          <nav style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
            {nav.map((x) => {
              const active = isActive(x.href);
              const isCta = !!x.cta;

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
        ) : (
          /* MOBILE MENU BUTTON */
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileOpen((v) => !v)}
            style={{
              height: 42,
              width: 48,
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.14)",
              background: "#fff",
              color: "#111",
              fontWeight: 950,
              fontSize: 20,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              lineHeight: 1,
            }}
          >
            ☰
          </button>
        )}
      </div>

      {/* MOBILE DROPDOWN */}
      {isMobile && mobileOpen ? (
        <div
          style={{
            borderTop: "1px solid rgba(0,0,0,0.08)",
            background: "#ffffff",
          }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "10px 12px" }}>
            <div style={{ display: "grid", gap: 10 }}>
              {nav.map((x) => {
                const active = isActive(x.href);
                const isCta = !!x.cta;

                return (
                  <a
                    key={x.href}
                    href={x.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      height: 44,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0 14px",
                      borderRadius: 14,
                      textDecoration: "none",
                      fontWeight: 900,
                      fontSize: 14,
                      color: isCta ? "#fff" : "#111",
                      background: isCta
                        ? "linear-gradient(135deg, #1e88ff, #0d5bd7)"
                        : active
                        ? "rgba(13,91,215,0.08)"
                        : "rgba(0,0,0,0.03)",
                      border: isCta
                        ? "1px solid rgba(0,0,0,0.08)"
                        : active
                        ? "1px solid rgba(13,91,215,0.22)"
                        : "1px solid rgba(0,0,0,0.10)",
                    }}
                  >
                    <span>{x.label}</span>
                    <span style={{ opacity: 0.55, fontWeight: 900 }}>›</span>
                  </a>
                );
              })}
            </div>

            {/* Tap outside area */}
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              style={{
                marginTop: 10,
                width: "100%",
                height: 40,
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.12)",
                background: "#fff",
                fontWeight: 900,
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}