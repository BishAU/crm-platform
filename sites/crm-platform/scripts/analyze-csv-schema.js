import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CSV_DIRECTORY = path.join(process.cwd(), 'public', 'imports');

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

// Database schema from prisma/schema.prisma
const dbSchema = {
    Outfall: ['id', 'authority', 'contact', 'contact_email', 'contact_name', 'indigenousNation', 'landCouncil', 'latitude', 'longitude', 'state', 'type', 'outfallName'],
    Facility: ['id', 'latitude', 'longitude', 'postcode', 'regionType', 'sector', 'suburb', 'type', 'creatorId'],
    IndigenousCommunity: ['id', 'name', 'region', 'population'],
    Politician: ['id', 'name', 'email', 'party', 'position', 'state'],
    User: ['id', 'name', 'email', 'password', 'isAdmin'],
    OutfallObservation: ['id', 'outfallId', 'date', 'flow']
};

async function analyzeCSVs() {
    const files = fs.readdirSync(CSV_DIRECTORY).filter(f => f.endsWith('.csv'));
    
    console.log('CSV to Database Schema Mapping Analysis:\n');
    
    for (const file of files) {
        const filePath = path.join(CSV_DIRECTORY, file);
        const headers = await readFirstLine(filePath);
        
        if (headers) {
            console.log(`\n${file}:`);
            console.log('CSV Headers:', headers);
            
            // Suggest potential table mapping based on filename and headers
            const csvColumns = headers.split(',').map(h => h.trim());
            
            console.log('\nPotential Database Table Mappings:');
            
            // Map CSV name to likely table
            let likelyTable = '';
            if (file.toLowerCase().includes('outfall')) likelyTable = 'Outfall';
            else if (file.toLowerCase().includes('facilities')) likelyTable = 'Facility';
            else if (file.toLowerCase().includes('indigenous')) likelyTable = 'IndigenousCommunity';
            else if (file.toLowerCase().includes('politician')) likelyTable = 'Politician';
            else if (file.toLowerCase().includes('people')) likelyTable = 'User';
            
            if (likelyTable && dbSchema[likelyTable]) {
                console.log(`\nSuggested mapping to ${likelyTable} table:`);
                console.log('CSV Column -> Database Field');
                console.log('------------------------');
                
                csvColumns.forEach(csvCol => {
                    // Try to find matching or similar field in schema
                    const schemaFields = dbSchema[likelyTable];
                    const matches = schemaFields.filter(field => {
                        const csvNormalized = csvCol.toLowerCase().replace(/[^a-z0-9]/g, '');
                        const fieldNormalized = field.toLowerCase().replace(/[^a-z0-9]/g, '');
                        return csvNormalized.includes(fieldNormalized) || fieldNormalized.includes(csvNormalized);
                    });
                    
                    if (matches.length > 0) {
                        console.log(`${csvCol} -> ${matches[0]}`);
                    } else {
                        console.log(`${csvCol} -> [No direct match found]`);
                    }
                });
            } else {
                console.log('No matching table found in schema');
            }
            console.log('\n-------------------');
        }
    }
}

analyzeCSVs().catch(console.error);
