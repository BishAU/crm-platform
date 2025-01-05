const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const { Pool } = require('pg');

import { log } from './utils.js';

// Helper function for fuzzy column matching
const getFuzzyValue = (record, variants) => {
  for (const variant of variants) {
    const value = record[variant] || record[variant.toLowerCase()] || record[variant.replace(/\s+/g, '')] || record[variant.replace(/\s+/g, '_')];
    if (value) return value;
  }
  return '';
};

// Helper function to parse dates
const parseDate = (dateStr) => {
  if (!dateStr) return new Date().toISOString();
  
  // Try different date formats
  const formats = [
    // DD/MM/YYYY
    str => {
      const [day, month, year] = str.split('/').map(Number);
      return new Date(year, month - 1, day).toISOString();
    },
    // YYYY-MM-DD
    str => new Date(str).toISOString(),
    // MM/DD/YYYY
    str => new Date(str).toISOString()
  ];

  for (const format of formats) {
    try {
      return format(dateStr);
    } catch (e) {
      continue;
    }
  }

  return new Date().toISOString();
};

// Use DATABASE_URL directly
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://crm_user:crm_password@localhost:5432/crm_platform'
});

// Process a single CSV file
async function processCsvFile(filePath) {
  const fileName = path.basename(filePath);
  log('info', `Processing CSV file: ${fileName}`);

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const records = [];

    // Parse CSV file
    const parser = parse(fileContent, {
      columns: header => 
        header.map(col => col
          .replace(/^[\ufeff"']|["']$/g, '')  // Remove BOM and quotes
          .replace(/\s+/g, ' ')               // Normalize spaces
          .trim()                             // Trim whitespace
        ),
      skip_empty_lines: true,
      trim: true,
      bom: true,
      quote: '"',
      escape: '"',
      relaxColumnCount: true
    });

    for await (const record of parser) {
      records.push(record);
    }

    if (records.length === 0) {
      log('warn', `No records found in ${fileName}`);
      return;
    }

    // Helper function to get table config by filename pattern
    const getTableConfig = (fileName) => {
      // Base configurations for each table type
      const configs = {
        facility: {
          tableName: 'Facility',
          columnMap: record => ({
            name: getFuzzyValue(record, ['Name', 'Facility Name', 'Site Name']),
            type: getFuzzyValue(record, ['Type', 'Facility Type', 'Category']),
            location: getFuzzyValue(record, ['Location', 'Address', 'Physical Address', 'Head Office Street Address']),
            contact: getFuzzyValue(record, ['Contact', 'Contact Person', 'Representative']),
            email: getFuzzyValue(record, ['Email', 'Contact Email', 'Email Address'])
          }),
          deduplicateBy: 'email'
        },
        outfall: {
          tableName: 'Outfall',
          columnMap: record => {
            const name = getFuzzyValue(record, ['Name', 'Outfall Name', 'Location Name']);
            const location = getFuzzyValue(record, ['Location', 'Address', 'Site Location']);
            const type = getFuzzyValue(record, ['Type', 'Outfall Type', 'Category']);
            
            // Extract and clean postcode data
            const postcodes25km = (getFuzzyValue(record, ['Postcodes within 25km', 'postcode pupluation', 'Postcodes within 25km']) || '')
              .replace(/["\(\)]/g, '')  // Remove quotes and parentheses
              .replace(/\s+/g, ' ')     // Normalize spaces
              .trim();
            const postcodes50km = (getFuzzyValue(record, ['Postcodes within 50km', 'Postcodes within 50 km']) || '')
              .replace(/["\(\)]/g, '')
              .replace(/\s+/g, ' ')
              .trim();
            const population25km = (getFuzzyValue(record, ['Population 25km radius', 'Population within 25km']) || '')
              .replace(/[,\s]+/g, '')   // Remove commas and spaces from numbers
              .trim();
            const population50km = (getFuzzyValue(record, ['Population (50km radius)', 'Population within 50km']) || '')
              .replace(/[,\s]+/g, '')
              .trim();

            const descriptionParts = [
              getFuzzyValue(record, ['Water Authority']) && `Water Authority: ${getFuzzyValue(record, ['Water Authority'])}`,
              getFuzzyValue(record, ['Indigenous Community', 'Nearby Indigenous Community']) && 
                `Indigenous Community: ${getFuzzyValue(record, ['Indigenous Community', 'Nearby Indigenous Community'])}`,
              getFuzzyValue(record, ['Land Council']) && `Land Council: ${getFuzzyValue(record, ['Land Council'])}`,
              postcodes25km && `Postcodes (25km): ${postcodes25km}`,
              postcodes50km && `Postcodes (50km): ${postcodes50km}`,
              population25km && `Population (25km): ${population25km}`,
              population50km && `Population (50km): ${population50km}`
            ].filter(Boolean).join(' | ');

            return {
              name,
              location,
              type,
              description: descriptionParts,
              status: getFuzzyValue(record, ['Status', 'State', 'Condition']) || 'Active',
              postcodes25km,
              postcodes50km
            };
          },
          deduplicateBy: 'name'
        },
        waterAuthority: {
          tableName: 'WaterAuthority',
          columnMap: record => ({
            name: getFuzzyValue(record, ['Name', 'Authority Name', 'Water Authority']),
            region: getFuzzyValue(record, ['Region', 'Area', 'Location']),
            contact: getFuzzyValue(record, ['Contact', 'Contact Person']),
            email: getFuzzyValue(record, ['Email', 'Contact Email'])
          }),
          deduplicateBy: 'email'
        },
        indigenousCommunity: {
          tableName: 'IndigenousCommunity',
          columnMap: record => ({
            name: getFuzzyValue(record, ['Name', 'Community Name', 'Indigenous Community', 'Nearby Indigenous Community']),
            region: getFuzzyValue(record, ['Region', 'Area', 'Location', 'Territory']),
            contact: getFuzzyValue(record, ['Contact', 'Contact Person', 'Representative']),
            email: getFuzzyValue(record, ['Email', 'Contact Email'])
          }),
          deduplicateBy: 'email'
        },
        landCouncil: {
          tableName: 'LandCouncil',
          columnMap: record => ({
            name: getFuzzyValue(record, ['Name', 'Council Name', 'Land Council']),
            region: getFuzzyValue(record, ['Region', 'Area', 'Location', 'Territory']),
            contact: getFuzzyValue(record, ['Contact', 'Contact Person', 'Representative']),
            email: getFuzzyValue(record, ['Email', 'Contact Email'])
          }),
          deduplicateBy: 'email'
        },
        politician: {
          tableName: 'Politician',
          columnMap: record => ({
            name: getFuzzyValue(record, ['Name', 'Full Name', 'Politician Name', 'PreferredName', 'Preferred Name']),
            position: getFuzzyValue(record, ['Position', 'Role', 'Title', 'Minister']),
            party: getFuzzyValue(record, ['Party', 'Political Party', 'PartyAbb']),
            region: getFuzzyValue(record, ['Region', 'Electorate', 'District', 'Area']),
            email: getFuzzyValue(record, ['Email', 'Contact Email'])
          }),
          deduplicateBy: 'email'
        },
        outfallObservation: {
          tableName: 'OutfallObservation',
          columnMap: record => ({
            outfallId: getFuzzyValue(record, ['Outfall ID', 'OutfallId', 'Outfall', 'Master Outfalls']),
            observedBy: getFuzzyValue(record, ['Observed By', 'Observer', 'Reporter', 'Witness']),
            date: parseDate(getFuzzyValue(record, ['Date', 'Observation Date', 'Reported Date'])),
            description: getFuzzyValue(record, ['Description', 'Notes', 'Comments', 'Details']),
            status: getFuzzyValue(record, ['Status', 'State', 'Condition']) || 'Pending'
          }),
          deduplicateBy: 'outfallId'
        },
        person: {
          tableName: 'Person',
          columnMap: record => ({
            name: getFuzzyValue(record, ['Name', 'Full Name', 'First Name', 'FirstName', 'PreferredName', 'Preferred Name']),
            email: getFuzzyValue(record, ['Email', 'Contact Email']),
            password: 'default',
            role: getFuzzyValue(record, ['Role', 'Position', 'Title']) || 'User',
            organization: getFuzzyValue(record, ['Organization', 'Company', 'Organisation', 'Parent Organisation'])
          }),
          deduplicateBy: 'email'
        }
      };

      // Map filenames to config types
      const filePatterns = {
        'educational-facilities.csv': configs.facility,
        'outfalls': configs.outfall,
        'water-authorities.csv': configs.waterAuthority,
        'indigenous-communities.csv': configs.indigenousCommunity,
        'land-councils.csv': configs.landCouncil,
        'politicians': configs.politician,
        'outfall-observations.csv': configs.outfallObservation,
        'people': configs.person
      };

      // Match numbered files (e.g., people1.csv, outfalls2.csv)
      for (const [pattern, config] of Object.entries(filePatterns)) {
        if (fileName === pattern || // Exact match
            fileName.startsWith(pattern.replace('.csv', '')) && /\d+\.csv$/.test(fileName) || // Numbered file
            fileName.startsWith(pattern.replace('.csv', '')) && fileName.endsWith('.csv')) { // Pattern match
          return config;
        }
      }

      return null;
    };

    const config = getTableConfig(fileName);
    if (!config) {
      throw new Error(`Unknown CSV file type: ${fileName}`);
    }

    // Begin transaction
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Enable UUID extension if not enabled
      await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

      // Add postcodes columns to Outfall table if they don't exist
      if (config.tableName === 'Outfall') {
        await client.query(`
          DO $$ 
          BEGIN 
            BEGIN
              ALTER TABLE "Outfall" ADD COLUMN "postcodes25km" TEXT;
              ALTER TABLE "Outfall" ADD COLUMN "postcodes50km" TEXT;
            EXCEPTION 
              WHEN duplicate_column THEN NULL;
            END;
          END $$;
        `);
      }

      // Map records
      const mappedRecords = records.map(record => config.columnMap(record));
      
      // Get existing records for deduplication
      const existingRecords = new Map();
      if (config.deduplicateBy) {
        const result = await client.query(
          `SELECT "${config.deduplicateBy}" FROM "${config.tableName}"`
        );
        result.rows.forEach(row => existingRecords.set(row[config.deduplicateBy], true));
      }

      // Insert records with unique values
      let insertedCount = 0;
      let placeholderCounter = 1;
      for (const mappedRecord of mappedRecords) {
        // Handle empty or duplicate values for deduplication field
        if (config.deduplicateBy) {
          let value = mappedRecord[config.deduplicateBy];
          if (!value || existingRecords.has(value)) {
            // For email fields, create a placeholder email
            if (config.deduplicateBy === 'email') {
              do {
                value = `placeholder${placeholderCounter}@example.com`;
                placeholderCounter++;
              } while (existingRecords.has(value));
            } else {
              // For other fields like name, append a counter
              do {
                value = `${mappedRecord[config.deduplicateBy] || 'Unknown'}_${placeholderCounter}`;
                placeholderCounter++;
              } while (existingRecords.has(value));
            }
            mappedRecord[config.deduplicateBy] = value;
          }
          existingRecords.set(value, true);
        }

        // Add default fields
        const finalRecord = {
          ...mappedRecord,
          id: 'uuid_generate_v4()',
          createdAt: 'NOW()',
          updatedAt: 'NOW()'
        };

        // Prepare columns and values
        const columns = Object.keys(finalRecord);
        const values = Object.values(finalRecord);
        const placeholders = values.map((val, i) => 
          typeof val === 'string' && val.includes('(') ? val : `$${i + 1}`
        ).join(', ');

        const insertQuery = `
          INSERT INTO "${config.tableName}" (${columns.map(col => `"${col}"`).join(', ')})
          VALUES (${placeholders})
        `;

        const queryValues = values.filter(val => !(typeof val === 'string' && val.includes('(')));
        await client.query(insertQuery, queryValues);
        insertedCount++;
      }

      await client.query('COMMIT');
      log('info', `Successfully imported ${insertedCount} records into ${config.tableName}`);
      return true;

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }

  } catch (error) {
    log('error', `Error processing ${fileName}: ${error.message}`);
    return false;
  }
}

// Process all CSV files
async function processAllFiles() {
  try {
    // Get list of files to process from originals directory
    const ORIGINALS_DIR = path.join(process.cwd(), 'public', 'csv-imports', 'originals');
    const files = fs.readdirSync(ORIGINALS_DIR);
    const csvFiles = files.filter(file => file.endsWith('.csv'));

    log('info', `Found ${csvFiles.length} CSV files to process`);
    console.log('CSV files:', csvFiles);

    // Process all files
    for (const fileName of csvFiles) {
      const filePath = path.join(ORIGINALS_DIR, fileName);
      try {
        await processCsvFile(filePath);
      } catch (error) {
        log('error', `Failed to process ${fileName}: ${error.message}`);
      }
    }

    log('info', 'Finished processing all files');
  } catch (error) {
    log('error', `Fatal error: ${error.message}`);
  }
}

// Start processing
processAllFiles().catch(error => {
  log('error', `Fatal error: ${error.message}`);
  process.exit(1);
});
