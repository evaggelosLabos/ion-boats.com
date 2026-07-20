import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { dbConnect } from "../../../../lib/db/mongoose";
import { getCookieName, verifySession } from "../../../../lib/admin/auth";
import { MEDIA_SLOTS, getMediaSlot, mediaPathForSlot } from "../../../../lib/media/registry";
import { MediaAsset } from "../../../../models/MediaAsset";

export const runtime = "nodejs";

const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"]);

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getCookieName())?.value;
  return verifySession(token);
}

export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  const assets = await MediaAsset.find({ key: { $in: MEDIA_SLOTS.map((slot) => slot.key) } })
    .select({ key: 1, fileName: 1, contentType: 1, size: 1, updatedAt: 1 })
    .lean();

  const byKey = new Map(assets.map((asset) => [String(asset.key), asset]));

  return NextResponse.json({
    ok: true,
    slots: MEDIA_SLOTS.map((slot) => {
      const asset = byKey.get(slot.key);
      return {
        ...slot,
        src: mediaPathForSlot(slot.key),
        hasCustomImage: Boolean(asset),
        fileName: asset?.fileName ?? null,
        contentType: asset?.contentType ?? null,
        size: asset?.size ?? null,
        updatedAt: asset?.updatedAt ?? null,
      };
    }),
  });
}

export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const form = await req.formData().catch(() => null);
  if (!form) return NextResponse.json({ ok: false, error: "Invalid form data" }, { status: 400 });

  const key = String(form.get("key") ?? "");
  const slot = getMediaSlot(key);
  if (!slot) return NextResponse.json({ ok: false, error: "Unknown media slot" }, { status: 400 });

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "Missing image file" }, { status: 400 });
  }

  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    return NextResponse.json({ ok: false, error: "Upload a JPG, PNG, WebP, GIF, or AVIF image." }, { status: 400 });
  }

  if (file.size <= 0 || file.size > MAX_IMAGE_BYTES) {
    return NextResponse.json({ ok: false, error: "Image must be smaller than 10 MB." }, { status: 400 });
  }

  const data = Buffer.from(await file.arrayBuffer());

  await dbConnect();
  await MediaAsset.findOneAndUpdate(
    { key },
    {
      $set: {
        key,
        fileName: file.name || `${key}.image`,
        contentType: file.type,
        size: file.size,
        data,
      },
    },
    { upsert: true, new: true, runValidators: true }
  );

  return NextResponse.json({ ok: true, key, src: mediaPathForSlot(key) });
}
