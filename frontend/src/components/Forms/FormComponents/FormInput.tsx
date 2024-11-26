import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ComponentProps } from 'react';
import { useFormContext } from 'react-hook-form';

type InputProps = ComponentProps<'input'>;

type FormsInputProps = InputProps & {
  label?: string;
  name: string;
};

export const FormsInput = (props: FormsInputProps) => {
  const { label, name, ...rest } = props;
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              {...rest}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
