import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../../../../lib/db/mongoose";
import { Announcement } from "../../../../models/Announcement";
import { requireAdmin } from "../../../../lib/admin/requireAdmin";

function isObj(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

export async function GET() {
  try {
    await requireAdmin();
    await dbConnect();

    const doc =
      (await Announcement.findOne({ key: "home" }).lean()) ||
      (await Announcement.create({ key: "home" }).then((d) => d.toObject()));

    return NextResponse.json({ ok: true, announcement: doc });
  } catch (e: any) {
    const status = e?.status || 500;
    return NextResponse.json({ ok: false, error: e?.message || "Error" }, { status });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await requireAdmin();
    await dbConnect();

    const body = await req.json();
    if (!isObj(body)) return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });

    const update: any = {};
    if (typeof body.enabled === "boolean") update.enabled = body.enabled;
    if (typeof body.badge === "string") update.badge = body.badge;
    if (typeof body.title === "string") update.title = body.title;
    if (typeof body.message === "string") update.message = body.message;
    if (typeof body.buttonLabel === "string") update.buttonLabel = body.buttonLabel;
    if (typeof body.buttonHref === "string") update.buttonHref = body.buttonHref;

    const doc = await Announcement.findOneAndUpdate(
      { key: "home" },
      { $set: update, $setOnInsert: { key: "home" } },
      { upsert: true, new: true }
    ).lean();

    return NextResponse.json({ ok: true, announcement: doc });
  } catch (e: any) {
    const status = e?.status || 500;
    return NextResponse.json({ ok: false, error: e?.message || "Error" }, { status });
  }
}