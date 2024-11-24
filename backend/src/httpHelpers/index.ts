import { badRequest } from './errors/badRequest';
import { notAcceptable } from './errors/notAcceptable';
import { notFound } from './errors/notFound';

export const httpHelpers = {
  errors: {
    badRequest,
    notAcceptable,
    notFound,
  },
};
