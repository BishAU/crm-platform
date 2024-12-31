import { prisma, processCsvFile } from './shared.js';

export async function importOutfalls(filePath) {
    console.log('\nProcessing Outfalls...');
    
    try {
        const { currentFileImports, totalImports } = await processCsvFile(filePath, async (records, batchNumber) => {
            console.log(`Processing batch ${batchNumber} for Outfalls...`);
            
            await prisma.outfall.createMany({
                skipDuplicates: true,
                data: records.map(r => ({
                    authority: r['Authority'],
                    contact: r['Contact'],
                    contact_email: r['Email'],
                    contact_name: r['Contact Name'],
                    indigenousNation: r['Indigenous Nation'],
                    landCouncil: r['Land Council'],
                    latitude: r['Latitude'],
                    longitude: r['Longitude'],
                    state: r['State'],
                    type: r['Type'],
                    outfallName: r['Outfall']
                }))
            });

            console.log(`Successfully imported batch ${batchNumber} (${records.length} records)`);
            return records.length;
        });

        console.log(`\nCompleted importing outfalls`);
        console.log(`Total outfalls imported: ${currentFileImports}`);
        return { currentFileImports, totalImports };
        
    } catch (error) {
        console.error('Error importing outfalls:', error);
        throw error;
    }
}

// Clean up function for outfalls
export async function cleanupOutfalls() {
    console.log('Cleaning up outfalls...');
    await prisma.outfall.deleteMany({});
    console.log('Outfalls cleaned up');
}
