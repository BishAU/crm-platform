import { NextResponse } from 'next/server';

export const ERROR_MESSAGES = {
  NOT_FOUND: (resource: string) => `${resource} not found`,
  BAD_REQUEST: 'Bad request',
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
  INTERNAL_ERROR: 'Internal server error',
  EMAIL_IN_USE: 'Email already in use'
};

export const jsonResponse = (data: any, status = 200) => {
  return NextResponse.json(data, { status });
};

export const errorResponse = (message: string, status = 500) => {
  // For error responses, we want to return the message as plain text
  return new NextResponse(message, { 
    status,
    headers: {
      'content-type': 'text/plain',
    }
  });
};

// Mock withAuth to pass through the handler with a mock session
export const withAuth = async (req: Request, handler: (req: Request, session: any) => Promise<Response>) => {
  const session = {
    user: {
      id: 'test-user-id',
      email: 'test@example.com',
      name: 'Test User'
    }
  };
  
  try {
    const response = await handler(req, session);
    return response;
  } catch (error) {
    console.error('Error in withAuth:', error);
    return errorResponse(ERROR_MESSAGES.INTERNAL_ERROR, 500);
  }
};