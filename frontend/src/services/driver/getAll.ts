import { Driver } from '@/types/driver';
import axios from 'axios';

type GetAllDriversResponse = {
  drivers: Driver[];
};

export const getAllDriverService = async () => {
  const url = new URL('/driver', import.meta.env.VITE_BACKEND_URL);

  const response = await axios.get<GetAllDriversResponse>(url.toString());

  return response.data;
};
