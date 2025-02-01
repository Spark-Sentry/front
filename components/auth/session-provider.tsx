'use client';
import React, { createContext, useContext } from 'react';
import { SessionData } from '@/lib/session';

const SessionContext = createContext<SessionData | null>(null);

export function SessionProvider({ children, value }: { children: React.ReactNode; value: SessionData }) {
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const session = useContext(SessionContext);
  if (!session) throw new Error('useSession must be used within SessionProvider');
  return session;
}
