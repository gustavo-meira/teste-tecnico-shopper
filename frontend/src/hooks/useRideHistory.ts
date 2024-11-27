import { rideService } from '@/services/ride';
import { Ride } from '@/types/ride';
import { useEffect, useState } from 'react';

type UseRideHistoryProps = {
  customerId?: string | null;
  driverId?: string | null;
};

export const useRideHistory = (props: UseRideHistoryProps) => {
  const [rideHistory, setRideHistory] = useState<null | Ride[]>(null);

  useEffect(() => {
    if (!props.customerId) return;

    rideService
      .getAll(props.customerId, props.driverId)
      .then((response) => setRideHistory(response.rides));
  }, [props.customerId, props.driverId]);

  return rideHistory;
};
