import { prisma } from '../../lib/prisma';

export const getByDistance = async (distanceInKm: number) => {
  const driversAvailable = await prisma.driver.findMany({
    where: {
      minKmDistance: {
        lte: distanceInKm,
      },
    },
    select: {
      id: true,
      name: true,
      description: true,
      vehicle: true,
      ratePerKm: true,
      reviews: {
        select: {
          rating: true,
          comment: true,
        },
      },
    },
  });

  return driversAvailable.map((driver) => ({
    id: driver.id,
    name: driver.name,
    description: driver.description,
    vehicle: driver.vehicle,
    review: driver.reviews[0],
    value: Number(driver.ratePerKm.toString()) * distanceInKm,
  }));
};
