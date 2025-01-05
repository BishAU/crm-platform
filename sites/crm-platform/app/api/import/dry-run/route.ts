import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { parse } from 'csv-parse/sync';

interface DryRunReport {
  errors: { message: string; error: string }[];
  summary: {
    created: number;
    updated: number;
    ignored: number;
  };
}

export async function POST(req: Request) {
  try {
    const { tableName, csvData, fieldMappings } = await req.json();

    if (!tableName || !csvData || !fieldMappings) {
      return NextResponse.json({ message: 'Table name, CSV data, and field mappings are required' }, { status: 400 });
    }

    const records = parse(csvData, {
      columns: true,
      skip_empty_lines: true,
    });

    // Simulate import and generate report
    const report: DryRunReport = {
      errors: [],
      summary: {
        created: 0,
        updated: 0,
        ignored: 0,
      },
    };

    for (const record of records) {
      const mappedRecord: Record<string, any> = {};
      let hasError = false;

      for (const csvHeader in fieldMappings) {
        const tableField = fieldMappings[csvHeader];
        if (tableField && tableField !== 'ignore') {
          mappedRecord[tableField] = record[csvHeader];
        }
      }

      // Simulate database operation and check for errors
      try {
        // Simulate a prisma query to check if record exists
        // const existingRecord = await prisma[tableName].findUnique({ where: { ...mappedRecord } });
        // if (existingRecord) {
        //   report.summary.updated++;
        // } else {
        //   report.summary.created++;
        // }
        report.summary.created++; // For now, assume all records are new
      } catch (error: any) {
        hasError = true;
        report.errors.push({
          message: `Error processing record: ${JSON.stringify(record)}`,
          error: error.message,
        });
      }

      if (hasError) {
        report.summary.ignored++;
      }
    }

    return NextResponse.json({ report });
  } catch (error: any) {
    console.error('Error during dry run:', error);
    return NextResponse.json({ message: 'Error during dry run' }, { status: 500 });
  }
}