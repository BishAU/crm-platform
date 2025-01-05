const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://crm_user:crm_password@localhost:5432/crm_platform'
});

import { log } from './utils.js';

async function deduplicatePoliticians() {
  const client = await pool.connect();
  try {
    // Get row count before
    const beforeCount = await client.query(`
      SELECT COUNT(*) FROM "Politician"
    `);

    // Start transaction
    await client.query('BEGIN');

    // Create temp table with unique records by name and normalized parties
    await client.query(`
      CREATE TEMP TABLE tmp_politicians AS
      WITH normalized AS (
        SELECT *,
          REGEXP_REPLACE(name, '_\\d+$', '') as base_name,
          CASE 
            WHEN party IN ('ALP', 'Australian Labor Party') THEN 'Australian Labor Party'
            WHEN party IN ('LP', 'Liberal Party') THEN 'Liberal Party'
            WHEN party IN ('AG', 'The Australian Greens - Victoria') THEN 'Australian Greens'
            WHEN party IN ('NATS', 'The Nationals') THEN 'The Nationals'
            WHEN party IN ('IND', 'Independent') THEN 'Independent'
            ELSE party
          END as normalized_party
        FROM "Politician"
      )
      SELECT DISTINCT ON (base_name) 
        id,
        base_name as name,
        position,
        normalized_party as party,
        region,
        email,
        "createdAt",
        "updatedAt"
      FROM normalized
      ORDER BY 
        base_name,
        CASE  -- Prefer records with more complete data
          WHEN position IS NOT NULL AND position != '' THEN 0
          ELSE 1
        END,
        CASE 
          WHEN normalized_party IS NOT NULL AND normalized_party != '' THEN 0
          ELSE 1
        END,
        CASE 
          WHEN region IS NOT NULL AND region != '' THEN 0
          ELSE 1
        END,
        "updatedAt" DESC NULLS LAST
    `);

    // Replace original table with deduplicated data
    await client.query(`
      DELETE FROM "Politician";
      INSERT INTO "Politician" (
        id, name, position, party, region, email, "createdAt", "updatedAt"
      )
      SELECT * FROM tmp_politicians;
      DROP TABLE tmp_politicians;
    `);

    // Commit transaction
    await client.query('COMMIT');

    // Get row count after
    const afterCount = await client.query(`
      SELECT COUNT(*) FROM "Politician"
    `);

    // Get unique names count
    const uniqueNames = await client.query(`
      SELECT COUNT(DISTINCT name) FROM "Politician"
    `);

    // Log results
    const removed = parseInt(beforeCount.rows[0].count) - parseInt(afterCount.rows[0].count);
    log('info', `Politicians before: ${beforeCount.rows[0].count}`);
    log('info', `Politicians after: ${afterCount.rows[0].count}`);
    log('info', `Duplicates removed: ${removed}`);
    log('info', `Unique names: ${uniqueNames.rows[0].count}`);

    // Show sample of records
    const samples = await client.query(`
      SELECT name, position, party, region, email
      FROM "Politician"
      WHERE name != ''
      ORDER BY name
      LIMIT 5
    `);

    log('info', '\nSample records:');
    samples.rows.forEach(row => {
      log('info', JSON.stringify(row));
    });

    // Show distribution by party
    const parties = await client.query(`
      SELECT party, COUNT(*) as count
      FROM "Politician"
      WHERE party IS NOT NULL AND party != ''
      GROUP BY party
      ORDER BY count DESC
      LIMIT 10
    `);

    log('info', '\nParty distribution:');
    parties.rows.forEach(row => {
      log('info', `${row.party}: ${row.count} politicians`);
    });

  } catch (error) {
    await client.query('ROLLBACK');
    log('error', `Error: ${error.message}`);
  } finally {
    client.release();
  }
}

// Run deduplication
deduplicatePoliticians().catch(error => {
  log('error', `Fatal error: ${error.message}`);
  process.exit(1);
});
