import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const countOnly = searchParams.get('count') === 'true';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'type';
    const sortOrder = (searchParams.get('sortOrder') || 'asc') as 'asc' | 'desc';

    if (countOnly) {
      const distinctTypes = await prisma.outfall.findMany({
        where: {
          type: { not: null }
        },
        select: {
          type: true
        },
        distinct: ['type']
      });
      return NextResponse.json({ count: distinctTypes.length });
    }

    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    // Get distinct types with their counts
    const typesWithCounts = await prisma.$queryRaw<Array<{ type: string, count: number }>>`
      SELECT type, COUNT(*) as count
      FROM "Outfall"
      WHERE type IS NOT NULL
      ${search ? Prisma.sql`AND LOWER(type) LIKE ${`%${search.toLowerCase()}%`}` : Prisma.empty}
      GROUP BY type
      ORDER BY ${Prisma.raw(sortBy === 'count' ? 'count' : 'type')} ${Prisma.raw(sortOrder)}
      LIMIT ${pageSize}
      OFFSET ${skip}
    `;

    // Get total count for pagination
    const totalResult = await prisma.$queryRaw<Array<{ count: number }>>`
      SELECT COUNT(DISTINCT type) as count
      FROM "Outfall"
      WHERE type IS NOT NULL
      ${search ? Prisma.sql`AND LOWER(type) LIKE ${`%${search.toLowerCase()}%`}` : Prisma.empty}
    `;

    const total = totalResult[0]?.count || 0;

    const items = typesWithCounts.map((item: { type: string, count: number }) => ({
      id: item.type, // Use type as id since it's unique
      name: item.type,
      description: `Type of outfall (${item.count} outfalls)`,
      count: Number(item.count)
    }));

    return NextResponse.json({
      items,
      page,
      totalPages: Math.ceil(total / pageSize),
      totalItems: total
    });
  } catch (error) {
    console.error('Error fetching outfall types:', error);
    return NextResponse.json({ message: 'Error fetching outfall types' }, { status: 500 });
  }
}
