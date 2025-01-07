/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingRoot: process.env.NODE_PATH || process.cwd(),
    // Enable more stable handling of build output
    outputStandalone: true,
  },
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'https://crm.myinvoices.today',
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cleanocean.org',
      },
      {
        protocol: 'https',
        hostname: 'crm.myinvoices.today',
      },
    ],
  },
  // Middleware configuration
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }
    return config;
  },
  // Improve caching behavior
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
