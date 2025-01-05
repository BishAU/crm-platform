import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const users = await prisma.user.findMany();

    if (users.length === 0) {
      console.log('No users found in the database.');
      return;
    }

    console.log('Users in the database:');
    users.forEach(user => {
      console.log(`- ID: ${user.id}, Email: ${user.email}, Name: ${user.name}`);
    });

    // You can add logic here to check for admin privileges if needed
    // For example, if you have a role field in the user model
    // users.forEach(user => {
    //   if (user.role === 'admin') {
    //     console.log(`- Admin user: ID: ${user.id}, Email: ${user.email}, Name: ${user.name}`);
    //   }
    // });

  } catch (error) {
    console.error('Error checking admin users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();