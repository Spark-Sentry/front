import React, { ReactNode } from 'react';
import { Card } from "@/components/ui/card";

interface CustomCardProps {
    param: {
        icon: ReactNode,
        name: string,
        currentValue: number;
        monthlyAverage: number;
        unit: string;
    }
}

const ParameterCard: React.FC<CustomCardProps> = ({ param }) => {
    return (
        <Card className="overflow-hidden">
            <div className="flex flex-row md:flex-col xl:flex-row justify-between items-center p-4">
                <div className="flex items-center space-x-3 md:mb-2 xl:mb-0 w-1/2 md:w-full">
                    {param.icon}
                    <span className="text-sm font-medium">{param.name}</span>
                </div>
                <div className="flex flex-row w-2/5 md:w-full xl:w-1/2 md:flex-col xl:flex-row justify-between items-center space-x-4 md:space-x-0 md:space-y-2 xl:space-y-0 xl:space-x-4">
                    <div className="text-sm flex flex-row items-center gap-2">
                        <span className="text-center text-sm text-slate-500 hidden md:block xl:hidden">Current Value</span>
                        <span className="font-semibold">{param.currentValue}{param.unit}</span>
                    </div>
                    <div className="text-lg flex flex-row items-center gap-2">
                    <span className="text-center text-sm text-slate-500 hidden md:block xl:hidden">Monthly Average</span>
                        <span className="font-bold text-primary whitespace-nowrap">{param.monthlyAverage} {param.unit}</span>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ParameterCard;