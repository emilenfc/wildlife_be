// This is where we will use for seeding the database data with dummy data

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// initialize Prisma Client
const prisma = new PrismaClient();

const roundsOfHashing = 10;

    //   I use article this "upsert" to tell database to create this ariticle if the artical of the same title name is not found
console.log("\n\n SEEDING RUNNING seed.ts\n\n\n");
async function seed() {
  // create two dummy articles

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
  });

  // create three dummy articles
  const post1 = await prisma.article.upsert({
    where: { title: 'Prisma Adds Support for MongoDB' },
    update: {
      authorId: user1.id,
    },
    create: {
      title: 'Prisma Adds Support for MongoDB',
      body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
      description:
        "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
      published: false,
      authorId: user1.id,
    },
  });

  const post2 = await prisma.article.upsert({
    where: { title: "What's new in Prisma? (Q1/22)" },
    update: {
      authorId: user2.id,
    },
    create: {
      title: "What's new in Prisma? (Q1/22)",
      body: 'Our engineers have been working hard, issuing new releases with many improvements...',
      description:
        'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
      published: true,
      authorId: user2.id,
    },
  });

  const post3 = await prisma.article.upsert({
    where: { title: 'Prisma Client Just Became a Lot More Flexible' },
    update: {},
    create: {
      title: 'Prisma Client Just Became a Lot More Flexible',
      body: 'Prisma Client extensions provide a powerful new way to add functionality to Prisma in a type-safe manner...',
      description:
        'This article will explore various ways you can use Prisma Client extensions to add custom functionality to Prisma Client..',
      published: true,
    },
  });


  //seeding countries
   const countries = [
    { name: 'Rwanda' },
    { name: 'Uganda' },
    { name: 'Kenya' },
    { name: 'Tanzania' },
  ];

  for (const country of countries) {
    const upsertedCountry = await prisma.country.upsert({
      where: { name: country.name },
      update: {},
      create: {
        name: country.name,
      },
    });
    console.log(`Country created: ${upsertedCountry.name}`);
  }

  console.log({ user1, user2, post1, post2, post3 });
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
