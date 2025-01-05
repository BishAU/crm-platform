import { NextResponse } from 'next/server';

export const ERROR_MESSAGES = {
  NOT_FOUND: (resource: string) => `${resource} not found`,
  UNAUTHORIZED: 'Unauthorized',
  INTERNAL_ERROR: 'Internal server error',
  INVALID_REQUEST: 'Invalid request'
};

/**
 * Common response helpers
 */
export const jsonResponse = (data: any, status = 200) => {
  return NextResponse.json(data, { status });
};

export const errorResponse = (message: string, status = 500) => {
  return new NextResponse(message, { status });
};
