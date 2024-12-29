import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const outfallType = await prisma.outfallType.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!outfallType) {
      return new NextResponse('Outfall Type not found', { status: 404 });
    }

    return NextResponse.json(outfallType);
  } catch (error) {
    console.error('Error fetching outfall type:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // Ensure name is unique if provided
    if (body.name) {
      const existingType = await prisma.outfallType.findUnique({
        where: {
          name: body.name,
        },
      });

      if (existingType && existingType.id !== params.id) {
        return new NextResponse('Outfall Type name already in use', { status: 400 });
      }
    }

    const updatedOutfallType = await prisma.outfallType.update({
      where: {
        id: params.id,
      },
      data: body,
    });

    return NextResponse.json(updatedOutfallType);
  } catch (error) {
    console.error('Error updating outfall type:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
