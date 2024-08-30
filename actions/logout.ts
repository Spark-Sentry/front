'use server';

import { getSession } from '@/actions/getSession';

export const logout = async () => {
  try {
    const session = await getSession();

    if (!session) {
      console.error('No active session found');
      return { success: false, error: 'No active session', shouldRedirect: true };
    }

    session.destroy();

    return { success: true, shouldRedirect: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false, error: 'Logout failed', shouldRedirect: false };
  }
};