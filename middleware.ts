import { NextRequest, NextResponse } from "next/server";
import { getMediaSlotByFallbackSrc } from "./lib/media/registry";

const COOKIE_NAME = "ion_admin_session";

type RateBucket = {
  count: number;
  resetAt: number;
};

type RateRule = {
  name: string;
  limit: number;
  windowMs: number;
};

const RATE_LIMITS: Array<{ test: (pathname: string, method: string) => boolean; rule: RateRule }> = [
  {
    test: (pathname, method) => method === "POST" && pathname === "/api/booking/hold",
    rule: { name: "booking-hold", limit: 8, windowMs: 60_000 },
  },
  {
    test: (pathname, method) => method === "POST" && pathname === "/api/booking/confirm",
    rule: { name: "booking-confirm", limit: 8, windowMs: 60_000 },
  },
  {
    test: (pathname) => pathname === "/api/booking/availability",
    rule: { name: "booking-availability", limit: 80, windowMs: 60_000 },
  },
  {
    test: (pathname, method) =>
      method === "POST" &&
      (pathname === "/api/admin/login" ||
        pathname === "/api/booking/admin/login" ||
        pathname === "/api/agent/login" ||
        pathname === "/api/agent/register"),
    rule: { name: "auth", limit: 10, windowMs: 10 * 60_000 },
  },
  {
    test: (pathname) => pathname.startsWith("/api/admin/"),
    rule: { name: "admin-api", limit: 160, windowMs: 60_000 },
  },
  {
    test: (pathname, method) => method === "POST" && pathname === "/api/agent/reserve",
    rule: { name: "agent-reserve", limit: 20, windowMs: 60_000 },
  },
];

const globalRateStore = globalThis as typeof globalThis & {
  __ionRateBuckets?: Map<string, RateBucket>;
  __ionRateLastSweep?: number;
};

function rateBuckets() {
  if (!globalRateStore.__ionRateBuckets) {
    globalRateStore.__ionRateBuckets = new Map<string, RateBucket>();
  }
  return globalRateStore.__ionRateBuckets;
}

function clientIp(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return (
    forwarded ||
    req.headers.get("x-real-ip") ||
    req.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

function matchRateRule(pathname: string, method: string) {
  return RATE_LIMITS.find(({ test }) => test(pathname, method))?.rule;
}

function rateLimitResponse(req: NextRequest, rule: RateRule) {
  const now = Date.now();
  const buckets = rateBuckets();

  if (!globalRateStore.__ionRateLastSweep || now - globalRateStore.__ionRateLastSweep > 60_000) {
    globalRateStore.__ionRateLastSweep = now;
    for (const [key, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(key);
    }
  }

  const key = `${rule.name}:${clientIp(req)}`;
  const current = buckets.get(key);
  const bucket =
    current && current.resetAt > now
      ? current
      : { count: 0, resetAt: now + rule.windowMs };

  bucket.count += 1;
  buckets.set(key, bucket);

  if (bucket.count <= rule.limit) return null;

  const retryAfter = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));
  return NextResponse.json(
    { ok: false, error: "Too many requests. Please try again shortly." },
    {
      status: 429,
      headers: {
        "Retry-After": String(retryAfter),
        "X-RateLimit-Limit": String(rule.limit),
        "X-RateLimit-Remaining": "0",
      },
    }
  );
}

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

  if (pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api")) {
    const rule = matchRateRule(pathname, req.method);
    if (rule) {
      const limited = rateLimitResponse(req, rule);
      if (limited) return limited;
    }

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
