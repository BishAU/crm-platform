import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  try {
    const user = await prisma.user.upsert({
      where: {
        email: 'test@example.com',
      },
      update: {
        password: hashedPassword,
      },
      create: {
        email: 'test@example.com',
        name: 'Test User',
        password: hashedPassword,
      },
    });
    
    console.log('Test user created/updated:', user);
  } catch (error) {
    console.error('Error creating test user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();