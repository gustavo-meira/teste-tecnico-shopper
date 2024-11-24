import { driverDb } from '../../data/driver';
import { rideDb } from '../../data/ride';
import { httpHelpers } from '../../httpHelpers';

type ConfirmRideData = {
  customerId: string;
  distance: number;
  destination: string;
  origin: string;
  duration: string;
  value: number;
  driver: {
    id: number;
    name: string;
  };
};

export const confirmRide = async (data: ConfirmRideData) => {
  const chosenDriver = await driverDb.getById(data.driver.id);

  if (chosenDriver == null || chosenDriver.name !== data.driver.name) {
    return httpHelpers.errors.notFound('DRIVER_NOT_FOUND');
  }

  if (chosenDriver.minKmDistance > data.distance / 1000) {
    return httpHelpers.errors.notAcceptable('INVALID_DISTANCE');
  }

  await rideDb.create({
    customerId: data.customerId,
    destination: data.destination,
    origin: data.origin,
    distance: data.distance,
    duration: data.duration,
    value: data.value,
    driver: chosenDriver,
  });

  return httpHelpers.success.ok({ success: true });
};
