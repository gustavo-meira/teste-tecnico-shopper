import { HttpResponse } from '../httpHelper';

export const ok = (data: any): HttpResponse => {
  return {
    statusCode: 200,
    data,
  };
};
