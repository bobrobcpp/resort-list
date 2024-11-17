import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  redirects: async () => [
    {
      source: '/',
      destination: '/resorts',
      permanent: true,
    },
  ],
};

export default nextConfig;
