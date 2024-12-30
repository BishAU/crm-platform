import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { withAuth, jsonResponse, errorResponse, ERROR_MESSAGES } from '../../../lib/api';

export async function GET(
  request: NextRequest,
  params: any
): Promise<NextResponse | Response> {
  return withAuth(request, async (req, session) => {
    const facility = await prisma.facility.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!facility) {
      return errorResponse(ERROR_MESSAGES.NOT_FOUND('Facility'), 404);
    }

    return jsonResponse(facility);
  });
}

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
): Promise<NextResponse | Response> {
  return withAuth(request, async (req, session) => {
    const body = await req.json();

    const updatedFacility = await prisma.facility.update({
      where: {
        id: context.params.id,
      },
      data: {
        ...body,
        creatorId: session.user.id,
      },
    });

    return jsonResponse(updatedFacility);
  });
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
): Promise<NextResponse | Response> {
  return withAuth(request, async (req, session) => {
    await prisma.facility.delete({
      where: {
        id: context.params.id,
      },
    });

    return new Response(null, { status: 204 });
  });
}