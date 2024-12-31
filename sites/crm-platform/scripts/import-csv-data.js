import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import pkg from 'pg';
const { Client } = pkg;

const csvFiles = {
  'educational-facilities': '/home/bish/Downloads/sites/crm-platform/public/imports/EducationalFacilities.csv',
  'indigenous-communities': '/home/bish/Downloads/sites/crm-platform/public/imports/IngidegnousCommunities.csv',
  'land-councils': '/home/bish/Downloads/sites/crm-platform/public/imports/LandCouncils.csv',
  'outfalls': '/home/bish/Downloads/sites/crm-platform/public/imports/outfalls.csv',
  'people': '/home/bish/Downloads/sites/crm-platform/public/imports/people.csv',
  'politicians': '/home/bish/Downloads/sites/crm-platform/public/imports/politicians.csv',
  'water-authorities': '/home/bish/Downloads/sites/crm-platform/public/imports/WaterAuthorities.csv',
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
      const value = record[csvHeader];
      
      // Handle empty or undefined values
      if (value === undefined || value === '') {
        return null;
      }
      
      // Handle comma-separated values by taking the first value
      if (typeof value === 'string' && value.includes(',')) {
        if (col === 'latitude' || col === 'longtitude') {
          const firstValue = value.split(',')[0].trim();
          return parseFloat(firstValue);
        }
        return value.split(',')[0].trim();
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

async function main() {
  try {
    console.log('Connecting to database...');
    await client.connect();
    console.log('Connected successfully');

    // Import educational facilities
    await importCsvToTable(csvFiles['educational-facilities'], 'facilities', {
      "name": '﻿Facility Name',
      "type": 'Type',
      "latitude": 'Latitude',
      "longtitude": 'Longtitude',
      "postcode": 'Postcode',
      "regionType": 'Region Type',
      "sector": 'Sector',
      "surburb": 'Surburb'
    });

    // Import indigenous communities
    await importCsvToTable(csvFiles['indigenous-communities'], 'indigenous_communities', {
      "name": "﻿Community Name",
      "associatedIndigenousCommunities": "Related Water Authorities"
    });

    // Import land councils
    await importCsvToTable(csvFiles['land-councils'], 'land_councils', {
      "name": "﻿Name",
      "email": "Email",
      "lgas": "LGAs",
      "numberOfOutfalls": "Number of outfalls",
      "outfalls": "Outfalls",
      "phone": "Phone"
    });

    // Import outfalls
    await importCsvToTable(csvFiles['outfalls'], 'outfalls', {
      "name": 'Outfall',
      "authority": 'Authority',
      "contact": 'Contact',
      "contact_email": 'Contact_email',
      "contact_name": 'Contact_name',
      "indigenousNation": 'Indigenous Nation',
      "landCouncil": 'Land Council',
      "latitude": 'Latitude',
      "longitude": 'Longitude',
      "state": 'State',
      "type": 'Type'
    });

    // Import people
    await importCsvToTable(csvFiles['people'], 'people', {
      "abn": 'ABN',
      "address1": 'Address 1',
      "annualReportPreparedAndTabled": 'Annual Report Prepared and Tabled?',
      "annualReports": 'Annual Reports',
      "auditor": 'Auditor',
      "budgetDocumentation": 'Budget Documentation',
      "city": 'City',
      "classification": 'Classification',
      "company": 'Company',
      "country": 'Country',
      "createAt": 'Create At',
      "creationDate": 'Creation Date',
      "dob": 'DOB',
      "description": 'Description',
      "email": 'Email',
      "establishedByUnder": 'Established By / Under',
      "establishedByUnderMoreInfo": 'Established by/Under More Info',
      "firstName": 'First Name',
      "name": 'Full Name',
      "gfsFunctionSectorReported": 'GFS Function / Sector Reported',
      "gfsSectorClassification": 'GFS Sector Classification',
      "headOfficeCountry": 'Head Office Country',
      "headOfficePostcode": 'Head Office Postcode',
      "headOfficeState": 'Head Office State',
      "headOfficeStreetAddress": 'Head Office Street Address',
      "headOfficeSuburb": 'Head Office Suburb',
      "lastName": 'Last Name',
      "materiality": 'Materiality',
      "newsletter": 'Newsletter',
      "optInStatus": 'Opt In Status',
      "organisation": 'Organisation',
      "organistion": 'Organistion',
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
      "strategicCorporateOrganisationalPlan": 'Strategic/Corporate/Organisational Plan',
      "surname": 'Surname',
      "title": 'Title',
      "typeOfBody": 'Type of Body',
      "websiteAddress": 'Website Address'
    });

    // Import politicians
    await importCsvToTable(csvFiles['politicians'], 'politicians', {
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
      "poStcode": "POstcode",
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
      "images": "images",
      "fullName": "Full Name"
    });

    // Import water authorities
    await importCsvToTable(csvFiles['water-authorities'], 'water_authorities', {
      "name": "﻿Authority Name",
      "associatedIndigenousCommunities": "Associated Indigenous Communities"
    });

    console.log('All CSV data migrated successfully.');
  } catch (error) {
    console.error('Error migrating CSV data:', error);
  } finally {
    await client.end();
  }
}

main().catch(console.error);
