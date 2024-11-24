const notAcceptableErrors = {
  INVALID_DISTANCE: 'Quilometragem inválida para o motorista',
} as const;

type NotAcceptableErrorKeys = keyof typeof notAcceptableErrors;

export const notAcceptableError = (errorCode: NotAcceptableErrorKeys) => {
  return {
    statusCode: 406,
    data: {
      error_code: errorCode,
      error_description: notAcceptableErrors[errorCode],
    },
  };
};
