import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const sortBy = searchParams.get('sortBy') || 'authorityName';
    const sortOrder = (searchParams.get('sortOrder') || 'asc') as 'asc' | 'desc';
    const activeStatus = searchParams.get('activeStatus');
    const skip = (page - 1) * limit;

    const where = {
      AND: [
        search
          ? {
              OR: [
                {
                  authorityName: {
                    contains: search,
                    mode: 'insensitive' as Prisma.QueryMode,
                  },
                },
                {
                  associatedIndigenousCommunities: {
                    contains: search,
                    mode: 'insensitive' as Prisma.QueryMode,
                  },
                },
              ],
            }
          : {},
        activeStatus !== null
          ? { activeStatus: activeStatus === 'true' }
          : {},
      ],
    } as any;

    const [total, waterAuthorities] = await Promise.all([
      prisma.waterAuthority.count({ where }),
      prisma.waterAuthority.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
        select: {
          id: true,
          authorityName: true,
          associatedIndigenousCommunities: true,
          activeStatus: true,
          createdAt: true,
          updatedAt: true,
        } as any,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      data: waterAuthorities,
      pagination: {
        total,
        totalPages,
        page,
        limit,
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
    // Map 'name' to 'authorityName' for database
    const { name, ...rest } = data;
    const waterAuthority = await prisma.waterAuthority.create({
      data: {
        ...rest,
        authorityName: name,
        activeStatus: true,
      },
    });

    return NextResponse.json({
      data: {
        ...waterAuthority,
        name: waterAuthority.authorityName,
      },
    });
  } catch (error) {
    console.error('Error creating water authority:', error);
    return NextResponse.json(
      { error: 'Failed to create water authority' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { id, name, ...updateData } = data;

    const waterAuthority = await prisma.waterAuthority.update({
      where: { id },
      data: {
        ...updateData,
        authorityName: name,
      },
    });

    return NextResponse.json({
      data: {
        ...waterAuthority,
        name: waterAuthority.authorityName,
      },
    });
  } catch (error) {
    console.error('Error updating water authority:', error);
    return NextResponse.json(
      { error: 'Failed to update water authority' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Water authority ID is required' },
        { status: 400 }
      );
    }

    await prisma.waterAuthority.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting water authority:', error);
    return NextResponse.json(
      { error: 'Failed to delete water authority' },
      { status: 500 }
    );
  }
}
