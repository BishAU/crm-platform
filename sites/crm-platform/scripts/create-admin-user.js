import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdminUser() {
  const hashedPassword1 = await bcrypt.hash('FlindersRocks24!', 10);
  const hashedPassword2 = await bcrypt.hash('b15h0p', 10);
  
  await prisma.user.upsert({
    where: { email: 'pksmith@cleanocean.org' },
    update: {
      password: hashedPassword1,
      isAdmin: true,
      name: 'Peter Smith'
    },
    create: {
      email: 'pksmith@cleanocean.org',
      password: hashedPassword1,
      isAdmin: true,
      name: 'Peter Smith'
    }
  });

  await prisma.user.upsert({
    where: { email: 'pbishop@cleanocean.org' },
    update: {
      password: hashedPassword2,
      isAdmin: true,
      name: 'Paul Bishop'
    },
    create: {
      email: 'pbishop@cleanocean.org',
      password: hashedPassword2,
      isAdmin: true,
      name: 'Paul Bishop'
    }
  });

  console.log('Admin users created/updated successfully');
}

createAdminUser()
  .catch((e) => {
    console.error('Error creating admin user:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
