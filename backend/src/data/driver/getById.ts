import { prisma } from '../../lib/prisma';

export const getDriverById = async (id: number) => {
  return prisma.driver.findFirst({
    where: {
      id: id,
    },
  });
};
