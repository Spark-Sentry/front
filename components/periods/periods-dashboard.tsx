import React from 'react';
import { CalendarDays } from "lucide-react";
import OperationCard from "@/components/operation/operation-card";
import {calculateProgress, formatDate} from "@/lib/utils";

interface Period {
    name: string;
    start: Date;
    end: Date;
}

interface Dates {
    reference: Period;
    performance: Period[];
}

interface PeriodsCardProps {
    dates: Dates;
}

const PeriodsDashboard: React.FC<PeriodsCardProps> = ({ dates }) => {

    const isCurrentPeriod = (period: Period): boolean => {
        const now = new Date();
        return now >= period.start && now <= period.end;
    };

    return (
            <OperationCard title="Periods" icon={<CalendarDays/>}>
                <ul className="space-y-4">
                    <li className="flex flex-col space-y-1">
                        <div className="flex justify-between items-center flex-col sm:flex-row">
                            <span className="font-medium text-gray-700 dark:text-slate-400">{dates.reference.name}</span>
                            <span className="text-sm text-gray-600 dark:text-slate-400">
                                {formatDate(dates.reference.start)} - {formatDate(dates.reference.end)}
                            </span>
                        </div>
                    </li>
                    {dates.performance.map((period, index) => (
                        <li key={index} className="flex flex-col space-y-1">
                            <div className="flex justify-between items-center flex-col sm:flex-row">
                                <span className="font-medium text-gray-700 dark:text-slate-100">
                                    {period.name}{isCurrentPeriod(period) ? " (Current)" : ""}
                                </span>
                                {isCurrentPeriod(period) && (
                                    <div className="relative w-2/5 md:w-1/2 h-4 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="absolute top-0 left-0 h-full bg-slate-500 rounded-full"
                                            style={{ width: `${calculateProgress(period.start, period.end) * 100}%` }}
                                        >
                                        <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
                                            {Math.round(calculateProgress(period.start, period.end) * 100)}%
                                        </span>
                                        </div>
                                    </div>
                                )}
                                <span className="text-sm text-gray-600 dark:text-slate-100">
                                    {formatDate(period.start)} - {formatDate(period.end)}
                                </span>
                            </div>

                        </li>
                    ))}
                </ul>
            </OperationCard>
    );
};

export default PeriodsDashboard;