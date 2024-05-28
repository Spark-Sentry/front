import React from 'react';
import {ModeToggle} from "@/components/ui/modeToggle";
import AddEnergyBillModal from "@/components/addEnergyBillModal";

const Topnav = () => {
    return (
        <div className="flex flex-col flex-1">
            <nav className="bg-white dark:bg-slate-900 text-gray-900">
                <div className="flex justify-end items-center p-1 gap-2">
                    <AddEnergyBillModal/>
                    <ModeToggle/>
                </div>
            </nav>
        </div>
    );
};

export default Topnav;