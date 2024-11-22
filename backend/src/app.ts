import fastify from 'fastify';
import { rideControllers } from './controllers/ride';

export const app = fastify();

app.post('/ride/estimate', rideControllers.estimate);
