import { NextRequest } from 'next/server';
import { withAuth, jsonResponse, errorResponse } from '../../../../lib/api';
import * as db from '../../../../lib/db';
import { Session } from 'next-auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  return withAuth(request, async (req: NextRequest, session: Session) => {
    try {
      const searchParams = req.nextUrl.searchParams;
      const latest = searchParams.get('latest') === 'true';
      
      let campaigns;
      if (latest) {
        // Get latest campaigns (ordered by creation date)
        campaigns = await db.findMany('campaign' as any, {
          where: {},
          orderBy: {
            createdAt: 'desc'
          },
          take: 5
        });
      } else {
        // Get all campaigns
        campaigns = await db.findMany('campaign' as any, {
          where: {
            // Add any filters from query params here
            ...Object.fromEntries(
              Array.from(searchParams.entries())
                .filter(([key]) => !['page', 'limit', 'sortBy', 'sortOrder'].includes(key))
            )
          }
        });
      }

      return jsonResponse({ data: campaigns });
    } catch (error) {
      console.error('Error fetching marketing campaigns:', error);
      return errorResponse('Failed to fetch marketing campaigns', 500);
    }
  });
}

export async function POST(request: NextRequest) {
  return withAuth(request, async (req: NextRequest, session: Session) => {
    try {
      const data = await req.json();
      const campaign = await db.create('campaign' as any, {
        data: {
          ...data,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
      return jsonResponse({ data: campaign });
    } catch (error) {
      console.error('Error creating marketing campaign:', error);
      return errorResponse('Failed to create marketing campaign', 500);
    }
  });
}