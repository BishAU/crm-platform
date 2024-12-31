import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../app/api/auth/[...nextauth]/config';
import { Session } from 'next-auth';

/**
 * Helper function to handle authentication for route handlers
 */
export async function withAuth(
  request: NextRequest,
  handler: (request: NextRequest, session: Session) => Promise<Response>
): Promise<Response> {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    return handler(request, session);
  } catch (error) {
    console.error('API Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

/**
 * Common response helpers
 */
export const jsonResponse = (data: any, status = 200) => {
  return NextResponse.json(data, { status });
};

export const errorResponse = (message: string, status = 500) => {
  return new NextResponse(message, { status });
};
