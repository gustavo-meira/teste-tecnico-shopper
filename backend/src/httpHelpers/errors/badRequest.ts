import { ZodError } from 'zod';
import { HttpResponse } from '../httpHelper';

export const badRequest = (error: ZodError): HttpResponse => {
  return {
    statusCode: 400,
    data: {
      error_code: 'INVALID_DATA',
      error_description: error.errors.map((err) => err.message).join(', '),
    },
  };
};
