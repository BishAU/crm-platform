import { NextRequest } from 'next/server';
import { prisma } from '../../lib/prisma';
import { withAuth, jsonResponse, errorResponse, ERROR_MESSAGES } from '../../lib/api';

export async function GET(request: NextRequest) {
  return withAuth(request, async (req, session) => {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = (searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc';

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Build where clause for search
    const where = search
      ? {
          OR: [
            { type: { contains: search, mode: 'insensitive' as const } },
            { sector: { contains: search, mode: 'insensitive' as const } },
            { suburb: { contains: search, mode: 'insensitive' as const } },
            { postcode: { contains: search, mode: 'insensitive' as const } },
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
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return jsonResponse({
      data: facilities,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  });
}

export async function POST(request: NextRequest) {
  return withAuth(request, async (req, session) => {
    const body = await req.json();

    const facility = await prisma.facility.create({
      data: {
        ...body,
        creatorId: session.user.id,
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return jsonResponse(facility, 201);
  });
}