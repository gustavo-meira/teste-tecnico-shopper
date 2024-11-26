import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Location } from '@/types/location';
import { useMapRide } from './useMapRide';

export type MapRideProps = {
  origin: Location;
  destination: Location;
  distance: number;
  duration: string;
};

export const MapRide = (props: MapRideProps) => {
  const { distance, duration, mapUrl } = useMapRide(props);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-2xl tracking-tight">
          Mapa da corrida
        </CardTitle>
        <div className="flex justify-center gap-2">
          <p>{distance} km</p>
          <p>-</p>
          <p>{duration} min</p>
        </div>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <img
          src={mapUrl}
          alt="Mapa com origem e destino da viagem"
        />
      </CardContent>
    </Card>
  );
};
