import { ZodError } from 'zod';
import { HttpResponse } from '../httpHelper';

const badRequestErrors = {
  INVALID_DATA: 'INVALID_DATA',
} as const;

type BadRequestErrorKeys = keyof typeof badRequestErrors;

export const badRequest = (
  errorCode: BadRequestErrorKeys,
  error?: ZodError
): HttpResponse => {
  const errorDescription = error
    ? error.errors.map((err) => err.message).join(', ')
    : badRequestErrors[errorCode];

  return {
    statusCode: 400,
    data: {
      error_code: errorCode,
      error_description: errorDescription,
    },
  };
};
