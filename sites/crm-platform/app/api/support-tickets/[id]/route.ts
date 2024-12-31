import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { withAuth, jsonResponse, errorResponse, ERROR_MESSAGES } from '../../../lib/api';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse | Response> {
  return withAuth(request, async (req, session) => {
    const ticket = await prisma.supportTicket.findUnique({
      where: {
        id: params.id,
      },
      include: {
        assignedTo: true,
      },
    });

    if (!ticket) {
      return errorResponse(ERROR_MESSAGES.NOT_FOUND('Support Ticket'), 404);
    }

    return jsonResponse(ticket);
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse | Response> {
  return withAuth(request, async (req, session) => {
    const body = await req.json();

    const updatedTicket = await prisma.supportTicket.update({
      where: {
        id: params.id,
      },
      data: body,
      include: {
        assignedTo: true,
      },
    });

    return jsonResponse(updatedTicket);
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse | Response> {
  return withAuth(request, async (req, session) => {
    await prisma.supportTicket.delete({
      where: {
        id: params.id,
      },
    });

    return new Response(null, { status: 204 });
  });
}