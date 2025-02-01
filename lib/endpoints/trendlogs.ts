import { AuthenticatedAxiosInstance } from '@/lib/authenticatedAxiosInstance';
import { TRENDLOGS } from '@/routes';
import { Building, Trendlog } from '@/lib/types';
import { z } from 'zod';
import { BuildingException } from '@/lib/endpoints/buildings';
import { TrendlogSchema } from '@/lib/schemas/trendlogs';

export class TrendlogException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TrendlogException';
  }
}

export const getTrendlog = async (trendlogData: z.infer<typeof TrendlogSchema>): Promise<Trendlog[]> => {
  const protectedAxios = await AuthenticatedAxiosInstance();

  const validation = TrendlogSchema.safeParse(trendlogData);
  if (!validation.success) {
    throw new TrendlogException(validation.error.errors[0].message);
  }

  try {
    const { data } = await protectedAxios.post(TRENDLOGS, trendlogData);
    return data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new BuildingException('Authentication failed. Please log in again.');
    }
    if (error.response?.status === 400) {
      throw new BuildingException(error.response.data.message || 'Invalid trendlog data provided.');
    }
    throw new BuildingException('Failed to get trendlog. Please try again later.');
  }
};
