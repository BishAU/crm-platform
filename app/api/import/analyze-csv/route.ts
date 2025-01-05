import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'csv-parse/sync';
import { prisma } from '@/lib/prisma';

interface MappingSuggestion {
  csvHeader: string;
  schemaField: string;
  similarity: number;
}

interface PrismaField {
  name: string;
  isGenerated: boolean;
  kind: string;
}

function calculateSimilarity(str1: string, str2: string): number {
  const s1 = str1.toLowerCase().replace(/[^a-z0-9]/g, '');
  const s2 = str2.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  if (s1 === s2) return 1;
  if (s1.includes(s2) || s2.includes(s1)) return 0.8;
  
  const pairs1 = new Set();
  const pairs2 = new Set();
  
  for (let i = 0; i < s1.length - 1; i++) {
    pairs1.add(s1.slice(i, i + 2));
  }
  
  for (let i = 0; i < s2.length - 1; i++) {
    pairs2.add(s2.slice(i, i + 2));
  }
  
  const intersection = new Set(Array.from(pairs1).filter(x => pairs2.has(x)));
  const union = new Set([...Array.from(pairs1), ...Array.from(pairs2)]);
  
  return intersection.size / union.size;
}

export async function POST(req: NextRequest) {
  try {
    const { tableName, csvData } = await req.json();

    if (!tableName || !csvData) {
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
        { error: 'CSV file is empty' },
        { status: 400 }
      );
    }

    // Get CSV headers
    const csvHeaders = Object.keys(records[0]);

    // Get schema fields for the selected table
    const modelName = tableName.charAt(0).toUpperCase() + tableName.slice(1).toLowerCase();
    const dmmf = (prisma as any)._baseDmmf;
    const model = dmmf.modelMap[modelName];

    if (!model) {
      return NextResponse.json(
        { error: 'Invalid table name' },
        { status: 400 }
      );
    }

    const schemaFields = model.fields
      .filter((field: PrismaField) => !field.isGenerated && field.kind !== 'object')
      .map((field: PrismaField) => field.name);

    // Generate mapping suggestions
    const mappingSuggestions = csvHeaders.map(header => {
      const suggestions = schemaFields.map((field: string) => ({
        csvHeader: header,
        schemaField: field,
        similarity: calculateSimilarity(header, field)
      } as MappingSuggestion));

      // Get the best match
      return suggestions.reduce((best: MappingSuggestion, current: MappingSuggestion) =>
        current.similarity > best.similarity ? current : best
      );
    });

    // Sort suggestions by similarity
    mappingSuggestions.sort((a, b) => b.similarity - a.similarity);

    return NextResponse.json({
      csvHeaders,
      schemaFields,
      mappingSuggestions,
      recordCount: records.length
    });
  } catch (error) {
    console.error('Error analyzing CSV:', error);
    return NextResponse.json(
      { error: 'Failed to analyze CSV file' },
      { status: 500 }
    );
  }
}