import axios from 'axios';
import { env } from '../../lib/env';

type Location = {
  latLng: {
    latitude: number;
    longitude: number;
  };
};

type ApiResponse = {
  routes: [
    {
      legs: [
        {
          startLocation: Location;
          endLocation: Location;
        }
      ];
      distanceMeters: number;
      duration: string;
    }
  ];
};

export const getDirections = async (origin: string, destination: string) => {
  const response = await axios.post<ApiResponse>(
    'https://routes.googleapis.com/directions/v2:computeRoutes',
    {
      origin: { address: origin },
      destination: { address: destination },
      travelMode: 'DRIVE',
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': env.GOOGLE_API_KEY,
        'X-Goog-FieldMask':
          'routes.duration,routes.distanceMeters,routes.legs.startLocation,routes.legs.endLocation',
      },
    }
  );

  return response.data;
};
