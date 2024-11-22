import { PrismaClient } from '@prisma/client';
import { readFile } from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

const seed = async () => {
  const drivers = JSON.parse(
    await readFile(path.join(__dirname, './drivers.json'), {
      encoding: 'utf-8',
    })
  );

  await prisma.driver.createMany({
    data: drivers.map((driver: any) => ({
      id: driver.id,
      name: driver.name,
      description: driver.description,
      vehicle: driver.vehicle,
      minKmDistance: driver.minKmDistance,
      ratePerKm: driver.ratePerKm,
    })),
  });

  await prisma.driverReview.createMany({
    data: drivers.map((driver: any) => ({
      driverId: driver.id,
      comment: driver.reviews[0].comment,
      rating: driver.reviews[0].rating,
    })),
  });
};

seed()
  .then(async () => {
    await prisma.$disconnect;
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect;
    process.exit(1);
  });
