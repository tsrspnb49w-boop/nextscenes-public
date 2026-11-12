import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },

  images: {
    // Build-time variants; no runtime image optimizer on the 512 MiB server.
    loader: "custom",
    loaderFile: "./app/lib/publicImageLoader.ts",
    deviceSizes: [640, 960, 1200],
    imageSizes: [128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "grkvsllcpotylcvbecuj.supabase.co",
      },
    ],
  },
};

export default nextConfig;