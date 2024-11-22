import { FastifyReply } from 'fastify';
import { ZodError } from 'zod';

export const badRequestError = (
  reply: FastifyReply,
  error: ZodError
): FastifyReply => {
  return reply.status(400).send({
    error_code: 'INVALID_DATA',
    error_description: error.errors.map((err) => err.message).join(', '),
  });
};
