import { NextRequest } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { withAuth, jsonResponse, errorResponse, ERROR_MESSAGES } from '../../../lib/api';

function getSingleId(id: string | string[] | undefined): string | undefined {
  if (!id) return undefined;
  return Array.isArray(id) ? id[0] : id;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAuth(request, async (req, session) => {
    const id = getSingleId(params.id);
    if (!id) {
      return errorResponse('Bad Request', 400);
    }

    const politician = await prisma.politician.findUnique({
      where: {
        id,
      },
    });

    if (!politician) {
      return errorResponse(ERROR_MESSAGES.NOT_FOUND('Politician'), 404);
    }

    return jsonResponse(politician);
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAuth(request, async (req, session) => {
    const id = getSingleId(params.id);
    if (!id) {
      return errorResponse('Bad Request', 400);
    }

    const body = await req.json();

    const updatedPolitician = await prisma.politician.update({
      where: {
        id,
      },
      data: body,
    });

    return jsonResponse(updatedPolitician);
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAuth(request, async (req, session) => {
    const id = getSingleId(params.id);
    if (!id) {
      return errorResponse('Bad Request', 400);
    }

    await prisma.politician.delete({
      where: {
        id,
      },
    });

    return new Response(null, { status: 204 });
  });
}
