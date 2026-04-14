/**
 * PM2 — run from project root after `npm run build` + `npm run standalone:prepare`
 * Start: pm2 start ecosystem.config.cjs
 */
const path = require("path");

const standaloneDir = path.join(__dirname, ".next", "standalone");

module.exports = {
  apps: [
    {
      name: "bd-servicing-next",
      cwd: standaloneDir,
      script: "server.js",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "0.0.0.0",
      },
    },
  ],
};
