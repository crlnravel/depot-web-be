import { $Enums, PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      email: 'admin@admin.com',
      name: 'Admin',
      password: '$2b$10$rJXLROsBKpNAuv5vLfRoluntb93n0tZD.ChrDXenGTNt8O.hWsHr2',
      role: $Enums.Role.ADMIN,
    },
  });

  const products = await prisma.product.createMany({
    data: [
      {
        name: 'Aqua',
        description:
          'Aqua adalah merek air minum dalam kemasan yang terkenal di Indonesia. Airnya segar dan bermanfaat untuk kesehatan.',
        price: 17000,
        stock: 100,
        imgUrl:
          'https://raw.githubusercontent.com/raflytch/depot-web/main/src/assets/img/galonaqua.png',
        totalPurchases: 0,
        totalRating: 0,
        category: $Enums.Category.GALON_BARU,
        kualitasAir: $Enums.KualitasAir.BAIK,
      },
      {
        name: 'Oasis',
        description:
          'Oasis adalah merek air minum dalam kemasan dengan harga terjangkau dan kualitas yang baik.',
        price: 16000,
        stock: 100,
        imgUrl:
          'https://raw.githubusercontent.com/raflytch/depot-web/main/src/assets/img/galonoasis.jpg',
        totalPurchases: 0,
        totalRating: 0,
        category: $Enums.Category.GALON_BARU,
        kualitasAir: $Enums.KualitasAir.BAIK,
      },
      {
        name: 'Pristine',
        description:
          'Pristine adalah air mineral murni dari sumber alami yang diolah dengan teknologi canggih untuk menjaga kesegarannya.',
        price: 21000,
        stock: 100,
        imgUrl:
          'https://raw.githubusercontent.com/raflytch/depot-web/main/src/assets/img/galonpristine.jpeg',
        totalPurchases: 0,
        totalRating: 0,
        category: $Enums.Category.GALON_BARU,
        kualitasAir: $Enums.KualitasAir.BAIK,
      },
      {
        name: 'Amidis',
        description:
          'Amidis adalah air minum berkualitas tinggi dengan kandungan mineral yang seimbang untuk memenuhi kebutuhan hidrasi harian.',
        price: 20000,
        stock: 100,
        imgUrl:
          'https://raw.githubusercontent.com/raflytch/depot-web/main/src/assets/img/galonamidis.jpeg',
        totalPurchases: 0,
        totalRating: 0,
        category: $Enums.Category.GALON_BARU,
        kualitasAir: $Enums.KualitasAir.BAIK,
      },
      {
        name: 'Vit',
        description:
          'Vit adalah air minum yang mengandung vitamin tambahan untuk membantu memperkuat sistem kekebalan tubuh.',
        price: 17500,
        stock: 100,
        imgUrl:
          'https://raw.githubusercontent.com/raflytch/depot-web/main/src/assets/img/galonvit.jpeg',
        totalPurchases: 0,
        totalRating: 0,
        category: $Enums.Category.GALON_BARU,
        kualitasAir: $Enums.KualitasAir.BAIK,
      },
      {
        name: 'Isi Ulang - RO',
        description:
          'Isi ulang RO adalah air minum yang diproses menggunakan sistem Reverse Osmosis untuk kualitas air terbaik.',
        price: 7000,
        stock: 100,
        imgUrl: 'https://i.imghippo.com/files/VyiQ41720366092.jpg',
        totalPurchases: 0,
        totalRating: 0,
        category: $Enums.Category.GALON_ISI_ULANG,
        kualitasAir: $Enums.KualitasAir.BAIK,
      },
      {
        name: 'Isi Ulang - Biasa',
        description:
          'Isi ulang Biasa adalah air minum dalam kemasan praktis untuk kebutuhan sehari-hari dengan harga terjangkau.',
        price: 5000,
        stock: 100,
        imgUrl:
          'https://raw.githubusercontent.com/raflytch/depot-web/main/src/assets/img/galonisiulang.jpg',
        totalPurchases: 0,
        totalRating: 0,
        category: $Enums.Category.GALON_ISI_ULANG,
        kualitasAir: $Enums.KualitasAir.BAIK,
      },
      {
        name: 'Air Minum - 500ml',
        description:
          'Air Minum 500ml adalah air minum dalam kemasan praktis untuk konsumsi segera.',
        price: 1000,
        stock: 100,
        imgUrl:
          'https://raw.githubusercontent.com/raflytch/depot-web/main/src/assets/img/refillulang.jpg',
        totalPurchases: 0,
        totalRating: 0,
        category: $Enums.Category.REFILL_AIR_MINUM,
        kualitasAir: $Enums.KualitasAir.BAIK,
      },
      {
        name: 'Air Minum - 1L',
        description:
          'Air Minum 1L adalah air minum dalam kemasan praktis dengan ukuran yang cocok untuk dibawa bepergian.',
        price: 2000,
        stock: 100,
        imgUrl:
          'https://raw.githubusercontent.com/raflytch/depot-web/main/src/assets/img/refillulang.jpg',
        totalPurchases: 0,
        totalRating: 0,
        category: $Enums.Category.REFILL_AIR_MINUM,
        kualitasAir: $Enums.KualitasAir.BAIK,
      },
    ],
  });

  console.log(user);
  console.log(products);
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
