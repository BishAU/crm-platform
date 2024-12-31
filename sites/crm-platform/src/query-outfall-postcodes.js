const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://crm_user:crm_password@localhost:5432/crm_platform'
});

// Helper function to log messages
const log = (level, message) => {
  const timestamp = new Date().toISOString();
  console.log(JSON.stringify({ timestamp, level, message }));
};

// Helper function to extract postcodes from description
function extractPostcodes(description, radius = '25km') {
  const match = description.match(new RegExp(`Postcodes \\(${radius}\\): ([^|]+)`));
  if (!match) return [];
  
  return match[1].split(/[\s,]+/)
    .map(p => p.trim())
    .filter(p => p && p !== '""' && p !== "''");
}

async function queryOutfallPostcodes() {
  const client = await pool.connect();
  try {
    // Get all outfalls with their descriptions
    const outfalls = await client.query(`
      SELECT name, description
      FROM "Outfall"
      WHERE description LIKE '%Postcodes%'
      ORDER BY name
    `);

    // Process each outfall
    log('info', '\nOutfall postcode coverage:');
    for (const outfall of outfalls.rows) {
      const postcodes25km = extractPostcodes(outfall.description, '25km');
      const postcodes50km = extractPostcodes(outfall.description, '50km');

      log('info', JSON.stringify({
        outfall: outfall.name,
        postcodes_25km: postcodes25km,
        postcodes_50km: postcodes50km
      }));
    }

    // Get unique postcodes within 25km of any outfall
    const allPostcodes25km = new Set();
    outfalls.rows.forEach(outfall => {
      extractPostcodes(outfall.description, '25km').forEach(p => allPostcodes25km.add(p));
    });

    log('info', `\nTotal unique postcodes within 25km of any outfall: ${allPostcodes25km.size}`);
    log('info', `Postcodes: ${Array.from(allPostcodes25km).sort().join(', ')}`);

    // Get outfalls by postcode (25km radius)
    const postcode = '3000'; // Example postcode
    log('info', `\nOutfalls within 25km of postcode ${postcode}:`);
    outfalls.rows.forEach(outfall => {
      const postcodes = extractPostcodes(outfall.description, '25km');
      if (postcodes.includes(postcode)) {
        log('info', `- ${outfall.name}`);
      }
    });

  } finally {
    client.release();
  }
}

// Run query
queryOutfallPostcodes().catch(error => {
  log('error', `Fatal error: ${error.message}`);
  process.exit(1);
});
