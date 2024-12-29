import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const person = await prisma.person.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!person) {
      return new NextResponse('Person not found', { status: 404 });
    }

    return NextResponse.json(person);
  } catch (error) {
    console.error('Error fetching person:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const updatedPerson = await prisma.person.update({
      where: {
        id: params.id,
      },
      data: body,
    });

    return NextResponse.json(updatedPerson);
  } catch (error) {
    console.error('Error updating person:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
