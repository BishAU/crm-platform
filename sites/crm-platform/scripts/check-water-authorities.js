import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const waterAuthorities = await prisma.waterAuthority.findMany();
  console.log('Water Authorities:', waterAuthorities);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
