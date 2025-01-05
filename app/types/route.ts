import { NextRequest } from 'next/server';

export type RouteSegment<T = unknown> = T | T[] | undefined;
export type IdParam = { id: string };

export type DynamicParams = { id: string };

export type DynamicContext = {
  params: DynamicParams;
};

export type RouteHandler = (
  request: NextRequest,
  context: DynamicContext
) => Promise<Response>;