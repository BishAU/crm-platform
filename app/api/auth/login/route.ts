import { auth, signIn } from '@lib/auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const session = await auth();
    if (session) {
      return NextResponse.json({ session });
    } else {
      return NextResponse.json({ message: 'Authentication failed' }, { status: 401 });
    }
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ message: error.message || 'An error occurred during login' }, { status: 500 });
  }
}