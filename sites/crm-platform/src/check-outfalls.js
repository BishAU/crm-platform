
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://crm_user:crm_password@localhost:5432/crm_platform'
});

// Helper function to log messages
const log = (level, message) => {
  const timestamp = new Date().toISOString();
  console.log(JSON.stringify({ timestamp, level, message }));
};

async function checkOutfalls() {
  const client = await pool.connect();
  try {
    // Get duplicate outfall names
    const duplicates = await client.query(`
      SELECT name, COUNT(*) as count, array_agg(location) as locations
      FROM "Outfall"
      GROUP BY name
      HAVING COUNT(*) > 1
      ORDER BY count DESC
      LIMIT 10
    `);

    log('info', '\nDuplicate outfall names:');
    duplicates.rows.forEach(row => {
      log('info', `${row.name}: ${row.count} occurrences`);
      log('info', `Locations: ${row.locations.join(', ')}`);
    });

    // Get total unique names
    const uniqueNames = await client.query(`
      SELECT COUNT(DISTINCT name) as count
      FROM "Outfall"
    `);

    log('info', `\nTotal unique outfall names: ${uniqueNames.rows[0].count}`);

    // Get sample of records
    const samples = await client.query(`
      SELECT name, location, type, status
      FROM "Outfall"
      LIMIT 5
    `);

    log('info', '\nSample records:');
    samples.rows.forEach(row => {
      log('info', JSON.stringify(row));
    });

  } finally {
    client.release();
  }
}

// Run check
checkOutfalls().catch(error => {
  log('error', `Fatal error: ${error.message}`);
  process.exit(1);
});
