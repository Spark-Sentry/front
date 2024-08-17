import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Sigma, Zap, Flame, Leaf } from 'lucide-react';

type Unit = 'm3' | 'kWh' | 'GJ' | 'tCO2e';

interface TotalValue {
    year?: number;
    month?: number;
    amount: number;
    percentage?: number;
}

interface TotalCardProps {
    unit: Unit;
    values: TotalValue[];
}

const UNIT_CONFIG: Record<Unit, {
    icon: React.ReactNode;
    title: string;
    display: React.ReactNode;
}> = {
    'm3': {
        icon: <Flame className="w-7 h-7 text-red-500" />,
        title: "Natural Gas",
        display: <span>m<sup>3</sup></span>,
    },
    'kWh': {
        icon: <Zap className="w-7 h-7 text-blue-500" />,
        title: "Electricity",
        display: "kWh",
    },
    'GJ': {
        icon: <Sigma className="w-7 h-7 text-yellow-500" />,
        title: "Elec. + gas",
        display: "GJ",
    },
    'tCO2e': {
        icon: <Leaf className="w-7 h-7 text-green-700" />,
        title: "Emissions",
        display: <span>tCO<sub>2</sub>e</span>,
    },
};

const formatMonth = (month: number): string =>
    month === 0 ? "Target" : new Date(2000, month - 1, 1).toLocaleString('en-US', { month: 'long' });

const formatNumber = (value: number, style?: string): string =>
    new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 2,
        style,
        ...(style === 'percent' && { minimumFractionDigits: 0 })
    }).format(style === 'percent' ? value : value);

export const TotalCard: React.FC<TotalCardProps> = ({ unit, values }) => {
    const targetValue = values.find(v => v.month === 0);
    const monthValues = values.filter(v => v.month !== 0).sort((a, b) => b.year! - a.year!);

    const getColorClass = (value: number) => value >= 0 ? 'text-green-500' : 'text-red-500';

    return (
        <Card className="bg-white dark:bg-slate-900 bg-opacity-90 w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
                <div className="flex flex-row items-center gap-2 w-full">
                    <CardTitle className="text-lg font-semibold dark:text-slate-300">{UNIT_CONFIG[unit].title}</CardTitle>
                    <div className="text-md text-slate-950 dark:text-slate-300">[{UNIT_CONFIG[unit].display}]</div>
                </div>
                {UNIT_CONFIG[unit].icon}
            </CardHeader>
            <CardContent className="px-4">
                <div className="flex flex-col items-end gap-2">
                    {monthValues.map((value, index) => (
                        <div key={index} className="flex flex-row items-center gap-2 justify-between w-full">
                            {value.year && <span className="text-lg text-slate-950 dark:text-slate-300">{value.year}</span>}
                            {value.month !== undefined && <span className="text-lg text-slate-950 dark:text-slate-300">{formatMonth(value.month)}</span>}
                            <span className={`text-2xl font-semibold ${getColorClass(value.amount)}`}>{formatNumber(value.amount)}</span>
                            {value.percentage !== undefined && <span className={`text-2xl font-semibold ${getColorClass(value.percentage)}`}>{formatNumber(value.percentage, 'percent')}</span>}
                        </div>
                    ))}
                    {targetValue && (
                        <div className="flex flex-row items-center gap-4 text-gray-500 text-sm">
                            <span>Target:</span>
                            <span>{formatNumber(targetValue.amount)}</span>
                            {targetValue.percentage !== undefined && <span>{formatNumber(targetValue.percentage, 'percent')}</span>}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};