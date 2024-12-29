import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextBin = path.join(__dirname, '..', 'node_modules', '.bin', 'next');
const child = spawn(nextBin, ['start', '-p', '3000'], {
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: 'production' }
});

child.on('error', (err: Error) => {
  console.error('Failed to start Next.js server:', err);
  process.exit(1);
});
