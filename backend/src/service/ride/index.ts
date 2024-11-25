import { confirmRide } from './confirmRide';
import { estimateRide } from './estimateRide';
import { getRidesByCustomer } from './getRidesByCustomer';

export const rideServices = {
  getRidesByCustomer,
  estimate: estimateRide,
  confirm: confirmRide,
};
