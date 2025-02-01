import * as z from 'zod';

export const TrendlogSchema = z.object({
  bucket: z.string().min(1, { message: 'Building name is required' }),
  timeStart: z
    .string()
    .min(1, { message: 'Start time is required' })
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/, {
      message: 'Start time must be in ISO 8601 format (YYYY-MM-DDThh:mm:ssZ)',
    }),
  timeStop: z
    .string()
    .min(1, { message: 'Stop time is required' })
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/, {
      message: 'Stop time must be in ISO 8601 format (YYYY-MM-DDThh:mm:ssZ)',
    }),
  idParameters: z.array(z.string()).min(1, { message: 'At least one parameter ID is required' }),
});
