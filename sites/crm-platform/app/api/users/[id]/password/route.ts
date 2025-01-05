import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({ message: `Update password for user ${params.id}` });
}
