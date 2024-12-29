import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'facilityName';
    const sortOrder = (searchParams.get('sortOrder') || 'asc') as 'asc' | 'desc';

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Build where clause for search
    const where = search
      ? {
          OR: [
            { facilityName: { contains: search, mode: 'insensitive' as const } },
            { type: { contains: search, mode: 'insensitive' as const } },
            { sector: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    // Get total count for pagination
    const total = await prisma.facility.count({ where });

    const facilities = await prisma.facility.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
      select: {
        id: true,
        facilityName: true,
        latitude: true,
        longitude: true,
        postcode: true,
        regionType: true,
        sector: true,
        suburb: true,
        type: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Map the response to use 'name' instead of 'facilityName'
    const mappedFacilities = facilities.map(facility => ({
      ...facility,
      name: facility.facilityName,
    }));

    return NextResponse.json({
      data: mappedFacilities,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching facilities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch facilities' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    // Map 'name' to 'facilityName' for database
    const { name, ...rest } = data;
    const facility = await prisma.facility.create({
      data: {
        facilityName: name,
        ...rest,
      },
    });

    // Map response back to use 'name'
    return NextResponse.json({
      ...facility,
      name: facility.facilityName,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating facility:', error);
    return NextResponse.json(
      { error: 'Failed to create facility' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { id, name, ...updateData } = data;

    const facility = await prisma.facility.update({
      where: { id },
      data: {
        facilityName: name,
        ...updateData,
      },
    });

    // Map response back to use 'name'
    return NextResponse.json({
      ...facility,
      name: facility.facilityName,
    });
  } catch (error) {
    console.error('Error updating facility:', error);
    return NextResponse.json(
      { error: 'Failed to update facility' },
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
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    await prisma.facility.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting facility:', error);
    return NextResponse.json(
      { error: 'Failed to delete facility' },
      { status: 500 }
    );
  }
}