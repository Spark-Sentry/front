
'use client';
import React from 'react';
import ThemeProvider from "@/components/layout/ThemeToggle/theme-provider";
// import { SessionProvider, SessionProviderProps } from 'next-auth/react';
export default function Providers({
                                      // session,
                                      children
                                  }: {
    // session: SessionProviderProps['session'];
    children: React.ReactNode;
}) {
    return (
        <>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                {/*<SessionProvider session={session}>*/}
                    {children}
                {/*</SessionProvider>*/}
            </ThemeProvider>
        </>
    );
}
// "use client"
//
// import * as React from "react"
// import { ThemeProvider as NextThemesProvider } from "next-themes"
// import { type ThemeProviderProps } from "next-themes/dist/types"
//
// export function Providers({ children, ...props }: ThemeProviderProps) {
//     return <NextThemesProvider {...props}>{children}</NextThemesProvider>
// }
