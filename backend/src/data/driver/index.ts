import { getAllDriversDb } from './getAll';
import { getByDistance } from './getByDistance';
import { getDriverById } from './getById';

export const driverDb = {
  getByDistance,
  getById: getDriverById,
  getAll: getAllDriversDb,
};
