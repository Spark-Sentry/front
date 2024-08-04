'use client'
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ModeToggle } from "@/components/ui/modeToggle";
import AddEnergyBillModal from "@/components/addEnergyBillModal";
import { BackButton } from "@/components/buttons";

const Topnav = () => {
    const pathname = usePathname();
    const [isHomePage, setIsHomePage] = useState(true);

    useEffect(() => {
        setIsHomePage(pathname === '/');
    }, [pathname]);

    return (
        <div className="hidden xl:flex flex-col flex-1">
            <nav className="bg-white dark:bg-slate-900 text-gray-900">
                <div className="flex justify-end items-center p-1 gap-2">
                    <div className="flex items-center gap-2 w-full ml-2 text-slate-950 dark:text-slate-50">
                        {!isHomePage && (
                            <>
                                <BackButton />
                                <p className="">Return</p>
                            </>
                        )}
                    </div>
                    <AddEnergyBillModal />
                    <ModeToggle />
                </div>
            </nav>
        </div>
    );
};

export default Topnav;