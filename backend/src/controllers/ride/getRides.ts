import { Driver } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { driverDb } from '../../data/driver';
import { rideDb } from '../../data/ride';
import { httpHelpers } from '../../httpHelpers';

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

  let driver: null | Driver = null;

  if (data.driverId) {
    driver = await driverDb.getById(data.driverId);

    if (driver == null) {
      const response = httpHelpers.errors.badRequest('INVALID_DRIVER');
      return reply.status(response.statusCode).send(response.data);
    }
  }

  const rides = await rideDb.getByCustomer(data.customerId, driver?.id);

  if (rides.length === 0) {
    const response = httpHelpers.errors.notFound('NO_RIDES_FOUND');
    return reply.status(response.statusCode).send(response.data);
  }

  const response = httpHelpers.success.ok({
    customer_id: data.customerId,
    rides: rides.map((ride) => ({
      id: ride.id,
      date: ride.date,
      origin: ride.origin,
      destination: ride.destination,
      distance: ride.distance,
      duration: ride.duration,
      driver: {
        id: ride.driver.id,
        name: ride.driver.name,
      },
      value: ride.value,
    })),
  });

  return reply.status(response.statusCode).send(response.data);
};
