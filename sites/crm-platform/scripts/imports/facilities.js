import { prisma, ADMIN_USER_ID, processCsvFile } from './shared.js';

export async function importFacilities(filePath) {
    console.log('\nImporting Facilities from CSV...');
    
    try {
        // Get admin user for creator reference
        const admin = await prisma.user.findFirst({
            where: { isAdmin: true }
        });
        
        if (!admin) {
            throw new Error('No admin user found - please run create-admin-user.js first');
        }

        const { currentFileImports } = await processCsvFile(filePath, async (records) => {
            // Direct CSV column mapping
            const data = records.map(r => ({
                name: r['Name'] || r['School Name'] || r['Facility Name'] || 'Unnamed Facility',
                latitude: r['Latitude'] || r['Lat'] || null,
                longitude: r['Longitude'] || r['Long'] || null,
                postcode: r['Postcode'] || null,
                regionType: r['Region Type'] || r['RegionType'] || null,
                sector: r['Sector'] || r['School Sector'] || null,
                suburb: r['Suburb'] || null,
                type: r['Type'] || r['School Type'] || null,
                creatorId: admin.id
            }));

            // Bulk insert with skip duplicates
            await prisma.facility.createMany({
                data,
                skipDuplicates: true
            });

            return records.length;
        });

        console.log(`Imported ${currentFileImports} facilities`);
        return { currentFileImports };
        
    } catch (error) {
        console.error('Failed to import facilities:', error);
        throw error;
    }
}

// Clean up function for facilities
export async function cleanupFacilities() {
    console.log('Cleaning up facilities...');
    await prisma.facility.deleteMany({});
    console.log('Facilities cleaned up');
}
