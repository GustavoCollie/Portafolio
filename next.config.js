/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Allow images from these domains if you host images externally
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Or use unoptimized for local images
    unoptimized: true,
  },
  webpack: (config) => {
    // Required for @react-pdf/renderer to work with Next.js
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
};

module.exports = nextConfig;
