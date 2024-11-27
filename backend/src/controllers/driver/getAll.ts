import { FastifyReply, FastifyRequest } from 'fastify';
import { driverService } from '../../service/driver';

export const getAllDriversController = async (
  _req: FastifyRequest,
  reply: FastifyReply
) => {
  const response = await driverService.getAll();

  return reply.status(response.statusCode).send(response.data);
};
