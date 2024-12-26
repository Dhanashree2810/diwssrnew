import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['asset.wazl.in','diw.wazl.in','api-test.wazl.in'],
  },
};

export default nextConfig;
