import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const observation = await prisma.outfallObservation.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!observation) {
      return new NextResponse('Observation not found', { status: 404 });
    }

    return NextResponse.json(observation);
  } catch (error) {
    console.error('Error fetching observation:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const updatedObservation = await prisma.outfallObservation.update({
      where: {
        id: params.id,
      },
      data: body,
    });

    return NextResponse.json(updatedObservation);
  } catch (error) {
    console.error('Error updating observation:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
