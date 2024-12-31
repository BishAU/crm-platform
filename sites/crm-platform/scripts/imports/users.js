import { prisma, processCsvFile, filterDuplicateEmails, safeParseValue } from './shared.js';

export async function importUsers(filePath) {
    console.log('\nProcessing Users...');
    const processedEmails = new Set();
    
    try {
        const { currentFileImports, totalImports } = await processCsvFile(filePath, async (records, batchNumber, processedEmails) => {
            console.log(`Processing batch ${batchNumber} for Users...`);
            
            // Filter out records with duplicate emails
            const uniqueRecords = filterDuplicateEmails(records, processedEmails);
            
            if (uniqueRecords.length === 0) {
                console.log('Skipping batch - all records were duplicates');
                return 0;
            }

            await prisma.user.createMany({
                skipDuplicates: true,
                data: uniqueRecords.map(r => ({
                    name: `${r['First Name'] || ''} ${r['Last Name'] || ''}`.trim(),
                    email: r['Email']?.toLowerCase(),
                    firstName: r['First Name'],
                    lastName: r['Last Name'],
                    fullName: `${r['First Name'] || ''} ${r['Last Name'] || ''}`.trim(),
                    phone: r['Phone'],
                    address1: r['Address'],
                    city: r['City'],
                    state: r['State'],
                    postcode: r['Postcode'],
                    country: r['Country'],
                    company: r['Company'],
                    title: r['Title'],
                    description: r['Description'],
                    organisation: r['Organisation'],
                    portfolio: r['Portfolio'],
                    portfolioDept: r['Portfolio Department'],
                    relationship: r['Relationship'],
                    newsletter: safeParseValue(r['Newsletter'], 'boolean'),
                    optInStatus: r['Opt In Status']
                }))
            });

            console.log(`Successfully imported batch ${batchNumber} (${uniqueRecords.length} records)`);
            return uniqueRecords.length;
        }, processedEmails);

        console.log(`\nCompleted importing users`);
        console.log(`Total users imported: ${currentFileImports}`);
        return { currentFileImports, totalImports };
        
    } catch (error) {
        console.error('Error importing users:', error);
        throw error;
    }
}

// Clean up function for users
export async function cleanupUsers() {
    console.log('Cleaning up users and related data...');
    // Delete related data first
    await prisma.marketingList.deleteMany({});
    await prisma.user.deleteMany({});
    console.log('Users and related data cleaned up');
}
