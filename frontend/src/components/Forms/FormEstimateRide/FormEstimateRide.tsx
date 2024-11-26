import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormComponents } from '../FormComponents';

const formEstimateRideSchema = z.object({
  customer_id: z.string(),
  origin: z.string(),
  destination: z.string(),
});

export type FormEstimateRideSchemaInput = z.input<
  typeof formEstimateRideSchema
>;
export type FormEstimateRideSchemaOutput = z.output<
  typeof formEstimateRideSchema
>;

type FormEstimateRideProps = {
  onSubmit: (data: FormEstimateRideSchemaOutput) => void;
};

export const FormEstimateRide = (props: FormEstimateRideProps) => {
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

  return (
    <FormComponents.Base {...form}>
      <Card className="w-full max-w-md m-auto">
        <CardHeader>
          <CardTitle className="text-center text-4xl tracking-tight">
            Solicite sua viagem
          </CardTitle>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="space-y-4">
            <FormComponents.Input
              label="Id do cliente"
              name="customer_id"
              placeholder="1234"
            />
            <FormComponents.Input
              label="Origem"
              name="origin"
              placeholder="Rua 1, 123, Centro"
            />
            <FormComponents.Input
              label="Destino"
              name="destination"
              placeholder="Rua 2, 456, Centro"
            />
            <FormComponents.Submit className="w-full">
              Solicitar
            </FormComponents.Submit>
          </CardContent>
        </form>
      </Card>
    </FormComponents.Base>
  );
};
