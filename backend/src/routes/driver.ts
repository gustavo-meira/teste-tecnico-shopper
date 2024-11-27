import { FastifyInstance } from 'fastify';
import { driverController } from '../controllers/driver';

export const driverRoutes = (app: FastifyInstance) => {
  app.get('/', driverController.getAll);
};
