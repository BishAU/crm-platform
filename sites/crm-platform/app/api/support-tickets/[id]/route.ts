import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const ticket = await prisma.supportTicket.findUnique({
      where: {
        id: params.id,
      },
      include: {
        assignedTo: true,
      },
    });

    if (!ticket) {
      return new NextResponse('Support Ticket not found', { status: 404 });
    }

    return NextResponse.json(ticket);
  } catch (error) {
    console.error('Error fetching support ticket:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const updatedTicket = await prisma.supportTicket.update({
      where: {
        id: params.id,
      },
      data: body,
      include: {
        assignedTo: true,
      },
    });

    return NextResponse.json(updatedTicket);
  } catch (error) {
    console.error('Error updating support ticket:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
