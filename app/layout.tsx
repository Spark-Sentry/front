import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { Inter } from 'next/font/google';
import './globals.css';
import React from "react";
import Providers from "@/components/layout/providers";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import {getSession} from "@/actions/getSession";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Next Shadcn',
    description: 'Basic dashboard with Next.js and Shadcn'
};

export default async function RootLayout({
                                             children
                                         }: {
    children: React.ReactNode;
}) {
    const session = await getSession()
    return (
        <html lang="en">
        <body
            className={`${inter.className} overflow-hidden `}
            suppressHydrationWarning={true}
        >
        <NextTopLoader showSpinner={false} />
        <Providers >
            <Toaster />
            <div className="flex">
                <Sidebar />
                <main className="w-full flex-1 overflow-hidden">
                    <Header session={session}/>
                    {children}
                </main>
            </div>
        </Providers>
        </body>
        </html>
    );
}