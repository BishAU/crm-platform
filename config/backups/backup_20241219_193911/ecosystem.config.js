module.exports = {
    apps: [
        {
            name: 'vcc-platform',
            cwd: '/home/bish/Downloads/sites/vcc-platform',
            script: 'node',
            args: 'index.js',
            env: {
                NODE_ENV: 'production',
                PORT: 3000
            },
            error_file: '/home/bish/Downloads/sites/vcc-platform/logs/error.log',
            out_file: '/home/bish/Downloads/sites/vcc-platform/logs/output.log',
            log_file: '/home/bish/Downloads/sites/vcc-platform/logs/combined.log',
            time: true
        },
    ]
}
