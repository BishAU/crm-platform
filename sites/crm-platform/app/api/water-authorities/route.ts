import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '../../lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'authority';
    const sortOrder = (searchParams.get('sortOrder') || 'asc') as 'asc' | 'desc';

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Build where clause for search
    const where = search
      ? {
          OR: [
            { authority: { contains: search, mode: 'insensitive' as const } },
            { state: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    // Get unique authorities count
    const uniqueAuthorities = await prisma.outfall.groupBy({
      by: ['authority'],
      where: {
        ...where,
        authority: { not: null },
      },
    });

    const total = uniqueAuthorities.length;

    // Get paginated authorities
    const outfalls = await prisma.outfall.groupBy({
      by: ['authority', 'id', 'contact', 'contact_email', 'contact_name', 'state', 'createdAt', 'updatedAt'],
      where: {
        ...where,
        authority: { not: null },
      },
      skip,
      take: limit,
      orderBy: {
        authority: sortOrder,
      },
    });

    return NextResponse.json({
      data: outfalls.map(outfall => ({
        id: outfall.id,
        authority: outfall.authority,
        contact: outfall.contact,
        contact_email: outfall.contact_email,
        contact_name: outfall.contact_name,
        state: outfall.state,
        createdAt: outfall.createdAt,
        updatedAt: outfall.updatedAt,
      })),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching water authorities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch water authorities' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const outfall = await prisma.outfall.create({
      data: {
        authority: data.authority,
        contact: data.contact,
        contact_email: data.contact_email,
        contact_name: data.contact_name,
        state: data.state,
      },
      select: {
        id: true,
        authority: true,
        contact: true,
        contact_email: true,
        contact_name: true,
        state: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(outfall, { status: 201 });
  } catch (error) {
    console.error('Error creating water authority:', error);
    return NextResponse.json(
      { error: 'Failed to create water authority' },
      { status: 500 }
    );
  }
}
