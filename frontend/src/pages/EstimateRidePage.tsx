import { FormEstimateRide } from '@/components/Forms/FormEstimateRide';
import { FormEstimateRideSchemaOutput } from '@/components/Forms/FormEstimateRide/schema';
import { ListAvailableDrivers } from '@/components/Lists/ListAvailableDrivers';
import { MapRide } from '@/components/Maps/MapRide';
import { rideService } from '@/services/ride';
import { EstimateRideResponseApi } from '@/services/ride/estimate';
import { Driver } from '@/types/driver';
import { useState } from 'react';

export const EstimateRidePage = () => {
  const [ride, setRide] = useState<EstimateRideResponseApi | null>(null);
  const [clientRide, setClientRide] =
    useState<FormEstimateRideSchemaOutput | null>(null);

  const onSubmitForm = async (data: FormEstimateRideSchemaOutput) => {
    const response = await rideService.estimate(data);
    setRide(response);
    setClientRide(data);
  };

  const confirmDriver = async (driver: Driver & { value: number }) => {
    if (!ride || !clientRide) return;

    const response = await rideService.confirm({
      customer_id: clientRide.customer_id,
      origin: clientRide.origin,
      destination: clientRide.destination,
      distance: ride.distance,
      duration: ride.duration,
      driver: {
        id: driver.id,
        name: driver.name,
      },
      value: driver.value,
    });

    if (response.success) {
      setRide(null);
    }
  };

  return (
    <div className="flex-grow bg-gray-100 grid grid-cols-2 grid-rows-[auto_1fr] gap-4 p-4">
      <div className="row-start-1 col-start-1 col-span-2">
        <FormEstimateRide onSubmit={onSubmitForm} />
      </div>
      {ride !== null && (
        <>
          <div className="row-start-2 col-start-2">
            <MapRide
              origin={ride.origin}
              destination={ride.destination}
              distance={ride.distance}
              duration={ride.duration}
            />
          </div>
          <div className="row-start-2 col-start-1">
            <ListAvailableDrivers
              drivers={ride.options}
              confirmDriver={confirmDriver}
            />
          </div>
        </>
      )}
    </div>
  );
};
