import { prisma } from '../../lib/prisma';

export const getAllDriversDb = async () => {
  return prisma.driver.findMany();
};
