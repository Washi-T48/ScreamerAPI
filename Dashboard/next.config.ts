import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://sardines.thddns.net:7277/:path*', // Proxy to backend
      },
    ];
  },
};

export default nextConfig;
