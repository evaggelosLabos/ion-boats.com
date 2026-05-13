import { NextRequest, NextResponse } from "next/server";
import { getMediaSlotByFallbackSrc } from "./lib/media/registry";

const COOKIE_NAME = "ion_admin_session";

function hexFromBytes(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(bytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeStringEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i += 1) {
    out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return out === 0;
}

function decodeBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  return atob(padded);
}

async function verifyAdminSession(token: string | undefined | null) {
  if (!token) return false;
  const [b64, sig, ...rest] = token.split(".");
  if (!b64 || !sig || rest.length) return false;

  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const expected = hexFromBytes(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(b64)));
  if (!timingSafeStringEqual(sig, expected)) return false;

  try {
    const payload = JSON.parse(decodeBase64Url(b64)) as { u?: unknown; iat?: unknown };
    if (typeof payload.u !== "string" || typeof payload.iat !== "number") return false;

    const ageMs = Date.now() - payload.iat;
    const maxAgeMs = 14 * 24 * 60 * 60 * 1000;
    return ageMs >= 0 && ageMs <= maxAgeMs;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/_next") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const mediaSlot = getMediaSlotByFallbackSrc(pathname);
  if (mediaSlot) {
    return NextResponse.rewrite(new URL(`/api/media/${encodeURIComponent(mediaSlot.key)}`, req.url));
  }

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = req.cookies.get(COOKIE_NAME)?.value;

    if (!(await verifyAdminSession(token))) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
