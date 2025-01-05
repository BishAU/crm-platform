import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    const email = process.argv[2];
    const password = process.argv[3];

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

    if (email && password) {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
            select: {
                id: true,
                email: true,
                name: true,
                password: true,
            },
        });

        if (user) {
            const isValidPassword = user.password
                ? await bcrypt.compare(password, user.password)
                : password === user.password;

            const hashedPasswordFromDB = user.password;
            const hashedPasswordFromInput = await bcrypt.hash(password, 10);

            console.log('\nHashed password from DB:', hashedPasswordFromDB);
            console.log('Hashed password from input:', hashedPasswordFromInput);
            console.log('User object from DB:', user);

            if (isValidPassword) {
                console.log('\nUser found and password matches!');
            } else {
                console.log('\nUser found, but password does not match.');
            }
        } else {
            console.log('\nUser not found.');
        }
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
