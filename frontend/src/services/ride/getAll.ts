import { Ride } from '@/types/ride';
import axios from 'axios';

type GetAllRidesResponseApi = {
  customer_id: string;
  rides: Ride[];
};

export const getAllRides = async (
  customerId: string,
  driverId?: string | null
) => {
  const url = new URL(`/ride/${customerId}`, import.meta.env.VITE_BACKEND_URL);

  if (driverId) {
    url.searchParams.set('driver_id', driverId);
  }

  const response = await axios.get<GetAllRidesResponseApi>(url.toString());

  return response.data;
};
