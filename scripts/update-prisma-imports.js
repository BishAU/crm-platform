import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, '..');
const apiDir = path.join(projectRoot, 'app/api');

function updateImports(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const updatedContent = content.replace(
    /from\s+['"](\.\.\/)+lib\/prisma['"]/g,
    "from '@/lib/prisma'"
  );
  fs.writeFileSync(filePath, updatedContent);
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      updateImports(filePath);
    }
  });
}

processDirectory(apiDir);
console.log('Prisma imports updated successfully');