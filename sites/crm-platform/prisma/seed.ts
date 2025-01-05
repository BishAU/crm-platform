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
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create admin user with hashed password
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {
      password: hashedPassword
    },
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
    update: {
      password: hashedPassword
    },
    create: {
      email: 'user@example.com',
      name: 'Regular User',
      password: hashedPassword
    }
  });

  // Create test user for development
  await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {
      password: hashedPassword
    },
    create: {
      email: 'test@example.com',
      name: 'Test User',
      password: hashedPassword
    }
  });

  // Create the pbishop user
  const pbishopHashedPassword = await bcrypt.hash('b15h0p', 10);
  await prisma.user.upsert({
    where: { email: 'pbishop@cleanocean.org' },
    update: {
      password: pbishopHashedPassword
    },
    create: {
      email: 'pbishop@cleanocean.org',
      name: 'Peter Bishop',
      password: pbishopHashedPassword
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
      creatorId: adminUser.id
    }
  });

  console.log('Database seeded successfully!');
  console.log('Test credentials:');
  console.log('Email: test@example.com');
  console.log('Password: password123');

  // Create the pbishop admin user
  const pbishopAdminHashedPassword = await bcrypt.hash('PAraglidingTimbis24!', 10);
  await prisma.user.upsert({
    where: { email: 'pbishop@cleanocean.org' },
    update: {
      password: pbishopAdminHashedPassword,
      isAdmin: true
    },
    create: {
      email: 'pbishop@cleanocean.org',
      name: 'Peter Bishop',
      password: pbishopAdminHashedPassword,
      isAdmin: true
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
