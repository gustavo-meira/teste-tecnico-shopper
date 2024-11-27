import { z } from 'zod';

export const formEstimateRideSchema = z.object({
  customer_id: z.string().min(1, {
    message: 'O id do cliente precisa ter pelo menos 1 caractere',
  }),
  origin: z
    .string()
    .min(1, { message: 'A origem precisa ter pelo menos 1 caractere' }),
  destination: z
    .string()
    .min(1, { message: 'O destino precisa ter pelo menos 1 caractere' }),
});

export type FormEstimateRideSchemaInput = z.input<
  typeof formEstimateRideSchema
>;
export type FormEstimateRideSchemaOutput = z.output<
  typeof formEstimateRideSchema
>;
