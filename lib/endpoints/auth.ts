'use server';
// import axios from 'axios';
// import { API_ROUTE } from '@/routes';
import {UserResponse} from "@/lib/types/auth";

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


export const postLogin = async (email: string, password: string): Promise<UserResponse> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  if (email === 'user@example.com' && password === 'password123') {
    return {
      user: {
        id: 1,
        name: 'John Doe',
        email: 'user@example.com',
        roles: ['USER'],
      },
      token: 'fake-jwt-token',
    };
  } else {
    throw new LoginException('Invalid credentials');
  }
};

export const postRegister = async (name: string, email: string, password: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  if (email === 'existing@example.com') {
    throw new UserException('Email already exists');
  }

  return 'Registration successful';
};


// export const postLogin = async (email: string, password: string): Promise<UserResponse | undefined> => {
//   try {
//     const { data } = await axios.post(API_ROUTE + '/api/login', { username: email, password });
//     return data;
//   } catch (error) {
//     const errorMessage = 'Invalid credentials';
//     throw new LoginException(errorMessage);
//   }
// };

// export const postRegister = async (name: string, email: string, password: string): Promise<string | undefined> => {
//   try {
//     const { data } = await axios.post(API_ROUTE + '/register', { name, email, password });
//     return data;
//   } catch (error) {
//     const errorMessage = 'Register failed';
//     throw new UserException(errorMessage);
//   }
// };
