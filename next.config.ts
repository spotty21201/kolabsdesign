import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async headers() {
    if (process.env.VERCEL_ENV === 'production') {
      return [];
    }

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'kolabs.design',
          },
        ],
        destination: 'https://www.kolabs.design/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
