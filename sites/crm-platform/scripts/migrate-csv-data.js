#!/usr/bin/env node
import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import pkg from 'pg';
const { Client } = pkg;

const csvFiles = {
  facilities: '/home/bish/Downloads/sites/crm-platform/public/imports/EducationalFacilities.csv',
  outfalls: '/home/bish/Downloads/sites/crm-platform/public/imports/outfalls.csv',
  indigenousCommunities: '/home/bish/Downloads/sites/crm-platform/public/imports/IngidegnousCommunities.csv',
  landCouncils: '/home/bish/Downloads/sites/crm-platform/public/imports/LandCouncils.csv',
  observations: '/home/bish/Downloads/sites/crm-platform/public/imports/observations.csv',
  people: '/home/bish/Downloads/sites/crm-platform/public/imports/people.csv',
  politicians: '/home/bish/Downloads/sites/crm-platform/public/imports/politicians.csv',
  waterAuthorities: '/home/bish/Downloads/sites/crm-platform/public/imports/WaterAuthorities.csv',
};

const dbConfig = {
  user: 'crm_platform',
  host: process.env.PGHOST || 'localhost',
  database: 'crm_platform_dev',
  password: 'crm_platform_2024',
  port: process.env.PGPORT || 5432,
};

const client = new Client(dbConfig);

async function importCsvToTable(filePath, tableName, columnMappings) {
  console.log(`Reading ${filePath}...`);
  const csvContent = readFileSync(filePath, 'utf-8');
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
  });

  console.log(`Found ${records.length} records in ${filePath}`);

  let importedCount = 0;
  let errorCount = 0;

  for (const record of records) {
    const columns = Object.keys(columnMappings);
    const values = columns.map(col => record[columnMappings[col]]);
    const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
    
    const query = `
      INSERT INTO "${tableName}" (${columns.map(c => `"${c}"`).join(', ')})
      VALUES (${placeholders})
      ON CONFLICT DO NOTHING
    `;

    try {
      await client.query(query, values);
      importedCount++;
    } catch (error) {
      console.error(`Error importing record to ${tableName}:`, error);
      console.error('Query:', query);
      console.error('Values:', values);
      console.error('Record:', record);
      errorCount++;
    }
  }
  
  console.log(`Imported ${importedCount} records to ${tableName} table with ${errorCount} errors.`);
  return { importedCount, errorCount };
}

async function main() {
  const importSummary = {};
  try {
    console.log('Connecting to database...');
    await client.connect();
    console.log('Connected successfully');

    // Import outfalls
    importSummary.outfalls = await importCsvToTable(csvFiles.outfalls, 'Outfall', {
      authority: 'Authority',
      contact: 'Contact',
      contact_email: 'Contact_email',
      contact_name: 'Contact_name',
      indigenous_nation: 'Indigenous Nation',
      land_council: 'Land Council',
      latitude: 'Latitude',
      longitude: 'Longitude',
      outfall: 'Outfall',
      state: 'State',
      type: 'Type'
    });

    // Import water authorities
    importSummary.waterAuthorities = await importCsvToTable(csvFiles.waterAuthorities, 'WaterAuthority', {
      "Associated Indigenous Communities": 'Associated Indigenous Communities',
      "Authority Name": 'Authority Name'
    });

    // Import indigenous communities
    importSummary.indigenousCommunities = await importCsvToTable(csvFiles.indigenousCommunities, 'IndigenousCommunity', {
      "Related Water Authorities": 'Related Water Authorities',
      "Community Name": 'Community Name'
    });

    // Import politicians
    importSummary.politicians = await importCsvToTable(csvFiles.politicians, 'Politician', {
      Address: 'Address',
      City: 'City',
      EOAddress: 'EOAddress',
      Electorate: 'Electorate',
      Email: 'Email',
      Fax: 'Fax',
      "First name": 'First name',
      Gender: 'Gender',
      House: 'House',
      LastName: 'LastName',
      LastUpdated: 'LastUpdated',
      MinAddress: 'MinAddress',
      MinPhone: 'MinPhone',
      Minister: 'Minister',
      POAddress: 'POAddress',
      POstcode: 'POstcode',
      Party: 'Party',
      PartyAbb: 'PartyAbb',
      Phone: 'Phone',
      Photo: 'Photo',
      "Political Party": 'Political Party',
      "Politician Name": 'Politician Name',
      Position: 'Position',
      PreferredName: 'PreferredName',
      Salutation: 'Salutation',
      State: 'State',
      Surname: 'Surname',
      Title: 'Title',
      Web: 'Web',
      images: 'images',
      "﻿Full Name": '﻿Full Name'
    });

    // Import facilities
    importSummary.facilities = await importCsvToTable(csvFiles.facilities, 'Facility', {
      Latitude: 'Latitude',
      Longtitude: 'Longtitude',
      Postcode: 'Postcode',
      "Region Type": 'Region Type',
      Sector: 'Sector',
      Surburb: 'Surburb',
      Type: 'Type',
      "Facility Name": '﻿Facility Name'
    });

    // Import land councils
    importSummary.landCouncils = await importCsvToTable(csvFiles.landCouncils, 'LandCouncil', {
      "Council Name": 'Council Name',
      "Indigenous Nation": 'Indigenous Nation',
      "Related Water Authorities": 'Related Water Authorities'
    });
    
    // Import observations
    importSummary.observations = await importCsvToTable(csvFiles.observations, 'OutfallObservation', {
        "Observation Date": "Observation Date",
        "Observation Time": "Observation Time",
        "Outfall ID": "Outfall ID",
        "Observation Type": "Observation Type",
        "Observation Details": "Observation Details",
        "Observed By": "Observed By",
        "Photo": "Photo"
    });

    console.log('All CSV data migrated successfully.');
    console.log('Import Summary:');
    for (const table in importSummary) {
      console.log(`${table}: ${importSummary[table].importedCount} records imported, ${importSummary[table].errorCount} errors.`);
    }
  } catch (error) {
    console.error('Error migrating CSV data:', error);
  } finally {
    await client.end();
  }
}

main().catch(console.error);
