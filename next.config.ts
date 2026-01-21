import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    // FORCE ion-boats as the project root
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
