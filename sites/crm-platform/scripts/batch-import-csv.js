import path from 'path';
import fs from 'fs';
import { prisma, CSV_DIRECTORY } from './imports/shared.js';
import { importFacilities, cleanupFacilities } from './imports/facilities.js';
import { importPoliticians, cleanupPoliticians } from './imports/politicians.js';
import { importUsers, cleanupUsers } from './imports/users.js';
import { importOutfalls, cleanupOutfalls } from './imports/outfalls.js';
import { importIndigenousCommunities, cleanupIndigenousCommunities } from './imports/indigenous.js';
import { importLandCouncils, cleanupLandCouncils } from './imports/landcouncils.js';
import { importWaterAuthorities, cleanupWaterAuthorities } from './imports/waterauthorities.js';

// Simple mapping of file patterns to importers
const importers = {
    'educat|facil': importFacilities,
    'polit': importPoliticians,
    'people': importUsers,
    'outfall': importOutfalls,
    'ing.*?d.*?g': importIndigenousCommunities,
    'land': importLandCouncils,
    'water': importWaterAuthorities
};

// Simple mapping of file patterns to cleanup functions
const cleanupFunctions = {
    'educat|facil': cleanupFacilities,
    'polit': cleanupPoliticians,
    'people': cleanupUsers,
    'outfall': cleanupOutfalls,
    'ing.*?d.*?g': cleanupIndigenousCommunities,
    'land': cleanupLandCouncils,
    'water': cleanupWaterAuthorities
};

// Get importer for a filename
function getImporter(filename) {
    const name = filename.toLowerCase();
    for (const [pattern, importer] of Object.entries(importers)) {
        if (name.match(new RegExp(pattern, 'i'))) {
            return importer;
        }
    }
    return null;
}

// Get cleanup function for a filename
function getCleanupFunction(filename) {
    const name = filename.toLowerCase();
    for (const [pattern, cleanup] of Object.entries(cleanupFunctions)) {
        if (name.match(new RegExp(pattern, 'i'))) {
            return cleanup;
        }
    }
    return null;
}

// Main execution
async function main() {
    try {
        // Get list of CSV files
        const files = fs.readdirSync(CSV_DIRECTORY)
            .filter(f => f.endsWith('.csv'))
            .map(f => path.join(CSV_DIRECTORY, f));
        
        console.log(`Found ${files.length} CSV files to process`);
        
        // Track which types we've cleaned up
        const cleanedTypes = new Set();
        
        // Sort files to ensure users are processed first
        const sortedFiles = files.sort((a, b) => {
            const aName = path.basename(a).toLowerCase();
            const bName = path.basename(b).toLowerCase();
            if (aName.includes('people')) return -1;
            if (bName.includes('people')) return 1;
            return 0;
        });

        // Process each file
        for (const file of sortedFiles) {
            const filename = path.basename(file);
            const importer = getImporter(filename);
            
            if (!importer) {
                console.log(`Skipping ${filename} - no matching importer found`);
                continue;
            }
            
            // Clean up data for this type if we haven't already
            const cleanup = getCleanupFunction(filename);
            if (cleanup && !cleanedTypes.has(cleanup)) {
                await cleanup();
                cleanedTypes.add(cleanup);
            }
            
            // Import the file
            try {
                await importer(file);
            } catch (error) {
                console.error(`Error importing ${filename}:`, error.message);
                continue;
            }
        }
        
        console.log('\nAll imports completed successfully');
        
    } catch (error) {
        console.error('Error during import:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

// Run with proper error handling
main().catch(console.error);
