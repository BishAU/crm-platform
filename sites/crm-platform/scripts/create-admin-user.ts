const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

async function createAdminUser() {
  const hashedPassword1 = '$2a$10$YhYfQ5dt8K29a0YzLiMaWu7fXuHj1J7z56qT2/9Qmdfs7OnlEqBOC';
  const hashedPassword2 = await bcrypt.hash('b15h0p', 10);
  
  await prisma.user.update({
    where: { email: 'pksmith@cleanocean.org' },
    data: {
      password: hashedPassword1,
      active: true
    }
  });

  await prisma.user.update({
    where: { email: 'pbishop@cleanocean.org' },
    data: {
      password: hashedPassword2,
      active: true
    }
  });

  console.log('Admin users created successfully');
}

createAdminUser()
  .catch((e) => {
    console.error('Error creating admin user:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });