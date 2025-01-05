import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const campaigns = await prisma.campaign.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 5,
      select: {
        name: true,
        status: true,
        startDate: true,
        endDate: true,
        targetAudience: true
      }
    });

    return NextResponse.json({
      campaigns: campaigns.map(campaign => ({
        name: campaign.name,
        status: campaign.status,
        progress: campaign.endDate 
          ? Math.min(100, Math.round(((new Date().getTime() - new Date(campaign.startDate || '').getTime()) / 
            (new Date(campaign.endDate).getTime() - new Date(campaign.startDate || '').getTime())) * 100))
          : 0,
        targetAudience: campaign.targetAudience
      }))
    });
  } catch (error) {
    console.error('Error fetching latest campaigns:', error);
    return NextResponse.json({ message: 'Error fetching latest campaigns' }, { status: 500 });
  }
}