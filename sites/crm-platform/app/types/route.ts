import { NextRequest } from 'next/server';

export type DynamicParams = { id: string };

export type DynamicContext = {
  params: DynamicParams;
};

export type RouteHandler = (
  request: NextRequest,
  context: DynamicContext
) => Promise<Response>;