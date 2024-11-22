import { FastifyInstance } from 'fastify';
import { rideControllers } from '../controllers/ride';

export const rideRoutes = (app: FastifyInstance) => {
  app.post('/estimate', rideControllers.estimate);
};
