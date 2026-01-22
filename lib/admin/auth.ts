import crypto from "crypto";

const COOKIE_NAME = "ion_admin_session";

function mustEnv(name: string): string {
  const v = process.env[name];
  if (!v || typeof v !== "string" || v.trim().length === 0) {
    throw new Error(`Missing ${name} in env`);
  }
  return v.trim();
}

function hmac(input: string): string {
  const secret = mustEnv("ADMIN_SESSION_SECRET");
  return crypto.createHmac("sha256", secret).update(input).digest("hex");
}

export type AdminSession = {
  u: string;
  iat: number;
};

export function getCookieName() {
  return COOKIE_NAME;
}

export function signSession(payload: AdminSession): string {
  const json = JSON.stringify(payload);
  const b64 = Buffer.from(json, "utf8").toString("base64url");
  const sig = hmac(b64);
  return `${b64}.${sig}`;
}

export function verifySession(token: string | undefined | null): AdminSession | null {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [b64, sig] = parts;
  const expected = hmac(b64);
  // timing safe compare
  const a = Buffer.from(sig, "hex");
  const b = Buffer.from(expected, "hex");
  if (a.length !== b.length) return null;
  if (!crypto.timingSafeEqual(a, b)) return null;

  try {
    const json = Buffer.from(b64, "base64url").toString("utf8");
    const obj = JSON.parse(json) as AdminSession;

    if (!obj || typeof obj.u !== "string" || typeof obj.iat !== "number") return null;

    // optional expiry: 14 days
    const ageMs = Date.now() - obj.iat;
    const maxAgeMs = 14 * 24 * 60 * 60 * 1000;
    if (ageMs > maxAgeMs) return null;

    return obj;
  } catch {
    return null;
  }
}

export function validateCredentials(username: string, password: string): boolean {
  const u = (process.env.ADMIN_USERNAME || "admin").trim();
  const p = mustEnv("ADMIN_PASSWORD");

  // constant-time-ish compare
  const bu = Buffer.from(username);
  const bp = Buffer.from(password);
  const tu = Buffer.from(u);
  const tp = Buffer.from(p);

  const uOk = bu.length === tu.length && crypto.timingSafeEqual(bu, tu);
  const pOk = bp.length === tp.length && crypto.timingSafeEqual(bp, tp);

  return uOk && pOk;
}
