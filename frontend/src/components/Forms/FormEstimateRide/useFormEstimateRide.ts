import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormEstimateRideProps } from './FormEstimateRide';
import {
  formEstimateRideSchema,
  FormEstimateRideSchemaInput,
  FormEstimateRideSchemaOutput,
} from './schema';

export const useFormEstimateRide = (props: FormEstimateRideProps) => {
  const form = useForm<
    FormEstimateRideSchemaInput,
    FormEstimateRideSchemaOutput
  >({
    resolver: zodResolver(formEstimateRideSchema),
    defaultValues: {
      customer_id: '',
      destination: '',
      origin: '',
    },
  });

  const onSubmit = form.handleSubmit(props.onSubmit);

  return {
    form,
    onSubmit,
  };
};
