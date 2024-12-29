import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Get first 5 outfalls
    const outfalls = await prisma.outfall.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    console.log('\nLatest 5 Outfalls:');
    console.log(JSON.stringify(outfalls, null, 2));

    // Get count by status
    const statusCounts = await prisma.outfall.groupBy({
      by: ['status'],
      _count: true
    });

    console.log('\nOutfalls by Status:');
    console.log(JSON.stringify(statusCounts, null, 2));

    // Get count by type
    const typeCounts = await prisma.outfall.groupBy({
      by: ['type'],
      _count: true
    });

    console.log('\nOutfalls by Type:');
    console.log(JSON.stringify(typeCounts, null, 2));

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
