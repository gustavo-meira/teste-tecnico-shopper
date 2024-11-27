import { DialogConfirmDriver } from '@/components/Dialogs/DialogConfirmDriver';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatMoney } from '@/lib/formatters';
import { Driver } from '@/types/driver';

type TableAvailableDriversProps = {
  drivers: Array<Driver & { value: number }>;
  confirmDriver: (driver: Driver & { value: number }) => void;
};

export const TableAvailableDrivers = (props: TableAvailableDriversProps) => {
  const { drivers, confirmDriver } = props;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-2xl tracking-tight">
          Motoristas disponíveis para a sua corrida
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Veículo</TableHead>
              <TableHead>Avaliação</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Selecionar Motorista</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {drivers.map((driver) => (
              <TableRow key={driver.id}>
                <TableCell>{driver.name}</TableCell>
                <TableCell>{driver.description}</TableCell>
                <TableCell>{driver.vehicle}</TableCell>
                <TableCell>
                  <p>{driver.review.rating}/5</p>
                  <p>{driver.review.comment}</p>
                </TableCell>
                <TableCell>{formatMoney(driver.value)}</TableCell>
                <TableCell>
                  <DialogConfirmDriver
                    driver={driver}
                    onAction={confirmDriver.bind(null, driver)}
                  >
                    <Button>Selecionar</Button>
                  </DialogConfirmDriver>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
