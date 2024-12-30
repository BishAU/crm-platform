import { NextRequest } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { withAuth, jsonResponse, errorResponse, ERROR_MESSAGES } from '../../../lib/api';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAuth(request, async (req, session) => {
    const user = await prisma.user.findUnique({
      where: {
        id: params.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return errorResponse(ERROR_MESSAGES.NOT_FOUND('User'), 404);
    }

    return jsonResponse(user);
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAuth(request, async (req, session) => {
    const body = await req.json();

    const updatedUser = await prisma.user.update({
      where: {
        id: params.id,
      },
      data: body,
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return jsonResponse(updatedUser);
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAuth(request, async (req, session) => {
    await prisma.user.delete({
      where: {
        id: params.id,
      },
    });

    return new Response(null, { status: 204 });
  });
}