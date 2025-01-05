import { NextRequest } from 'next/server';
import { jsonResponse, errorResponse } from '../../../lib/api';
import * as db from '../../../lib/db';

export const dynamic = 'force-dynamic';

interface User {
  id: string;
  name?: string;
  email?: string;
  isAdmin: boolean;
  firstName?: string;
  lastName?: string;
  company?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function GET(request: NextRequest) {
    try {
      const searchParams = request.nextUrl.searchParams;
      const countOnly = searchParams.get('count') === 'true';

      if (countOnly) {
        const people = await db.findMany('user' as any, {
          where: {
            isAdmin: false // Only count non-admin users as "people"
          }
        }) as User[];
        return jsonResponse({ count: people.length });
      }

      const people = await db.findMany('user' as any, {
        where: {
          isAdmin: false,
          ...Object.fromEntries(
            Array.from(searchParams.entries())
              .filter(([key]) => !['page', 'limit', 'sortBy', 'sortOrder'].includes(key))
          )
        }
      });

      return jsonResponse({ data: people });
    } catch (error) {
      console.error('Error fetching people:', error);
      return errorResponse('Failed to fetch people', 500);
    }
}
