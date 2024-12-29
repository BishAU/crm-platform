import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '../../../lib/prisma';
import type { RouteSegment } from '../../../types/next';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'fullName';
    const sortOrder = (searchParams.get('sortOrder') || 'asc') as 'asc' | 'desc';

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Build where clause for search
    const where = search
      ? {
          OR: [
            { fullName: { contains: search, mode: 'insensitive' as const } },
            { email: { contains: search, mode: 'insensitive' as const } },
            { organisation: { contains: search, mode: 'insensitive' as const } },
            { city: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    // Get total count for pagination
    const total = await prisma.person.count({ where });

    const customers = await prisma.person.findMany({
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
    });

    // Map the response to use 'name' instead of 'fullName'
    const mappedCustomers = customers.map(customer => ({
      ...customer,
      name: customer.fullName,
    }));

    return NextResponse.json({
      data: mappedCustomers,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch customers' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    // Map 'name' to 'fullName' for database
    const { name, ...rest } = data;
    const customer = await prisma.person.create({
      data: {
        fullName: name,
        ...rest,
      },
    });

    // Map response back to use 'name'
    return NextResponse.json({
      ...customer,
      name: customer.fullName,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating customer:', error);
    return NextResponse.json(
      { error: 'Failed to create customer' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { id, name, ...updateData } = data;

    const customer = await prisma.person.update({
      where: { id },
      data: {
        fullName: name,
        ...updateData,
      },
    });

    // Map response back to use 'name'
    return NextResponse.json({
      ...customer,
      name: customer.fullName,
    });
  } catch (error) {
    console.error('Error updating customer:', error);
    return NextResponse.json(
      { error: 'Failed to update customer' },
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

    await prisma.person.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting customer:', error);
    return NextResponse.json(
      { error: 'Failed to delete customer' },
      { status: 500 }
    );
  }
}
