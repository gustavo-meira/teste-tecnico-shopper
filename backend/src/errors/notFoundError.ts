const notFoundErrors = {
  DRIVER_NOT_FOUND: 'Motorista não encontrado',
} as const;

type NotFoundErrorKeys = keyof typeof notFoundErrors;

export const notFoundError = (errorCode: NotFoundErrorKeys) => {
  return {
    statusCode: 404,
    data: {
      error_code: errorCode,
      error_description: notFoundErrors[errorCode],
    },
  };
};
