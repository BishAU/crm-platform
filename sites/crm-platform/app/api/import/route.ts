import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { parse } from 'csv-parse/sync';

interface ImportRequest {
  tableName: string;
  csvData: string;
  mappings: Record<string, string>;
}

export async function POST(req: NextRequest) {
  try {
    const { tableName, csvData, mappings }: ImportRequest = await req.json();

    if (!tableName || !csvData || !mappings) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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
        { error: 'No records to import' },
        { status: 400 }
      );
    }

    // Transform records according to mappings
    const transformedRecords = records.map((record: Record<string, any>) => {
      const transformedRecord: Record<string, any> = {};
      
      // Apply mappings
      Object.entries(mappings).forEach(([csvHeader, schemaField]) => {
        if (schemaField && record[csvHeader] !== undefined) {
          transformedRecord[schemaField] = record[csvHeader];
        }
      });

      return transformedRecord;
    });

    // Get the appropriate Prisma model
    const modelName = tableName.charAt(0).toUpperCase() + tableName.slice(1).toLowerCase();
    const model = (prisma as any)[modelName];
    if (!model) {
      return NextResponse.json(
        { error: 'Invalid table name' },
        { status: 400 }
      );
    }

    // Import records in batches
    const batchSize = 100;
    const results = [];
    
    for (let i = 0; i < transformedRecords.length; i += batchSize) {
      const batch = transformedRecords.slice(i, i + batchSize);
      const result = await model.createMany({
        data: batch,
        skipDuplicates: true
      });
      results.push(result);
    }

    // Calculate total imported records
    const totalImported = results.reduce((sum, result) => sum + result.count, 0);

    return NextResponse.json({
      message: 'Import completed successfully',
      count: totalImported
    });
  } catch (error) {
    console.error('Error importing data:', error);
    return NextResponse.json(
      { error: 'Failed to import data' },
      { status: 500 }
    );
  }
}