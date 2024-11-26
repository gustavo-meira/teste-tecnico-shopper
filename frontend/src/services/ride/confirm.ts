import axios from 'axios';

type ConfirmRideResponse = {
  success: boolean;
};

type ConfirmRideArgs = {
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
};

export const confirmRide = async (data: ConfirmRideArgs) => {
  const url = new URL('/ride/confirm', import.meta.env.VITE_BACKEND_URL);

  const response = await axios.patch<ConfirmRideResponse>(url.toString(), data);

  return response.data;
};
