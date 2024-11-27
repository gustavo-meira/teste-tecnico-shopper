import { useDrivers } from '@/hooks/useDrivers';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormRideHistoryProps } from './FormRideHistory';
import {
  FormRideHistorySchema,
  FormRideHistorySchemaInput,
  FormRideHistorySchemaOutput,
} from './schema';

export const useFormRideHistory = (props: FormRideHistoryProps) => {
  const form = useForm<
    FormRideHistorySchemaInput,
    null,
    FormRideHistorySchemaOutput
  >({
    resolver: zodResolver(FormRideHistorySchema),
    defaultValues: {
      customer_id: props.defaultValues.customer_id,
      driver_id: props.defaultValues.driver_id,
    },
  });
  const drivers = useDrivers();

  const selectOptions = [
    { label: 'Todos', value: 'null' },
    ...drivers.map((driver) => ({
      label: driver.name,
      value: driver.id.toString(),
    })),
  ];

  const onSubmit = form.handleSubmit(props.onSubmit);

  return {
    form,
    selectOptions,
    onSubmit,
  };
};
