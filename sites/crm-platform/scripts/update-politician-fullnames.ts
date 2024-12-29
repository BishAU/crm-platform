import { prisma } from '../lib/prisma';

async function main() {
  try {
    const politicians = await prisma.politician.findMany();

    for (const politician of politicians) {
      if (politician.firstName && politician.surname) {
        const fullName = `${politician.firstName} ${politician.surname}`;
        await prisma.politician.update({
          where: { id: politician.id },
          data: { fullName },
        });
        console.log(`Updated fullName for politician ${politician.id}: ${fullName}`);
      } else {
        console.log(`Skipping politician ${politician.id} due to missing firstName or surname`);
      }
    }

    console.log('Successfully updated all politician full names.');
  } catch (error) {
    console.error('Error updating politician full names:', error);
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });