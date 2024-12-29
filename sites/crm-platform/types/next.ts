import type { NextRequest } from 'next/server';

// Based on Next.js 15's internal types
export type NextRequestWithParams<T = unknown> = NextRequest & {
  params: T;
};

export type DynamicRouteHandler<T = unknown> = (
  req: NextRequest,
  ctx: { params: T }
) => Promise<Response>;

export interface RouteHandlerContext<T = unknown> {
  params: T;
}

export type RouteSegment<T = unknown> = (
  request: NextRequest,
  context: RouteHandlerContext<T>
) => Promise<Response>;