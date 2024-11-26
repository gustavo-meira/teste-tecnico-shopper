import { z } from 'zod';

export const formEstimateRideSchema = z.object({
  customer_id: z.string(),
  origin: z.string(),
  destination: z.string(),
});

export type FormEstimateRideSchemaInput = z.input<
  typeof formEstimateRideSchema
>;
export type FormEstimateRideSchemaOutput = z.output<
  typeof formEstimateRideSchema
>;
