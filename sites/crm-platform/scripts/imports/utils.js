import fs from 'fs';

// Function to safely read just the first line of a file
export function readFirstLine(filePath) {
    try {
        const fileStream = fs.createReadStream(filePath, { encoding: 'utf-8' });
        let firstLine = '';
        
        return new Promise((resolve, reject) => {
            fileStream.on('data', (chunk) => {
                const newlineIndex = chunk.indexOf('\n');
                if (newlineIndex !== -1) {
                    firstLine += chunk.slice(0, newlineIndex);
                    fileStream.destroy();
                    resolve(firstLine);
                } else {
                    firstLine += chunk;
                }
            });
            
            fileStream.on('end', () => resolve(firstLine));
            fileStream.on('error', reject);
        });
    } catch (error) {
        console.error(`Error reading ${filePath}:`, error);
        return null;
    }
}