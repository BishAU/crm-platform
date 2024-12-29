import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '../../../lib/prisma';
import type { RouteSegment } from '../../../types/next';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'outfallName';
    const sortOrder = (searchParams.get('sortOrder') || 'asc') as 'asc' | 'desc';

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Build where clause for search
    const where = search
      ? {
          OR: [
            { outfallName: { contains: search, mode: 'insensitive' as const } },
            { authority: { contains: search, mode: 'insensitive' as const } },
            { type: { contains: search, mode: 'insensitive' as const } },
            { state: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    // Get total count for pagination
    const total = await prisma.outfall.count({ where });

    const outfalls = await prisma.outfall.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
      select: {
        id: true,
        outfallName: true,
        authority: true,
        contact: true,
        contact_email: true,
        contact_name: true,
        indigenousNation: true,
        landCouncil: true,
        latitude: true,
        longitude: true,
        state: true,
        type: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Map the response to use 'name' instead of 'outfallName'
    const mappedOutfalls = outfalls.map(outfall => ({
      ...outfall,
      name: outfall.outfallName,
    }));

    return NextResponse.json({
      data: mappedOutfalls,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching outfalls:', error);
    return NextResponse.json(
      { error: 'Failed to fetch outfalls' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    // Map 'name' to 'outfallName' for database
    const { name, ...rest } = data;
    const outfall = await prisma.outfall.create({
      data: {
        outfallName: name,
        ...rest,
      },
    });

    // Map response back to use 'name'
    return NextResponse.json({
      ...outfall,
      name: outfall.outfallName,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating outfall:', error);
    return NextResponse.json(
      { error: 'Failed to create outfall' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { id, name, ...updateData } = data;

    const outfall = await prisma.outfall.update({
      where: { id },
      data: {
        outfallName: name,
        ...updateData,
      },
    });

    // Map response back to use 'name'
    return NextResponse.json({
      ...outfall,
      name: outfall.outfallName,
    });
  } catch (error) {
    console.error('Error updating outfall:', error);
    return NextResponse.json(
      { error: 'Failed to update outfall' },
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

    await prisma.outfall.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting outfall:', error);
    return NextResponse.json(
      { error: 'Failed to delete outfall' },
      { status: 500 }
    );
  }
}
