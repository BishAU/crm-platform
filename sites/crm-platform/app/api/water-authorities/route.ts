import { NextRequest } from 'next/server';
import { jsonResponse, errorResponse } from '../../../lib/api';
import * as db from '../../../lib/db';

export const dynamic = 'force-dynamic';

interface WaterAuthority {
  id: string;
  name: string;
  indigenousCommunities?: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function GET(request: NextRequest) {
    try {
      const searchParams = request.nextUrl.searchParams;
      const countOnly = searchParams.get('count') === 'true';

      if (countOnly) {
        const authorities = await db.findMany('waterAuthority' as any, {}) as WaterAuthority[];
        return jsonResponse({ count: authorities.length });
      }

      const authorities = await db.findMany('waterAuthority' as any, {
        where: {
          ...Object.fromEntries(
            Array.from(searchParams.entries())
              .filter(([key]) => !['page', 'limit', 'sortBy', 'sortOrder'].includes(key))
          )
        }
      });

      return jsonResponse({ data: authorities });
    } catch (error) {
      console.error('Error fetching water authorities:', error);
      return errorResponse('Failed to fetch water authorities', 500);
    }
}
