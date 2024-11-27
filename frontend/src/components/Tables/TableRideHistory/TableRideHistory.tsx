import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useRideHistory } from '@/hooks/useRideHistory';
import {
  formatMetersInKilometers,
  formatMoney,
  formatSecondsInMinutes,
} from '@/lib/formatters';

type TableRideHistoryProps = {
  customerId?: string | null;
  driverId?: string | null;
};

export const TableRideHistory = (props: TableRideHistoryProps) => {
  const rideHistory = useRideHistory({
    customerId: props.customerId,
    driverId: props.driverId,
  });

  if (!rideHistory) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de viagens</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Origem</TableHead>
              <TableHead>Destino</TableHead>
              <TableHead>Distancia</TableHead>
              <TableHead>Duração</TableHead>
              <TableHead>Motorista</TableHead>
              <TableHead>Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rideHistory.map((history) => (
              <TableRow key={history.id}>
                <TableCell>
                  {new Date(history.date).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell>{history.origin}</TableCell>
                <TableCell>{history.destination}</TableCell>
                <TableCell>
                  {formatMetersInKilometers(history.distance)} km
                </TableCell>
                <TableCell>
                  {formatSecondsInMinutes(
                    Number(history.duration.split('s')[0])
                  )}{' '}
                  min
                </TableCell>
                <TableCell>{history.driver.name}</TableCell>
                <TableCell>{formatMoney(history.value)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
