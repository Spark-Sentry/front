'use server';
import { LoginSchema } from '@/lib/schemas/auth';
import { getSession } from '@/actions/getSession';
import { redirect } from 'next/navigation';
import { postLogin } from '@/lib/endpoints/auth';
import { TypeOf } from 'zod';
import {logger} from "@/helpers/logger";

export const login = async (values: TypeOf<typeof LoginSchema>, callbackUrl: string | null) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, password } = validatedFields.data;

  const session = await getSession();

  try {
    const response = await postLogin(email, password);
    if (response?.data) {
      // session.id = response?.user.id;
      // session.username = response?.user.name;
      // session.email = response?.user.email;
      session.isLoggedIn = true;
      // session.roles = response?.user.roles;
      session.token = response.data;

      await session.save();
    }
  } catch (error: any) {
    logger.error({ context: 'login:queryError', error });
    return { error: error.message };
  }
  session.isLoggedIn && redirect(callbackUrl || '/buildings');
};
