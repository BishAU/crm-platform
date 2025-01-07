import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@lib/prisma';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    const data = await req.json();

    const landCouncil = await prisma.landCouncil.update({
      where: { id },
      data
    });

    return NextResponse.json(landCouncil);
  } catch (error) {
    console.error('Error updating land council:', error);
    return NextResponse.json(
      { error: 'Failed to update land council' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;

    const landCouncil = await prisma.landCouncil.findUnique({
      where: { id }
    });

    if (!landCouncil) {
      return NextResponse.json(
        { error: 'Land council not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(landCouncil);
  } catch (error) {
    console.error('Error fetching land council:', error);
    return NextResponse.json(
      { error: 'Failed to fetch land council' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;

    await prisma.landCouncil.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Land council deleted successfully' });
  } catch (error) {
    console.error('Error deleting land council:', error);
    return NextResponse.json(
      { error: 'Failed to delete land council' },
      { status: 500 }
    );
  }
}