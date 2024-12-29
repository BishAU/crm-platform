import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { Prisma } from '@prisma/client';
import type { RouteSegment } from '../../../types/next';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'authorityName';
    const sortOrder = (searchParams.get('sortOrder') || 'asc') as 'asc' | 'desc';

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Build where clause for search
    const where: Prisma.IndigenousCommunityWhereInput = search
      ? {
          OR: [
            { authorityName: { contains: search, mode: 'insensitive' as Prisma.QueryMode } },
            { associatedIndigenousCommunities: { contains: search, mode: 'insensitive' as Prisma.QueryMode } },
          ],
        }
      : {};

    // Get total count for pagination
    const total = await prisma.indigenousCommunity.count({ where });

    // Get indigenous communities with pagination, sorting, and search
    const communities = await prisma.indigenousCommunity.findMany({
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
        createdAt: true,
        updatedAt: true,
      },
    });

    // Map the response to use 'name' instead of 'authorityName'
    const mappedCommunities = communities.map(community => ({
      ...community,
      name: community.authorityName,
    }));

    return NextResponse.json({
      data: mappedCommunities,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching indigenous communities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch indigenous communities' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    // Map 'name' to 'authorityName' for database
    const { name, ...rest } = data;
    const community = await prisma.indigenousCommunity.create({
      data: {
        authorityName: name,
        ...rest,
      },
    });

    // Map response back to use 'name'
    return NextResponse.json({
      ...community,
      name: community.authorityName,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating indigenous community:', error);
    return NextResponse.json(
      { error: 'Failed to create indigenous community' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { id, name, ...updateData } = data;

    const community = await prisma.indigenousCommunity.update({
      where: { id },
      data: {
        authorityName: name,
        ...updateData,
      },
    });

    // Map response back to use 'name'
    return NextResponse.json({
      ...community,
      name: community.authorityName,
    });
  } catch (error) {
    console.error('Error updating indigenous community:', error);
    return NextResponse.json(
      { error: 'Failed to update indigenous community' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    await prisma.indigenousCommunity.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting indigenous community:', error);
    return NextResponse.json(
      { error: 'Failed to delete indigenous community' },
      { status: 500 }
    );
  }
}
