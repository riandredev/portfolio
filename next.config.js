/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      ...(process.env.NODE_ENV === 'development' ? [
        {
          protocol: 'http',
          hostname: 'localhost',
        },
        {
          protocol: 'http',
          hostname: '127.0.0.1',
        }
      ] : [])
    ],
  },
  poweredByHeader: false,
  ...(process.env.NODE_ENV === 'production' && {
    headers: async () => [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
    ],
  }),
}

module.exports = nextConfig
