import { NextResponse } from 'next/server';
import { prisma } from '@lib/prisma';
import { parse } from 'csv-parse/sync';
import { Prisma } from '@prisma/client';
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
    // @ts-ignore
    const model = prisma[modelName];

    const records = parse(csvData, {
      columns: true,
      skip_empty_lines: true,
    });

    let successfulImports = 0;
    let duplicateCount = 0;
    let errorCount = 0;
    const totalRecords = records.length;
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
                errorCount++;
                errors.push({
                  row: rowIndex + 2, // +2 for header row and 0-based index
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
        }
      }

      // Check for required fields
      const missingRequiredFields = modelRequiredFields.filter((field: string) => 
        !mappedRecord[field] || mappedRecord[field].trim() === ''
      );

      if (missingRequiredFields.length > 0) {
        errorCount++;
        errors.push({
          row: rowIndex + 2,
          message: `Missing required fields: ${missingRequiredFields.join(', ')}`,
          type: 'required'
        });
        continue;
      }

      if (!hasValidationError) {
        try {
          const existingRecord = await (model as any).findFirst({
            where: mappedRecord,
          });

          if (existingRecord) {
            duplicateCount++;
          } else {
            try {
              if (tableName === 'Account') await prisma.account.create({ data: mappedRecord as Prisma.AccountCreateInput });
              else if (tableName === 'Campaign') await prisma.campaign.create({ data: mappedRecord as Prisma.CampaignCreateInput });
              else if (tableName === 'Facility') await prisma.facility.create({ data: mappedRecord as Prisma.FacilityCreateInput });
              else if (tableName === 'IndigenousCommunity') await prisma.indigenousCommunity.create({ data: mappedRecord as Prisma.IndigenousCommunityCreateInput });
              else if (tableName === 'LandCouncil') await prisma.landCouncil.create({ data: mappedRecord as Prisma.LandCouncilCreateInput });
              else if (tableName === 'MarketingList') await prisma.marketingList.create({ data: mappedRecord as Prisma.MarketingListCreateInput });
              else if (tableName === 'Outfall') await prisma.outfall.create({ data: mappedRecord as Prisma.OutfallCreateInput });
              else if (tableName === 'Politician') await prisma.politician.create({ data: mappedRecord as Prisma.PoliticianCreateInput });
              else if (tableName === 'SupportTicket') await prisma.supportTicket.create({ data: mappedRecord as Prisma.SupportTicketCreateInput });
              else if (tableName === 'User') await prisma.user.create({ data: mappedRecord as Prisma.UserCreateInput });
              else if (tableName === 'WaterAuthority') await prisma.waterAuthority.create({ data: mappedRecord as Prisma.WaterAuthorityCreateInput });
              successfulImports++;
            } catch (error: any) {
              errorCount++;
              errors.push({
                row: rowIndex + 2,
                message: 'Database error',
                type: 'database',
                details: error.message
              });
            }
          }
        } catch (error: any) {
          errorCount++;
          errors.push({
            row: rowIndex + 2,
            message: 'Error processing record',
            type: 'database',
            details: error.message
          });
        }
      }
    }

    let totalRecordsInDb = 0;
    if (tableName === 'Account') totalRecordsInDb = await prisma.account.count();
    else if (tableName === 'Campaign') totalRecordsInDb = await prisma.campaign.count();
    else if (tableName === 'Facility') totalRecordsInDb = await prisma.facility.count();
    else if (tableName === 'IndigenousCommunity') totalRecordsInDb = await prisma.indigenousCommunity.count();
    else if (tableName === 'LandCouncil') totalRecordsInDb = await prisma.landCouncil.count();
    else if (tableName === 'MarketingList') totalRecordsInDb = await prisma.marketingList.count();
    else if (tableName === 'Outfall') totalRecordsInDb = await prisma.outfall.count();
    else if (tableName === 'Politician') totalRecordsInDb = await prisma.politician.count();
    else if (tableName === 'SupportTicket') totalRecordsInDb = await prisma.supportTicket.count();
    else if (tableName === 'User') totalRecordsInDb = await prisma.user.count();
    else if (tableName === 'WaterAuthority') totalRecordsInDb = await prisma.waterAuthority.count();

    return NextResponse.json({
      message: errorCount > 0 ? 'Import completed with errors' : 'Import completed successfully',
      summary: {
        successfulImports,
        totalRecords,
        duplicateCount,
        errorCount,
        totalRecordsInDb
      },
      errors: errors.length > 0 ? errors : undefined
    });
  } catch (error: any) {
    console.error('Error during import:', error);
    return NextResponse.json({
      message: 'Error during import',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}