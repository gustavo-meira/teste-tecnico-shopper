import { rideConfirmController } from './confirm';
import { estimateController } from './estimate';
import { getRidesController } from './getRides';

export const rideControllers = {
  estimate: estimateController,
  confirm: rideConfirmController,
  getRides: getRidesController,
};
