import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const sortBy = searchParams.get('sortBy') || 'fullName';
    const sortOrder = (searchParams.get('sortOrder') || 'asc') as 'asc' | 'desc';
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            {
              fullName: {
                contains: search,
                mode: 'insensitive' as Prisma.QueryMode,
              },
            },
            {
              email: {
                contains: search,
                mode: 'insensitive' as Prisma.QueryMode,
              },
            },
            {
              organisation: {
                contains: search,
                mode: 'insensitive' as Prisma.QueryMode,
              },
            },
          ],
        }
      : {};

    const [total, people] = await Promise.all([
      prisma.person.count({ where }),
      prisma.person.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
        select: {
          id: true,
          fullName: true,
          email: true,
          phoneNumber: true,
          organisation: true,
          address1: true,
          city: true,
          state: true,
          postcode: true,
          country: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    // Map the response to use 'name' instead of 'fullName'
    const mappedPeople = people.map(person => ({
      ...person,
      name: person.fullName,
    }));

    return NextResponse.json({
      data: mappedPeople,
      pagination: {
        total,
        totalPages,
        page,
        limit,
      },
    });
  } catch (error) {
    console.error('Error fetching people:', error);
    return NextResponse.json(
      { error: 'Failed to fetch people' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    // Map 'name' to 'fullName' for database
    const { name, ...rest } = data;
    const person = await prisma.person.create({
      data: {
        fullName: name,
        ...rest,
      },
    });

    // Map response back to use 'name'
    return NextResponse.json({
      data: {
        ...person,
        name: person.fullName,
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating person:', error);
    return NextResponse.json(
      { error: 'Failed to create person' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { id, name, ...updateData } = data;

    const person = await prisma.person.update({
      where: { id },
      data: {
        fullName: name,
        ...updateData,
      },
    });

    // Map response back to use 'name'
    return NextResponse.json({
      data: {
        ...person,
        name: person.fullName,
      },
    });
  } catch (error) {
    console.error('Error updating person:', error);
    return NextResponse.json(
      { error: 'Failed to update person' },
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

    await prisma.person.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting person:', error);
    return NextResponse.json(
      { error: 'Failed to delete person' },
      { status: 500 }
    );
  }
}
