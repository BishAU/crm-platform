import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function withAuth(req: NextRequest, next: any) {
  return next();
}
