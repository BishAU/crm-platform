import { NextResponse } from 'next/server';
import { prisma } from '@lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const countOnly = searchParams.get('count') === 'true';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'name';
    const sortOrder = (searchParams.get('sortOrder') || 'asc') as 'asc' | 'desc';

    if (countOnly) {
      const count = await prisma.waterAuthority.count();
      return NextResponse.json({ count });
    }

    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const where: Prisma.WaterAuthorityWhereInput = search ? {
      OR: [
        { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
        { indigenousCommunities: { contains: search, mode: Prisma.QueryMode.insensitive } }
      ]
    } : {};

    const [items, total] = await Promise.all([
      prisma.waterAuthority.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { [sortBy]: sortOrder },
        include: {
          outfalls: {
            select: {
              id: true
            }
          }
        }
      }),
      prisma.waterAuthority.count({ where })
    ]);

    return NextResponse.json({
      items: items.map(item => ({
        ...item,
        outfallCount: item.outfalls.length
      })),
      page,
      totalPages: Math.ceil(total / pageSize),
      totalItems: total
    });
  } catch (error) {
    console.error('Error fetching water authorities:', error);
    return NextResponse.json({ message: 'Error fetching water authorities' }, { status: 500 });
  }
}
