import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const countOnly = searchParams.get('count') === 'true';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'lastName';
    const sortOrder = (searchParams.get('sortOrder') || 'asc') as 'asc' | 'desc';

    if (countOnly) {
      const count = await prisma.user.count({
        where: {
          NOT: { isAdmin: true } // Exclude admin users from count
        }
      });
      return NextResponse.json({ count });
    }

    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const where: Prisma.UserWhereInput = {
      NOT: { isAdmin: true }, // Exclude admin users
      ...(search ? {
        OR: [
          { firstName: { contains: search, mode: Prisma.QueryMode.insensitive } },
          { lastName: { contains: search, mode: Prisma.QueryMode.insensitive } },
          { email: { contains: search, mode: Prisma.QueryMode.insensitive } },
          { phone: { contains: search, mode: Prisma.QueryMode.insensitive } },
          { company: { contains: search, mode: Prisma.QueryMode.insensitive } }
        ]
      } : {})
    };

    const [items, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { [sortBy]: sortOrder },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          company: true,
          createdAt: true,
          updatedAt: true
        }
      }),
      prisma.user.count({ where })
    ]);

    return NextResponse.json({
      items,
      page,
      totalPages: Math.ceil(total / pageSize),
      totalItems: total
    });
  } catch (error) {
    console.error('Error fetching people:', error);
    return NextResponse.json({ message: 'Error fetching people' }, { status: 500 });
  }
}
