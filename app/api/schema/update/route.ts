import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { getServerSession } from 'next-auth';

export async function POST(req: Request) {
  try {
    // Check if user is authenticated and is admin
    const session = await getServerSession();
    const user = session?.user;
    
    if (!user?.email) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    // Fetch user from database to check admin status
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
      select: { isAdmin: true }
    });

    if (!dbUser?.isAdmin) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 403 });
    }

    const { tableName, newFields } = await req.json();

    if (!tableName || !newFields || !Array.isArray(newFields)) {
      return NextResponse.json({ message: 'Invalid request data' }, { status: 400 });
    }

    // Get current schema
    const currentSchema = await prisma.$queryRaw<{ column_name: string }[]>`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = ${tableName.toLowerCase()}
    `;

    const currentFields = currentSchema.map(col => col.column_name);

    // Filter out fields that already exist
    const fieldsToAdd = newFields.filter(field => !currentFields.includes(field.name));

    if (fieldsToAdd.length === 0) {
      return NextResponse.json({ message: 'No new fields to add' });
    }

    // Generate migration SQL
    const alterTableStatements = fieldsToAdd.map(field => {
      // Default to VARCHAR if type not specified
      const sqlType = field.type || 'VARCHAR(255)';
      return `ALTER TABLE "${tableName}" ADD COLUMN IF NOT EXISTS "${field.name}" ${sqlType};`;
    });

    // Execute the migration
    for (const sql of alterTableStatements) {
      await prisma.$executeRawUnsafe(sql);
    }

    return NextResponse.json({
      message: 'Schema updated successfully',
      addedFields: fieldsToAdd
    });
  } catch (error: any) {
    console.error('Error updating schema:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}