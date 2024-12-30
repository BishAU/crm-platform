module.exports = {
  apps: [
    {
      name: 'vcc-platform',
      script: 'npm',
      args: "start",
      cwd: '/home/bish/Downloads/sites/vcc-platform',
      watch: false,
      env: {
        PORT: 3000,
        NODE_ENV: 'production',
      },
      error_file: '/home/bish/Downloads/sites/vcc-platform/logs/err.log',
      out_file: '/home/bish/Downloads/sites/vcc-platform/logs/out.log',
    },
    {
      name: 'vcc-platform-api',
      script: 'npm',
      args: "run start:server",
      cwd: '/home/bish/Downloads/sites/vcc-platform',
      watch: false,
      env: {
        PORT: 3010,
        NODE_ENV: 'production',
      },
      error_file: '/home/bish/Downloads/sites/vcc-platform/logs/server-err.log',
      out_file: '/home/bish/Downloads/sites/vcc-platform/logs/server-out.log',
    },
    {
      name: 'crm-platform',
      script: 'npm',
      args: "start",
      cwd: '/home/bish/Downloads/sites/crm-platform',
      watch: false,
      env: {
        PORT: 3100,
        NODE_ENV: 'production',
        HOSTNAME: '127.0.0.1'
      },
      error_file: '/home/bish/Downloads/sites/crm-platform/logs/err.log',
      out_file: '/home/bish/Downloads/sites/crm-platform/logs/out.log',
    },
    {
      name: 'www-platform',
      script: 'npm',
      args: "start",
      cwd: '/home/bish/Downloads/sites/myinvoices-www',
      watch: false,
      env: {
        PORT: 3200,
        NODE_ENV: 'production'
      },
      error_file: '/home/bish/Downloads/sites/myinvoices-www/logs/err.log',
      out_file: '/home/bish/Downloads/sites/myinvoices-www/logs/out.log',
    },
    {
      name: 'raffle-platform',
      script: 'npm',
      args: "start",
      cwd: '/home/bish/Downloads/sites/raffle-platform',
      watch: false,
      env: {
        PORT: 3300,
        NODE_ENV: 'production',
        DB_HOST: 'localhost',
        DB_PORT: 5432,
        DB_USER: 'postgres',
        DB_NAME: 'raffle'
      },
      error_file: '/home/bish/Downloads/sites/raffle-platform/logs/err.log',
      out_file: '/home/bish/Downloads/sites/raffle-platform/logs/out.log',
    },
    {
      name: 'skyhigh-platform',
      script: 'npm',
      args: "start",
      cwd: '/home/bish/Downloads/sites/skyhigh-platform',
      watch: false,
      env: {
        PORT: 3400,
        NODE_ENV: 'production',
        DB_HOST: 'localhost',
        DB_PORT: 5432,
        DB_USER: 'postgres',
        DB_NAME: 'skyhigh'
      },
      error_file: '/home/bish/Downloads/sites/skyhigh-platform/logs/err.log',
      out_file: '/home/bish/Downloads/sites/skyhigh-platform/logs/out.log',
    },
    {
      name: 'skyhigh-platform-api',
      script: 'npm',
      args: "run start:server",
      cwd: '/home/bish/Downloads/sites/skyhigh-platform',
      watch: false,
      env: {
        PORT: 3410,
        NODE_ENV: 'production',
        DB_HOST: 'localhost',
        DB_PORT: 5432,
        DB_USER: 'postgres',
        DB_NAME: 'skyhigh'
      },
      error_file: '/home/bish/Downloads/sites/skyhigh-platform/logs/api-err.log',
      out_file: '/home/bish/Downloads/sites/skyhigh-platform/logs/api-out.log',
    },
    {
      name: 'spraiybooth-platform',
      script: 'npm',
      args: "start",
      cwd: '/home/bish/Downloads/sites/spraiybooth',
      watch: false,
      env: {
        PORT: 3500,
        NODE_ENV: 'production',
        DB_HOST: 'localhost',
        DB_PORT: 5432,
        DB_USER: 'postgres',
        DB_NAME: 'spraiybooth'
      },
      error_file: '/home/bish/Downloads/sites/spraiybooth/logs/err.log',
      out_file: '/home/bish/Downloads/sites/spraiybooth/logs/out.log',
    },
    {
      name: 'rockregister-platform',
      script: 'npm',
      args: "start",
      cwd: '/home/bish/Downloads/sites/rockregister-platform',
      watch: false,
      env: {
        PORT: 3600,
        NODE_ENV: 'production'
      },
      error_file: '/home/bish/Downloads/sites/rockregister-platform/logs/err.log',
      out_file: '/home/bish/Downloads/sites/rockregister-platform/logs/out.log',
    },
    {
      name: 'tradertokenbot-platform',
      script: 'npm',
      args: "start",
      cwd: '/home/bish/Downloads/sites/tradertokenbot-platform',
      watch: false,
      env: {
        PORT: 3700,
        NODE_ENV: 'production'
      },
      error_file: '/home/bish/Downloads/sites/tradertokenbot-platform/logs/err.log',
      out_file: '/home/bish/Downloads/sites/tradertokenbot-platform/logs/out.log',
    },
    {
      name: 'kuma-platform',
      script: 'npm',
      args: "start",
      cwd: '/home/bish/Downloads/sites/kuma-platform',
      watch: false,
      env: {
        PORT: 3800,
        NODE_ENV: 'production'
      },
      error_file: '/home/bish/Downloads/sites/kuma-platform/logs/err.log',
      out_file: '/home/bish/Downloads/sites/kuma-platform/logs/out.log',
    },
    {
      name: 'abs-api',
      script: 'server.js',
      cwd: '/home/bish/Downloads/sites/vcc-platform/public/ABS_API/js_abs_api',
      watch: false,
      interpreter: 'node',
      node_args: '--experimental-modules',
      env: {
        PORT: 3020,
        NODE_ENV: 'production'
      },
      error_file: '/home/bish/Downloads/sites/vcc-platform/public/ABS_API/js_abs_api/logs/err.log',
      out_file: '/home/bish/Downloads/sites/vcc-platform/public/ABS_API/js_abs_api/logs/out.log',
    }
  ]
};
