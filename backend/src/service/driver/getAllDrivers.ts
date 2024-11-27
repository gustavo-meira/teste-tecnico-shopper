import { driverDb } from '../../data/driver';
import { httpHelpers } from '../../httpHelpers';

export const getAllDriversService = async () => {
  const drivers = await driverDb.getAll();

  return httpHelpers.success.ok({ drivers });
};
