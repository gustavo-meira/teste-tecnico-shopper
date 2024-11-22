import axios from 'axios';
import fastify, { FastifyReply } from 'fastify';
import { z, ZodError } from 'zod';
import { env } from './lib/env';
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

  type Location = {
    latLng: {
      latitude: number;
      longitude: number;
    };
  };

  const googleResponse = await axios.post<{
    routes: [
      {
        legs: [
          {
            startLocation: Location;
            endLocation: Location;
          }
        ];
        distanceMeters: number;
        duration: string;
      }
    ];
  }>(
    'https://routes.googleapis.com/directions/v2:computeRoutes',
    {
      origin: { address: data.origin },
      destination: { address: data.destination },
      travelMode: 'DRIVE',
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': env.GOOGLE_API_KEY,
        'X-Goog-FieldMask':
          'routes.duration,routes.distanceMeters,routes.legs.startLocation,routes.legs.endLocation',
      },
    }
  );

  const driversAvailable = (
    await prisma.driver.findMany({
      where: {
        minKmDistance: {
          lte: googleResponse.data.routes[0].distanceMeters / 1000,
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
      (googleResponse.data.routes[0].distanceMeters / 1000),
  }));

  const response = {
    origin: {
      latitude:
        googleResponse.data.routes[0].legs[0].startLocation.latLng.latitude,
      longitude:
        googleResponse.data.routes[0].legs[0].startLocation.latLng.longitude,
    },
    destination: {
      latitude:
        googleResponse.data.routes[0].legs[0].endLocation.latLng.latitude,
      longitude:
        googleResponse.data.routes[0].legs[0].endLocation.latLng.longitude,
    },
    distance: googleResponse.data.routes[0].distanceMeters,
    duration: googleResponse.data.routes[0].duration,
    options: driversAvailable,
    routeResponse: googleResponse.data,
  };

  return reply.status(200).send(response);
});
