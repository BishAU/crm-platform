import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextBin = '/home/bish/Downloads/sites/crm-platform/node_modules/.bin/next';
const port = process.env.PORT || 3100;
const child = spawn(nextBin, ['start', '-p', port, './.next'], {
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: 'production' }
});

child.on('error', (err) => {
  console.error('Failed to start Next.js server:', err);
  process.exit(1);
});
