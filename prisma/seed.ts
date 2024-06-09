// This is where we will use for seeding the database data with dummy data

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// initialize Prisma Client
const prisma = new PrismaClient();

const roundsOfHashing = 10;

    //   I use article this "upsert" to tell database to create this ariticle if the artical of the same title name is not found
console.log("\n\n SEEDING RUNNING seed.ts\n\n\n");
async function seed() {

    const password = await bcrypt.hash('test@123', roundsOfHashing);

  const user1 = await prisma.user.upsert({
    where: { email: 'test0@gmail.com' },
    update: {
      password: password,
    },
    create: {
      email: 'test0@gmail.com',
      name: 'Sabin Adams',
      password: password,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'test1@gmail.com' },
    update: {
      password: password,
    },
    create: {
      email: 'test1@gmail.com',
      name: 'Alex Ruheni',
      password: password,
    },
  }
  );
    console.log({ user1, user2 });

  //seeding countries
   const countries = [
    {
      name: 'Rwanda',
      keyfact: 'Land of a Thousand Hills',
      languages: ['Kinyarwanda', 'English', 'French'],
      size: 26338,
      security: 'High',
      population: 12300000,
      content: 'Rwanda is known for its breathtaking scenery.',
    },
    {
      name: 'Uganda',
      keyfact: 'Pearl of Africa',
      languages: ['English', 'Swahili'],
      size: 241038,
      security: 'Moderate',
      population: 42862958,
      content: 'Uganda is home to the source of the Nile.',
    },
    {
      name: 'Kenya',
      keyfact: 'Safari Capital of the World',
      languages: ['Swahili', 'English'],
      size: 580367,
      security: 'Moderate',
      population: 53771300,
      content: 'Kenya has a diverse climate.',
    },
    {
      name: 'Tanzania',
      keyfact: 'Home of Mount Kilimanjaro',
      languages: ['Swahili', 'English'],
      size: 945087,
      security: 'Moderate',
      population: 59734218,
      content: 'Tanzania has a wealth of natural attractions.',
    },
  ];

  for (const country of countries) {
    const upsertedCountry = await prisma.country.upsert({
      where: { name: country.name },
      update: {},
      create: {
        name: country.name,
        keyfact: country.keyfact,
        languages: country.languages,
        size: country.size,
        security: country.security,
        population: country.population,
        content: country.content,
      },
    });
    console.log(`Country created: ${upsertedCountry.name}`);
        // Seeding ContentKeyPoint
    const contentKeyPoints = [
      { keyPoint: `${country.name} is a beautiful country`, countryId: upsertedCountry.id },
      { keyPoint: `${country.name} has rich cultural heritage`, countryId: upsertedCountry.id },
    ];

    for (const contentKeyPoint of contentKeyPoints) {
      await prisma.contentKeyPoint.create({
        data: contentKeyPoint,
      });
      console.log(`ContentKeyPoint created for country: ${upsertedCountry.name}`);
    }

     // Seeding ImageCountry
    const imageCountries = [
      { image: 'https://images.unsplash.com/photo-1715484620057-1145dba8ac76?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', countryId: upsertedCountry.id },
      { image: 'https://images.unsplash.com/photo-1715553179509-88f536acabcc?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', countryId: upsertedCountry.id },
    ];

    for (const imageCountry of imageCountries) {
      await prisma.imageCountry.create({
        data: imageCountry,
      });
      console.log(`ImageCountry created for country: ${upsertedCountry.name}`);
    }
  }

  
}

// execute the main function
 export default seed()
  .catch((e) => {
    console.error(e.message);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
