import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const where = {
      type: {
        not: null,
      },
    };

    const outfallTypes = await prisma.outfall.findMany({
      select: {
        type: true,
      },
      distinct: ['type'],
      where,
      orderBy: {
        type: 'asc',
      },
    });

    const types = outfallTypes.map(o => ({
      id: o.type,  // Use type as id for uniqueness
      name: o.type, // Map type to name for consistency with other routes
    }));

    return NextResponse.json({
      data: types,
    });
  } catch (error) {
    console.error('Error fetching outfall types:', error);
    return NextResponse.json(
      { error: 'Failed to fetch outfall types' },
      { status: 500 }
    );
  }
}
