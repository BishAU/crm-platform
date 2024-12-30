import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../app/api/auth/[...nextauth]/config';
import { RouteSegment, IdParam } from '../app/types/route';

type HandlerFunction = (
  req: NextRequest,
  params: IdParam,
  session?: any
) => Promise<NextResponse>;

export function createHandler(handler: HandlerFunction, requireAuth = true) {
  return async function(
    req: NextRequest,
    context: IdParam | IdParam[] | undefined
  ): Promise<NextResponse> {
    try {
      if (!context) {
        return new NextResponse('Missing context', { status: 400 });
      }
      
      const params = Array.isArray(context) ? context[0] : context;
      if (!params) {
        return new NextResponse('Missing required parameters', { status: 400 });
      }
      
      if (requireAuth) {
        const session = await getServerSession(authOptions);
        if (!session) {
          return new NextResponse('Unauthorized', { status: 401 });
        }
        return await handler(req, params, session);
      }
      return await handler(req, params);
    } catch (error) {
      console.error('API Error:', error);
      return new NextResponse('Internal Server Error', { status: 500 });
    }
  };
}

export function createProtectedHandler(handler: HandlerFunction) {
  return createHandler(handler, true);
}

export function createPublicHandler(handler: HandlerFunction) {
  return createHandler(handler, false);
}

// Common response helpers
export const jsonResponse = (data: any, status = 200) => {
  return NextResponse.json(data, { status });
};

export const errorResponse = (message: string, status = 500) => {
  return new NextResponse(message, { status });
};

// Common error messages
export const ERROR_MESSAGES = {
  NOT_FOUND: (resource: string) => `${resource} not found`,
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
  BAD_REQUEST: 'Bad request',
  INTERNAL_ERROR: 'Internal server error',
  EMAIL_IN_USE: 'Email already in use',
  INVALID_CREDENTIALS: 'Invalid credentials',
} as const;
