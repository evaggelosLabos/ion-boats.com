import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectMongoose } from "../../../../lib/db/mongoose";
import { AgentInviteModel, AgentModel } from "../../../../lib/db/agentModels";
import { sha256 } from "../../../../lib/agent/security";

function strongEnough(pw: string) {
  return pw.length >= 8;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const token = String(body?.token ?? "");
    const password = String(body?.password ?? "");

    if (!token || !password) {
      return NextResponse.json({ error: "Missing token or password." }, { status: 400 });
    }
    if (!strongEnough(password)) {
      return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
    }

    await connectMongoose();

    const invite = await AgentInviteModel.findOne({ inviteTokenHash: sha256(token) });
    if (!invite) {
      return NextResponse.json({ error: "Invalid or expired invite." }, { status: 400 });
    }
    if (invite.usedAt) {
      return NextResponse.json({ error: "Invite already used." }, { status: 400 });
    }
    if (invite.expiresAt.getTime() < Date.now()) {
      return NextResponse.json({ error: "Invite expired." }, { status: 400 });
    }

    const email = String(invite.email).toLowerCase().trim();
    const exists = await AgentModel.findOne({ email }).lean();
    if (exists) {
      return NextResponse.json({ error: "Agent already exists." }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const agent = await AgentModel.create({
      name: invite.name,
      email,
      passwordHash,
      isActive: true,
    });

    invite.usedAt = new Date();
    invite.usedByAgentId = agent._id;
    await invite.save();

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    console.error("agent register error:", e);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
