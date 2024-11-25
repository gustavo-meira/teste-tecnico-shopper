import { FastifyInstance } from 'fastify';
import { rideControllers } from '../controllers/ride';

export const rideRoutes = (app: FastifyInstance) => {
  app.post('/estimate', rideControllers.estimate);
  app.patch('/confirm', rideControllers.confirm);
  app.get('/:customer_id', rideControllers.getRides);
};
