import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const outfalls = await prisma.outfall.findMany({
      include: {
        postcodes: true,
        observations: true
      }
    });
    return NextResponse.json(outfalls);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch outfalls' },
      { status: 500 }
    );
  }
}
