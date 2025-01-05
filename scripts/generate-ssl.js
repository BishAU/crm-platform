import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const sslPath = path.join(process.cwd(), 'ssl');

// Create ssl directory if it doesn't exist
if (!fs.existsSync(sslPath)) {
  fs.mkdirSync(sslPath);
}

// Generate private key
execSync(`openssl genrsa -out ${path.join(sslPath, 'private.key')} 2048`);

// Generate certificate signing request
execSync(`openssl req -new -key ${path.join(sslPath, 'private.key')} -out ${path.join(sslPath, 'certificate.csr')} -subj "/CN=crm.myinvoices.today"`);

// Generate self-signed certificate
execSync(`openssl x509 -req -days 365 -in ${path.join(sslPath, 'certificate.csr')} -signkey ${path.join(sslPath, 'private.key')} -out ${path.join(sslPath, 'certificate.crt')}`);

console.log('SSL certificates generated successfully in ssl/ directory');