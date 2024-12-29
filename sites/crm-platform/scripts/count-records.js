import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const tables = [
    'Facility',
    'OutfallType',
    'Customer',
    'Outfall',
    'WaterAuthority',
    'IndigenousCommunity',
    'Politician',
    'SupportTicket',
    'OutfallObservation',
    'Person',
    'SavedView',
  ];

  for (const table of tables) {
    try {
      const count = await prisma[table].count();
      console.log(`${table}: ${count}`);
    } catch (error) {
      console.error(`Error counting records in ${table}:`, error);
    }
  }
  await prisma.$disconnect();
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
