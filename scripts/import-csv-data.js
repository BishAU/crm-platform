import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';

const prisma = new PrismaClient();

const csvFiles = {
  users: './public/csv-imports/headersonly/users.csv',
  facilities: './public/csv-imports/headersonly/facilities.csv',
  outfalls: './public/csv-imports/headersonly/outfalls.csv',
  observations: './public/csv-imports/headersonly/observations.csv',
  landCouncils: './public/csv-imports/headersonly/landCouncils.csv',
  indigenousCommunities: './public/csv-imports/headersonly/indigenousCommunities.csv',
  waterAuthorities: './public/csv-imports/headersonly/waterAuthorities.csv',
  marketingLists: './public/csv-imports/headersonly/marketingLists.csv',
  campaigns: './public/csv-imports/headersonly/campaigns.csv',
  supportTickets: './public/csv-imports/headersonly/supportTickets.csv'
};

async function importCsvToTable(filePath, model) {
  console.log(`Reading ${filePath}...`);
  const csvContent = readFileSync(filePath, 'utf-8');
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
  });

  console.log(`Found ${records.length} records in ${filePath}`);

  for (const record of records) {
    try {
      // Convert dates
      if (record.createdAt) record.createdAt = new Date(record.createdAt);
      if (record.updatedAt) record.updatedAt = new Date(record.updatedAt);
      if (record.observedAt) record.observedAt = new Date(record.observedAt);
      if (record.startDate) record.startDate = new Date(record.startDate);
      if (record.endDate) record.endDate = new Date(record.endDate);

      // Convert numeric fields
      if (record.latitude) record.latitude = String(record.latitude);
      if (record.longitude) record.longitude = String(record.longitude);
      if (record.budget) record.budget = parseFloat(record.budget);
      if (record.population) record.population = parseInt(record.population);

      // Handle arrays
      if (record.media_images) {
        record.media_images = record.media_images.split(',').map(img => img.trim());
      }

      // Create the record using Prisma
      await prisma[model].create({
        data: {
          ...record,
          id: undefined // Let Prisma generate the ID
        }
      });
    } catch (error) {
      console.error(`Error importing record to ${model}:`, error);
      console.error('Record:', record);
    }
  }

  console.log(`Imported data to ${model} table`);
}

async function main() {
  try {
    console.log('Starting import process...');

    // Import in order of dependencies
    await importCsvToTable(csvFiles.waterAuthorities, 'waterAuthority');
    await importCsvToTable(csvFiles.indigenousCommunities, 'indigenousCommunity');
    await importCsvToTable(csvFiles.landCouncils, 'landCouncil');
    await importCsvToTable(csvFiles.users, 'user');
    await importCsvToTable(csvFiles.facilities, 'facility');
    await importCsvToTable(csvFiles.outfalls, 'outfall');
    await importCsvToTable(csvFiles.observations, 'observation');
    await importCsvToTable(csvFiles.marketingLists, 'marketingList');
    await importCsvToTable(csvFiles.campaigns, 'campaign');
    await importCsvToTable(csvFiles.supportTickets, 'supportTicket');

    console.log('All CSV data imported successfully.');
  } catch (error) {
    console.error('Error importing CSV data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(console.error);
