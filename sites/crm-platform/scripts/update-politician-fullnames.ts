import { prisma } from '../app/lib/prisma';

async function main() {
  try {
    const politicians = await prisma.politician.findMany({
      select: {
        id: true,
        name: true
      }
    });

    for (const politician of politicians) {
      if (politician.name) {
        // Update the fullName to match the existing name
        await prisma.politician.update({
          where: { id: politician.id },
          data: { name: politician.name },
        });
        console.log(`Updated name for politician ${politician.id}: ${politician.name}`);
      } else {
        console.log(`Skipping politician ${politician.id} due to missing name`);
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
