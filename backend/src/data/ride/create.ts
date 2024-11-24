import { Driver } from '@prisma/client';
import { prisma } from '../../lib/prisma';

type CreateRideArg = {
  customerId: string;
  destination: string;
  distance: number;
  duration: string;
  origin: string;
  value: number;
  driver: Driver;
};

export const createRide = async (data: CreateRideArg) => {
  const { driver, ...rest } = data;

  return prisma.ride.create({
    data: {
      ...rest,
      driver: {
        connect: driver,
      },
    },
  });
};
