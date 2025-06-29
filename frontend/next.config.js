/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    styledComponents: true,
  },
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  
  // Enable experimental features
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  
  // Configure webpack to handle CSS properly
  webpack: (config, { isServer, dev }) => {
    // Only configure client-side chunks
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        maxSize: 244 * 1024, // 244kb
        minSize: 20 * 1024,  // 20kb
      };
    }
    
    // Handle font imports
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
    });

    // Add CSS and SCSS support
    config.module.rules.push({
      test: /\.(css|scss)$/i,
      oneOf: [
        // CSS modules
        {
          test: /\.(module\.css)$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: {
                    'postcss-import': {},
                    '@tailwindcss/postcss': {
                      config: './tailwind.config.ts'
                    },
                    'autoprefixer': {},
                  },
                },
              },
            },
          ],
        },
        // Regular CSS
        {
          test: /\.(css)$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: {
                    'postcss-import': {},
                    '@tailwindcss/postcss': {
                      config: './tailwind.config.ts'
                    },
                    'autoprefixer': {},
                  },
                },
              },
            },
          ],
        },
      ],
    });

    return config;
  },
  
  // Enable experimental features
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  
  compress: true,
  
  // Disable source maps in production
  productionBrowserSourceMaps: false,
  
  // Disable static optimization for design system page
  rewrites: async () => [
    {
      source: '/app/design-system/:path*',
      destination: '/404',
    },
  ],
};

module.exports = nextConfig;
