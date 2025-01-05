module.exports = {
  apps: [
    {
      name: "crm",
      script: "npm",
      args: "run dev",
      cwd: "/home/bish/Downloads/sites/crm-platform",
      env: {
        PORT: 3104
      }
    }
  ]
};