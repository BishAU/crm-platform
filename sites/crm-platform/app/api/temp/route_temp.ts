import { NextRequest } from 'next/server';
import { withAuth, jsonResponse } from '../../../lib/api';
import { Session } from 'next-auth';

export async function GET(request: NextRequest) {
  return withAuth(request, async (req: NextRequest, session: Session) => {
    return jsonResponse({ message: 'Test route' });
  });
}
