import {
  formatMetersInKilometers,
  formatSecondsInMinutes,
} from '@/lib/formatters';
import { MapRideProps } from './MapRide';

export const useMapRide = (props: MapRideProps) => {
  const { origin, destination, distance, duration } = props;

  const mapUrl = new URL('/maps/api/staticmap', 'https://maps.googleapis.com');
  mapUrl.searchParams.set('size', '600x400');
  mapUrl.searchParams.append(
    'markers',
    `${origin.latitude},${origin.longitude}`
  );
  mapUrl.searchParams.append(
    'markers',
    `${destination.latitude},${destination.longitude}`
  );
  mapUrl.searchParams.set('key', import.meta.env.VITE_GOOGLE_API_KEY);

  const durationInSeconds = Number(duration.split('s')[0]);

  return {
    distance: formatMetersInKilometers(distance),
    duration: formatSecondsInMinutes(durationInSeconds),
    mapUrl: mapUrl.toString(),
  };
};
