import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { formatMoney } from '@/lib/formatters';
import { Driver } from '@/types/driver';
import { ReactNode } from 'react';

type DialogConfirmDriverProps = {
  onAction: () => void;
  children: ReactNode;
  driver: Driver & { value: number };
};

export const DialogConfirmDriver = (props: DialogConfirmDriverProps) => {
  const { onAction, children, driver } = props;
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza disso?</AlertDialogTitle>
          <AlertDialogDescription>
            A corrida com o motorista {driver.name} irá custar{' '}
            {formatMoney(driver.value)}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onAction}>Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
