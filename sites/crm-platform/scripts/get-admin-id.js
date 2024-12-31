import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getAdminId() {
  const admin = await prisma.user.findFirst({
    where: { 
      email: 'pksmith@cleanocean.org',
      isAdmin: true 
    }
  });
  
  if (!admin) {
    console.error('Admin user not found');
    process.exit(1);
  }
  
  console.log(admin.id);
}

getAdminId()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
