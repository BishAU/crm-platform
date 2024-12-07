module.exports = {
  apps: [
    // VCC Platform - Port 3000
    {
      name: 'vcc',
      cwd: '/home/bish/Downloads/vcc-platform',
      script: 'npm',
      args: 'run preview',
      env: {
        PORT: 3000,
        NODE_ENV: 'production'
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
    
    // CRM Platform - Port 4000
    {
      name: 'crm',
      cwd: '/home/bish/Downloads/crm-platform',
      script: 'npm',
      args: 'start',
      env: {
        PORT: 4000,
        NODE_ENV: 'production'
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
    
    // WWW Platform - Port 5000
    {
      name: 'www',
      cwd: '/home/bish/Downloads/myinvoices-www',
      script: 'npm',
      args: 'start',
      env: {
        PORT: 5000,
        NODE_ENV: 'production'
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

    // Raffle Platform - Port 6000
    {
      name: 'raffle',
      cwd: '/home/bish/Downloads/raffle-platform',
      script: 'npm',
      args: 'start',
      env: {
        PORT: 6000,
        NODE_ENV: 'production'
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
};
