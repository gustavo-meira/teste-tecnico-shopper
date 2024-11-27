import { Ride } from '@/types/ride';
import { notifyError } from '@/utils/notifyError';
import axios, { AxiosError } from 'axios';

type GetAllRidesResponseApi = {
  customer_id: string;
  rides: Ride[];
};

export const getAllRides = async (
  customerId: string,
  driverId?: string | null
) => {
  try {
    const url = new URL(
      `/ride/${customerId}`,
      import.meta.env.VITE_BACKEND_URL
    );

    if (driverId) {
      url.searchParams.set('driver_id', driverId);
    }

    const response = await axios.get<GetAllRidesResponseApi>(url.toString());

    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      notifyError(err);
    }

    return {
      rides: null,
    };
  }
};
