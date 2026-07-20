import type { NextConfig } from "next";
import path from "path";
import { MEDIA_SLOTS } from "./lib/media/registry";

const nextConfig: NextConfig = {
  turbopack: {
    // FORCE ion-boats as the project root
    root: path.resolve(__dirname),
  },
  async rewrites() {
    return {
      beforeFiles: MEDIA_SLOTS.map((slot) => ({
        source: slot.fallbackSrc,
        destination: `/api/media/${encodeURIComponent(slot.key)}`,
      })),
    };
  },
};

export default nextConfig;
