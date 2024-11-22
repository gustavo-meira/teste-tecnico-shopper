import { driverDb } from '../../data/driver';
import { googleMaps } from '../../data/googleMaps';

export const estimateRide = async (origin: string, destination: string) => {
  const googleResponse = await googleMaps.getDirections(origin, destination);

  const driversAvailable = await driverDb.getByDistance(
    googleResponse.routes[0].distanceMeters / 1000
  );

  const responseData = {
    origin: googleResponse.routes[0].legs[0].startLocation,
    destination: googleResponse.routes[0].legs[0].endLocation,
    distance: googleResponse.routes[0].distanceMeters,
    duration: googleResponse.routes[0].duration,
    options: driversAvailable,
    routeResponse: googleResponse,
  };

  return { status: 200, responseData };
};
