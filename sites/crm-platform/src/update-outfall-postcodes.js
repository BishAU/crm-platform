const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://crm_user:crm_password@localhost:5432/crm_platform'
});

// Helper function to log messages
const log = (level, message) => {
  const timestamp = new Date().toISOString();
  console.log(JSON.stringify({ timestamp, level, message }));
};

// Helper function to clean postcode list
const cleanPostcodes = (text) => {
  if (!text) return '';
  return String(text)
    .split(/[;,\s]+/)
    .map(p => p.trim())
    .filter(p => p && /^\d+$/.test(p))
    .join(', ');
};

async function updateOutfallPostcodes() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Read and parse outfalls1.csv
    const outfalls1Content = fs.readFileSync(
      path.join(process.cwd(), 'public', 'csv-imports', 'originals', 'outfalls1.csv'),
      'utf-8'
    );
    const outfalls1 = await new Promise((resolve, reject) => {
      parse(outfalls1Content, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
        bom: true
      }, (err, records) => {
        if (err) reject(err);
        else resolve(records);
      });
    });

    // Read and parse outfalls2.csv
    const outfalls2Content = fs.readFileSync(
      path.join(process.cwd(), 'public', 'csv-imports', 'originals', 'outfalls2.csv'),
      'utf-8'
    );
    const outfalls2 = await new Promise((resolve, reject) => {
      parse(outfalls2Content, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
        bom: true
      }, (err, records) => {
        if (err) reject(err);
        else resolve(records);
      });
    });

    // Process outfalls1.csv
    log('info', '\nProcessing outfalls1.csv:');
    for (const record of outfalls1) {
      const name = record['Outfall Name'];
      const postcodes25km = cleanPostcodes(record['postcode pupluation']);
      const postcodes50km = cleanPostcodes(record['Postcodes within 50km']);

      if (name && (postcodes25km || postcodes50km)) {
        // Update description to include postcode data
        const result = await client.query(`
          UPDATE "Outfall"
          SET description = CASE 
            WHEN description IS NULL OR description = '' OR description = 'No additional information'
              THEN $1
            ELSE description || ' | ' || $1
          END,
          "postcodes25km" = $2,
          "postcodes50km" = $3
          WHERE name LIKE $4 || '%'
          RETURNING *
        `, [
          [
            postcodes25km && `Postcodes (25km): ${postcodes25km}`,
            postcodes50km && `Postcodes (50km): ${postcodes50km}`
          ].filter(Boolean).join(' | '),
          postcodes25km,
          postcodes50km,
          name
        ]);

        if (result.rows.length > 0) {
          log('info', `Updated ${name} with postcodes`);
        }
      }
    }

    // Process outfalls2.csv
    log('info', '\nProcessing outfalls2.csv:');
    for (const record of outfalls2) {
      const name = record['Outfall Name'];
      const postcodes25km = cleanPostcodes(record['Postcodes within 25km']);
      const postcodes50km = cleanPostcodes(record['Postcodes within 50km']);

      if (name && (postcodes25km || postcodes50km)) {
        // Update description to include postcode data
        const result = await client.query(`
          UPDATE "Outfall"
          SET description = CASE 
            WHEN description IS NULL OR description = '' OR description = 'No additional information'
              THEN $1
            ELSE description || ' | ' || $1
          END,
          "postcodes25km" = COALESCE(NULLIF("postcodes25km", ''), $2),
          "postcodes50km" = COALESCE(NULLIF("postcodes50km", ''), $3)
          WHERE name LIKE $4 || '%'
          RETURNING *
        `, [
          [
            postcodes25km && `Postcodes (25km): ${postcodes25km}`,
            postcodes50km && `Postcodes (50km): ${postcodes50km}`
          ].filter(Boolean).join(' | '),
          postcodes25km,
          postcodes50km,
          name
        ]);

        if (result.rows.length > 0) {
          log('info', `Updated ${name} with postcodes`);
        }
      }
    }

    // Check results
    const updated = await client.query(`
      SELECT name, description, "postcodes25km", "postcodes50km"
      FROM "Outfall"
      WHERE "postcodes25km" IS NOT NULL 
         OR "postcodes50km" IS NOT NULL
      ORDER BY name
    `);

    log('info', '\nOutfalls with postcode data:');
    updated.rows.forEach(row => {
      log('info', JSON.stringify(row));
    });

    await client.query('COMMIT');
    log('info', `Successfully updated ${updated.rows.length} outfalls with postcode data`);

  } catch (error) {
    await client.query('ROLLBACK');
    log('error', `Error: ${error.message}`);
  } finally {
    client.release();
  }
}

// Run update
updateOutfallPostcodes().catch(error => {
  log('error', `Fatal error: ${error.message}`);
  process.exit(1);
});
