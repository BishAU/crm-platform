import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CSV_DIRECTORY = path.join(process.cwd(), 'public', 'imports');

// Current schema fields
const existingSchema = {
    Outfall: [
        'id', 'authority', 'contact', 'contact_email', 'contact_name',
        'indigenousNation', 'landCouncil', 'latitude', 'longitude',
        'state', 'type', 'outfallName'
    ],
    Facility: [
        'id', 'latitude', 'longitude', 'postcode', 'regionType',
        'sector', 'suburb', 'type', 'creatorId'
    ],
    IndigenousCommunity: [
        'id', 'name', 'region', 'population'
    ],
    Politician: [
        'id', 'name', 'email', 'party', 'position', 'state'
    ],
    User: [
        'id', 'name', 'email', 'emailVerified', 'image', 'password', 'isAdmin'
    ]
};

// Map CSV filenames to schema models
function getModelForFile(filename) {
    const name = filename.toLowerCase();
    if (name.includes('outfall')) return 'Outfall';
    if (name.includes('facilities')) return 'Facility';
    if (name.includes('indigenous')) return 'IndigenousCommunity';
    if (name.includes('politician')) return 'Politician';
    if (name.includes('people')) return 'User';
    return null;
}

// Convert CSV header to schema field name
function toSchemaFieldName(header) {
    return header
        .trim()
        .replace(/[\s-]+(\w)/g, (_, c) => c.toUpperCase()) // Convert spaces/hyphens to camelCase
        .replace(/[^\w]/g, '') // Remove special characters
        .replace(/^\w/, c => c.toLowerCase()); // Ensure first char is lowercase
}

// Analyze CSV headers and generate schema updates
async function analyzeCSVs() {
    const files = fs.readdirSync(CSV_DIRECTORY).filter(f => f.endsWith('.csv'));
    
    console.log('Schema Update Analysis:\n');
    
    for (const file of files) {
        const filePath = path.join(CSV_DIRECTORY, file);
        const modelName = getModelForFile(file);
        
        try {
            // Read just the first line to get headers
            const firstLine = fs.readFileSync(filePath, 'utf8').split('\n')[0];
            const headers = firstLine
                .replace(/^\uFEFF/, '') // Remove BOM
                .split(',')
                .map(h => h.trim());
            
            console.log(`\nAnalyzing ${file}...`);
            
            if (modelName && existingSchema[modelName]) {
                const existingFields = new Set(existingSchema[modelName]);
                const newFields = new Set();
                
                headers.forEach(header => {
                    const fieldName = toSchemaFieldName(header);
                    if (!existingFields.has(fieldName)) {
                        newFields.add(fieldName);
                    }
                });
                
                if (newFields.size > 0) {
                    console.log(`\nNew fields needed for ${modelName}:`);
                    console.log('```prisma');
                    newFields.forEach(field => {
                        console.log(`  ${field}    String?`);
                    });
                    console.log('```');
                } else {
                    console.log(`All fields in ${file} match existing schema`);
                }
            } else if (!modelName) {
                console.log(`\nNew model needed for ${file}:`);
                console.log('```prisma');
                console.log(`model ${path.basename(file, '.csv')} {`);
                console.log('  id        String   @id @default(cuid())');
                headers.forEach(header => {
                    const fieldName = toSchemaFieldName(header);
                    console.log(`  ${fieldName}    String?`);
                });
                console.log('  createdAt DateTime @default(now())');
                console.log('  updatedAt DateTime @updatedAt');
                console.log('}');
                console.log('```');
            }
            
        } catch (error) {
            console.error(`Error processing ${file}:`, error);
        }
    }
}

console.log('Starting schema analysis...\n');
analyzeCSVs().then(() => {
    console.log('\nSchema analysis complete.');
});
