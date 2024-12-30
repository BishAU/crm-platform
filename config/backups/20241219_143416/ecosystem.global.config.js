module.exports = {
  apps: [
    {
      name: "kuma-platform",
      cwd: "/home/bish/Downloads/sites/kuma-platform",
      script: "src/server.js",
      watch: true,
      env: {
        PORT: 3000,
        NODE_ENV: "production"
      },
      max_restarts: 5,
      min_uptime: "10s",
      max_memory_restart: "1G",
      error_file: "/home/bish/Downloads/sites/kuma-platform/logs/error.log",
      out_file: "/home/bish/Downloads/sites/kuma-platform/logs/out.log",
      merge_logs: true
    }
    ,
    {
      name: "skyhigh-platform",
      cwd: "/home/bish/Downloads/sites/skyhigh-platform",
      script: "server.js",
      watch: true,
      env: {
        PORT: 3401,
        NODE_ENV: "production"
      },
      max_restarts: 5,
      min_uptime: "10s",
      max_memory_restart: "1G",
      error_file: "/home/bish/Downloads/sites/skyhigh-platform/logs/error.log",
      out_file: "/home/bish/Downloads/sites/skyhigh-platform/logs/out.log",
      merge_logs: true
    }
    ,
    {
      name: "spraiybooth",
      cwd: "/home/bish/Downloads/sites/spraiybooth",
      script: "src/index.js",
      watch: true,
      env: {
        PORT: 3500,
        NODE_ENV: "production"
      },
      max_restarts: 5,
      min_uptime: "10s",
      max_memory_restart: "1G",
      error_file: "/home/bish/Downloads/sites/spraiybooth/logs/error.log",
      out_file: "/home/bish/Downloads/sites/spraiybooth/logs/out.log",
      merge_logs: true
    }
    ,
    {
      name: "vcc-platform",
      cwd: "/home/bish/Downloads/sites/vcc-platform",
      script: "server.js",
      watch: true,
      env: {
        PORT: 3002,
        NODE_ENV: "production"
      },
      max_restarts: 5,
      min_uptime: "10s",
      max_memory_restart: "1G",
      error_file: "/home/bish/Downloads/sites/vcc-platform/logs/error.log",
      out_file: "/home/bish/Downloads/sites/vcc-platform/logs/out.log",
      merge_logs: true
    }
  ]
};
