const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

// Helper function to log messages
const log = (level, message) => {
  const timestamp = new Date().toISOString();
  console.log(JSON.stringify({ timestamp, level, message }));
};

// Helper function to clean text
const cleanText = (text) => {
  if (!text) return '';
  return String(text)
    .replace(/^[\ufeff"']|["']$/g, '')  // Remove BOM and quotes
    .replace(/\s+/g, ' ')               // Normalize spaces
    .trim();                            // Trim whitespace
};

// Helper function to clean postcode list
const cleanPostcodes = (text) => {
  if (!text) return '';
  return String(text)
    .replace(/["\(\)]/g, '')     // Remove quotes and parentheses
    .replace(/\s+/g, ' ')        // Normalize spaces
    .split(/[\s,]+/)             // Split on spaces or commas
    .map(p => p.trim())          // Trim each postcode
    .filter(p => p && /^\d+$/.test(p))  // Keep only numeric postcodes
    .join(', ');                 // Join back with commas
};

async function extractPostcodes() {
  try {
    // Process outfalls1.csv
    log('info', '\nProcessing outfalls1.csv:');
    const outfalls1 = fs.readFileSync(path.join(process.cwd(), 'public', 'csv-imports', 'originals', 'outfalls1.csv'), 'utf-8');
    const parser1 = parse(outfalls1, {
      columns: header => header.map(cleanText),
      skip_empty_lines: true,
      trim: true,
      bom: true
    });

    for await (const record of parser1) {
      const name = cleanText(record['Outfall Name']);
      const postcodes25km = cleanPostcodes(record['postcode pupluation'] || record['Postcodes within 25km']);
      const postcodes50km = cleanPostcodes(record['Postcodes within 50km']);
      
      if (postcodes25km || postcodes50km) {
        log('info', JSON.stringify({
          name,
          postcodes_25km: postcodes25km,
          postcodes_50km: postcodes50km
        }));
      }
    }

    // Process outfalls2.csv
    log('info', '\nProcessing outfalls2.csv:');
    const outfalls2 = fs.readFileSync(path.join(process.cwd(), 'public', 'csv-imports', 'originals', 'outfalls2.csv'), 'utf-8');
    const parser2 = parse(outfalls2, {
      columns: header => header.map(cleanText),
      skip_empty_lines: true,
      trim: true,
      bom: true
    });

    for await (const record of parser2) {
      const name = cleanText(record['Outfall Name']);
      const postcodes25km = cleanPostcodes(record['Postcodes within 25km']);
      const postcodes50km = cleanPostcodes(record['Postcodes within 50km']);
      
      if (postcodes25km || postcodes50km) {
        log('info', JSON.stringify({
          name,
          postcodes_25km: postcodes25km,
          postcodes_50km: postcodes50km
        }));
      }
    }

    // Get unique postcodes
    const allPostcodes = new Set();
    const outfalls = [outfalls1, outfalls2];
    for (const content of outfalls) {
      const parser = parse(content, {
        columns: header => header.map(cleanText),
        skip_empty_lines: true,
        trim: true,
        bom: true
      });

      for await (const record of parser) {
        const postcodes25km = cleanPostcodes(record['postcode pupluation'] || record['Postcodes within 25km']);
        const postcodes50km = cleanPostcodes(record['Postcodes within 50km']);

        postcodes25km.split(/[\s,]+/).forEach(p => p && allPostcodes.add(p));
        postcodes50km.split(/[\s,]+/).forEach(p => p && allPostcodes.add(p));
      }
    }

    log('info', `\nTotal unique postcodes: ${allPostcodes.size}`);
    log('info', `All postcodes: ${Array.from(allPostcodes).sort().join(', ')}`);

  } catch (error) {
    log('error', `Error: ${error.message}`);
  }
}

// Run extraction
extractPostcodes().catch(error => {
  log('error', `Fatal error: ${error.message}`);
  process.exit(1);
});
