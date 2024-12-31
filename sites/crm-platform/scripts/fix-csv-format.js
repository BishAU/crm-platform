import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CSV_DIRECTORY = path.join(process.cwd(), 'public', 'imports');
const OUTPUT_DIRECTORY = path.join(CSV_DIRECTORY, 'formatted');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIRECTORY)) {
    fs.mkdirSync(OUTPUT_DIRECTORY, { recursive: true });
}

// Function to fix CSV formatting issues
function fixCsvFormat(content) {
    // Remove BOM if present
    content = content.replace(/^\uFEFF/, '');
    
    // Fix common formatting issues
    const lines = content.split('\n');
    const fixedLines = lines.map(line => {
        // Handle lines without commas by inserting them between fields
        if (!line.includes(',')) {
            line = line
                // First protect known compound words
                .replace(/Region Type/g, 'Region_Type')
                .replace(/Full Name/g, 'Full_Name')
                .replace(/Last Name/g, 'Last_Name')
                .replace(/First Name/g, 'First_Name')
                .replace(/Contact Name/g, 'Contact_Name')
                .replace(/Phone Number/g, 'Phone_Number')
                .replace(/Indigenous Nation/g, 'Indigenous_Nation')
                .replace(/Land Council/g, 'Land_Council')
                // Then add commas between words
                .replace(/([a-z])([A-Z])/g, '$1,$2')
                .replace(/([A-Z])([A-Z][a-z])/g, '$1,$2')
                // Finally restore protected compounds
                .replace(/Region_Type/g, 'Region Type')
                .replace(/Full_Name/g, 'Full Name')
                .replace(/Last_Name/g, 'Last Name')
                .replace(/First_Name/g, 'First Name')
                .replace(/Contact_Name/g, 'Contact Name')
                .replace(/Phone_Number/g, 'Phone Number')
                .replace(/Indigenous_Nation/g, 'Indigenous Nation')
                .replace(/Land_Council/g, 'Land Council');
        }
        
        // Fix known typos and standardize field names
        line = line
            .replace(/Longtitude/g, 'Longitude')
            .replace(/Surburb/g, 'Suburb')
            .replace(/Ingidegnous/g, 'Indigenous')
            .replace(/Authority Name/g, 'Name')
            .replace(/Community Name/g, 'Name')
            .replace(/Facility Name/g, 'Name')
            .replace(/Contact_email/g, 'Email')
            .replace(/Politician Name/g, 'Name');
            
        return line;
    });
    
    return fixedLines.join('\n');
}

// Get table name from filename
function getTableName(filename) {
    const name = filename.toLowerCase();
    if (name.includes('outfall')) return 'Outfall';
    if (name.includes('facilities')) return 'Facility';
    if (name.includes('indigenous')) return 'IndigenousCommunity';
    if (name.includes('politician')) return 'Politician';
    if (name.includes('people')) return 'User';
    return null;
}

// Function to map CSV fields to schema fields
function suggestFieldMappings(headers, tableName) {
    const schemaFields = {
        Outfall: {
            'Authority': 'authority',
            'Contact': 'contact',
            'Email': 'contact_email',
            'Contact Name': 'contact_name',
            'Indigenous Nation': 'indigenousNation',
            'Land Council': 'landCouncil',
            'Latitude': 'latitude',
            'Longitude': 'longitude',
            'State': 'state',
            'Type': 'type',
            'Outfall': 'outfallName'
        },
        Facility: {
            'Name': 'name',
            'Latitude': 'latitude',
            'Longitude': 'longitude',
            'Postcode': 'postcode',
            'Region Type': 'regionType',
            'Sector': 'sector',
            'Suburb': 'suburb',
            'Type': 'type'
        },
        IndigenousCommunity: {
            'Name': 'name',
            'Region': 'region',
            'Population': 'population'
        },
        Politician: {
            'Full Name': 'name',
            'Email': 'email',
            'Party': 'party',
            'Position': 'position',
            'State': 'state'
        },
        User: {
            'Full Name': 'name',
            'Email': 'email',
            'Phone': 'phone'
        }
    };

    const mappings = {};
    const headerList = headers.split(',').map(h => h.trim());
    
    headerList.forEach(header => {
        const schemaMapping = schemaFields[tableName]?.[header];
        if (schemaMapping) {
            mappings[header] = schemaMapping;
        }
    });
    
    return mappings;
}

// Process each CSV file
async function processFiles() {
    const files = fs.readdirSync(CSV_DIRECTORY).filter(f => f.endsWith('.csv'));
    
    console.log('CSV Analysis and Mapping:\n');
    
    for (const file of files) {
        const inputPath = path.join(CSV_DIRECTORY, file);
        const outputPath = path.join(OUTPUT_DIRECTORY, file);
        
        try {
            console.log(`\nProcessing ${file}...`);
            
            // Read file content
            const content = fs.readFileSync(inputPath, 'utf8');
            
            // Fix formatting
            const fixedContent = fixCsvFormat(content);
            
            // Write fixed content
            fs.writeFileSync(outputPath, fixedContent);
            
            // Get headers and analyze mappings
            const headers = fixedContent.split('\n')[0];
            console.log('Fixed headers:', headers);
            
            // Get table mapping suggestions
            const tableName = getTableName(file);
            if (tableName) {
                const mappings = suggestFieldMappings(headers, tableName);
                console.log(`\nSuggested mappings for ${tableName} table:`);
                Object.entries(mappings).forEach(([csvField, dbField]) => {
                    console.log(`${csvField} -> ${dbField}`);
                });
            } else {
                console.log('\nNo corresponding table found in schema');
            }
            
            console.log('\n-------------------');
            
        } catch (error) {
            console.error(`Error processing ${file}:`, error);
        }
    }
}

console.log('Starting CSV format fixes...\n');
processFiles().then(() => {
    console.log('\nCSV formatting complete. Fixed files are in the "formatted" directory.');
});
