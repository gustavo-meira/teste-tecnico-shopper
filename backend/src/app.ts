import fastify, { FastifyReply } from 'fastify';
import { z, ZodError } from 'zod';
import { googleMaps } from './data/googleMaps';
import { prisma } from './lib/prisma';

export const app = fastify();

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

const badRequestError = (
  reply: FastifyReply,
  error: ZodError
): FastifyReply => {
  return reply.status(400).send({
    error_code: 'INVALID_DATA',
    error_description: error.errors.map((err) => err.message).join(', '),
  });
};

app.post('/ride/estimate', async (req, reply) => {
  const { error, data, success } = routeSchema.safeParse(req.body);

  if (!success) {
    return badRequestError(reply, error);
  }

  const googleResponse = await googleMaps.getDirections(
    data.origin,
    data.destination
  );

  const driversAvailable = (
    await prisma.driver.findMany({
      where: {
        minKmDistance: {
          lte: googleResponse.routes[0].distanceMeters / 1000,
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        vehicle: true,
        ratePerKm: true,
        reviews: {
          select: {
            rating: true,
            comment: true,
          },
        },
      },
    })
  ).map((driver) => ({
    id: driver.id,
    name: driver.name,
    description: driver.description,
    vehicle: driver.vehicle,
    review: driver.reviews[0],
    value:
      Number(driver.ratePerKm.toString()) *
      (googleResponse.routes[0].distanceMeters / 1000),
  }));

  const response = {
    origin: googleResponse.routes[0].legs[0].startLocation,
    destination: googleResponse.routes[0].legs[0].endLocation,
    distance: googleResponse.routes[0].distanceMeters,
    duration: googleResponse.routes[0].duration,
    options: driversAvailable,
    routeResponse: googleResponse,
  };

  return reply.status(200).send(response);
});
