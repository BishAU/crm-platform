import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { parse } from 'csv-parse/sync';
import { Prisma } from '@prisma/client';

interface ImportRequest {
  tableName: string;
  csvData: string;
  mappings: Record<string, string>;
}

interface ImportRecord {
  [key: string]: string | number | boolean | null;
}

interface InvalidRecord {
  index: number;
  record: ImportRecord;
  missingFields: string[];
}

interface SkippedRecord {
  row: number;
  missingFields: string[];
}

interface ImportResponse {
  error?: string;
  message?: string;
  details?: string;
  importedCount: number;
  totalRecords: number;
  validRecords: number;
  invalidRecords: number;
  skippedRecords?: SkippedRecord[];
}

// Map of lowercase table names to Prisma model names
const tableNameMap: Record<string, string> = {
  'campaign': 'Campaign',
  'facility': 'Facility',
  'indigenouscommunity': 'IndigenousCommunity',
  'landcouncil': 'LandCouncil',
  'marketinglist': 'MarketingList',
  'observation': 'Observation',
  'outfall': 'Outfall',
  'outfallobservation': 'OutfallObservation',
  'outfallpostcode': 'OutfallPostcode',
  'people': 'User',  // Added mapping for people -> User
  'politician': 'Politician',
  'supportticket': 'SupportTicket',
  'user': 'User',    // Keep original mapping for backward compatibility
  'waterauthority': 'WaterAuthority'
};

// Fields to exclude from required check
const excludedFields = [
  'id',
  'createdAt',
  'updatedAt',
  'observations',
  'postcodes',
  'outfalls',
  'waterAuthorities',
  'indigenousCommunities',
  'accounts',
  'sessions',
  'facilities',
  'supportTickets',
  'MarketingList'
];

export async function POST(req: NextRequest) {
  try {
    const { tableName, csvData, mappings }: ImportRequest = await req.json();

    if (!tableName || !csvData || !mappings) {
      return NextResponse.json(
        { error: 'Missing required fields', details: 'Please ensure you have selected a table and provided CSV data' },
        { status: 400 }
      );
    }

    // Get the correct Prisma model name
    const modelName = tableNameMap[tableName.toLowerCase()];
    if (!modelName) {
      return NextResponse.json(
        { 
          error: 'Invalid table name', 
          details: `Table "${tableName}" is not recognized. Available tables are: ${Object.keys(tableNameMap).join(', ')}` 
        },
        { status: 400 }
      );
    }

    // Parse CSV data
    const records = parse(csvData, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });

    if (!records.length) {
      return NextResponse.json(
        { error: 'No records to import', details: 'The CSV file appears to be empty or contains no valid records' },
        { status: 400 }
      );
    }

    // Transform records according to mappings
    const transformedRecords = records.map((record: Record<string, any>) => {
      const transformedRecord: ImportRecord = {};
      
      // Apply mappings
      Object.entries(mappings).forEach(([csvHeader, schemaField]) => {
        if (schemaField && record[csvHeader] !== undefined) {
          // Handle special data types
          let value = record[csvHeader];
          
          // Convert empty strings to null
          if (value === '') {
            value = null;
          }
          // Convert "true"/"false" strings to booleans
          else if (value?.toLowerCase() === 'true') {
            value = true;
          }
          else if (value?.toLowerCase() === 'false') {
            value = false;
          }
          // Convert numbers to strings for latitude and longitude
          else if (schemaField === 'latitude' || schemaField === 'longitude') {
            value = value?.toString() || null;
          }
          // Try to convert numeric strings to numbers for other fields
          else if (!isNaN(value) && value !== '') {
            value = Number(value);
          }
          
          transformedRecord[schemaField] = value;
        }
      });

      return transformedRecord;
    });

    // Get the Prisma model
    const model = (prisma as any)[modelName];
    if (!model) {
      return NextResponse.json(
        { error: 'Invalid table name', details: `Table "${modelName}" is not available in the database` },
        { status: 400 }
      );
    }

    // Get required fields for the model
    const dmmf = (Prisma.dmmf as any).datamodel.models.find(
      (m: any) => m.name === modelName
    );

    if (!dmmf) {
      return NextResponse.json(
        { error: 'Schema error', details: `Could not find schema information for table "${modelName}"` },
        { status: 400 }
      );
    }

    const requiredFields = dmmf.fields
      .filter((f: any) => 
        !f.isGenerated && 
        !f.hasDefaultValue && 
        f.isRequired && 
        !excludedFields.includes(f.name) &&
        f.kind !== 'object' // Exclude relation fields
      )
      .map((f: any) => f.name);

    console.log('Required fields for', modelName, ':', requiredFields);

    // If there are no required fields after excluding system fields,
    // treat all records as valid
    if (requiredFields.length === 0) {
      const response: ImportResponse = {
        message: 'Import completed successfully',
        importedCount: transformedRecords.length,
        totalRecords: transformedRecords.length,
        validRecords: transformedRecords.length,
        invalidRecords: 0
      };

      try {
        const result = await model.createMany({
          data: transformedRecords,
          skipDuplicates: true
        });
        return NextResponse.json(response);
      } catch (error) {
        console.error('Import error:', error);
        return NextResponse.json({
          error: 'Failed to import data',
          details: error instanceof Error ? error.message : 'Unknown error',
          importedCount: 0,
          totalRecords: transformedRecords.length,
          validRecords: 0,
          invalidRecords: transformedRecords.length
        }, { status: 500 });
      }
    }

    // Filter out records with missing required fields
    const validRecords: ImportRecord[] = [];
    const invalidRecords: InvalidRecord[] = [];
    
    transformedRecords.forEach((record: ImportRecord, index: number) => {
      const missingFields = requiredFields.filter((field: string) => 
        record[field] === null || record[field] === undefined
      );
      
      if (missingFields.length === 0) {
        validRecords.push(record);
      } else {
        invalidRecords.push({
          index: index + 1,
          record,
          missingFields
        });
      }
    });

    if (validRecords.length === 0) {
      const response: ImportResponse = {
        error: 'No valid records to import',
        details: `All records are missing required fields:\n${invalidRecords.map(r => 
          `Row ${r.index}: Missing required fields: ${r.missingFields.join(', ')}`
        ).join('\n')}`,
        importedCount: 0,
        totalRecords: transformedRecords.length,
        validRecords: 0,
        invalidRecords: invalidRecords.length
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Import valid records in batches
    const batchSize = 100;
    const results: Array<{ count: number }> = [];
    const errors: string[] = [];
    
    for (let i = 0; i < validRecords.length; i += batchSize) {
      const batch = validRecords.slice(i, i + batchSize);
      try {
        const result = await model.createMany({
          data: batch,
          skipDuplicates: true
        });
        results.push(result);
      } catch (error) {
        console.error('Batch import error:', error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          let errorDetails = `Error in batch ${i/batchSize + 1}: `;
          switch (error.code) {
            case 'P2002':
              errorDetails += `Unique constraint violation on ${error.meta?.target}`;
              break;
            case 'P2003':
              errorDetails += `Foreign key constraint failed on ${error.meta?.field_name}`;
              break;
            case 'P2005':
              errorDetails += `Invalid value for field ${error.meta?.field_name}`;
              break;
            default:
              errorDetails += error.message;
          }
          errors.push(errorDetails);
        } else {
          errors.push(`Error in batch ${i/batchSize + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
    }

    // Calculate total imported records
    const totalImported = results.reduce((sum, result) => sum + result.count, 0);

    // Prepare response
    const response: ImportResponse = {
      importedCount: totalImported,
      totalRecords: transformedRecords.length,
      validRecords: validRecords.length,
      invalidRecords: invalidRecords.length
    };

    if (invalidRecords.length > 0) {
      response.skippedRecords = invalidRecords.map(r => ({
        row: r.index,
        missingFields: r.missingFields
      }));
    }

    if (errors.length > 0) {
      response.error = 'Partial import failure';
      response.details = errors.join('\n');
      return NextResponse.json(response, { status: 207 }); // 207 Multi-Status
    }

    return NextResponse.json({
      message: 'Import completed successfully',
      ...response
    });
  } catch (error) {
    console.error('Error importing data:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const errorDetails = error instanceof Error && error.stack ? error.stack : 'No additional details available';
    
    return NextResponse.json(
      { 
        error: 'Failed to import data',
        message: errorMessage,
        details: errorDetails,
        importedCount: 0,
        totalRecords: 0,
        validRecords: 0,
        invalidRecords: 0
      } as ImportResponse,
      { status: 500 }
    );
  }
}