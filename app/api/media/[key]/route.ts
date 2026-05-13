import { NextResponse } from "next/server";
import path from "path";
import { readFile } from "fs/promises";
import { dbConnect } from "../../../../lib/db/mongoose";
import { getMediaSlot } from "../../../../lib/media/registry";
import { MediaAsset } from "../../../../models/MediaAsset";

export const runtime = "nodejs";

const CONTENT_TYPES: Record<string, string> = {
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

function fallbackContentType(src: string) {
  return CONTENT_TYPES[path.extname(src).toLowerCase()] ?? "application/octet-stream";
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;
  const slot = getMediaSlot(key);

  if (!slot) {
    return NextResponse.json({ error: "Unknown media slot" }, { status: 404 });
  }

  await dbConnect();

  const asset = await MediaAsset.findOne({ key });
  if (asset?.data) {
    const bytes = new Uint8Array(asset.data);
    return new NextResponse(bytes, {
      headers: {
        "Content-Type": asset.contentType,
        "Content-Length": String(asset.size),
        "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
      },
    });
  }

  const relativePath = slot.fallbackSrc.replace(/^\/+/, "");
  const fullPath = path.join(process.cwd(), "public", relativePath);

  try {
    const bytes = await readFile(fullPath);
    return new NextResponse(new Uint8Array(bytes), {
      headers: {
        "Content-Type": fallbackContentType(slot.fallbackSrc),
        "Content-Length": String(bytes.byteLength),
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return NextResponse.json({ error: "Fallback image not found" }, { status: 404 });
  }
}
