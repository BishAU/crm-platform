import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('\nChecking database tables...\n');

    const outfalls = await prisma.outfall.count();
    console.log('Outfalls:', outfalls);

    const politicians = await prisma.politician.count();
    console.log('Politicians:', politicians);

    const users = await prisma.user.count();
    console.log('Users:', users);

    const facilities = await prisma.facility.count();
    console.log('Facilities:', facilities);

    const indigenousCommunities = await prisma.indigenousCommunity.count();
    console.log('Indigenous Communities:', indigenousCommunities);

    const observations = await prisma.outfallObservation.count();
    console.log('Outfall Observations:', observations);

    const marketingLists = await prisma.marketingList.count();
    console.log('Marketing Lists:', marketingLists);

    const supportTickets = await prisma.supportTicket.count();
    console.log('Support Tickets:', supportTickets);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
