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
    optimizeCss: false,
    scrollRestoration: true,
  },
  

  compress: true,
  
  // Disable source maps in development to reduce memory usage
  productionBrowserSourceMaps: false,
  
  // Configure webpack to handle chunk loading
  webpack: (config, { isServer, dev }) => {
    // Only configure client-side chunks
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        maxSize: 244 * 1024, // 244kb
        minSize: 20 * 1024,  // 20kb
      };
    }
    
    // Handle font-awesome imports
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
    });
    
    return config;
  },
  
  // Enable standalone output for better production builds
  // output: 'standalone',
};

module.exports = nextConfig;
