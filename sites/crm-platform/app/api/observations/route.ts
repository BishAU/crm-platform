import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '../../lib/prisma';
import type { RouteSegment } from '../../../types/next';

export async function GET(request: NextRequest) {
  try {
    const observations = await prisma.outfallObservation.findMany({
      orderBy: {
        date: 'desc',
      },
    });

    return NextResponse.json(observations);
  } catch (error) {
    console.error('Error fetching outfall observations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch outfall observations' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const observation = await prisma.outfallObservation.create({
      data,
    });

    return NextResponse.json(observation, { status: 201 });
  } catch (error) {
    console.error('Error creating outfall observation:', error);
    return NextResponse.json(
      { error: 'Failed to create outfall observation' },
      { status: 500 }
    );
  }
}
