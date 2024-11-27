import { confirmRide } from './confirm';
import { estimateRide } from './estimate';
import { getAllRides } from './getAll';

export const rideService = {
  getAll: getAllRides,
  estimate: estimateRide,
  confirm: confirmRide,
};
