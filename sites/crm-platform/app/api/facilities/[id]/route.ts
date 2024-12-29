import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const facility = await prisma.facility.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!facility) {
      return new NextResponse('Facility not found', { status: 404 });
    }

    return NextResponse.json(facility);
  } catch (error) {
    console.error('Error fetching facility:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // Ensure facility name is unique if provided
    if (body.facilityName) {
      const existingFacility = await prisma.facility.findUnique({
        where: {
          facilityName: body.facilityName,
        },
      });

      if (existingFacility && existingFacility.id !== params.id) {
        return new NextResponse('Facility name already in use', { status: 400 });
      }
    }

    const updatedFacility = await prisma.facility.update({
      where: {
        id: params.id,
      },
      data: body,
    });

    return NextResponse.json(updatedFacility);
  } catch (error) {
    console.error('Error updating facility:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
