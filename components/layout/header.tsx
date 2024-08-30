'use client'
import ThemeToggle from '@/components/layout/ThemeToggle/theme-toggle';
// import Topnav from "@/components/topnav";
import {MobileSidebar} from "@/components/layout/mobile-sidebar";
import {BackButton} from "@/components/buttons";
import React, {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import LogoutButton from "@/components/auth/logout-button";
import {SessionData} from "@/lib/session";

interface HeaderProps {
    session: SessionData;
}

const Header: React.FC<HeaderProps> = ({ session }) => {
    const pathname = usePathname();
    const [isHomePage, setIsHomePage] = useState(true);


    useEffect(() => {
        setIsHomePage(pathname === '/');
    }, [pathname]);
    return (
        <header className="sticky inset-x-0 top-0 w-full">
            <nav className="flex items-center justify-between md:justify-end lg:justify-between px-4 py-2">
                <div className='block md:!hidden'>
                    <MobileSidebar />
                    {/*<Topnav/>*/}
                </div>
                {!isHomePage && (
                    <div className="hidden lg:flex lg:flex-row items-center gap-2 ">
                        <BackButton />
                        <p className="text-sm">Return</p>
                    </div>
                )}
                <div className="flex items-center md:text-center gap-2">
                    {/*<UserNav />*/}
                    <ThemeToggle />
                    {session.id && <LogoutButton/>}
                </div>
            </nav>
        </header>
    );
}

export default Header