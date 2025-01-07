import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@lib/prisma';
import { parse } from 'csv-parse/sync';
import { Prisma } from '@prisma/client';

export async function POST(req: NextRequest) {
  try {
    const { csvData } = await req.json();

    if (!csvData) {
      return NextResponse.json(
        { error: 'No CSV data provided' },
        { status: 400 }
      );
    }

    // Parse CSV data to get headers
    const records = parse(csvData, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      to: 1 // Only read first row to get headers
    });

    if (!records.length) {
      return NextResponse.json(
        { error: 'CSV file appears to be empty or invalid' },
        { status: 400 }
      );
    }

    // Get headers from first record
    const headers = Object.keys(records[0]);

    // Get all Prisma models and their fields
    const dmmf = (Prisma.dmmf as any).datamodel.models;
    const models = dmmf.map((model: any) => ({
      name: model.name,
      fields: model.fields
        .filter((f: any) => !f.isGenerated && f.kind !== 'object') // Exclude generated and relation fields
        .map((f: any) => ({
          name: f.name,
          type: f.type,
          required: f.isRequired && !f.hasDefaultValue,
          isId: f.isId
        }))
    }));

    return NextResponse.json({
      headers,
      models
    });
  } catch (error) {
    console.error('Error analyzing CSV:', error);
    return NextResponse.json(
      { error: 'Failed to analyze CSV data' },
      { status: 500 }
    );
  }
}