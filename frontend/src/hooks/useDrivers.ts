import { driverService } from '@/services/driver';
import { Driver } from '@/types/driver';
import { useEffect, useState } from 'react';

const DRIVER_STORAGE_KEY = 'drivers';

export const useDrivers = () => {
  const [drivers, setDrivers] = useState<Driver[]>(() => {
    const drivers = localStorage.getItem(DRIVER_STORAGE_KEY);
    return drivers ? JSON.parse(drivers) : [];
  });

  useEffect(() => {
    if (drivers.length === 0) {
      driverService.getAll().then((response) => {
        localStorage.setItem(
          DRIVER_STORAGE_KEY,
          JSON.stringify(response.drivers)
        );
        setDrivers(response.drivers);
      });
    }
  }, [drivers]);

  return drivers;
};
