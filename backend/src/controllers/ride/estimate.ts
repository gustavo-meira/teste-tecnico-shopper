import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import { httpHelpers } from '../../httpHelpers';
import { rideServices } from '../../service/ride';

const routeSchema = z
  .object(
    {
      customer_id: z
        .string({
          required_error: 'O id do consumidor é necessário',
          invalid_type_error: 'O id do consumidor precisa ser uma string',
        })
        .min(1, {
          message: 'O id do consumidor precisa ter no mínimo 1 caractere',
        }),
      origin: z
        .string({
          required_error: 'A origem é necessário',
          invalid_type_error: 'A origem precisa ser uma string',
        })
        .min(1, {
          message: 'A origem precisa ter no mínimo 1 caractere',
        }),
      destination: z
        .string({
          required_error: 'O destino é necessário',
          invalid_type_error: 'O destino precisa ser uma string',
        })
        .min(1, {
          message: 'O destino precisa ter no mínimo 1 caractere',
        }),
    },
    {
      required_error:
        'O body da requisição precisa ser um objeto com as seguintes chaves: "customer_id", "origin" e "destination"',
      invalid_type_error:
        'O body da requisição precisa ser um objeto com as seguintes chaves: "customer_id", "origin" e "destination"',
    }
  )
  .refine((data) => data.origin !== data.destination, {
    message: 'A origem e o destino precisam ser endereços diferentes',
    path: ['origin', 'destination'],
  })
  .transform((data) => ({
    customerId: data.customer_id,
    origin: data.origin,
    destination: data.destination,
  }));

export const estimateController = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { error, data, success } = routeSchema.safeParse(req.body);

  if (!success) {
    const response = httpHelpers.errors.badRequest('INVALID_DATA', error);
    return reply.status(response.statusCode).send(response.data);
  }

  const response = await rideServices.estimate(data.origin, data.destination);

  return reply.status(response.statusCode).send(response.data);
};
