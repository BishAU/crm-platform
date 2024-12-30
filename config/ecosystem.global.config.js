module.exports = {
  apps: [
    // VCC Platform
    {
      name: 'vcc-platform',
      script: 'npm',
      args: "start",
      cwd: '/home/bish/Downloads/sites/vcc-platform',
      watch: false,
      env: {
        PORT: process.env.PORT_VCC,
        NODE_ENV: 'production'
      },
      error_file: '/home/bish/Downloads/sites/vcc-platform/logs/err.log',
      out_file: '/home/bish/Downloads/sites/vcc-platform/logs/out.log',
      time: true,
      max_memory_restart: '1G',
      restart_delay: 3000,
      max_restarts: 10
    },

    // CRM Platform
    {
      name: 'crm-platform',
      script: 'npm',
      args: "start",
      cwd: '/home/bish/Downloads/sites/crm-platform',
      watch: false,
      env: {
        PORT: process.env.PORT_CRM,
        NODE_ENV: 'production'
      },
      error_file: '/home/bish/Downloads/sites/crm-platform/logs/err.log',
      out_file: '/home/bish/Downloads/sites/crm-platform/logs/out.log',
      time: true,
      max_memory_restart: '1G',
      restart_delay: 3000,
      max_restarts: 10
    },

    // WWW Platform
    {
      name: 'myinvoices-www',
      script: 'npm',
      args: "start",
      cwd: '/home/bish/Downloads/sites/myinvoices-www',
      watch: false,
      env: {
        PORT: process.env.PORT_WWW,
        NODE_ENV: 'production'
      },
      error_file: '/home/bish/Downloads/sites/myinvoices-www/logs/err.log',
      out_file: '/home/bish/Downloads/sites/myinvoices-www/logs/out.log',
      time: true,
      max_memory_restart: '1G',
      restart_delay: 3000,
      max_restarts: 10
    },

    // Raffle Platform
    {
      name: 'raffle-platform',
      script: 'npm',
      args: "start",
      cwd: '/home/bish/Downloads/sites/raffle-platform',
      watch: false,
      env: {
        PORT: process.env.PORT_RAFFLE,
        NODE_ENV: 'production'
      },
      error_file: '/home/bish/Downloads/sites/raffle-platform/logs/err.log',
      out_file: '/home/bish/Downloads/sites/raffle-platform/logs/out.log',
      time: true,
      max_memory_restart: '1G',
      restart_delay: 3000,
      max_restarts: 10
    },

    // Skyhigh Platform Frontend
    {
      name: 'skyhigh-platform-frontend',
      script: 'npm',
      args: "start",
      cwd: '/home/bish/Downloads/sites/skyhigh-platform',
      watch: false,
      env: {
        PORT: process.env.PORT_SKYHIGH_FRONTEND,
        NODE_ENV: 'production'
      },
      error_file: '/home/bish/Downloads/sites/skyhigh-platform/logs/err.log',
      out_file: '/home/bish/Downloads/sites/skyhigh-platform/logs/out.log',
      time: true,
      max_memory_restart: '1G',
      restart_delay: 3000,
      max_restarts: 10
    },

    // Skyhigh Platform Backend
    {
      name: 'skyhigh-platform-backend',
      script: 'npm',
      args: "start",
      cwd: '/home/bish/Downloads/sites/skyhigh-api',
      watch: false,
      env: {
        PORT: process.env.PORT_SKYHIGH_BACKEND,
        NODE_ENV: 'production'
      },
      error_file: '/home/bish/Downloads/sites/skyhigh-api/logs/err.log',
      out_file: '/home/bish/Downloads/sites/skyhigh-api/logs/out.log',
      time: true,
      max_memory_restart: '1G',
      restart_delay: 3000,
      max_restarts: 10
    },

    // Spraiybooth Platform
    {
      name: 'spraiybooth-platform',
      script: 'npm',
      args: "start",
      cwd: '/home/bish/Downloads/sites/spraiybooth',
      watch: false,
      env: {
        PORT: process.env.PORT_SPRAYBOOTH,
        NODE_ENV: 'production'
      },
      error_file: '/home/bish/Downloads/sites/spraiybooth/logs/err.log',
      out_file: '/home/bish/Downloads/sites/spraiybooth/logs/out.log',
      time: true,
      max_memory_restart: '1G',
      restart_delay: 3000,
      max_restarts: 10
    }
  ]
};
