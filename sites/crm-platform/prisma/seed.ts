import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

interface OutfallData {
  id: string;
  outfallName: string;
  latitude: string | null;
  longitude: string | null;
}

async function main() {
  const hashedPassword = bcrypt.hashSync('password', 10);

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: hashedPassword,
      isAdmin: true
    }
  });

  // Create regular user
  await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'Regular User',
      password: hashedPassword
    }
  });

  // Create Outfalls
  const outfalls: OutfallData[] = [
    {
      id: 'north-beach-outfall',
      outfallName: 'North Beach Outfall',
      latitude: '-31.8982',
      longitude: '115.7547'
    },
    {
      id: 'south-beach-outfall',
      outfallName: 'South Beach Outfall',
      latitude: '-32.0547',
      longitude: '115.7547'
    }
  ];

  for (const outfall of outfalls) {
    await prisma.outfall.upsert({
      where: { id: outfall.id },
      update: {},
      create: outfall
    });
  }

  // Create Politicians
  const politicians = [
    {
      id: 'john-smith',
      name: 'John Smith',
      email: 'john.smith@parliament.gov.au',
      party: 'Liberal',
      position: 'MP'
    },
    {
      id: 'jane-doe',
      name: 'Jane Doe',
      email: 'jane.doe@parliament.gov.au',
      party: 'Labor',
      position: 'Senator'
    }
  ];

  for (const politician of politicians) {
    await prisma.politician.upsert({
      where: { id: politician.id },
      update: {},
      create: politician
    });
  }

  // Create Marketing List
  await prisma.marketingList.upsert({
    where: { id: 'initial-marketing-list' },
    update: {},
    create: {
      id: 'initial-marketing-list',
      name: 'Initial Marketing List',
      creator: {
        connect: {
          id: adminUser.id
        }
      }
    }
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
