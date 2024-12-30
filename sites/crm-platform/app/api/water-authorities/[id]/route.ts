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

    const outfall = await prisma.outfall.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        authority: true,
        contact: true,
        contact_email: true,
        contact_name: true,
        state: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!outfall) {
      return errorResponse(ERROR_MESSAGES.NOT_FOUND('Water Authority'), 404);
    }

    return jsonResponse(outfall);
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

    const updatedOutfall = await prisma.outfall.update({
      where: {
        id,
      },
      data: {
        authority: body.authority,
        contact: body.contact,
        contact_email: body.contact_email,
        contact_name: body.contact_name,
        state: body.state
      },
      select: {
        id: true,
        authority: true,
        contact: true,
        contact_email: true,
        contact_name: true,
        state: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return jsonResponse(updatedOutfall);
  });
}
