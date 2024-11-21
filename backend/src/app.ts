import fastify from 'fastify';

export const app = fastify();

app.get('/ping', async () => {
  return 'pong\n';
});
