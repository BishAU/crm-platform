const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://crm_user:crm_password@localhost:5432/crm_platform'
});

import { log } from './utils.js';

async function createOutfallPostcodes() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Enable UUID extension
    await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    log('info', 'Enabled uuid-ossp extension');

    // Check Outfall table structure
    const tableInfo = await client.query(`
      SELECT column_name, data_type, udt_name
      FROM information_schema.columns
      WHERE table_name = 'Outfall'
      AND column_name = 'id'
    `);
    log('info', `Outfall id column type: ${JSON.stringify(tableInfo.rows[0])}`);

    // Check if columns exist in Outfall table
    const checkColumns = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'Outfall' 
      AND column_name IN ('postcodes25km', 'postcodes50km')
    `);

    // Add columns if they don't exist
    if (checkColumns.rows.length < 2) {
      await client.query(`
        ALTER TABLE "Outfall" 
        ADD COLUMN IF NOT EXISTS "postcodes25km" TEXT,
        ADD COLUMN IF NOT EXISTS "postcodes50km" TEXT
      `);
      log('info', 'Added postcode columns to Outfall table');
    }

    // Drop existing OutfallPostcode table if it exists
    await client.query(`
      DROP TABLE IF EXISTS "OutfallPostcode" CASCADE
    `);

    // Create OutfallPostcode table with matching id type
    await client.query(`
      CREATE TABLE "OutfallPostcode" (
        "id" ${tableInfo.rows[0].udt_name} PRIMARY KEY DEFAULT uuid_generate_v4(),
        "outfallId" ${tableInfo.rows[0].udt_name} NOT NULL,
        "postcode" TEXT NOT NULL,
        "radius" INTEGER NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "OutfallPostcode_outfallId_fkey" 
          FOREIGN KEY ("outfallId") 
          REFERENCES "Outfall"("id") 
          ON DELETE CASCADE,
        UNIQUE("outfallId", "postcode", "radius")
      )
    `);
    log('info', 'Created OutfallPostcode table');

    // First update the postcode columns in Outfall table
    const outfalls = await client.query(`
      SELECT id, name, description
      FROM "Outfall"
      WHERE description LIKE '%Postcodes%'
    `);

    for (const outfall of outfalls.rows) {
      const desc = outfall.description || '';
      
      // Extract 25km postcodes
      const match25km = desc.match(/Postcodes \(25km\): ([^|]+)/);
      const postcodes25km = match25km ? match25km[1].trim() : '';

      // Extract 50km postcodes
      const match50km = desc.match(/Postcodes \(50km\): ([^|]+)/);
      const postcodes50km = match50km ? match50km[1].trim() : '';

      // Update Outfall record
      await client.query(`
        UPDATE "Outfall"
        SET "postcodes25km" = $1, "postcodes50km" = $2
        WHERE id = $3
      `, [postcodes25km, postcodes50km, outfall.id]);
    }
    log('info', 'Updated postcode columns in Outfall table');

    // Now insert into OutfallPostcode table
    let insertCount = 0;
    for (const outfall of outfalls.rows) {
      const desc = outfall.description || '';
      
      // Insert 25km postcodes
      const match25km = desc.match(/Postcodes \(25km\): ([^|]+)/);
      if (match25km) {
        const postcodes = match25km[1]
          .split(/[\s,]+/)
          .map(p => p.trim())
          .filter(p => p && p !== '""' && /^\d+$/.test(p));

        for (const postcode of postcodes) {
          try {
            await client.query(`
              INSERT INTO "OutfallPostcode" ("outfallId", "postcode", "radius")
              VALUES ($1, $2, 25)
              ON CONFLICT ("outfallId", "postcode", "radius") DO NOTHING
            `, [outfall.id, postcode]);
            insertCount++;
          } catch (error) {
            log('error', `Error inserting postcode ${postcode} for outfall ${outfall.name}: ${error.message}`);
          }
        }
      }

      // Insert 50km postcodes
      const match50km = desc.match(/Postcodes \(50km\): ([^|]+)/);
      if (match50km) {
        const postcodes = match50km[1]
          .split(/[\s,]+/)
          .map(p => p.trim())
          .filter(p => p && p !== '""' && /^\d+$/.test(p));

        for (const postcode of postcodes) {
          try {
            await client.query(`
              INSERT INTO "OutfallPostcode" ("outfallId", "postcode", "radius")
              VALUES ($1, $2, 50)
              ON CONFLICT ("outfallId", "postcode", "radius") DO NOTHING
            `, [outfall.id, postcode]);
            insertCount++;
          } catch (error) {
            log('error', `Error inserting postcode ${postcode} for outfall ${outfall.name}: ${error.message}`);
          }
        }
      }
    }

    await client.query('COMMIT');
    log('info', `Successfully inserted ${insertCount} postcode records`);

    // Show sample queries
    log('info', '\nSample queries:');

    // Get outfalls within 25km of a postcode
    const postcode = '2000';
    const outfallsNear = await client.query(`
      SELECT DISTINCT o.name, o.location, op.radius
      FROM "Outfall" o
      JOIN "OutfallPostcode" op ON o.id = op."outfallId"
      WHERE op.postcode = $1
      ORDER BY o.name
    `, [postcode]);

    log('info', `\nOutfalls near postcode ${postcode}:`);
    outfallsNear.rows.forEach(row => {
      log('info', JSON.stringify(row));
    });

    // Get all postcodes within 25km of any outfall
    const postcodes25km = await client.query(`
      SELECT DISTINCT postcode
      FROM "OutfallPostcode"
      WHERE radius = 25
      ORDER BY postcode
    `);

    log('info', '\nAll postcodes within 25km of any outfall:');
    log('info', postcodes25km.rows.map(r => r.postcode).join(', '));

  } catch (error) {
    await client.query('ROLLBACK');
    log('error', `Error: ${error.message}`);
  } finally {
    client.release();
  }
}

// Run creation
createOutfallPostcodes().catch(error => {
  log('error', `Fatal error: ${error.message}`);
  process.exit(1);
});
