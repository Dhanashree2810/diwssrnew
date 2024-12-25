import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['asset.wazl.in'],
  },
};

export default nextConfig;
