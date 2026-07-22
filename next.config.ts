import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Both icon libraries ship as large barrel files — this rewrites imports
  // to their individual modules at build time so unused icons never make
  // it into the client bundle.
  experimental: {
    optimizePackageImports: ["lucide-react", "react-icons"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
