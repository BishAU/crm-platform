import { NextRequest } from 'next/server';
import { jsonResponse, errorResponse } from '../../../lib/api';
import * as db from '../../../lib/db';

export const dynamic = 'force-dynamic';

interface OutfallObservation {
  id: string;
  outfallId: string;
  date: Date;
  flow?: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function GET(request: NextRequest) {
    try {
      const searchParams = request.nextUrl.searchParams;
      const countOnly = searchParams.get('count') === 'true';

      if (countOnly) {
        const observations = await db.findMany('outfallObservation' as any, {}) as OutfallObservation[];
        return jsonResponse({ count: observations.length });
      }

      const observations = await db.findMany('outfallObservation' as any, {
        where: {
          ...Object.fromEntries(
            Array.from(searchParams.entries())
              .filter(([key]) => !['page', 'limit', 'sortBy', 'sortOrder'].includes(key))
          )
        }
      });

      return jsonResponse({ data: observations });
    } catch (error) {
      console.error('Error fetching observations:', error);
      return errorResponse('Failed to fetch observations', 500);
    }
}
