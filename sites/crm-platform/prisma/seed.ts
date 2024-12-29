import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create outfalls
  console.log('Creating outfalls...');
  const outfalls = await Promise.all([
    prisma.outfall.upsert({
      where: { outfallName: 'North Beach Outfall' },
      update: {},
      create: {
        outfallName: 'North Beach Outfall',
        authority: 'Water Corp',
        contact: 'John Smith',
        contact_email: 'john.smith@watercorp.com.au',
        contact_name: 'John Smith',
        indigenousNation: 'Noongar',
        landCouncil: 'South West Aboriginal Land and Sea Council',
        latitude: -31.8982,
        longitude: 115.7547,
        state: 'WA',
        type: 'Ocean',
      },
    }),
    prisma.outfall.upsert({
      where: { outfallName: 'South Beach Outfall' },
      update: {},
      create: {
        outfallName: 'South Beach Outfall',
        authority: 'Water Corp',
        contact: 'Jane Doe',
        contact_email: 'jane.doe@watercorp.com.au',
        contact_name: 'Jane Doe',
        indigenousNation: 'Noongar',
        landCouncil: 'South West Aboriginal Land and Sea Council',
        latitude: -32.0547,
        longitude: 115.7547,
        state: 'WA',
        type: 'Ocean',
      },
    }),
  ]);

  // Create water authorities
  console.log('Creating water authorities...');
  const waterAuthorities = await Promise.all([
    prisma.waterAuthority.upsert({
      where: { authorityName: 'Water Corp' },
      update: {},
      create: {
        authorityName: 'Water Corp',
        associatedIndigenousCommunities: 'Noongar',
      },
    }),
    prisma.waterAuthority.upsert({
      where: { authorityName: 'Sydney Water' },
      update: {},
      create: {
        authorityName: 'Sydney Water',
        associatedIndigenousCommunities: 'Gadigal',
      },
    }),
  ]);

  // Create indigenous communities
  console.log('Creating indigenous communities...');
  const indigenousCommunities = await Promise.all([
    prisma.indigenousCommunity.upsert({
      where: { authorityName: 'Noongar' },
      update: {},
      create: {
        authorityName: 'Noongar',
        associatedIndigenousCommunities: 'South West Aboriginal Land and Sea Council',
      },
    }),
    prisma.indigenousCommunity.upsert({
      where: { authorityName: 'Gadigal' },
      update: {},
      create: {
        authorityName: 'Gadigal',
        associatedIndigenousCommunities: 'Metropolitan Local Aboriginal Land Council',
      },
    }),
  ]);

  // Create facilities
  console.log('Creating facilities...');
  const facilities = await Promise.all([
    prisma.facility.upsert({
      where: { facilityName: 'Beenyup Wastewater Treatment Plant' },
      update: {},
      create: {
        facilityName: 'Beenyup Wastewater Treatment Plant',
        type: 'Wastewater Treatment Plant',
        sector: 'Water',
        latitude: -31.8982,
        longitude: 115.7547,
        postcode: '6027',
        regionType: 'Metropolitan',
        suburb: 'Craigie',
      },
    }),
    prisma.facility.upsert({
      where: { facilityName: 'Woodman Point Wastewater Treatment Plant' },
      update: {},
      create: {
        facilityName: 'Woodman Point Wastewater Treatment Plant',
        type: 'Wastewater Treatment Plant',
        sector: 'Water',
        latitude: -32.1547,
        longitude: 115.7547,
        postcode: '6166',
        regionType: 'Metropolitan',
        suburb: 'Munster',
      },
    }),
  ]);

  // Create people
  console.log('Creating people...');
  const people = await Promise.all([
    prisma.person.upsert({
      where: { email: 'admin@cleanocean.com' },
      update: {},
      create: {
        fullName: 'Admin User',
        email: 'admin@cleanocean.com',
        firstName: 'Admin',
        lastName: 'User',
        organisation: 'Clean Ocean',
        phoneNumber: '+61400000000',
      },
    }),
    prisma.person.upsert({
      where: { email: 'user@cleanocean.com' },
      update: {},
      create: {
        fullName: 'Regular User',
        email: 'user@cleanocean.com',
        firstName: 'Regular',
        lastName: 'User',
        organisation: 'Clean Ocean',
        phoneNumber: '+61400000001',
      },
    }),
  ]);

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
