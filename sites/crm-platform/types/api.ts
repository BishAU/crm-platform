import { NextRequest } from 'next/server';

export type IdRouteParams = {
  id: string;
};

// Next.js 15 route handler type pattern
export type RouteContext<T> = {
  params: T;
};

export type RouteHandler<T> = (
  request: NextRequest,
  context: RouteContext<T>
) => Promise<Response>;