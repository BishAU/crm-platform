module.exports = {
    apps: [
        {
            name: 'crm-platform',
            cwd: '/home/bish/Downloads/sites/crm-platform',
            script: 'npm',
            args: 'run start',
            env: {
                NODE_ENV: 'production',
                PORT: 3100,
                HOST: '0.0.0.0',
                DATABASE_URL: "postgresql://crm_platform:crm_platform_2024@localhost:5432/crm_platform_dev"
            },
            error_file: '/home/bish/Downloads/sites/crm-platform/logs/error.log',
            out_file: '/home/bish/Downloads/sites/crm-platform/logs/output.log',
            log_file: '/home/bish/Downloads/sites/crm-platform/logs/combined.log',
            time: true
        },
        {
            name: 'kuma-platform',
            cwd: '/home/bish/Downloads/sites/kuma-platform',
            script: 'node',
            args: 'src/server.js',
            env: {
                NODE_ENV: 'production',
                PORT: 3800
            },
            error_file: '/home/bish/Downloads/sites/kuma-platform/logs/error.log',
            out_file: '/home/bish/Downloads/sites/kuma-platform/logs/output.log',
            log_file: '/home/bish/Downloads/sites/kuma-platform/logs/combined.log',
            time: true
        },
        {
            name: 'skyhigh-platform',
            cwd: '/home/bish/Downloads/sites/skyhigh-platform',
            script: 'npx',
            args: 'vite preview --port 3400 --host',
            env: {
                NODE_ENV: 'production'
            },
            error_file: '/home/bish/Downloads/sites/skyhigh-platform/logs/error.log',
            out_file: '/home/bish/Downloads/sites/skyhigh-platform/logs/output.log',
            log_file: '/home/bish/Downloads/sites/skyhigh-platform/logs/combined.log',
            time: true
        },
        {
            name: 'spraiybooth',
            cwd: '/home/bish/Downloads/sites/spraiybooth',
            script: 'npm',
            args: 'start',
            env: {
                NODE_ENV: 'production',
                PORT: 3500
            },
            error_file: '/home/bish/Downloads/sites/spraiybooth/logs/error.log',
            out_file: '/home/bish/Downloads/sites/spraiybooth/logs/output.log',
            log_file: '/home/bish/Downloads/sites/spraiybooth/logs/combined.log',
            time: true
        },
        {
            name: 'vcc-platform',
            cwd: '/home/bish/Downloads/sites/vcc-platform',
            script: 'npm',
            args: 'run start',
            env: {
                NODE_ENV: 'production',
                VITE_APP_ENV: 'production',
                PORT: 3000
            },
            error_file: '/home/bish/Downloads/sites/vcc-platform/logs/error.log',
            out_file: '/home/bish/Downloads/sites/vcc-platform/logs/output.log',
            log_file: '/home/bish/Downloads/sites/vcc-platform/logs/combined.log',
            time: true
        },
        {
            name: 'raffle-platform',
            cwd: '/home/bish/Downloads/sites/raffle-platform',
            script: 'node_modules/next/dist/bin/next',
            args: 'start',
            env: {
                NODE_ENV: 'production',
                PORT: 3300
            },
            error_file: '/home/bish/Downloads/sites/raffle-platform/logs/error.log',
            out_file: '/home/bish/Downloads/sites/raffle-platform/logs/output.log',
            log_file: '/home/bish/Downloads/sites/raffle-platform/logs/combined.log',
            time: true
        },
        {
            name: 'myinvoices-www',
            cwd: '/home/bish/Downloads/sites/myinvoices-www',
            script: 'node_modules/next/dist/bin/next',
            args: 'start',
            env: {
                NODE_ENV: 'production',
                PORT: 3200
            },
            error_file: '/home/bish/Downloads/sites/myinvoices-www/logs/error.log',
            out_file: '/home/bish/Downloads/sites/myinvoices-www/logs/output.log',
            log_file: '/home/bish/Downloads/sites/myinvoices-www/logs/combined.log',
            time: true
        },
        {
            name: 'vcc-platform-latest',
            cwd: '/home/bish/Downloads/sites/vcc-platform-latest',
            script: 'server.js',
            args: '',
            env: {
                NODE_ENV: 'production',
                PORT: 3003
            },
            error_file: '/home/bish/Downloads/sites/vcc-platform-latest/logs/error.log',
            out_file: '/home/bish/Downloads/sites/vcc-platform-latest/logs/output.log',
            log_file: '/home/bish/Downloads/sites/vcc-platform-latest/logs/combined.log',
            time: true
        }
    ]
}
