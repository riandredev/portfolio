/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      }
    ],
    domains: ['localhost', '127.0.0.1'],
  },
  staticPageGenerationTimeout: 300,
  poweredByHeader: false,
  // Add these options to ensure proper CSS bundling
  optimizeFonts: true,
  swcMinify: true,
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
