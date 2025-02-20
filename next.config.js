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
  webpack: (config, { dev, isServer, defaultLoaders, nextRuntime }) => {
    // Handle MDX files
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
