/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      }
    ],
    domains: ['localhost', '127.0.0.1', 'i.scdn.co', 'platform-lookaside.fbsbx.com'],
  },
  staticPageGenerationTimeout: 300,
  poweredByHeader: false,
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
      {
        // Allow Spotify API requests
        source: '/api/spotify/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ],
  }),
  webpack: (config, { dev, isServer, defaultLoaders, nextRuntime }) => {
    // MDX files
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          options: {
            providerImportSource: '@mdx-js/react',
          },
        },
      ],
    })

    // Production optimizations
    if (!dev && !isServer) {
      config.optimization.minimize = true;
    }

    // Edge-specific optimizations
    if (isServer && nextRuntime === 'edge') {
      config.optimization.moduleIds = 'deterministic';
    }

    return config;
  },
}

module.exports = nextConfig
