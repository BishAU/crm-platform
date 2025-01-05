import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'csv-parse/sync';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

interface MappingSuggestion {
  csvHeader: string;
  schemaField: string;
  similarity: number;
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
  'politician': 'Politician',
  'supportticket': 'SupportTicket',
  'user': 'User',
  'waterauthority': 'WaterAuthority'
};

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

function getModelFields(modelName: string): string[] {
  const dmmf = (Prisma.dmmf as any).datamodel.models.find(
    (model: any) => model.name === modelName
  );

  if (!dmmf) {
    throw new Error(`Model ${modelName} not found in schema`);
  }

  // Get all fields except internal ones
  return dmmf.fields
    .filter((field: any) => {
      // Exclude internal fields and relation fields
      const isInternal = ['id', 'createdAt', 'updatedAt'].includes(field.name);
      const isRelation = field.kind === 'object';
      return !isInternal && !isRelation;
    })
    .map((field: any) => ({
      name: field.name,
      type: field.type,
      optional: !field.isRequired,
      list: field.isList
    }));
}

function validateCSVHeaders(headers: string[], modelFields: any[]): string[] {
  const warnings = [];
  const requiredFields = modelFields.filter(f => !f.optional).map(f => f.name);
  const missingRequired = requiredFields.filter(field => 
    !headers.some(header => calculateSimilarity(header, field) > 0.8)
  );

  if (missingRequired.length > 0) {
    warnings.push(`Missing required fields: ${missingRequired.join(', ')}`);
  }

  return warnings;
}

export async function POST(req: NextRequest) {
  try {
    const { tableName, csvData } = await req.json();

    if (!tableName || !csvData) {
      return NextResponse.json(
        { error: 'Missing required fields', details: 'Please ensure you have selected a table and provided CSV data' },
        { status: 400 }
      );
    }

    // Get the correct Prisma model name
    const modelName = tableNameMap[tableName.toLowerCase()];
    if (!modelName) {
      return NextResponse.json(
        { error: 'Invalid table name', details: `Table "${tableName}" is not recognized` },
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
        { error: 'CSV file is empty', details: 'The CSV file appears to be empty or contains no valid records' },
        { status: 400 }
      );
    }

    // Get CSV headers
    const csvHeaders = Object.keys(records[0]);

    // Get schema fields for the selected table
    const schemaFields = getModelFields(modelName);
    
    // Validate CSV headers against schema
    const warnings = validateCSVHeaders(csvHeaders, schemaFields);

    // Generate mapping suggestions
    const mappingSuggestions = csvHeaders.map(header => {
      const suggestions = schemaFields.map((field: any) => ({
        csvHeader: header,
        schemaField: field.name,
        similarity: calculateSimilarity(header, field.name),
        fieldType: field.type,
        optional: field.optional,
        isList: field.list
      }));

      // Get the best match
      return suggestions.reduce((best: any, current: any) =>
        current.similarity > best.similarity ? current : best
      );
    });

    // Sort suggestions by similarity
    mappingSuggestions.sort((a, b) => b.similarity - a.similarity);

    return NextResponse.json({
      csvHeaders,
      schemaFields,
      mappingSuggestions,
      recordCount: records.length,
      warnings: warnings.length > 0 ? warnings : undefined,
      tableName: modelName,
      sampleData: records.slice(0, 5) // Include sample data for preview
    });
  } catch (error) {
    console.error('Error analyzing CSV:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const errorDetails = error instanceof Error && error.stack ? error.stack : 'No additional details available';
    
    return NextResponse.json(
      { 
        error: 'Failed to analyze CSV file',
        message: errorMessage,
        details: errorDetails
      },
      { status: 500 }
    );
  }
}