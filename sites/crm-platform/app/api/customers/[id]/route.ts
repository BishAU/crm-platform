import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/config';

// Helper function to verify session
async function verifySession() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Verify auth
  const authError = await verifySession();
  if (authError) return authError;

  try {
    const customer = await prisma.customer.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(customer);
  } catch (error) {
    console.error('Error fetching customer:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Verify auth
  const authError = await verifySession();
  if (authError) return authError;

  try {
    const body = await request.json();

    // Ensure email is unique if provided
    if (body.email) {
      const existingCustomer = await prisma.customer.findUnique({
        where: {
          email: body.email,
        },
      });

      if (existingCustomer && existingCustomer.id !== params.id) {
        return NextResponse.json(
          { error: 'Email already in use' },
          { status: 400 }
        );
      }
    }

    const updatedCustomer = await prisma.customer.update({
      where: {
        id: params.id,
      },
      data: body,
    });

    return NextResponse.json(updatedCustomer);
  } catch (error) {
    console.error('Error updating customer:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
