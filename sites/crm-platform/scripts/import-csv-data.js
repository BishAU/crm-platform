import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import pkg from 'pg';
const { Client } = pkg;

const csvFiles = {
  'educational_facilities': '/home/bish/Downloads/sites/crm-platform/public/imports/formatted/EducationalFacilities.csv',
  'indigenous_communities': '/home/bish/Downloads/sites/crm-platform/public/imports/formatted/IngidegnousCommunities.csv',
  'land_councils': '/home/bish/Downloads/sites/crm-platform/public/imports/formatted/LandCouncils.csv',
  'outfalls': '/home/bish/Downloads/sites/crm-platform/public/imports/formatted/outfalls.csv',
  'people': '/home/bish/Downloads/sites/crm-platform/public/imports/formatted/people.csv',
  'politicians': '/home/bish/Downloads/sites/crm-platform/public/imports/formatted/politicians.csv',
  'water_authorities': '/home/bish/Downloads/sites/crm-platform/public/imports/formatted/WaterAuthorities.csv',
};

const dbConfig = {
  user: 'crm_platform',
  host: 'localhost',
  database: 'crm_platform_dev',
  password: 'crm_platform_2024',
  port: 5432,
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

  for (const record of records) {
    const columns = Object.keys(columnMappings);
    const values = columns.map(col => {
      const csvHeader = columnMappings[col];
      let value = record[csvHeader.trim()]; // Trim header to remove potential whitespace

      // Handle empty or undefined values
      if (value === undefined || value === '') {
        return null;
      }

      // Handle comma-separated values by taking the first value
      if (typeof value === 'string' && value.includes(',')) {
        if (col === 'latitude' || col === 'longitude') {
          const firstValue = value.split(',')[0].trim();
          return parseFloat(firstValue);
        }
        return value.split(',')[0].trim();
      }

      // Attempt to parse dates
      if (['creationDate', 'dob', 'lastUpdated'].includes(col) && value) {
        return new Date(value);
      }

      // Attempt to parse booleans (case-insensitive)
      if (['annualReportPrepared', 'newsletter', 'minister'].includes(col) && value) {
        if (value.toLowerCase() === 'yes' || value.toLowerCase() === 'true') return true;
        if (value.toLowerCase() === 'no' || value.toLowerCase() === 'false') return false;
      }

      return value;
    });

    // Skip record if required fields are null
    if (values.some((value, index) => {
      const columnName = columns[index];
      // Add any required fields here
      const requiredFields = ['name'];
      return requiredFields.includes(columnName) && (value === null || value === undefined);
    })) {
      console.warn('Skipping record due to missing required fields:', record);
      continue;
    }

    const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');

    const query = `
      INSERT INTO "${tableName}" (${columns.map(c => `"${c}"`).join(', ')})
      VALUES (${placeholders})
      ON CONFLICT DO NOTHING
    `;

    try {
      await client.query(query, values);
    } catch (error) {
      console.error(`Error importing record to ${tableName}:`, error);
      console.error('Query:', query);
      console.error('Values:', values);
      console.error('Record:', record);
    }
  }

  console.log(`Imported data to ${tableName} table`);
}

async function importOutfalls(filePath) {
  console.log(`Reading ${filePath}...`);
  const csvContent = readFileSync(filePath, 'utf-8');
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
  });

  console.log(`Found ${records.length} records in ${filePath}`);

  for (const record of records) {
    let waterAuthorityId = null;
    const waterAuthorityName = record['Authority']?.trim();
    if (waterAuthorityName) {
      const waterAuthorityResult = await client.query(
        'SELECT id FROM water_authorities WHERE name = $1',
        [waterAuthorityName]
      );
      if (waterAuthorityResult.rows.length > 0) {
        waterAuthorityId = waterAuthorityResult.rows[0].id;
      } else {
        const insertResult = await client.query(
          'INSERT INTO water_authorities (name) VALUES ($1) ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING id',
          [waterAuthorityName]
        );
        waterAuthorityId = insertResult.rows[0].id;
      }
    }

    let indigenousCommunityId = null;
    const indigenousCommunityName = record['Indigenous Nation']?.trim();
    if (indigenousCommunityName) {
      const communityResult = await client.query(
        'SELECT id FROM indigenous_communities WHERE name = $1',
        [indigenousCommunityName]
      );
      if (communityResult.rows.length > 0) {
        indigenousCommunityId = communityResult.rows[0].id;
      } else {
        const insertResult = await client.query(
          'INSERT INTO indigenous_communities (name) VALUES ($1) ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING id',
          [indigenousCommunityName]
        );
        indigenousCommunityId = insertResult.rows[0].id;
      }
    }

    const query = `
      INSERT INTO outfalls (outfallName, authority, contact, contact_email, contact_name, indigenousNation, landCouncil, latitude, longitude, state, type, "waterAuthorityId", "indigenousCommunityId")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      ON CONFLICT DO NOTHING
    `;

    const values = [
      record['Outfall']?.trim(),
      record['Authority']?.trim(),
      record['Contact']?.trim(),
      record['Contact_email']?.trim(),
      record['Contact_name']?.trim(),
      record['Indigenous Nation']?.trim(),
      record['Land Council']?.trim(),
      record['Latitude']?.trim(),
      record['Longitude']?.trim(),
      record['State']?.trim(),
      record['Type']?.trim(),
      waterAuthorityId,
      indigenousCommunityId,
    ];

    try {
      await client.query(query, values);
    } catch (error) {
      console.error('Error importing record to outfalls:', error);
      console.error('Query:', query);
      console.error('Values:', values);
      console.error('Record:', record);
    }
  }

  console.log(`Imported data to outfalls table`);
}

async function main() {
  try {
    console.log('Connecting to database...');
    await client.connect();
    console.log('Connected successfully');

    // Import educational facilities
    await importCsvToTable(csvFiles['educational_facilities'], 'facility', {
      "name": '﻿Facility Name',
      "type": 'Type',
      "latitude": 'Latitude',
      "longitude": 'Longtitude',
      "postcode": 'Postcode',
      "regionType": 'Region Type',
      "sector": 'Sector',
      "suburb": 'Surburb'
    });

    // Import indigenous communities
    await importCsvToTable(csvFiles['indigenous_communities'], 'indigenous_community', {
      "name": "﻿Community Name",
      "waterAuthorities": "Related Water Authorities"
    });

    // Import land councils
    await importCsvToTable(csvFiles['land_councils'], 'land_council', {
      "name": "﻿Name",
      "email": "Email",
      "lgas": "LGAs",
      "outfallCount": "Number of outfalls",
      "outfalls": "Outfalls",
      "phone": "Phone"
    });

    // Import outfalls, handling relationships
    await importOutfalls(csvFiles['outfalls']);

    // Import people
    await importCsvToTable(csvFiles['people'], 'user', {
      "abn": 'ABN',
      "address1": 'Address 1',
      "annualReportPrepared": 'Annual Report Prepared and Tabled?',
      "annualReports": 'Annual Reports',
      "auditor": 'Auditor',
      "budgetDocumentation": 'Budget Documentation',
      "city": 'City',
      "classification": 'Classification',
      "company": 'Company',
      "country": 'Country',
      "creationDate": 'Create At',
      "dob": 'DOB',
      "description": 'Description',
      "email": 'Email',
      "establishedBy": 'Established By / Under',
      "establishedByInfo": 'Established by/Under More Info',
      "firstName": 'First Name',
      "fullName": 'Full Name',
      "gfsFunction": 'GFS Function / Sector Reported',
      "gfsSector": 'GFS Sector Classification',
      "headOfficeCountry": 'Head Office Country',
      "headOfficePostcode": 'Head Office Postcode',
      "headOfficeState": 'Head Office State',
      "headOfficeAddress": 'Head Office Street Address',
      "headOfficeSuburb": 'Head Office Suburb',
      "lastName": 'Last Name',
      "materiality": 'Materiality',
      "newsletter": 'Newsletter',
      "optInStatus": 'Opt In Status',
      "organisation": 'Organisation',
      "psActBody": 'PS Act Body',
      "phone": 'Phone',
      "phoneNumber": 'Phone Number',
      "physicalAddress": 'Physical Address',
      "physicalAddressState": 'Physical Address State',
      "portfolio": 'Portfolio',
      "portfolioDept": 'Portfolio Dept?',
      "postcode": 'Postcode',
      "relationship": 'Relationship',
      "state": 'State',
      "strategicPlan": 'Strategic/Corporate/Organisational Plan',
      "surname": 'Surname',
      "title": 'Title',
      "typeOfBody": 'Type of Body',
      "websiteAddress": 'Website Address'
    });

    // Import politicians
    await importCsvToTable(csvFiles['politicians'], 'politician', {
      "name": "Politician Name",
      "address": "Address",
      "city": "City",
      "eoAddress": "EOAddress",
      "electorate": "Electorate",
      "email": "Email",
      "fax": "Fax",
      "firstName": "First name",
      "gender": "Gender",
      "house": "House",
      "lastName": "LastName",
      "lastUpdated": "LastUpdated",
      "minAddress": "MinAddress",
      "minPhone": "MinPhone",
      "minister": "Minister",
      "poAddress": "POAddress",
      "poPostcode": "POstcode",
      "party": "Party",
      "partyAbb": "PartyAbb",
      "phone": "Phone",
      "photo": "Photo",
      "politicalParty": "Political Party",
      "position": "Position",
      "preferredName": "PreferredName",
      "salutation": "Salutation",
      "state": "State",
      "surname": "Surname",
      "title": "Title",
      "web": "Web",
      "imageUrl": "images",
      "fullName": "Full Name"
    });

    // Import water authorities
    await importCsvToTable(csvFiles['water_authorities'], 'water_authority', {
      "name": "﻿Authority Name",
      "indigenousCommunities": "Associated Indigenous Communities"
    });

    console.log('All CSV data migrated successfully.');
  } catch (error) {
    console.error('Error migrating CSV data:', error);
  } finally {
    await client.end();
  }
}

main().catch(console.error);
