/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingRoot: process.env.NODE_PATH || process.cwd(),
  },
  generateBuildId: async () => {
    return 'production-build'
  },
  env: {
    NEXTAUTH_URL: 'https://crm.myinvoices.today',
    NEXT_PUBLIC_BASE_URL: 'https://crm.myinvoices.today',
  },
  images: {
    unoptimized: true,
    domains: ['localhost', 'crm.myinvoices.today'],
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
  // Production URL configuration
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'crm.myinvoices.today',
            },
          ],
          destination: '/:path*',
        },
      ],
    }
  },
  // Environment configuration
  serverRuntimeConfig: {
    // Will only be available on the server side
    NEXTAUTH_URL: 'https://crm.myinvoices.today',
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    NEXTAUTH_URL: 'https://crm.myinvoices.today',
  },
  // Middleware configuration
}

export default nextConfig
