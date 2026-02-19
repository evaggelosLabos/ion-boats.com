import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectMongoose } from "../../../../lib/db/mongoose";
import { AgentInviteModel, AgentModel } from "../../../../lib/db/agentModels";
import { newSessionToken, sha256 } from "../../../../lib/agent/security";

import { getCookieName, verifySession } from "../../../../lib/admin/auth";

async function requireAdmin(): Promise<{ u: string } | null> {

 const store = await cookies();
const token = store.get(getCookieName())?.value;

  const sess = verifySession(token);
  if (!sess) return null;
  return { u: sess.u };
}

export async function POST(req: Request) {
  try {
   const admin = await requireAdmin();   // ✅ await here

    if (!admin) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await req.json().catch(() => null);
    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim().toLowerCase();

    if (!name || !email) {
      return NextResponse.json({ error: "Missing name or email." }, { status: 400 });
    }

    await connectMongoose();

    const exists = await AgentModel.findOne({ email }).lean();
    if (exists) {
      return NextResponse.json({ error: "Agent already exists." }, { status: 400 });
    }

    const inviteToken = newSessionToken();
    const inviteTokenHash = sha256(inviteToken);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await AgentInviteModel.create({
      name,
      email,
      inviteTokenHash,
      expiresAt,
    });

    // Return relative URL (you can show it in admin UI)
    return NextResponse.json(
      {
        ok: true,
        inviteUrl: `/agent/register?token=${inviteToken}`,
        expiresAt,
      },
      { status: 200 }
    );
  } catch (e) {
    console.error("admin agent-invite error:", e);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
