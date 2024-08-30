import { SessionOptions } from 'iron-session';

export interface SessionData {
  id?: number;
  username?: string;
  email?: string;
  isLoggedIn: boolean;
  roles?: string[];
  token?: string;
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.AUTH_SECRET!,
  cookieName: 'gns-session',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  },
};
