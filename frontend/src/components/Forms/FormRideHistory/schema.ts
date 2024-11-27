import { z } from 'zod';

export const FormRideHistorySchema = z.object({
  customer_id: z
    .string()
    .min(1, { message: 'O id do cliente precisa ter pelo menos 1 caractere' }),
  driver_id: z
    .string()
    .optional()
    .transform((driverId) => {
      if (driverId == null || driverId === 'null') return null;
      return driverId;
    }),
});

export type FormRideHistorySchemaInput = z.input<typeof FormRideHistorySchema>;
export type FormRideHistorySchemaOutput = z.output<
  typeof FormRideHistorySchema
>;
