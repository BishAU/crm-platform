const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://crm_user:crm_password@localhost:5432/crm_platform'
});

// Helper function to log messages
const log = (level, message) => {
  const timestamp = new Date().toISOString();
  console.log(JSON.stringify({ timestamp, level, message }));
};

// Table-specific deduplication configs
const tableConfigs = {
  IndigenousCommunity: {
    uniqueOn: ['name', 'email']
  },
  Politician: {
    uniqueOn: ['name', 'email']
  },
  OutfallObservation: {
    uniqueOn: ['outfallId']  // Remove date from uniqueness check since it's a timestamp
  },
  Person: {
    uniqueOn: ['email', 'name']
  },
  Outfall: {
    uniqueOn: ['name', 'location']
  },
  WaterAuthority: {
    uniqueOn: ['name', 'email']
  },
  Facility: {
    uniqueOn: ['name', 'email']
  },
  LandCouncil: {
    uniqueOn: ['name', 'email']
  }
};

async function deduplicateTables() {
  const client = await pool.connect();
  try {
    // Get list of tables
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
        AND table_name IN (${Object.keys(tableConfigs).map(name => `'${name}'`).join(', ')})
    `);

    // Process each table
    for (const { table_name } of tables.rows) {
      try {
        const config = tableConfigs[table_name];
        if (!config) continue;

        // Get row count before
        const beforeCount = await client.query(`
          SELECT COUNT(*) FROM "${table_name}"
        `);

        // Start transaction
        await client.query('BEGIN');

        // Get column info
        const columnInfo = await client.query(`
          SELECT column_name
          FROM information_schema.columns
          WHERE table_name = $1
          AND table_schema = 'public'
        `, [table_name]);

        const columns = columnInfo.rows.map(row => row.column_name);
        const uniqueColumns = config.uniqueOn.filter(col => columns.includes(col));

        if (uniqueColumns.length === 0) {
          log('warn', `No valid unique columns found for ${table_name}, skipping`);
          continue;
        }

        // Create temp table with unique records
        await client.query(`
          CREATE TEMP TABLE tmp_${table_name} AS
          SELECT DISTINCT ON (
            COALESCE(${uniqueColumns.map(col => `"${col}"`).join(', ')}, id::text)
          ) *
          FROM "${table_name}"
          ORDER BY 
            COALESCE(${uniqueColumns.map(col => `"${col}"`).join(', ')}, id::text),
            "updatedAt" DESC NULLS LAST
        `);

        // Replace original table with deduplicated data
        await client.query(`
          DELETE FROM "${table_name}";
          INSERT INTO "${table_name}"
          SELECT * FROM tmp_${table_name};
          DROP TABLE tmp_${table_name};
        `);

        // Commit transaction
        await client.query('COMMIT');

        // Get row count after
        const afterCount = await client.query(`
          SELECT COUNT(*) FROM "${table_name}"
        `);

        // Log results
        const removed = parseInt(beforeCount.rows[0].count) - parseInt(afterCount.rows[0].count);
        log('info', `Table ${table_name}: ${beforeCount.rows[0].count} -> ${afterCount.rows[0].count} (${removed} duplicates removed)`);

      } catch (error) {
        await client.query('ROLLBACK');
        log('error', `Error processing ${table_name}: ${error.message}`);
      }
    }

    // Log table counts
    log('info', '\nFinal table counts:');
    for (const { table_name } of tables.rows) {
      try {
        const result = await client.query(`
          SELECT COUNT(*) as count,
                 COUNT(DISTINCT id) as unique_ids
          FROM "${table_name}"
        `);
        const { count, unique_ids } = result.rows[0];
        log('info', `${table_name}: ${count} records (${unique_ids} unique IDs)`);
      } catch (error) {
        log('error', `Error getting count for ${table_name}: ${error.message}`);
      }
    }

  } finally {
    client.release();
  }
}

// Run deduplication
deduplicateTables().catch(error => {
  log('error', `Fatal error: ${error.message}`);
  process.exit(1);
});
