import { NextResponse, NextRequest } from 'next/server';
import { prisma } from 'lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/config';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { name, description } = await request.json();

    const newList = await prisma.marketingList.create({
      data: {
        name,
        description,
        creator: session.user.id,
      },
    });

    return NextResponse.json(newList);
  } catch (error) {
    console.error('Error creating marketing list:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const lists = await prisma.marketingList.findMany();
    return NextResponse.json(lists);
  } catch (error) {
    console.error('Error fetching marketing lists:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}