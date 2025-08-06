/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed output: 'export' to enable full backend functionality
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  typescript: {
    // Ignores any TypeScript errors during the build
    ignoreBuildErrors: true
  },
  eslint: {
    // Ignores any ESLint errors during the build
    ignoreDuringBuilds: true
  },
  // Enable API routes and server-side functionality
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client']
  }
};

module.exports = nextConfig;
