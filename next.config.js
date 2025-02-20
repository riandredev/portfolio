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
  // Remove compiler options and add swcMinify
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
  webpack: (config, { dev, isServer }) => {
    // Add your webpack customizations here
    if (!dev && !isServer) {
      // Enable webpack optimization in production
      config.optimization.minimize = true;

      // Remove console logs in production
      config.optimization.minimizer.push(
        new config.webpack.optimize.UglifyJsPlugin({
          compress: {
            drop_console: true,
          },
        })
      );
    }
    return config;
  },
}

module.exports = nextConfig
