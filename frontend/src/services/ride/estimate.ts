import { FormEstimateRideSchemaOutput } from '@/components/Forms/FormEstimateRide/schema';
import { Driver } from '@/types/driver';
import { Location } from '@/types/location';
import { notifyError } from '@/utils/notifyError';
import axios, { AxiosError } from 'axios';

export type EstimateRideResponseApi = {
  origin: Location;
  destination: Location;
  distance: number;
  duration: string;
  options: Array<Driver & { value: number }>;
};

export const estimateRide = async (formsData: FormEstimateRideSchemaOutput) => {
  try {
    const url = new URL('/ride/estimate', import.meta.env.VITE_BACKEND_URL);

    const response = await axios.post<EstimateRideResponseApi>(
      url.toString(),
      formsData
    );

    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      notifyError(err);
    }

    return null;
  }
};
