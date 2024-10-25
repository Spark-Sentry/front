import * as z from 'zod';
import {RegisterSchema} from "@/lib/schemas/auth";
import {postRegister} from "@/lib/endpoints/auth";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { name, email, password } = validatedFields.data;

  try {
    const response = await postRegister(name, email, password);

    if (response) {
      return { success: 'Verify your emails!' };
    }
  } catch (error: any) {
    console.log('Sorry, error when creating user.', error);
    return { error: error.message };
  }
};
