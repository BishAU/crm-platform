import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { withAuth, jsonResponse, errorResponse, ERROR_MESSAGES } from '../../../lib/api';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAuth(request, async (req, session) => {
    const outfall = await prisma.outfall.findUnique({
      where: {
        id: params.id,
      },
      include: {
        postcodes: true,
        observations: true,
      },
    });

    if (!outfall) {
      return errorResponse(ERROR_MESSAGES.NOT_FOUND('Outfall'), 404);
    }

    return jsonResponse(outfall);
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAuth(request, async (req, session) => {
    const body = await req.json();
    const { name, ...rest } = body;

    const outfall = await prisma.outfall.update({
      where: {
        id: params.id,
      },
      data: {
        outfallName: name,
        ...rest,
      },
      include: {
        postcodes: true,
        observations: true,
      },
    });

    return jsonResponse({
      ...outfall,
      name: outfall.outfallName,
    });
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAuth(request, async (req, session) => {
    await prisma.outfall.delete({
      where: {
        id: params.id,
      },
    });

    return new Response(null, { status: 204 });
  });
}
