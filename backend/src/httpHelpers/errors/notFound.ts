import { HttpResponse } from '../httpHelper';

const notFoundErrors = {
  DRIVER_NOT_FOUND: 'Motorista não encontrado',
  NO_RIDES_FOUND: 'Nenhum registro encontrado',
} as const;

type NotFoundErrorKeys = keyof typeof notFoundErrors;

export const notFound = (errorCode: NotFoundErrorKeys): HttpResponse => {
  return {
    statusCode: 404,
    data: {
      error_code: errorCode,
      error_description: notFoundErrors[errorCode],
    },
  };
};
