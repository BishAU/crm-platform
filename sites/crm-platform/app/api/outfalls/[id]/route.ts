import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const outfall = await prisma.outfall.findUnique({
      where: {
        id: params.id,
      },
      include: {
        postcodes: true,
      },
    });

    if (!outfall) {
      return new NextResponse('Outfall not found', { status: 404 });
    }

    // Map outfallName to name in response
    return NextResponse.json({
      ...outfall,
      name: outfall.outfallName,
    });
  } catch (error) {
    console.error('Error fetching outfall:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, ...updateData } = body;

    const updatedOutfall = await prisma.outfall.update({
      where: {
        id: params.id,
      },
      data: {
        outfallName: name,
        ...updateData,
      },
      include: {
        postcodes: true,
      },
    });

    // Map outfallName to name in response
    return NextResponse.json({
      ...updatedOutfall,
      name: updatedOutfall.outfallName,
    });
  } catch (error) {
    console.error('Error updating outfall:', error);
    return NextResponse.json(
      { error: 'Failed to update outfall' },
      { status: 500 }
    );
  }
}
