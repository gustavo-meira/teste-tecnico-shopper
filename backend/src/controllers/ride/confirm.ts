import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { driverDb } from '../../data/driver';
import { rideDb } from '../../data/ride';
import { badRequestError } from '../../errors/badRequestError';
import { notAcceptableError } from '../../errors/notAcceptableError';
import { notFoundError } from '../../errors/notFoundError';

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
    distance: z
      .number({
        required_error: 'A distancia é necessária',
        invalid_type_error: 'A distancia precisa ser um number',
      })
      .nonnegative({
        message: 'A distancia não pode ser negativa',
      }),
    duration: z
      .string({
        required_error: 'A duração é necessária',
        invalid_type_error: 'A duração precisa ser uma string',
      })
      .min(1, {
        message: 'A duração precisa ter no mínimo 1 caractere',
      }),
    driver: z.object({
      id: z
        .number({
          required_error: 'O id do motorista é necessário',
          invalid_type_error: 'O id do motorista precisa ser um number',
        })
        .nonnegative({
          message: 'O id do motorista não pode ser negativo',
        }),
      name: z
        .string({
          required_error: 'O nome do motorista é necessário',
          invalid_type_error: 'O nome do motorista precisa ser uma string',
        })
        .min(1, {
          message: 'O nome do motorista precisa ter no mínimo 1 caractere',
        }),
    }),
    value: z
      .number({
        required_error: 'O valor é necessário',
        invalid_type_error: 'O valor precisa ser um number',
      })
      .nonnegative({
        message: 'O valor não pode ser negativo',
      }),
  })
  .transform((data) => {
    const { customer_id, ...rest } = data;

    return {
      ...rest,
      customerId: customer_id,
    };
  });

export const rideConfirmController = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { success, data, error } = routeSchema.safeParse(req.body);

  if (!success) {
    return badRequestError(reply, error);
  }

  const chosenDriver = await driverDb.getById(data.driver.id);

  if (chosenDriver == null || chosenDriver.name !== data.driver.name) {
    const response = notFoundError('DRIVER_NOT_FOUND');
    return reply.status(response.statusCode).send(response.data);
  }

  if (chosenDriver.minKmDistance > data.distance / 1000) {
    const response = notAcceptableError('INVALID_DISTANCE');
    return reply.status(response.statusCode).send(response.data);
  }

  await rideDb.create({
    customerId: data.customerId,
    destination: data.destination,
    origin: data.origin,
    distance: data.distance,
    duration: data.duration,
    value: data.value,
    driver: chosenDriver,
  });

  return reply.status(200).send({ success: true });
};