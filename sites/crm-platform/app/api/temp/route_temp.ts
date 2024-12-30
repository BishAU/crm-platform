import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/config';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'Test route' });
}