import { AuthenticatedAxiosInstance } from '@/lib/authenticatedAxiosInstance';
import { API_ROUTE, BUILDINGS } from '@/routes';
import { z } from 'zod';
import { BuildingSchema } from '@/lib/schemas/buildings';
import { Building } from '@/lib/types';

export class BuildingException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BuildingException';
  }
}

export const getBuildings = async (): Promise<Building[]> => {
  const protectedAxios = await AuthenticatedAxiosInstance();
  try {
    const { data } = await protectedAxios.get(API_ROUTE + BUILDINGS);
    return data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new BuildingException('Authentication failed. Please log in again.');
    }
    throw new BuildingException('Failed to fetch buildings. Please try again later.');
  }
};

export const postBuilding = async (buildingData: z.infer<typeof BuildingSchema>): Promise<Building> => {
  const protectedAxios = await AuthenticatedAxiosInstance();

  const validation = BuildingSchema.safeParse(buildingData);
  if (!validation.success) {
    throw new BuildingException(validation.error.errors[0].message);
  }

  try {
    const { data } = await protectedAxios.post(BUILDINGS, buildingData);
    return data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new BuildingException('Authentication failed. Please log in again.');
    }
    if (error.response?.status === 400) {
      throw new BuildingException(error.response.data.message || 'Invalid building data provided.');
    }
    throw new BuildingException('Failed to create building. Please try again later.');
  }
};
