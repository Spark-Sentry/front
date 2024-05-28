'use client'
import React from 'react';
import Link from "next/link";
import {BuildingOffice2Icon, CalendarDaysIcon, UserGroupIcon, PowerIcon} from "@heroicons/react/24/outline";
import {GaugeIcon, DollarSignIcon, WrenchIcon, SparklesIcon} from "lucide-react"

const icon_style = "h-7 w-7 mr-2 text-gray-500 dark:text-gray-200";
interface NavItemProps {
    icon: React.ReactNode;
    text: string;
    href?: string;
}
function NavItem({ icon, text, href }: NavItemProps) {
    return (
        <Link key={text} href={href || "#"}>
            <div className="flex items-center px-4 py-2 rounded-md hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                {icon}
                <span>{text}</span>
            </div>
        </Link>
    );
}
const Sidenav = () => {
    return (
        <div className="flex h-screen">
            <div className="bg-gray-100 text-gray-900 w-64 p-6 flex flex-col justify-between shadow-lg dark:bg-gray-800 dark:border-gray-800">
                <div>
                    <Link key="Home" href="/">
                        <div className="flex items-center mb-8">
                            <SparklesIcon className="h-10 w-10 mr-2 text-gray-800 dark:text-gray-200" />
                            <span className="text-xl font-bold dark:text-gray-200">SparkSentry</span>
                        </div>
                    </Link>
                    <nav className="space-y-2">
                        <NavItem icon={<BuildingOffice2Icon className={icon_style} />} text="Buildings" href="/buildings" />
                        <NavItem icon={<WrenchIcon className={icon_style} />} text="HVAC" href="/hvac"/>
                        <NavItem icon={<GaugeIcon className={icon_style} />} text="Energy" href="/energy"/>
                        <NavItem icon={<DollarSignIcon className={icon_style} />} text="Financials" href="/financials"/>
                        <NavItem icon={<UserGroupIcon className={icon_style} />} text="Contacts" href="/contacts"/>
                        <NavItem icon={<CalendarDaysIcon className={icon_style} />} text="Calendar" href="calendar"/>
                    </nav>
                </div>
                <div>
                    <NavItem icon={<PowerIcon className={icon_style} />} text="Logout" />
                </div>
            </div>
        </div>
    )
};

export default Sidenav;

