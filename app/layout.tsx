import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils"
import {ThemeProvider} from "@/components/theme-provider";
import Sidenav from "@/components/sidenav";
import React from "react";
import Topnav from "@/components/topnav";


const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})

export const metadata: Metadata = {
    title: "Spark Sentry - Homepage",
    description: "",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <html lang="en">
        <body className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
        )}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <div className="flex">
                <Sidenav/>
                <div className="w-full">
                    <Topnav/>
                    {children}
                </div>
            </div>
        </ThemeProvider>
        </body>
        </html>
    );
}