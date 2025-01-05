import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';

// List of tables from prisma schema with user-friendly names
const tables = [
  { model: 'Campaign', label: 'Campaigns' },
  { model: 'Facility', label: 'Facilities' },
  { model: 'IndigenousCommunity', label: 'Indigenous Communities' },
  { model: 'LandCouncil', label: 'Land Councils' },
  { model: 'MarketingList', label: 'Marketing Lists' },
  { model: 'Observation', label: 'Observations' },
  { model: 'Outfall', label: 'Outfalls' },
  { model: 'OutfallObservation', label: 'Outfall Observations' },
  { model: 'OutfallPostcode', label: 'Outfall Postcodes' },
  { model: 'Politician', label: 'Politicians' },
  { model: 'SupportTicket', label: 'Support Tickets' },
  { model: 'User', label: 'People' },  // Changed label to "People" for better UX
  { model: 'WaterAuthority', label: 'Water Authorities' }
];

export async function GET() {
  try {
    const formattedTables = tables
      .filter(({ model }) => !['Account', 'Session', 'VerificationToken'].includes(model))
      .map(({ model, label }) => ({
        value: model.toLowerCase(),
        label: label,
        template: `/csv-imports/${model.toLowerCase()}-template.csv`
      }))
      .sort((a, b) => a.label.localeCompare(b.label));

    return NextResponse.json({ tables: formattedTables });
  } catch (error) {
    console.error('Error formatting tables:', error);
    return NextResponse.json(
      { error: 'Failed to fetch schema information', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}