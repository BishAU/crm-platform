const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://crm_user:crm_password@localhost:5432/crm_platform'
});

import { log } from './utils.js';

async function checkOutfallData() {
  const client = await pool.connect();
  try {
    // Get sample outfalls with descriptions
    const outfalls = await client.query(`
      SELECT id, name, description
      FROM "Outfall"
      LIMIT 5
    `);

    log('info', '\nSample outfall records:');
    outfalls.rows.forEach(row => {
      log('info', JSON.stringify(row));
    });

    // Count outfalls with postcode data
    const postcodeCount = await client.query(`
      SELECT COUNT(*) as total
      FROM "Outfall"
      WHERE description LIKE '%Postcodes%'
    `);

    log('info', `\nOutfalls with postcode data: ${postcodeCount.rows[0].total}`);

    // Get sample of descriptions with postcode data
    const postcodeData = await client.query(`
      SELECT name, description
      FROM "Outfall"
      WHERE description LIKE '%Postcodes%'
      LIMIT 5
    `);

    log('info', '\nSample descriptions with postcode data:');
    postcodeData.rows.forEach(row => {
      log('info', JSON.stringify(row));
    });

    // Check for different postcode formats
    const descriptions = await client.query(`
      SELECT DISTINCT description
      FROM "Outfall"
      WHERE description LIKE '%Postcodes%'
      OR description LIKE '%postcode%'
      OR description LIKE '%post code%'
      LIMIT 10
    `);

    log('info', '\nUnique description formats with postcode data:');
    descriptions.rows.forEach(row => {
      log('info', JSON.stringify(row));
    });

  } catch (error) {
    log('error', `Error: ${error.message}`);
  } finally {
    client.release();
  }
}

// Run check
checkOutfallData().catch(error => {
  log('error', `Fatal error: ${error.message}`);
  process.exit(1);
});
