import { NextResponse } from 'next/server';
import { prisma } from '@lib/prisma';

export async function GET() {
  try {
    const [open, inProgress, resolved] = await Promise.all([
      prisma.supportTicket.count({
        where: { status: 'OPEN' }
      }),
      prisma.supportTicket.count({
        where: { status: 'IN_PROGRESS' }
      }),
      prisma.supportTicket.count({
        where: { status: 'RESOLVED' }
      })
    ]);

    return NextResponse.json({
      open,
      inProgress,
      resolved
    });
  } catch (error) {
    console.error('Error fetching ticket stats:', error);
    return NextResponse.json({ message: 'Error fetching ticket stats' }, { status: 500 });
  }
}