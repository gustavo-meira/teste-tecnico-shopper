import cors from '@fastify/cors';
import fastify from 'fastify';
import { driverRoutes } from './routes/driver';
import { rideRoutes } from './routes/ride';

export const app = fastify();

app.register(cors);

app.register(rideRoutes, { prefix: '/ride' });
app.register(driverRoutes, { prefix: '/driver' });
