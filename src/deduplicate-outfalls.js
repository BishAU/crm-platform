const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://crm_user:crm_password@localhost:5432/crm_platform'
});

import { log } from './utils.js';

async function deduplicateOutfalls() {
  const client = await pool.connect();
  try {
    // Get row count before
    const beforeCount = await client.query(`
      SELECT COUNT(*) FROM "Outfall"
    `);

    // Start transaction
    await client.query('BEGIN');

    // Create temp table with base names (removing _1, _2 etc.)
    await client.query(`
      CREATE TEMP TABLE tmp_outfalls AS
      SELECT DISTINCT ON (
        REGEXP_REPLACE(name, '_\\d+$', '')  -- Remove _1, _2 etc. from end of name
      ) *,
      REGEXP_REPLACE(name, '_\\d+$', '') as base_name
      FROM "Outfall"
      ORDER BY 
        REGEXP_REPLACE(name, '_\\d+$', ''),  -- Group by base name
        CASE  -- Prefer records with more complete data
          WHEN description IS NOT NULL AND description != 'No additional information' THEN 0
          ELSE 1
        END,
        CASE 
          WHEN location IS NOT NULL AND location != 'Unknown Location' THEN 0
          ELSE 1
        END,
        "updatedAt" DESC NULLS LAST
    `);

    // Replace original table with deduplicated data
    await client.query(`
      DELETE FROM "Outfall";
      INSERT INTO "Outfall" (
        id, name, location, type, status, description, "createdAt", "updatedAt"
      )
      SELECT 
        id,
        base_name as name,  -- Use the cleaned name
        location,
        type,
        status,
        description,
        "createdAt",
        "updatedAt"
      FROM tmp_outfalls;
      DROP TABLE tmp_outfalls;
    `);

    // Commit transaction
    await client.query('COMMIT');

    // Get row count after
    const afterCount = await client.query(`
      SELECT COUNT(*) FROM "Outfall"
    `);

    // Get unique names count
    const uniqueNames = await client.query(`
      SELECT COUNT(DISTINCT name) FROM "Outfall"
    `);

    // Log results
    const removed = parseInt(beforeCount.rows[0].count) - parseInt(afterCount.rows[0].count);
    log('info', `Outfalls before: ${beforeCount.rows[0].count}`);
    log('info', `Outfalls after: ${afterCount.rows[0].count}`);
    log('info', `Duplicates removed: ${removed}`);
    log('info', `Unique names: ${uniqueNames.rows[0].count}`);

    // Show sample of records
    const samples = await client.query(`
      SELECT name, location, type, status, description
      FROM "Outfall"
      ORDER BY name
      LIMIT 5
    `);

    log('info', '\nSample records:');
    samples.rows.forEach(row => {
      log('info', JSON.stringify(row));
    });

    // Show distribution of records by water authority
    const waterAuthorities = await client.query(`
      SELECT 
        REGEXP_MATCHES(description, 'Water Authority: ([^|]+)') as water_authority,
        COUNT(*) as count
      FROM "Outfall"
      WHERE description LIKE '%Water Authority:%'
      GROUP BY 1
      ORDER BY 2 DESC
      LIMIT 10
    `);

    log('info', '\nWater Authority distribution:');
    waterAuthorities.rows.forEach(row => {
      log('info', `${row.water_authority[0].trim()}: ${row.count} outfalls`);
    });

  } catch (error) {
    await client.query('ROLLBACK');
    log('error', `Error: ${error.message}`);
  } finally {
    client.release();
  }
}

// Run deduplication
deduplicateOutfalls().catch(error => {
  log('error', `Fatal error: ${error.message}`);
  process.exit(1);
});
