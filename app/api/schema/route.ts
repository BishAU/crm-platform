import { NextResponse } from 'next/server';

// List of tables from prisma schema
const tables = [
  'Campaign',
  'Facility',
  'IndigenousCommunity',
  'LandCouncil',
  'MarketingList',
  'Observation',
  'Outfall',
  'OutfallObservation',
  'OutfallPostcode',
  'Politician',
  'SupportTicket',
  'User',
  'WaterAuthority'
];

export async function GET() {
  try {
    const formattedTables = tables
      .filter(name => !['Account', 'Session', 'VerificationToken'].includes(name))
      .map(name => ({
        value: name.toLowerCase(),
        label: name,
        template: `/csv-imports/${name.toLowerCase()}-template.csv`
      }))
      .sort((a, b) => a.label.localeCompare(b.label));

    return NextResponse.json({ tables: formattedTables });
  } catch (error) {
    console.error('Error formatting tables:', error);
    return NextResponse.json(
      { error: 'Failed to fetch schema information' },
      { status: 500 }
    );
  }
}