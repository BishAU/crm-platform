import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const token = request.headers.get('authorization')?.split(' ')[1];

  if (token) {
    return NextResponse.json({ message: 'Authorized', token });
  } else {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}
