import { toast } from '@/hooks/useToast';
import { AxiosError } from 'axios';

export const notifyError = (
  error: AxiosError<{ error_code: string; error_description: string }>
) => {
  toast({
    title: 'Ocorreu um erro',
    description: error.response?.data.error_description,
    variant: 'destructive',
  });
};
