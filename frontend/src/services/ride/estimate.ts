import { FormEstimateRideSchemaOutput } from '@/components/Forms/FormEstimateRide/schema';
import { Driver } from '@/types/driver';
import { Location } from '@/types/location';
import axios from 'axios';

export type EstimateRideResponseApi = {
  origin: Location;
  destination: Location;
  distance: number;
  duration: string;
  options: Array<Driver & { value: number }>;
};

export const estimateRide = async (formsData: FormEstimateRideSchemaOutput) => {
  const url = new URL('/ride/estimate', import.meta.env.VITE_BACKEND_URL);

  const response = await axios.post<EstimateRideResponseApi>(
    url.toString(),
    formsData
  );

  return response.data;
};
