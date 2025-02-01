import * as z from 'zod';

// --------------------- AUTHENTICATION
export const LoginSchema = z.object({
  email: z.string().email({ message: 'Email is required.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  account: z.object({
    name: z.string().min(1, { message: 'Account name is required' }),
    contactEmail: z.string().email({ message: 'Invalid contact email address' }),
    contactPhone: z
      .string()
      .min(10, { message: 'Phone number must be at least 10 characters' })
      .regex(/^\d+$/, { message: 'Phone number must contain only digits' }),
  }),
});
