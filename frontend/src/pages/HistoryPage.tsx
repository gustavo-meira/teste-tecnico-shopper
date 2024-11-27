import { FormRideHistory } from '@/components/Forms/FormRideHistory';
import { FormRideHistorySchemaOutput } from '@/components/Forms/FormRideHistory/schema';
import { TableRideHistory } from '@/components/Tables/TableRideHistory';
import { useSearchParams } from 'react-router';

export const HistoryPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onSubmitForms = (data: FormRideHistorySchemaOutput) => {
    if (data.driver_id) {
      return setSearchParams({
        driver_id: data.driver_id,
        customer_id: data.customer_id,
      });
    }

    return setSearchParams({ customer_id: data.customer_id });
  };

  return (
    <div className="container mx-auto">
      <FormRideHistory
        onSubmit={onSubmitForms}
        defaultValues={{
          customer_id: searchParams.get('customer_id') || '',
          driver_id: searchParams.get('driver_id') || '',
        }}
      />
      <TableRideHistory
        customerId={searchParams.get('customer_id')}
        driverId={searchParams.get('driver_id')}
      />
    </div>
  );
};
