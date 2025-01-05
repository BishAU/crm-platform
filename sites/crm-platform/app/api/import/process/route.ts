import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { parse } from 'csv-parse/sync';

export async function POST(req: Request) {
  try {
    const { tableName, csvData, fieldMappings } = await req.json();

    if (!tableName || !csvData || !fieldMappings) {
      return NextResponse.json({ message: 'Table name, CSV data, and field mappings are required' }, { status: 400 });
    }

    if (!(tableName in prisma)) {
        return NextResponse.json({ message: `Invalid table name: ${tableName}` }, { status: 500 });
    }

    const records = parse(csvData, {
      columns: true,
      skip_empty_lines: true,
    });

    let successfulImports = 0;
    let duplicateCount = 0;
    let dataTypeMismatchCount = 0;
    const totalRecords = records.length;

    let tableSchema;
    try {
        // Use correct Prisma client syntax to access the model and its methods
        const model = prisma[tableName as keyof typeof prisma] as any;
        if (typeof model.fields !== 'function') {
            return NextResponse.json({ message: `Invalid table name: ${tableName}` }, { status: 500 });
        }
        tableSchema = await model.fields();
    } catch (error: any) {
        console.error('Error fetching table schema:', error);
        return NextResponse.json({ message: `Error fetching table schema: ${error.message}` }, { status: 500 });
    }

    if (!tableSchema) {
        return NextResponse.json({ message: 'Could not retrieve table schema' }, { status: 500 });
    }

    for (const record of records) {
      const mappedRecord: Record<string, any> = {};

      for (const csvHeader in fieldMappings) {
        const tableField = fieldMappings[csvHeader];
        if (tableField && tableField !== 'ignore') {
          const schemaField = tableSchema.find((f: any) => f.name === tableField);
            if (schemaField) {
                const csvValue = record[csvHeader];
                if (csvValue !== undefined && csvValue !== null) {
                    // Basic data type validation
                    if (schemaField.type === 'Int' && isNaN(parseInt(csvValue))) {
                        dataTypeMismatchCount++;
                        console.error(`Data type mismatch for field ${tableField}: Expected Int, got ${typeof csvValue}`);
                        continue;
                    }
                    if (schemaField.type === 'Float' && isNaN(parseFloat(csvValue))) {
                        dataTypeMismatchCount++;
                        console.error(`Data type mismatch for field ${tableField}: Expected Float, got ${typeof csvValue}`);
                        continue;
                    }
                    if (schemaField.type === 'Boolean' && csvValue.toLowerCase() !== 'true' && csvValue.toLowerCase() !== 'false') {
                        dataTypeMismatchCount++;
                        console.error(`Data type mismatch for field ${tableField}: Expected Boolean, got ${typeof csvValue}`);
                        continue;
                    }
                    mappedRecord[tableField] = csvValue;
                }
            }
        }
      }

      // Check for duplicates before inserting
      try {
        const existingRecord = await (prisma[tableName as keyof typeof prisma] as any).findFirst({
          where: mappedRecord,
        });

        if (existingRecord) {
          duplicateCount++;
        } else {
          await (prisma[tableName as keyof typeof prisma] as any).create({
            data: mappedRecord,
          });
          successfulImports++;
        }
      } catch (error: any) {
          console.error('Error processing record:', error);
          return NextResponse.json({ message: `Error processing record: ${error.message}` }, { status: 500 });
        // Optionally handle errors, e.g., log them or skip the record
      }
    }

    const totalRecordsInDb = await (prisma[tableName as keyof typeof prisma] as any).count();

    return NextResponse.json({
      message: 'Import completed successfully',
      summary: {
        successfulImports,
        totalRecords,
        duplicateCount,
        totalRecordsInDb,
        dataTypeMismatchCount
      }
    });
  } catch (error: any) {
    console.error('Error during import:', error);
    return NextResponse.json({ message: `Error during import: ${error.message}` }, { status: 500 });
  }
}