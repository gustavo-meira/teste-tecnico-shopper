import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  GOOGLE_API_KEY: z.string(),
});

export const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
});
