import axios, { AxiosInstance, AxiosError } from 'axios';
import { getSession } from '@/actions/getSession';
import { API_ROUTE, loginRoute } from '@/routes';
import { logout } from '@/actions/logout';

export const AuthenticatedAxiosInstance = async (): Promise<AxiosInstance> => {
  try {
    const session = await getSession();
    const token = session?.token;

    const instance = axios.create({
      baseURL: API_ROUTE,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      // withCredentials: true,
    });

    instance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        if (config.method?.toLowerCase() === 'options') {
          config.headers['Access-Control-Request-Method'] = 'GET,POST,PUT,DELETE,OPTIONS';
          config.headers['Access-Control-Request-Headers'] = 'Content-Type,Authorization';
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error.response) {
          console.error('Response error:', error.response.status, error.response.data);
          if (error.response.status === 401) {
            // Gérer le rafraîchissement du token ici
            // Exemple : const newToken = await refreshToken();
            // Si un nouveau token est obtenu, réessayer la requête
            await logout();
            if (typeof window !== 'undefined') {
              window.location.href = `${process.env.NEXT_PUBLIC_APP_URL}${loginRoute}`;
            } else {
              const { redirect } = await import('next/navigation');
              redirect(`${process.env.NEXT_PUBLIC_APP_URL}${loginRoute}`);
            }
          }
        } else if (error.request) {
          console.error('Request error:', error.request);
        } else {
          console.error('Error:', error.message);
        }

        if (error.message === 'Network Error') {
          console.error('Possible CORS error. Check your CORS configuration on the server side.');
        }

        return Promise.reject(error);
      }
    );

    return instance;
  } catch (error) {
    console.error('Failed to create authenticated Axios instance:', error);
    throw error;
  }
};
