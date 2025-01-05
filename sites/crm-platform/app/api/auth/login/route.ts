import { authorize } from 'lib/auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const user = await authorize({ email, password });

    if (user?.accessToken) {
      return NextResponse.json({ accessToken: user.accessToken });
    } else {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ message: error.message || 'An error occurred during login' }, { status: 500 });
  }
}