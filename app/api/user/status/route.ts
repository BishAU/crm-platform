import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { getServerSession } from 'next-auth';

export async function GET() {
  try {
    const session = await getServerSession();
    const user = session?.user;

    if (!user?.email) {
      return NextResponse.json({ isAdmin: false });
    }

    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
      select: { isAdmin: true }
    });

    return NextResponse.json({ isAdmin: dbUser?.isAdmin || false });
  } catch (error) {
    console.error('Error fetching user status:', error);
    return NextResponse.json({ isAdmin: false });
  }
}