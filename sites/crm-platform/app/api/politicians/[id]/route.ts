import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const politician = await prisma.politician.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!politician) {
      return new NextResponse('Politician not found', { status: 404 });
    }

    return NextResponse.json(politician);
  } catch (error) {
    console.error('Error fetching politician:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // Ensure email is unique if provided
    if (body.email) {
      const existingPolitician = await prisma.politician.findUnique({
        where: {
          email: body.email,
        },
      });

      if (existingPolitician && existingPolitician.id !== params.id) {
        return new NextResponse('Email already in use', { status: 400 });
      }
    }

    const updatedPolitician = await prisma.politician.update({
      where: {
        id: params.id,
      },
      data: body,
    });

    return NextResponse.json(updatedPolitician);
  } catch (error) {
    console.error('Error updating politician:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
