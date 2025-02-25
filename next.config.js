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
          // Add proper MIME type handling for CSS files
          source: '/_next/static/css/:path*',
          headers: [
            {
              key: 'Content-Type',
              value: 'text/css',
            }
          ],
        },
        {
          // Allow Spotify API requests
          source: '/api/spotify/:path*',
          headers: [
            { key: 'Access-Control-Allow-Origin', value: '*' },
            { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
            { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
            {
              key: 'Cache-Control',
              value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
            },
            {
              key: 'Pragma',
              value: 'no-cache',
            },
            {
              key: 'Expires',
              value: '0',
            },
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

        // Image files
        config.module.rules.push({
          test: /\.(png|jpg|jpeg|gif|webp)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'static/images/[hash][ext][query]'
          }
        })

        // GLB and GLTF files
        config.module.rules.push({
          test: /\.(glb|gltf)$/,
          type: 'asset/resource',
          generator: {
            filename: 'static/chunks/[path][name].[hash][ext]'
          }
        });

        // Production optimizations
        if (!dev && !isServer) {
          config.optimization.minimize = true;
          // Increase chunk loading timeout
          config.optimization.splitChunks = {
            chunks: 'all',
            minSize: 20000,
            maxSize: 70000,
            cacheGroups: {
              default: false,
              vendors: false,
              framework: {
                chunks: 'all',
                name: 'framework',
                priority: 40,
                enforce: true
              },
              lib: {
                test: /[\\/]node_modules[\\/]/,
                priority: 30,
                enforce: true
              }
            }
          }
        }

        // Edge-specific optimizations
        if (isServer && nextRuntime === 'edge') {
          config.optimization.moduleIds = 'deterministic';
        }

        return config;
      },
      output: 'standalone',
      experimental: {
        outputFileTracingIncludes: {
          '/**/*': ['./public/uploads/**/*']
        }
      }
    }

  export default nextConfig;
