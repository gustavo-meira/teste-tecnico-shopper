import fastify from 'fastify';
import { rideRoutes } from './routes/ride';

export const app = fastify();

app.register(rideRoutes, { prefix: '/ride' });
