import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

interface ColumnSchema {
  column_name: string;
}

const tableMap: Record<string, string> = {
  User: 'User',
  Outfall: 'Outfall',
  Politician: 'Politician',
  MarketingList: 'MarketingList',
  Facility: 'Facility',
  IndigenousCommunity: 'IndigenousCommunity',
  LandCouncil: 'LandCouncil',
  WaterAuthority: 'WaterAuthority',
  Campaign: 'Campaign',
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const tableName = searchParams.get('table');

    if (!tableName || typeof tableName !== 'string') {
      return NextResponse.json({ message: 'Table name is required' }, { status: 400 });
    }

    const dbTableName = tableMap[tableName];

    if (!dbTableName) {
        return NextResponse.json({ message: 'Invalid table name' }, { status: 400 });
    }

    const schema = await prisma.$queryRaw<ColumnSchema[]>`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = ${dbTableName}
    `;

    const fields = schema.map((column) => column.column_name);

    return NextResponse.json({ fields });
  } catch (error) {
    console.error('Error fetching schema:', error);
    return NextResponse.json({ message: 'Error fetching schema' }, { status: 500 });
  }
}