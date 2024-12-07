module.exports = {
  apps: [
    // VCC Platform - Development Port 3001
    {
      name: 'vcc-dev',
      cwd: '/home/bish/Downloads/vcc-platform',
      script: 'npm',
      args: 'run start:dev',
      watch: ['src'],
      ignore_watch: ['node_modules', 'dist'],
      max_restarts: 10,
      min_uptime: '5s',
      env: {
        NODE_ENV: 'development',
        PORT: 3001
      },
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '1G',
      error_file: 'logs/error.log',
      out_file: 'logs/out.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    },
    
    // CRM Platform - Development Port 4001
    {
      name: 'crm-dev',
      cwd: '/home/bish/Downloads/crm-platform',
      script: 'npm',
      args: 'run dev',
      env: {
        NODE_ENV: 'development',
        PORT: 4001
      },
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '1G',
      error_file: 'logs/error.log',
      out_file: 'logs/out.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    },
    
    // WWW Platform - Development Port 5001
    {
      name: 'www-dev',
      cwd: '/home/bish/Downloads/myinvoices-www',
      script: 'npm',
      args: 'run dev',
      env: {
        NODE_ENV: 'development',
        PORT: 5001
      },
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '1G',
      error_file: 'logs/error.log',
      out_file: 'logs/out.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    },

    // Raffle Platform - Development Port 6001
    {
      name: 'raffle-dev',
      cwd: '/home/bish/Downloads/raffle',
      script: 'npm',
      args: 'run dev',
      env: {
        NODE_ENV: 'development',
        PORT: 6001
      },
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '1G',
      error_file: 'logs/error.log',
      out_file: 'logs/out.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    }
  ]
}
