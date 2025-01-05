import { NextRequest, NextResponse } from 'next/server';

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
