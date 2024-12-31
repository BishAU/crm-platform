import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';
import { PrismaClient } from '@prisma/client';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Shared constants
export const ADMIN_USER_ID = 'cm5bs286s00000yl4b3u4semb';
export const BATCH_SIZE = 50;
export const INITIAL_BATCH_DELAY = 2000;
export const FAST_BATCH_DELAY = 50;
export const CSV_DIRECTORY = path.join(process.cwd(), 'public', 'imports', 'formatted');

// Shared database client
export const prisma = new PrismaClient();

// Helper to safely convert string values
export function safeParseValue(value, type) {
    if (value === undefined || value === null || value === '') return null;
    
    switch (type) {
        case 'boolean':
            return value.toLowerCase() === 'true' || value === '1';
        case 'number':
            const num = parseInt(value);
            return isNaN(num) ? null : num;
        case 'date':
            const date = new Date(value);
            return isNaN(date.getTime()) ? null : date;
        default:
            return value;
    }
}

// Process CSV file with given processor function
export async function processCsvFile(filePath, processor, processedEmails = new Set()) {
    let currentBatchDelay = INITIAL_BATCH_DELAY;
    let totalImports = 0;
    let currentFileImports = 0;
    let failedBatches = 0;
    const MAX_FAILED_BATCHES = 3;
    
    if (!fs.existsSync(filePath)) {
        throw new Error(`CSV file not found: ${filePath}`);
    }
    
    try {
        const records = [];
        const parser = fs.createReadStream(filePath).pipe(
            parse({
                columns: true,
                skip_empty_lines: true,
                trim: true,
                relax_column_count: true, // Handle inconsistent column counts
                skip_records_with_error: true // Skip malformed records
            })
        );
        
        for await (const record of parser) {
            // Skip empty records
            if (Object.keys(record).length === 0) continue;
            
            records.push(record);
            
            if (records.length === BATCH_SIZE) {
                try {
                    const batchNumber = Math.ceil(currentFileImports / BATCH_SIZE) + 1;
                    const imported = await processor(records, batchNumber, processedEmails);
                    currentFileImports += imported;
                    totalImports += imported;
                    records.length = 0;
                    failedBatches = 0; // Reset failed batch counter on success

                    // Speed up after 3 successful batches
                    if (batchNumber === 3) {
                        currentBatchDelay = FAST_BATCH_DELAY;
                        console.log(`First 3 batches successful - increasing import speed to ${currentBatchDelay}ms delay`);
                    }
                } catch (error) {
                    failedBatches++;
                    console.error(`Batch processing error:`, error.message);
                    
                    if (failedBatches >= MAX_FAILED_BATCHES) {
                        throw new Error(`Maximum failed batches (${MAX_FAILED_BATCHES}) reached - aborting import`);
                    }
                    
                    // Clear records and continue with next batch
                    records.length = 0;
                }
                
                await new Promise(resolve => setTimeout(resolve, currentBatchDelay));
            }
        }
        
        // Process remaining records
        if (records.length > 0) {
            try {
                const batchNumber = Math.ceil(currentFileImports / BATCH_SIZE) + 1;
                const imported = await processor(records, batchNumber, processedEmails);
                currentFileImports += imported;
                totalImports += imported;
            } catch (error) {
                console.error(`Error processing final batch:`, error.message);
            }
        }
        
        return { currentFileImports, totalImports };
        
    } catch (error) {
        console.error('Error processing file:', error);
        throw error;
    }
}

// Filter out records with duplicate emails
export function filterDuplicateEmails(records, processedEmails) {
    return records.filter(r => {
        if (!r['Email']) return true;
        const email = r['Email']?.toLowerCase();
        if (!email) return true;
        if (processedEmails.has(email)) {
            console.log(`Skipping duplicate email: ${r['Email']}`);
            return false;
        }
        processedEmails.add(email);
        return true;
    });
}
