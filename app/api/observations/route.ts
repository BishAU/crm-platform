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

    // If only count is requested, return count
    if (countOnly) {
      const count = await prisma.observation.count();
      return NextResponse.json({ count });
    }

    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    // Build filter conditions
    const where: Prisma.ObservationWhereInput = search ? {
      OR: [
        { title: { contains: search, mode: Prisma.QueryMode.insensitive } },
        { description: { contains: search, mode: Prisma.QueryMode.insensitive } },
        { type: { contains: search, mode: Prisma.QueryMode.insensitive } },
        { contact_name: { contains: search, mode: Prisma.QueryMode.insensitive } },
        { contact_email: { contains: search, mode: Prisma.QueryMode.insensitive } },
      ],
    } : {};

    const [items, total] = await Promise.all([
      prisma.observation.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { [sortBy]: sortOrder }
      }),
      prisma.observation.count({ where })
    ]);

    return NextResponse.json({
      items,
      page,
      totalPages: Math.ceil(total / pageSize),
      totalItems: total
    });
  } catch (error) {
    console.error('Error in observations API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch observations' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const observation = await prisma.observation.create({
      data: {
        ...data,
        status: 'pending',
        source: 'internal'
      }
    });

    return NextResponse.json(observation, { status: 201 });
  } catch (error) {
    console.error('Error creating observation:', error);
    return NextResponse.json(
      { error: 'Failed to create observation' },
      { status: 500 }
    );
  }
}
