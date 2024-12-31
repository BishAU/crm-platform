import { prisma, processCsvFile } from './shared.js';

export async function importWaterAuthorities(filePath) {
    console.log('\nProcessing Water Authorities...');
    
    try {
        const { currentFileImports, totalImports } = await processCsvFile(filePath, async (records, batchNumber) => {
            console.log(`Processing batch ${batchNumber} for Water Authorities...`);
            
            await prisma.waterAuthority.createMany({
                skipDuplicates: true,
                data: records.map(r => ({
                    name: r['Name'] || r['Authority Name'],
                    indigenousCommunities: r['Associated Indigenous Communities']
                }))
            });

            console.log(`Successfully imported batch ${batchNumber} (${records.length} records)`);
            return records.length;
        });

        console.log(`\nCompleted importing water authorities`);
        console.log(`Total water authorities imported: ${currentFileImports}`);
        return { currentFileImports, totalImports };
        
    } catch (error) {
        console.error('Error importing water authorities:', error);
        throw error;
    }
}

// Clean up function for water authorities
export async function cleanupWaterAuthorities() {
    console.log('Cleaning up water authorities...');
    await prisma.waterAuthority.deleteMany({});
    console.log('Water authorities cleaned up');
}
