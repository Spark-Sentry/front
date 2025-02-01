'use client';
import React from 'react';
import ThemeProvider from '@/components/layout/ThemeToggle/theme-provider';
import { SessionProvider } from '@/components/auth/session-provider';
import { SessionData } from '@/lib/session';

interface ProvidersProps {
  session: SessionData;
  children: React.ReactNode;
}

export default function Providers({ session, children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider value={session}>{children}</SessionProvider>
    </ThemeProvider>
  );
}
