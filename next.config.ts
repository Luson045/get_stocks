import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  api: {
    bodyParser: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
