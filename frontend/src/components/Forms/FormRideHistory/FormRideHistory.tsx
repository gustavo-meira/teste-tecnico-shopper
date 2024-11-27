import { Card, CardContent } from '@/components/ui/card';
import { FormComponents } from '../FormComponents';
import {
  FormRideHistorySchemaInput,
  FormRideHistorySchemaOutput,
} from './schema';
import { useFormRideHistory } from './useFormRideHistory';

export type FormRideHistoryProps = {
  onSubmit: (data: FormRideHistorySchemaOutput) => void;
  defaultValues: Partial<FormRideHistorySchemaInput>;
};

export const FormRideHistory = (props: FormRideHistoryProps) => {
  const { form, selectOptions, onSubmit } = useFormRideHistory(props);

  return (
    <FormComponents.Base {...form}>
      <Card className="my-8 mx-auto w-fit">
        <CardContent>
          <form
            className="flex justify-center items-end gap-4"
            onSubmit={onSubmit}
          >
            <FormComponents.Input
              label="Id do cliente"
              name="customer_id"
              placeholder="1234"
            />
            <FormComponents.Select
              name="driver_id"
              label="Motorista"
              placeholder="Escolha seu motorista"
              options={selectOptions}
            />
            <FormComponents.Submit>Solicitar histórico</FormComponents.Submit>
          </form>
        </CardContent>
      </Card>
    </FormComponents.Base>
  );
};
