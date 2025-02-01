import * as z from 'zod';
import { RegisterSchema } from '@/lib/schemas/auth';
import { postRegister } from '@/lib/endpoints/auth';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { firstName, lastName, email, password, account } = validatedFields.data;

  try {
    const response = await postRegister({
      email,
      password,
      firstName,
      lastName,
      account: {
        name: account.name,
        contactEmail: account.contactEmail,
        contactPhone: account.contactPhone,
      },
    });

    if (response) {
      return { success: 'Verify your emails!' };
    }
  } catch (error: any) {
    console.log('Error creating user:', error);
    return { error: error.message };
  }
};
