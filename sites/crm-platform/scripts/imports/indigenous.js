import { prisma, processCsvFile } from './shared.js';

export async function importIndigenousCommunities(filePath) {
    console.log('\nProcessing Indigenous Communities...');
    
    try {
        const { currentFileImports, totalImports } = await processCsvFile(filePath, async (records, batchNumber) => {
            console.log(`Processing batch ${batchNumber} for Indigenous Communities...`);
            
            // Process all records in memory first
            const uniqueCommunities = new Set();
            
            // First pass: collect all valid unique community names
            for (const record of records) {
                const names = (record['﻿Name'] || record['Name'])?.split('/') || [];
                
                // Skip empty records
                if (names.length === 0 || names[0] === 'N/A') continue;

                // Add each valid community name
                for (const name of names) {
                    const communityName = name.trim();
                    if (communityName && communityName.length > 1 && communityName !== 'N/A') {
                        uniqueCommunities.add(communityName);
                    }
                }
            }

            // Create all communities in a single batch operation
            if (uniqueCommunities.size > 0) {
                await prisma.indigenousCommunity.createMany({
                    data: Array.from(uniqueCommunities).map(name => ({ name })),
                    skipDuplicates: true
                });
            }

            console.log(`Successfully imported batch ${batchNumber} (${uniqueCommunities.size} unique communities)`);
            return uniqueCommunities.size;
        });

        console.log(`\nCompleted importing indigenous communities`);
        console.log(`Total indigenous communities imported: ${currentFileImports}`);
        return { currentFileImports, totalImports };
        
    } catch (error) {
        console.error('Error importing indigenous communities:', error);
        throw error;
    }
}

// Clean up function for indigenous communities and related water authorities
export async function cleanupIndigenousCommunities() {
    console.log('Cleaning up indigenous communities and water authorities...');
    await prisma.indigenousCommunity.deleteMany({});
    await prisma.waterAuthority.deleteMany({});
    console.log('Indigenous communities and water authorities cleaned up');
}
