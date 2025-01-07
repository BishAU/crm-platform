/** @type {import('next').NextConfig} */
const nextConfig = {
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
  // Middleware configuration
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }
    return config;
  },
};

export default nextConfig;
