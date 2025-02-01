'use server';
import { API_ROUTE } from '@/routes';
import axios from 'axios';
import { UserResponse } from '@/lib/types';

class LoginException extends Error {
  constructor(public message: string) {
    super(message);
  }
}

class UserException extends Error {
  constructor(public message: string) {
    super(message);
  }
}

export const postLogin = async (email: string, password: string): Promise<UserResponse | undefined> => {
  try {
    const { data } = await axios.post(
      API_ROUTE + '/login',
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'PUT, POST, PATCH, DELETE, GET',
        },
      }
    );
    return data;
  } catch (error) {
    const errorMessage = 'Invalid credentials';
    throw new LoginException(errorMessage);
  }
};

type RegisterData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  account: {
    name: string;
    contactEmail: string;
    contactPhone: string;
  };
};

export const postRegister = async (data: RegisterData): Promise<any> => {
  try {
    const response = await axios.post(`${API_ROUTE}/register`, data, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
      throw new UserException(`Register failed: ${error.response?.data?.message || error.message}`);
    } else {
      console.error('Unexpected error:', error);
      throw new UserException('An unexpected error occurred during registration');
    }
  }
};
