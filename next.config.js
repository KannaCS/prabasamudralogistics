/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
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
  // For static exports in App Router
  experimental: {
    appDir: true
  },
  // Ensure proper directory structure for static export
  trailingSlash: true,
  // Ensure proper handling of nested routes
  basePath: '',
};

module.exports = nextConfig;
