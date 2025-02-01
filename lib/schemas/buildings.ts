import * as z from 'zod';

export const BuildingSchema = z.object({
  name: z.string().min(1, { message: 'Building name is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  group: z.string().min(1, { message: 'Group is required' }),
});
