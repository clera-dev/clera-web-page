/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Enable SWC minification for better performance
  swcMinify: true,
  // Configure webpack for missing modules
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add fallback resolvers for Babel helpers
    config.resolve.alias = {
      ...config.resolve.alias,
      '@babel/runtime/helpers/esm/extends': path.resolve(__dirname, 'extend-helper.js'),
      // Add other helpers as needed
    };
    
    // Add a rule to handle imports from @react-three/drei and related packages
    config.module.rules.push({
      test: /node_modules\/@react-three\/drei\/.*\.js$/,
      use: [
        defaultLoaders.babel,
        {
          loader: 'string-replace-loader',
          options: {
            search: "import _extends from '@babel/runtime/helpers/esm/extends';",
            replace: "import _extends from '../../../extend-helper.js';",
            flags: 'g'
          }
        }
      ]
    });
    
    return config;
  },
  reactStrictMode: true,
}

module.exports = nextConfig 