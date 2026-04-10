import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async rewrites() {
    const backendUrl =
      process.env.BACKEND_URL ||
      process.env.NEXT_PUBLIC_BACKEND_URL ||
      process.env.REACT_APP_BACKEND_URL ||
      '';
    if (!backendUrl) return [];
    return [
      {
        source: '/api/v1/:path*',
        destination: `${backendUrl.trim().replace(/\/$/, '')}/api/v1/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
