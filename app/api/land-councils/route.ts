import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'name';
    const sortOrder = (searchParams.get('sortOrder') || 'asc') as 'asc' | 'desc';
    const pageSize = 10;

    // Build the where clause for search
    const where: Prisma.LandCouncilWhereInput = search
      ? {
          OR: [
            { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
            { email: { contains: search, mode: Prisma.QueryMode.insensitive } },
            { phone: { contains: search, mode: Prisma.QueryMode.insensitive } },
            { lgas: { contains: search, mode: Prisma.QueryMode.insensitive } }
          ]
        }
      : {};

    // Get total count for pagination
    const totalItems = await prisma.landCouncil.count({ where });
    const totalPages = Math.ceil(totalItems / pageSize);

    // Get paginated and sorted results
    const items = await prisma.landCouncil.findMany({
      where,
      orderBy: {
        [sortBy]: sortOrder
      },
      skip: (page - 1) * pageSize,
      take: pageSize
    });

    return NextResponse.json({
      items,
      totalItems,
      totalPages,
      currentPage: page
    });
  } catch (error) {
    console.error('Error fetching land councils:', error);
    return NextResponse.json(
      { error: 'Failed to fetch land councils' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const landCouncil = await prisma.landCouncil.create({
      data
    });
    return NextResponse.json(landCouncil);
  } catch (error) {
    console.error('Error creating land council:', error);
    return NextResponse.json(
      { error: 'Failed to create land council' },
      { status: 500 }
    );
  }
}