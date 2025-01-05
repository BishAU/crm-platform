const { PrismaClient } = require('@prisma/client');

async function main() {
  const prisma = new PrismaClient();
  const password = 'b15h0p';

  try {
    const updatedUser = await prisma.user.update({
      where: { email: 'pbishop@cleanocean.org' },
      data: { password },
    });
    console.log('Password updated successfully for user:', updatedUser.email);
  } catch (error) {
    console.error('Error updating password:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();