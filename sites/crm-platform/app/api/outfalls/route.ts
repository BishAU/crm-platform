import { NextRequest } from 'next/server';
import { withAuth, jsonResponse, errorResponse } from '../../../lib/api';
import * as db from '../../../lib/db';
import { Session } from 'next-auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  return withAuth(request, async (req: NextRequest, session: Session) => {
    try {
      const outfalls = await db.findMany('outfall', {
        include: ['postcodes', 'observations'],
        where: {
          // Add any filters from query params here
          ...Object.fromEntries(
            Array.from(req.nextUrl.searchParams.entries())
              .filter(([key]) => !['page', 'limit', 'sortBy', 'sortOrder'].includes(key))
          )
        }
      });
      return jsonResponse({ data: outfalls });
    } catch (error) {
      console.error('Error fetching outfalls:', error);
      return errorResponse('Failed to fetch outfalls', 500);
    }
  });
}
