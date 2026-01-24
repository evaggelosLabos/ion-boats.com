import { cookies, headers } from "next/headers";
import bcrypt from "bcryptjs";
import { connectMongoose } from "../../lib/db/mongoose";
import { AgentModel, AgentSessionModel } from "../../lib/db/agentModels";
import { AGENT_SESSION_COOKIE, AGENT_SESSION_DAYS } from "../../lib/agent/constants";
import { newSessionToken, sha256 } from "../../lib/agent/security";

export async function createAgentSessionCookie(agentId: string) {
  await connectMongoose();

  const token = newSessionToken();
  const tokenHash = sha256(token);

  const expiresAt = new Date(
    Date.now() + AGENT_SESSION_DAYS * 24 * 60 * 60 * 1000
  );

  await AgentSessionModel.create({
    agentId,
    tokenHash,
    expiresAt,
  });

  const secure = process.env.NODE_ENV === "production";

  const cookieStore = await cookies();
  cookieStore.set({
    name: AGENT_SESSION_COOKIE,
    value: token,
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });

  return { token, expiresAt };
}

export async function clearAgentSessionCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AGENT_SESSION_COOKIE)?.value;

  if (token) {
    await connectMongoose();
    await AgentSessionModel.deleteOne({ tokenHash: sha256(token) }).catch(() => {});
  }

  cookieStore.set({
    name: AGENT_SESSION_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });
}

export async function getAgentFromRequest() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AGENT_SESSION_COOKIE)?.value;
  if (!token) return null;

  await connectMongoose();
  const session = await AgentSessionModel.findOne({ tokenHash: sha256(token) }).lean();
  if (!session) return null;

  if (new Date(session.expiresAt).getTime() < Date.now()) return null;

  const agent = await AgentModel.findById(session.agentId).lean();
  if (!agent || !agent.isActive) return null;

  return {
    id: String(agent._id),
    name: agent.name,
    email: agent.email,
  };
}

export async function verifyAgentCredentials(email: string, password: string) {
  await connectMongoose();
  const agent = await AgentModel.findOne({ email: email.toLowerCase().trim() }).lean();
  if (!agent || !agent.isActive) return null;

  const ok = await bcrypt.compare(password, agent.passwordHash);
  if (!ok) return null;

  return {
    id: String(agent._id),
    name: agent.name,
    email: agent.email,
  };
}

/**
 * Helper for server-side calls to your existing /api/availability
 */
export async function getBaseUrlFromRequestHeaders() {
  const h = await headers();
  const host = h.get("host");
  if (!host) return null;
  const proto = process.env.NODE_ENV === "production" ? "https" : "http";
  return `${proto}://${host}`;
}
