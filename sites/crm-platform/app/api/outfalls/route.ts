import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const countOnly = searchParams.get('count') === 'true';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'outfallName';
    const sortOrder = (searchParams.get('sortOrder') || 'asc') as 'asc' | 'desc';

    if (countOnly) {
      const count = await prisma.outfall.count();
      return NextResponse.json({ count });
    }

    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const where: Prisma.OutfallWhereInput = search ? {
      OR: [
        { outfallName: { contains: search, mode: Prisma.QueryMode.insensitive } },
        { authority: { contains: search, mode: Prisma.QueryMode.insensitive } },
        { type: { contains: search, mode: Prisma.QueryMode.insensitive } }
      ]
    } : {};

    const [items, total] = await Promise.all([
      prisma.outfall.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { [sortBy]: sortOrder }
      }),
      prisma.outfall.count({ where })
    ]);

    return NextResponse.json({
      items,
      page,
      totalPages: Math.ceil(total / pageSize),
      totalItems: total
    });
  } catch (error) {
    console.error('Error fetching outfalls:', error);
    return NextResponse.json({ message: 'Error fetching outfalls' }, { status: 500 });
  }
}
