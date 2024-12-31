module.exports = {
    apps: [
        {
            name: 'crm-platform',
            cwd: '/home/bish/Downloads/sites/crm-platform',
            script: '.next/standalone/server.js',
            env: {
                NODE_ENV: 'production',
                PORT: 3100,
                HOST: '0.0.0.0',
                DATABASE_URL: "postgresql://crm_platform:crm_platform_2024@localhost:5432/crm_platform_dev",
                NEXTAUTH_URL: "https://crm.myinvoices.today",
                NEXTAUTH_SECRET: "d2e35f7b9a4c8e1f0h3i6j9k2l5m8n1p4q7r0s3t6u9v2w5x8y1z4",
                NEXT_PUBLIC_BASE_URL: "https://crm.myinvoices.today",
                NEXT_PUBLIC_SITE_URL: "https://crm.myinvoices.today",
                NEXT_PUBLIC_VERCEL_URL: "crm.myinvoices.today",
                HOSTNAME: "crm.myinvoices.today"
            },
            error_file: '/home/bish/Downloads/sites/crm-platform/logs/error.log',
            out_file: '/home/bish/Downloads/sites/crm-platform/logs/output.log',
            log_file: '/home/bish/Downloads/sites/crm-platform/logs/combined.log',
            time: true
        }
    ]
}