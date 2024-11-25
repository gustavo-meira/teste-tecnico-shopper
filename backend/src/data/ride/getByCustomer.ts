import { prisma } from '../../lib/prisma';

export const getRideByCustomer = async (
  customerId: string,
  driverId?: number
) => {
  return prisma.ride.findMany({
    where: {
      customerId,
      driverId,
    },
    include: {
      driver: true,
    },
  });
};
