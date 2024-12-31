const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://crm_user:crm_password@localhost:5432/crm_platform'
});

// Helper function to log messages
const log = (level, message) => {
  const timestamp = new Date().toISOString();
  console.log(JSON.stringify({ timestamp, level, message }));
};

async function checkOutfallPostcodes() {
  const client = await pool.connect();
  try {
    // Check table exists
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'OutfallPostcode'
      );
    `);
    log('info', `OutfallPostcode table exists: ${tableCheck.rows[0].exists}`);

    if (tableCheck.rows[0].exists) {
      // Count total records
      const countResult = await client.query(`
        SELECT COUNT(*) as total FROM "OutfallPostcode"
      `);
      log('info', `Total postcode records: ${countResult.rows[0].total}`);

      // Count unique outfalls with postcodes
      const outfallCount = await client.query(`
        SELECT COUNT(DISTINCT "outfallId") as total FROM "OutfallPostcode"
      `);
      log('info', `Outfalls with postcodes: ${outfallCount.rows[0].total}`);

      // Count postcodes by radius
      const radiusCount = await client.query(`
        SELECT radius, COUNT(*) as total 
        FROM "OutfallPostcode" 
        GROUP BY radius 
        ORDER BY radius
      `);
      log('info', '\nPostcodes by radius:');
      radiusCount.rows.forEach(row => {
        log('info', `${row.radius}km: ${row.total} postcodes`);
      });

      // Sample of outfalls and their postcodes
      const sample = await client.query(`
        SELECT o.name, op.radius, 
               string_agg(op.postcode, ', ' ORDER BY op.postcode) as postcodes,
               COUNT(*) as postcode_count
        FROM "Outfall" o
        JOIN "OutfallPostcode" op ON o.id = op."outfallId"
        GROUP BY o.name, op.radius
        ORDER BY o.name, op.radius
        LIMIT 10
      `);
      
      log('info', '\nSample outfalls with postcodes:');
      sample.rows.forEach(row => {
        log('info', JSON.stringify(row));
      });

    }
  } catch (error) {
    log('error', `Error: ${error.message}`);
  } finally {
    client.release();
  }
}

// Run check
checkOutfallPostcodes().catch(error => {
  log('error', `Fatal error: ${error.message}`);
  process.exit(1);
});
