import { Driver } from '@prisma/client';
import { driverDb } from '../../data/driver';
import { rideDb } from '../../data/ride';
import { httpHelpers } from '../../httpHelpers';

type GetRidesByCustomerData = {
  customerId: string;
  driverId: number | null | undefined;
};

export const getRidesByCustomer = async (data: GetRidesByCustomerData) => {
  let driver: null | Driver = null;

  if (data.driverId) {
    driver = await driverDb.getById(data.driverId);

    if (driver == null) {
      return httpHelpers.errors.badRequest('INVALID_DRIVER');
    }
  }

  const rides = await rideDb.getByCustomer(data.customerId, driver?.id);

  if (rides.length === 0) {
    return httpHelpers.errors.notFound('NO_RIDES_FOUND');
  }

  const response = {
    customer_id: data.customerId,
    rides: rides.map((ride) => ({
      id: ride.id,
      date: ride.date,
      origin: ride.origin,
      destination: ride.destination,
      distance: ride.distance,
      duration: ride.duration,
      driver: {
        id: ride.driver.id,
        name: ride.driver.name,
      },
      value: ride.value,
    })),
  };

  return httpHelpers.success.ok(response);
};
