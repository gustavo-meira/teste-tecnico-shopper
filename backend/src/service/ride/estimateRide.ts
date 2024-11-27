import { driverDb } from '../../data/driver';
import { googleMaps } from '../../data/googleMaps';
import { httpHelpers } from '../../httpHelpers';

export const estimateRide = async (origin: string, destination: string) => {
  const googleResponse = await googleMaps.getDirections(origin, destination);

  if (googleResponse == null)
    return httpHelpers.errors.notFound('ROUTE_NOT_FOUND');

  const driversAvailable = await driverDb.getByDistance(
    googleResponse.routes[0].distanceMeters / 1000
  );

  return httpHelpers.success.ok({
    origin: googleResponse.routes[0].legs[0].startLocation.latLng,
    destination: googleResponse.routes[0].legs[0].endLocation.latLng,
    distance: googleResponse.routes[0].distanceMeters,
    duration: googleResponse.routes[0].duration,
    options: driversAvailable,
    routeResponse: googleResponse,
  });
};
