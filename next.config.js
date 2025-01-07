/** @type {import('next').NextConfig} */
const config = {
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: process.env.NODE_PATH || process.cwd(),
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
  // Configure module path aliases
  async rewrites() {
    return [
      {
        source: '/@components/:path*',
        destination: '/components/:path*',
      },
    ];
  },
};

export default config;
