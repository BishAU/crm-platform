import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Since there's no support ticket model yet, return an empty array
    return NextResponse.json([]);
  } catch (error) {
    console.error('Error fetching support tickets:', error);
    return NextResponse.json(
      { error: 'Error fetching support tickets' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
