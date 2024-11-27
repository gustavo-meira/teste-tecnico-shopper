import { z } from 'zod';

export const FormRideHistorySchema = z.object({
  customer_id: z.string(),
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
