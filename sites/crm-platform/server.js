import { createServer } from 'https';
import { parse } from 'url';
import next from 'next';
import fs from 'fs';
import path from 'path';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'crm.myinvoices.today';
const port = 3100;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// SSL certificate paths
const certPath = path.join(process.cwd(), 'ssl');
const options = {
  key: fs.readFileSync(path.join(certPath, 'private.key')),
  cert: fs.readFileSync(path.join(certPath, 'certificate.crt'))
};

app.prepare().then(() => {
  createServer(options, async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      
      // Set correct host header
      req.headers.host = hostname;
      
      // Handle request
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal server error');
    }
  })
  .once('error', (err) => {
    console.error(err);
    process.exit(1);
  })
  .listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});