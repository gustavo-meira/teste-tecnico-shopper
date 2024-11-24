import { badRequest } from './errors/badRequest';
import { notAcceptable } from './errors/notAcceptable';
import { notFound } from './errors/notFound';
import { ok } from './success/ok';

export const httpHelpers = {
  errors: {
    badRequest,
    notAcceptable,
    notFound,
  },
  success: {
    ok,
  },
};
