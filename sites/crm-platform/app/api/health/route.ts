import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import type { RouteSegment } from '../../../types/next';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
      auth: {
        nextAuthUrl: `http://localhost:${process.env.PORT || 3100}`,
        configured: !!process.env.NEXTAUTH_SECRET,
        port: process.env.PORT || 3100
      },
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
