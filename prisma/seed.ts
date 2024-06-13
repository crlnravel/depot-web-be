import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const post1 = await prisma.user.upsert({
    where: { email: 'carlravel@gmail.com' },
    update: {},
    create: {
      email: 'carleanoravel@gmail.com',
      name: 'Carleano Ravelza Wongso',
    },
  });

  const post2 = await prisma.user.upsert({
    where: { email: 'tesuser@user.com' },
    update: {},
    create: {
      email: 'tesuser@user.com',
      name: 'User Pertama',
    },
  });

  console.log({ post1, post2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
