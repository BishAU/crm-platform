const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

import { log } from './utils.js';

async function checkCsvFormat() {
  try {
    // Read and parse outfalls1.csv
    const outfalls1Content = fs.readFileSync(
      path.join(process.cwd(), 'public', 'csv-imports', 'originals', 'outfalls1.csv'),
      'utf-8'
    );
    const outfalls1 = await new Promise((resolve, reject) => {
      parse(outfalls1Content, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
        bom: true
      }, (err, records) => {
        if (err) reject(err);
        else resolve(records);
      });
    });

    // Read and parse outfalls2.csv
    const outfalls2Content = fs.readFileSync(
      path.join(process.cwd(), 'public', 'csv-imports', 'originals', 'outfalls2.csv'),
      'utf-8'
    );
    const outfalls2 = await new Promise((resolve, reject) => {
      parse(outfalls2Content, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
        bom: true
      }, (err, records) => {
        if (err) reject(err);
        else resolve(records);
      });
    });

    // Check outfalls1.csv format
    log('info', '\noutfalls1.csv columns:');
    log('info', Object.keys(outfalls1[0]));
    log('info', '\nSample record from outfalls1.csv:');
    log('info', JSON.stringify(outfalls1[0]));

    // Check outfalls2.csv format
    log('info', '\noutfalls2.csv columns:');
    log('info', Object.keys(outfalls2[0]));
    log('info', '\nSample record from outfalls2.csv:');
    log('info', JSON.stringify(outfalls2[0]));

    // Check for postcode data
    log('info', '\nChecking for postcode data in outfalls1.csv:');
    const sample1 = outfalls1.find(record => {
      return Object.entries(record).some(([key, value]) => 
        (key.toLowerCase().includes('postcode') || key.toLowerCase().includes('post code')) && value
      );
    });
    if (sample1) {
      log('info', 'Found postcode data:');
      log('info', JSON.stringify(sample1));
    }

    log('info', '\nChecking for postcode data in outfalls2.csv:');
    const sample2 = outfalls2.find(record => {
      return Object.entries(record).some(([key, value]) => 
        (key.toLowerCase().includes('postcode') || key.toLowerCase().includes('post code')) && value
      );
    });
    if (sample2) {
      log('info', 'Found postcode data:');
      log('info', JSON.stringify(sample2));
    }

  } catch (error) {
    log('error', `Error: ${error.message}`);
  }
}

// Run check
checkCsvFormat().catch(error => {
  log('error', `Fatal error: ${error.message}`);
  process.exit(1);
});
