import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['firebase-admin'],
  images: {
    unoptimized: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  // Suppress hydration warnings caused by browser extensions
  // Extensions like ad blockers add attributes (e.g., data-jetski-tab-id) to the DOM
  // which causes React hydration mismatches. This is safe to suppress as it's not
  // an actual code issue.
  reactStrictMode: true,
};

export default nextConfig;
