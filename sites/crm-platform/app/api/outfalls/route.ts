import { NextRequest } from 'next/server';
import { jsonResponse, errorResponse } from '../../../lib/api';
import * as db from '../../../lib/db';

export const dynamic = 'force-dynamic';

interface Outfall {
  id: string;
  authority?: string;
  contact?: string;
  contact_email?: string;
  contact_name?: string;
  indigenousNation?: string;
  landCouncil?: string;
  latitude?: string;
  longitude?: string;
  state?: string;
  type?: string;
  outfallName?: string;
  outfall?: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function GET(request: NextRequest) {
    try {
      const searchParams = request.nextUrl.searchParams;
      const countOnly = searchParams.get('count') === 'true';

      if (countOnly) {
        const outfalls = await db.findMany('outfall' as any, {}) as Outfall[];
        return jsonResponse({ count: outfalls.length });
      }

      const outfalls = await db.findMany('outfall' as any, {
        where: {
          ...Object.fromEntries(
            Array.from(searchParams.entries())
              .filter(([key]) => !['page', 'limit', 'sortBy', 'sortOrder'].includes(key))
          )
        }
      });

      return jsonResponse({ data: outfalls });
    } catch (error) {
      console.error('Error fetching outfalls:', error);
      return errorResponse('Failed to fetch outfalls', 500);
    }
}
