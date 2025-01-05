module.exports = {
  apps: [{
    name: 'crm-platform',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    cwd: '/home/bish/Downloads/sites/crm-platform',
    env: {
      NODE_ENV: 'production',
      PORT: 3104
    },
    error_file: '/home/bish/Downloads/sites/crm-platform/logs/error.log',
    out_file: '/home/bish/Downloads/sites/crm-platform/logs/output.log',
    log_file: '/home/bish/Downloads/sites/crm-platform/logs/combined.log',
    time: true,
    instances: 3,
    exec_mode: 'cluster'
  }]
}
