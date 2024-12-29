import { PrismaClient } from '@prisma/client';
import { parse } from 'csv-parse';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  // Function to seed IndigenousCommunity data from CSV
  async function seedIndigenousCommunities() {
    const csvFile = 'public/csv-imports/Indigenous Communities-Gallery.csv';
    const csvData = fs.readFileSync(csvFile, { encoding: 'utf-8' });

    parse(csvData, {
      columns: true,
      skip_empty_lines: true,
    }, async (err, records) => {
      if (err) {
        console.error('Error parsing CSV:', err);
        return;
      }

      for (const record of records) {
        try {
          const existingCommunity = await prisma.indigenousCommunity.findUnique({
            where: {
              email: record['email'] || 'N/A',
            },
          });

          if (existingCommunity) {
            console.log(`Skipping Indigenous Community: ${record['Community Name']} (email already exists)`);
            continue;
          }

          await prisma.indigenousCommunity.create({
            data: {
              name: record['Community Name'] || 'N/A',
              region: 'N/A',
              contact: 'N/A',
              email: record['email'] || 'N/A',
            },
          });
          console.log(`Created Indigenous Community: ${record['Community Name']}`);
        } catch (error) {
          console.error('Error creating Indigenous Community:', error);
        }
      }
    });
  }

  async function seedOutfalls() {
    const csvFile = 'public/csv-imports/Master Outfalls-Grid view.csv';
    const csvData = fs.readFileSync(csvFile, { encoding: 'utf-8' });

    parse(csvData, {
      columns: true,
      skip_empty_lines: true,
    }, async (err, records) => {
      if (err) {
        console.error('Error parsing CSV:', err);
        return;
      }

      for (const record of records) {
        try {
          await prisma.outfall.create({
            data: {
              name: record['Outfall Name'] || 'N/A',
              location: record['Suburb'] || 'N/A',
              type: record['Type'] || 'N/A',
              status: 'Open', // Default status
              description: null, // No description in CSV
            },
          });
          console.log(`Created Outfall: ${record['Outfall Name']}`);
        } catch (error) {
          console.error('Error creating Outfall:', error);
        }
      }
    });
  }

  async function seedFacilities() {
    const csvFile = 'public/csv-imports/Educational Facilities-Grid view.csv';
    const csvData = fs.readFileSync(csvFile, { encoding: 'utf-8' });

    parse(csvData, {
      columns: true,
      skip_empty_lines: true,
    }, async (err, records) => {
      if (err) {
        console.error('Error parsing CSV:', err);
        return;
      }

      for (const record of records) {
        try {
          await prisma.facility.create({
            data: {
              name: record['Facility Name'] || 'N/A',
              type: record['Facility Type'] || 'N/A',
              address: record['Address'] || 'N/A',
              location: 'N/A',
            },
          });
          console.log(`Created Facility: ${record['Facility Name']}`);
        } catch (error) {
          console.error('Error creating Facility:', error);
        }
      }
    });
  }

  async function seedWaterAuthorities() {
    const csvFile = 'public/csv-imports/Water Authorities-Gallery.csv';
    const csvData = fs.readFileSync(csvFile, { encoding: 'utf-8' });

    parse(csvData, {
      columns: true,
      skip_empty_lines: true,
    }, async (err, records) => {
      if (err) {
        console.error('Error parsing CSV:', err);
        return;
      }

      for (const record of records) {
        try {
          await prisma.waterAuthority.create({
            data: {
              name: record['Water Authority'] || 'N/A',
              contact: record['Contact'] || 'N/A',
              email: record['Email'] || 'N/A',
            },
          });
          console.log(`Created Water Authority: ${record['Water Authority']}`);
        } catch (error) {
          console.error('Error creating Water Authority:', error);
        }
      }
    });
  }

  async function seedPoliticians() {
      const csvFile = 'public/csv-imports/Politicians-Grid view.csv';
      const csvData = fs.readFileSync(csvFile, { encoding: 'utf-8' });

      parse(csvData, {
        columns: true,
        skip_empty_lines: true,
      }, async (err, records) => {
        if (err) {
          console.error('Error parsing CSV:', err);
          return;
        }

        for (const record of records) {
          try {
            await prisma.politician.create({
              data: {
                name: record['Name'] || 'N/A',
                party: record['Party'] || 'N/A',
                email: record['Email'] || 'N/A',
              },
            });
            console.log(`Created Politician: ${record['Name']}`);
          } catch (error) {
            console.error('Error creating Politician:', error);
          }
        }
      });
    }

    async function seedOutfallObservations() {
      const csvFile = 'public/csv-imports/Outfall Observations-Gallery.csv';
      const csvData = fs.readFileSync(csvFile, { encoding: 'utf-8' });

      parse(csvData, {
        columns: true,
        skip_empty_lines: true,
      }, async (err, records) => {
        if (err) {
          console.error('Error parsing CSV:', err);
          return;
        }

        for (const record of records) {
          try {
            await prisma.outfallObservation.create({
              data: {
                date: record['Date'] || 'N/A',
                notes: record['Notes'] || 'N/A',
              },
            });
            console.log(`Created Outfall Observation: ${record['Date']}`);
          } catch (error) {
            console.error('Error creating Outfall Observation:', error);
          }
        }
      });
    }

    async function seedPeople() {
      const csvFile = 'public/csv-imports/People-List.csv';
      const csvData = fs.readFileSync(csvFile, { encoding: 'utf-8' });

      parse(csvData, {
        columns: true,
        skip_empty_lines: true,
      }, async (err, records) => {
        if (err) {
          console.error('Error parsing CSV:', err);
          return;
        }

        for (const record of records) {
          try {
            await prisma.person.create({
              data: {
                name: record['Name'] || 'N/A',
                email: record['Email'] || 'N/A',
                phone: record['Phone'] || 'N/A',
              },
            });
            console.log(`Created Person: ${record['Name']}`);
          } catch (error) {
            console.error('Error creating Person:', error);
          }
        }
      });
    }


  await seedIndigenousCommunities();
  await seedOutfalls();
  await seedFacilities();
  await seedWaterAuthorities();
  await seedPoliticians();
  await seedOutfallObservations();
  await seedPeople();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
