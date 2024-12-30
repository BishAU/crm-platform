module.exports = {
  apps: [
    // CRM Platform (Priority for testing)
    {
      name: 'crm-platform-dev',
      script: 'npm',
      args: "run dev",
      cwd: '/home/bish/Downloads/sites/crm-platform',
      watch: ['src'],
      ignore_watch: ['node_modules', 'logs'],
      env: {
        PORT: 3101,
        NODE_ENV: 'development'
      },
      error_file: '/home/bish/Downloads/sites/crm-platform/logs/dev-err.log',
      out_file: '/home/bish/Downloads/sites/crm-platform/logs/dev-out.log',
      time: true,
      max_memory_restart: '1G',
      restart_delay: 1000,
      max_restarts: 15
    },

    // VCC Platform
    {
      name: 'vcc-platform-dev',
      script: 'npm',
      args: "run dev",
      cwd: '/home/bish/Downloads/sites/vcc-platform',
      watch: ['src'],
      ignore_watch: ['node_modules', 'logs'],
      env: {
        PORT: 3001,
        NODE_ENV: 'development'
      },
      error_file: '/home/bish/Downloads/sites/vcc-platform/logs/dev-err.log',
      out_file: '/home/bish/Downloads/sites/vcc-platform/logs/dev-out.log',
      time: true,
      max_memory_restart: '1G',
      restart_delay: 1000,
      max_restarts: 15
    },

    // Skyhigh Platform Frontend
    {
      name: 'skyhigh-platform-frontend-dev',
      script: 'npm',
      args: "run dev",
      cwd: '/home/bish/Downloads/sites/skyhigh-platform',
      watch: ['src'],
      ignore_watch: ['node_modules', 'logs'],
      env: {
        PORT: 3401,
        NODE_ENV: 'development'
      },
      error_file: '/home/bish/Downloads/sites/skyhigh-platform/logs/dev-err.log',
      out_file: '/home/bish/Downloads/sites/skyhigh-platform/logs/dev-out.log',
      time: true,
      max_memory_restart: '1G',
      restart_delay: 1000,
      max_restarts: 15
    },

    // Skyhigh Platform Backend
    {
      name: 'skyhigh-platform-backend-dev',
      script: 'npm',
      args: "run dev",
      cwd: '/home/bish/Downloads/sites/skyhigh-platform-backend',
      watch: ['src'],
      ignore_watch: ['node_modules', 'logs'],
      env: {
        PORT: 3411,
        NODE_ENV: 'development'
      },
      error_file: '/home/bish/Downloads/sites/skyhigh-platform-backend/logs/dev-err.log',
      out_file: '/home/bish/Downloads/sites/skyhigh-platform-backend/logs/dev-out.log',
      time: true,
      max_memory_restart: '1G',
      restart_delay: 1000,
      max_restarts: 15
    },

    // Raffle Platform
    {
      name: 'raffle-platform-dev',
      script: 'npm',
      args: "run dev",
      cwd: '/home/bish/Downloads/sites/raffle-platform',
      watch: ['src'],
      ignore_watch: ['node_modules', 'logs'],
      env: {
        PORT: 3301,
        NODE_ENV: 'development'
      },
      error_file: '/home/bish/Downloads/sites/raffle-platform/logs/dev-err.log',
      out_file: '/home/bish/Downloads/sites/raffle-platform/logs/dev-out.log',
      time: true,
      max_memory_restart: '1G',
      restart_delay: 1000,
      max_restarts: 15
    }
  ]
};
