import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const waterAuthority = await prisma.waterAuthority.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!waterAuthority) {
      return new NextResponse('Water Authority not found', { status: 404 });
    }

    return NextResponse.json(waterAuthority);
  } catch (error) {
    console.error('Error fetching water authority:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const updatedWaterAuthority = await prisma.waterAuthority.update({
      where: {
        id: params.id,
      },
      data: body,
    });

    return NextResponse.json(updatedWaterAuthority);
  } catch (error) {
    console.error('Error updating water authority:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
