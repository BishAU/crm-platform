const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://crm_user:crm_password@localhost:5432/crm_platform'
});

import { log } from './utils.js';

async function queryOutfallsByPostcode(postcode, radius = 25) {
  const client = await pool.connect();
  try {
    // Get outfalls within radius of postcode
    const outfalls = await client.query(`
      SELECT DISTINCT o.name, o.location, o.type, o.status, o.description
      FROM "Outfall" o
      WHERE o.description LIKE $1
      ORDER BY o.name
    `, [`%Postcodes (${radius}km): %${postcode}%`]);

    log('info', `\nOutfalls within ${radius}km of postcode ${postcode}:`);
    if (outfalls.rows.length === 0) {
      log('info', 'No outfalls found');
    } else {
      outfalls.rows.forEach(row => {
        log('info', JSON.stringify(row));
      });
    }

    // Get all postcodes within radius of any outfall
    const postcodes = await client.query(`
      SELECT DISTINCT 
        regexp_split_to_table(
          regexp_replace(
            regexp_replace(description, 
              '^.*Postcodes \\(${radius}km\\): ([^|]*).*$', 
              '\\1'
            ),
            '[\\s,]+', 
            ' '
          ),
          ' '
        ) as postcode
      FROM "Outfall"
      WHERE description LIKE $1
        AND description ~ ('Postcodes \\(' || $2 || 'km\\): [^|]*')
      ORDER BY postcode
    `, [`%Postcodes (${radius}km):%`, radius]);

    log('info', `\nAll postcodes within ${radius}km of any outfall:`);
    if (postcodes.rows.length === 0) {
      log('info', 'No postcodes found');
    } else {
      log('info', postcodes.rows.map(r => r.postcode).join(', '));
    }

    // Get outfall count by water authority
    const authorities = await client.query(`
      SELECT 
        regexp_replace(description, '^.*Water Authority: ([^|]*).*$', '\\1') as authority,
        COUNT(*) as count
      FROM "Outfall"
      WHERE description LIKE 'Water Authority:%'
        AND description LIKE $1
      GROUP BY authority
      ORDER BY count DESC
    `, [`%Postcodes (${radius}km): %${postcode}%`]);

    log('info', `\nWater authorities managing outfalls within ${radius}km of postcode ${postcode}:`);
    if (authorities.rows.length === 0) {
      log('info', 'No water authorities found');
    } else {
      authorities.rows.forEach(row => {
        log('info', `${row.authority}: ${row.count} outfalls`);
      });
    }

  } catch (error) {
    log('error', `Error: ${error.message}`);
  } finally {
    client.release();
  }
}

// Get postcode from command line argument
const postcode = process.argv[2];
const radius = process.argv[3] ? parseInt(process.argv[3]) : 25;

if (!postcode) {
  log('error', 'Please provide a postcode as argument');
  process.exit(1);
}

// Run query
queryOutfallsByPostcode(postcode, radius).catch(error => {
  log('error', `Fatal error: ${error.message}`);
  process.exit(1);
});
