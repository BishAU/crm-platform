import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'politicianName';
    const sortOrder = (searchParams.get('sortOrder') || 'asc') as 'asc' | 'desc';

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Build where clause for search
    const where = search
      ? {
          OR: [
            { politicianName: { contains: search, mode: 'insensitive' as const } },
            { party: { contains: search, mode: 'insensitive' as const } },
            { position: { contains: search, mode: 'insensitive' as const } },
            { state: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    // Get total count for pagination
    const total = await prisma.politician.count({ where });

    const politicians = await prisma.politician.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
      select: {
        id: true,
        politicianName: true,
        party: true,
        position: true,
        state: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Map the response to use 'name' instead of 'politicianName'
    const mappedPoliticians = politicians.map(politician => ({
      ...politician,
      name: politician.politicianName,
    }));

    return NextResponse.json({
      data: mappedPoliticians,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching politicians:', error);
    return NextResponse.json(
      { error: 'Failed to fetch politicians' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    // Map 'name' to 'politicianName' for database
    const { name, ...rest } = data;
    const politician = await prisma.politician.create({
      data: {
        politicianName: name,
        ...rest,
      },
    });

    // Map response back to use 'name'
    return NextResponse.json({
      ...politician,
      name: politician.politicianName,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating politician:', error);
    return NextResponse.json(
      { error: 'Failed to create politician' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { id, firstName, surname, ...updateData } = data;
    const fullName = `${firstName} ${surname}`;

    const politician = await prisma.politician.update({
      where: { id },
      data: {
        fullName,
        ...updateData,
      },
    });

    // Map response back to use 'name'
    return NextResponse.json({
      ...politician,
      name: politician.politicianName,
    });
  } catch (error) {
    console.error('Error updating politician:', error);
    return NextResponse.json(
      { error: 'Failed to update politician' },
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

    await prisma.politician.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting politician:', error);
    return NextResponse.json(
      { error: 'Failed to delete politician' },
      { status: 500 }
    );
  }
}
