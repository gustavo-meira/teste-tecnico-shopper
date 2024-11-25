import { createRide } from './create';
import { getRideByCustomer } from './getByCustomer';

export const rideDb = {
  getByCustomer: getRideByCustomer,
  create: createRide,
};
