const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const { Pool } = require('pg');

// Simple logging function
const log = (level, message) => {
  const timestamp = new Date().toISOString();
  console.log(JSON.stringify({ timestamp, level, message }));
};

// Helper function for fuzzy column matching
const getFuzzyValue = (record, variants) => {
  for (const variant of variants) {
    const value = record[variant] || record[variant.toLowerCase()] || record[variant.replace(/\s+/g, '')] || record[variant.replace(/\s+/g, '_')];
    if (value) return value;
  }
  return '';
};

// Use DATABASE_URL directly
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://crm_user:crm_password@localhost:5432/crm_platform'
});

const CSV_DIRECTORY = path.join(process.cwd(), 'public', 'csv-imports');

// Ensure CSV directory exists
if (!fs.existsSync(CSV_DIRECTORY)) {
  fs.mkdirSync(CSV_DIRECTORY, { recursive: true });
}

// Process a single CSV file
async function processCsvFile(filePath) {
  const fileName = path.basename(filePath);
  log('info', `Processing CSV file: ${fileName}`);

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const records = [];

    // Parse CSV file
    const parser = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });

    for await (const record of parser) {
      records.push(record);
    }

    if (records.length === 0) {
      log('warn', `No records found in ${fileName}`);
      return;
    }

    // Map filename to existing table and handle column mappings
    const tableConfigs = {
      'customers.csv': {
        tableName: 'Customer',
        columnMap: record => ({
          name: getFuzzyValue(record, ['Name', 'Customer Name', 'Full Name', 'First Name']),
          email: getFuzzyValue(record, ['Email', 'Contact Email', 'Email Address']),
          status: record['Status'] || 'Active'
        }),
        required: ['name']
      },
      'outfalls.csv': {
        tableName: 'Outfall',
        columnMap: record => {
          const name = getFuzzyValue(record, ['Name', 'Outfall Name', 'Location Name']);
          const location = getFuzzyValue(record, ['Location', 'Address', 'Site Location']);
          const type = getFuzzyValue(record, ['Type', 'Outfall Type', 'Category']);
          
          // Build description with all available metadata
          const descriptionParts = [
            record['Water Authority'] && `Water Authority: ${record['Water Authority']}`,
            record['Indigenous Community'] && `Indigenous Community: ${record['Indigenous Community']}`,
            record['Land Council'] && `Land Council: ${record['Land Council']}`,
            record['Politicians'] && `Politicians: ${record['Politicians']}`,
            record['Population'] && `Population: ${record['Population']}`,
            record['Notes'] && record['Notes']
          ].filter(Boolean);

          return {
            name: name || 'Unnamed Outfall',
            location: location || 'Unknown Location',
            type: type || 'Ocean',
            status: 'Active',
            description: descriptionParts.join(' | ') || 'No additional information'
          };
        },
        required: []
      },
      'water_authorities.csv': {
        tableName: 'WaterAuthority',
        columnMap: record => ({
          name: getFuzzyValue(record, ['Name', 'Authority Name', 'Water Authority', 'Organization']),
          region: getFuzzyValue(record, ['Region', 'Area', 'Location', 'Territory']),
          contact: getFuzzyValue(record, ['Contact', 'Contact Person', 'Representative']),
          email: getFuzzyValue(record, ['Email', 'Contact Email', 'Email Address'])
        }),
        required: ['name']
      },
      'indigenous_communities.csv': {
        tableName: 'IndigenousCommunity',
        columnMap: record => ({
          name: getFuzzyValue(record, ['Name', 'Community Name', 'Indigenous Community']),
          region: getFuzzyValue(record, ['Region', 'Area', 'Location', 'Territory']),
          contact: getFuzzyValue(record, ['Contact', 'Contact Person', 'Representative']),
          email: getFuzzyValue(record, ['Email', 'Contact Email', 'Email Address'])
        }),
        required: ['name']
      },
      'politicians.csv': {
        tableName: 'Politician',
        columnMap: record => ({
          name: getFuzzyValue(record, ['Name', 'Full Name', 'Politician Name']),
          position: getFuzzyValue(record, ['Position', 'Role', 'Title', 'Office']),
          party: getFuzzyValue(record, ['Party', 'Political Party']),
          region: getFuzzyValue(record, ['Region', 'Electorate', 'District', 'Area']),
          email: getFuzzyValue(record, ['Email', 'Contact Email', 'Email Address'])
        }),
        required: ['name']
      },
      'facilities.csv': {
        tableName: 'Facility',
        columnMap: record => ({
          name: getFuzzyValue(record, ['Name', 'Facility Name', 'Site Name']),
          type: getFuzzyValue(record, ['Type', 'Facility Type', 'Category']),
          location: getFuzzyValue(record, ['Location', 'Address', 'Site Location']),
          contact: getFuzzyValue(record, ['Contact', 'Contact Person', 'Representative']),
          email: getFuzzyValue(record, ['Email', 'Contact Email', 'Email Address'])
        }),
        required: ['name']
      },
      'outfall_observations.csv': {
        tableName: 'OutfallObservation',
        columnMap: record => ({
          outfallId: getFuzzyValue(record, ['Outfall ID', 'OutfallId', 'Outfall']),
          observedBy: getFuzzyValue(record, ['Observed By', 'Observer', 'Reporter']),
          date: getFuzzyValue(record, ['Date', 'Observation Date', 'Reported Date']) || new Date().toISOString(),
          description: getFuzzyValue(record, ['Description', 'Notes', 'Comments', 'Details']),
          status: getFuzzyValue(record, ['Status', 'State', 'Condition']) || 'Pending'
        }),
        required: []
      },
      'persons.csv': {
        tableName: 'Person',
        columnMap: record => ({
          name: getFuzzyValue(record, ['Name', 'Full Name', 'First Name', 'FirstName', 'fname']),
          email: getFuzzyValue(record, ['Email', 'Contact Email', 'EmailAddress', 'email_address']),
          password: 'default',
          role: getFuzzyValue(record, ['Role', 'Position', 'Title']) || 'User',
          organization: getFuzzyValue(record, ['Organization', 'Company', 'Org', 'org_name'])
        }),
        required: ['name']
      }
    };

    const config = tableConfigs[fileName];
    if (!config) {
      throw new Error(`Unknown CSV file type: ${fileName}. Expected one of: ${Object.keys(tableConfigs).join(', ')}`);
    }

    // Begin transaction
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Enable UUID extension if not enabled
      await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

      // Insert records with column mapping
      for (const record of records) {
        const mappedRecord = config.columnMap(record);
        
        // Validate required fields
        const missingFields = config.required.filter(field => !mappedRecord[field]);
        if (missingFields.length > 0) {
          throw new Error(`Missing required fields for ${config.tableName}: ${missingFields.join(', ')}`);
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
      }

      await client.query('COMMIT');
      log('info', `Successfully imported ${records.length} records into ${config.tableName}`);

      // Move processed file to archive
      const archiveDir = path.join(CSV_DIRECTORY, 'archived');
      if (!fs.existsSync(archiveDir)) {
        fs.mkdirSync(archiveDir);
      }
      fs.renameSync(filePath, path.join(archiveDir, `${fileName}.${Date.now()}`));

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }

  } catch (error) {
    log('error', `Error processing ${fileName}: ${error.message}`);
    // Move failed file to errors directory
    const errorDir = path.join(CSV_DIRECTORY, 'errors');
    if (!fs.existsSync(errorDir)) {
      fs.mkdirSync(errorDir);
    }
    fs.renameSync(filePath, path.join(errorDir, `${fileName}.${Date.now()}`));
  }
}

// Watch CSV directory for new files
fs.watch(CSV_DIRECTORY, (eventType, filename) => {
  if (eventType === 'rename' && filename && filename.endsWith('.csv')) {
    const filePath = path.join(CSV_DIRECTORY, filename);
    // Ensure file exists and is not being written to
    setTimeout(() => {
      if (fs.existsSync(filePath)) {
        processCsvFile(filePath);
      }
    }, 1000); // Wait 1 second to ensure file is completely written
  }
});

log('info', `Watching for CSV files in ${CSV_DIRECTORY}`);

// Handle cleanup
process.on('SIGTERM', async () => {
  log('info', 'SIGTERM received. Shutting down gracefully...');
  await pool.end();
  process.exit(0);
});

process.on('SIGINT', async () => {
  log('info', 'SIGINT received. Shutting down gracefully...');
  await pool.end();
  process.exit(0);
});
