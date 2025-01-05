import { prisma, processCsvFile, filterDuplicateEmails, safeParseValue } from './shared.js';
import crypto from 'crypto';

export async function importPoliticians(filePath) {
    console.log('\nProcessing Politicians...');
    const processedEmails = new Set();
    
    try {
        const { currentFileImports, totalImports } = await processCsvFile(filePath, async (records, batchNumber, processedEmails) => {
            console.log(`Processing batch ${batchNumber} for Politicians...`);
            
            // Filter out records with duplicate emails
            const uniqueRecords = filterDuplicateEmails(records, processedEmails);
            
            if (uniqueRecords.length === 0) {
                console.log('Skipping batch - all records were duplicates');
                return 0;
            }
            await prisma.politician.createMany({
                skipDuplicates: true,
                data: uniqueRecords.map(r => ({
                    id: crypto.randomUUID(),
                    name: `${r['First name'] || r['PreferredName'] || ''} ${r['Surname'] || ''}`.trim(),
                    email: r['Email']?.toLowerCase(),
                    party: r['Party'] || r['Political Party'],
                    position: r['Position'],
                    state: r['State'],
                    address: r['Address'],
                    city: r['City'],
                    eoAddress: r['EOAddress'],
                    electorate: r['Electorate'],
                    fax: r['Fax'],
                    firstName: r['First name'],
                    gender: r['Gender'],
                    house: r['House'],
                    lastName: r['LastName'],
                    lastUpdated: safeParseValue(r['LastUpdated'], 'date'),
                    minAddress: r['MinAddress'],
                    minPhone: r['MinPhone'],
                    minister: safeParseValue(r['Minister'], 'boolean'),
                    poAddress: r['POAddress'],
                    poPostcode: r['POstcode'],
                    partyAbb: r['PartyAbb'],
                    phone: r['Phone'],
                    photo: r['Photo'],
                    preferredName: r['PreferredName'],
                    salutation: r['Salutation'],
                    surname: r['Surname'],
                    title: r['Title'],
                    web: r['Web'],
                    imageUrl: r['images']
                }))
            });

            console.log(`Successfully imported batch ${batchNumber} (${uniqueRecords.length} records)`);
            return uniqueRecords.length;
        }, processedEmails);

        console.log(`\nCompleted importing politicians`);
        console.log(`Total politicians imported: ${currentFileImports}`);
        return { currentFileImports, totalImports };
        
    } catch (error) {
        console.error('Error importing politicians:', error);
        throw error;
    }
}

// Clean up function for politicians
export async function cleanupPoliticians() {
    console.log('Cleaning up politicians...');
    await prisma.politician.deleteMany({});
    console.log('Politicians cleaned up');
}
