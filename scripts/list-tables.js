import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'crm_platform',
  host: 'localhost',
  database: 'crm_platform_dev',
  password: 'crm_platform_2024',
  port: 5432,
});

async function main() {
  try {
    // First, list all tables
    console.log("\nListing all tables and record counts:");
    const tableQuery = await pool.query(
      "SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema';"
    );
    const tables = tableQuery.rows.map((row) => row.tablename);

    for (const table of tables) {
      const countQuery = await pool.query('SELECT COUNT(*) FROM "' + table + '";');
      const count = countQuery.rows[0].count;
      console.log(table + ': ' + count);
    }

    // Then, show sample data from Outfall table
    console.log("\nSample data from Outfall table:");
    const outfallQuery = await pool.query('SELECT * FROM "Outfall" LIMIT 5;');
    console.log(JSON.stringify(outfallQuery.rows, null, 2));

  } catch (err) {
    console.error('Error:', err);
  } finally {
    pool.end();
  }
}

main();
