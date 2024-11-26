import { Button, ButtonProps } from '@/components/ui/button';
import { useFormContext } from 'react-hook-form';

type FormsSubmitProps = ButtonProps;

export const FormsSubmit = (props: FormsSubmitProps) => {
  const { children, ...rest } = props;
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <Button
      type="submit"
      disabled={isSubmitting}
      {...rest}
    >
      {children}
    </Button>
  );
};
