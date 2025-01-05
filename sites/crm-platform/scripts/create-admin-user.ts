import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdminUser() {
  const saltRounds = 10;
  const password = await bcrypt.hash('b15h0p', saltRounds);
  const password1 = await bcrypt.hash('FlindersRocks24!', saltRounds);
  
  await prisma.user.upsert({
    where: { email: 'pksmith@cleanocean.org' },
    update: {
      password: password1,
      isAdmin: true
    },
    create: {
      email: 'pksmith@cleanocean.org',
      password: password1,
      isAdmin: true
    }
  });

  await prisma.user.create({
      data: {
        email: 'pbishop@cleanocean.org',
        password: password,
        isAdmin: true
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
