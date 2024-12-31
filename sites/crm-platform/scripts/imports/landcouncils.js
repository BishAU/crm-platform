import { prisma, processCsvFile, safeParseValue } from './shared.js';

export async function importLandCouncils(filePath) {
    console.log('\nProcessing Land Councils...');
    
    try {
        const { currentFileImports, totalImports } = await processCsvFile(filePath, async (records, batchNumber) => {
            console.log(`Processing batch ${batchNumber} for Land Councils...`);
            
            await prisma.landCouncil.createMany({
                skipDuplicates: true,
                data: records.map(r => ({
                    name: r['Name'],
                    email: r['Email'],
                    lgas: r['LGAs'],
                    outfallCount: safeParseValue(r['Number of outfalls'], 'number'),
                    outfalls: r['Outfalls'],
                    phone: r['Phone']
                }))
            });

            console.log(`Successfully imported batch ${batchNumber} (${records.length} records)`);
            return records.length;
        });

        console.log(`\nCompleted importing land councils`);
        console.log(`Total land councils imported: ${currentFileImports}`);
        return { currentFileImports, totalImports };
        
    } catch (error) {
        console.error('Error importing land councils:', error);
        throw error;
    }
}

// Clean up function for land councils
export async function cleanupLandCouncils() {
    console.log('Cleaning up land councils...');
    await prisma.landCouncil.deleteMany({});
    console.log('Land councils cleaned up');
}
