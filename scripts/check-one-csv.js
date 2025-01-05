const fs = require('fs');
const path = require('path');

const CSV_DIRECTORY = path.join(process.cwd(), 'public', 'csv-imports', 'originals');

// Get one file of each prefix
const getUniqueFiles = () => {
    const files = fs.readdirSync(CSV_DIRECTORY);
    const prefixMap = new Map();
    
    files.forEach(file => {
        if (!file.endsWith('.csv')) return;
        
        // Remove numbers from end of filename to get prefix
        const prefix = file.replace(/[0-9]+\.csv$/, '.csv');
        if (!prefixMap.has(prefix)) {
            prefixMap.set(prefix, file);
        }
    });
    
    return Array.from(prefixMap.values());
};

// Function to safely read just the first line of a file
function readFirstLine(filePath) {
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

async function analyzeHeaders() {
    const uniqueFiles = getUniqueFiles();
    
    console.log('CSV Headers Analysis (One of each type):\n');
    
    for (const file of uniqueFiles) {
        const filePath = path.join(CSV_DIRECTORY, file);
        const headers = await readFirstLine(filePath);
        
        if (headers) {
            console.log(`\n${file}:`);
            console.log(headers);
        }
    }
}

analyzeHeaders().catch(console.error);
