import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { httpHelpers } from '../../httpHelpers';
import { rideServices } from '../../service/ride';

const routeSchema = z
  .object({
    customer_id: z
      .string({
        required_error: 'O id do consumidor é necessário',
        invalid_type_error: 'O id do consumidor precisa ser uma string',
      })
      .min(1, {
        message: 'O id do consumidor precisa ter no mínimo 1 caractere',
      }),
    driver_id: z.coerce
      .number({
        invalid_type_error: 'O id do motorista precisa ser um number',
      })
      .nullish(),
  })
  .transform((data) => {
    const { customer_id, driver_id, ...rest } = data;

    return {
      ...rest,
      customerId: customer_id,
      driverId: driver_id,
    };
  });

export const getRidesController = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { error, data, success } = routeSchema.safeParse(
    Object.assign({}, req.body, req.params, req.query)
  );

  if (!success) {
    const response = httpHelpers.errors.badRequest('INVALID_DATA', error);
    return reply.status(response.statusCode).send(response.data);
  }

  const response = await rideServices.getRidesByCustomer(data);

  return reply.status(response.statusCode).send(response.data);
};
