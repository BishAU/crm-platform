import { NextResponse } from 'next/server';
import { prisma } from '@lib/prisma';
import { parse } from 'csv-parse/sync';
import { getRequiredFields, validateFieldValue, getFieldTypes } from '@lib/schemaUtils';

interface SchemaColumn {
  column_name: string;
}

interface ImportError {
  row: number;
  field?: string;
  value?: string;
  message: string;
  type: 'validation' | 'required' | 'database';
  details?: string;
}

export async function POST(req: Request) {
  try {
    const { tableName, csvData, fieldMappings } = await req.json();

    if (!tableName || !csvData || !fieldMappings) {
      return NextResponse.json({ message: 'Table name, CSV data, and field mappings are required' }, { status: 400 });
    }

    const modelName = tableName as keyof typeof prisma;
    if (!prisma[modelName]) {
      return NextResponse.json({ message: `Invalid table name: ${tableName}` }, { status: 500 });
    }

    const records = parse(csvData, {
      columns: true,
      skip_empty_lines: true,
    });

    let createCount = 0;
    let updateCount = 0;
    let ignoreCount = 0;
    let dataTypeMismatchCount = 0;
    const errors: ImportError[] = [];

    // Get current schema
    const currentSchema = await prisma.$queryRaw<SchemaColumn[]>`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = ${tableName.toLowerCase()}
    `;

    const tableFields = currentSchema.map((col: SchemaColumn) => col.column_name);
    const fieldTypes = getFieldTypes(tableName);

    if (!tableFields || !Array.isArray(tableFields)) {
      return NextResponse.json({ message: 'Could not retrieve table schema' }, { status: 500 });
    }

    // Get required fields dynamically
    const modelRequiredFields = getRequiredFields(tableName);

    for (let rowIndex = 0; rowIndex < records.length; rowIndex++) {
      const record = records[rowIndex];
      const mappedRecord: Record<string, any> = {};
      let hasValidationError = false;

      for (const csvHeader in fieldMappings) {
        const tableField = fieldMappings[csvHeader];
        if (tableField && tableField !== 'ignore') {
          if (tableFields.includes(tableField)) {
            const csvValue = record[csvHeader];
            if (csvValue !== undefined && csvValue !== null) {
              // Validate field value against its type
              const fieldType = fieldTypes[tableField];
              const validation = validateFieldValue(csvValue, fieldType);
              
              if (!validation.isValid) {
                hasValidationError = true;
                dataTypeMismatchCount++;
                errors.push({
                  row: rowIndex + 2,
                  field: tableField,
                  value: csvValue,
                  message: validation.error || 'Invalid value',
                  type: 'validation'
                });
                continue;
              }

              mappedRecord[tableField] = csvValue;
            }
          }
        } else {
          ignoreCount++;
        }
      }

      // Check for required fields
      const missingRequiredFields = modelRequiredFields.filter((field: string) => 
        !mappedRecord[field] || mappedRecord[field].trim() === ''
      );

      if (missingRequiredFields.length > 0) {
        errors.push({
          row: rowIndex + 2,
          message: `Missing required fields: ${missingRequiredFields.join(', ')}`,
          type: 'required'
        });
        continue;
      }

      if (!hasValidationError) {
        // Check if record exists
        try {
          const existingRecord = await (prisma[modelName] as any).findFirst({
            where: mappedRecord,
          });

          if (existingRecord) {
            updateCount++;
          } else {
            createCount++;
          }
        } catch (error: any) {
          errors.push({
            row: rowIndex + 2,
            message: 'Error checking record existence',
            type: 'database',
            details: error.message
          });
        }
      }
    }

    return NextResponse.json({
      message: errors.length > 0 ? 'Dry run completed with errors' : 'Dry run completed successfully',
      report: {
        summary: {
          created: createCount,
          updated: updateCount,
          ignored: ignoreCount,
          dataTypeMismatchCount,
          totalRecords: records.length,
          errorCount: errors.length
        },
        errors: errors.length > 0 ? errors : undefined
      }
    });
  } catch (error: any) {
    console.error('Error during dry run:', error);
    return NextResponse.json({
      message: 'Error during dry run',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}