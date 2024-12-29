import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const community = await prisma.indigenousCommunity.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!community) {
      return new NextResponse('Indigenous Community not found', { status: 404 });
    }

    return NextResponse.json(community);
  } catch (error) {
    console.error('Error fetching indigenous community:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const updatedCommunity = await prisma.indigenousCommunity.update({
      where: {
        id: params.id,
      },
      data: body,
    });

    return NextResponse.json(updatedCommunity);
  } catch (error) {
    console.error('Error updating indigenous community:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
