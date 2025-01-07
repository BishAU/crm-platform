import { NextResponse } from 'next/server';
import { prisma } from '@lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const countOnly = searchParams.get('count') === 'true';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = (searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc';

    if (countOnly) {
      const count = await prisma.supportTicket.count();
      return NextResponse.json({ count });
    }

    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const where: Prisma.SupportTicketWhereInput = search ? {
      OR: [
        { title: { contains: search, mode: Prisma.QueryMode.insensitive } },
        { description: { contains: search, mode: Prisma.QueryMode.insensitive } },
        { status: { contains: search, mode: Prisma.QueryMode.insensitive } },
      ],
    } : {};

    const [items, total] = await Promise.all([
      prisma.supportTicket.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { [sortBy]: sortOrder },
      }),
      prisma.supportTicket.count({ where })
    ]);

    return NextResponse.json({
      items,
      page,
      totalPages: Math.ceil(total / pageSize),
      totalItems: total
    });
  } catch (error) {
    console.error('Error fetching support tickets:', error);
    return NextResponse.json({ message: 'Error fetching support tickets' }, { status: 500 });
  }
}