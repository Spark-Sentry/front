import React from 'react';
import {CalendarDays} from "lucide-react";
import OverviewCard from "@/components/ui/overview-card";
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

const PeriodsOverview: React.FC<PeriodsCardProps> = ({ dates }) => {

    const currentYear = dates.performance[dates.performance.length - 1];
    const currentYearProgress = calculateProgress(currentYear.start, currentYear.end);
    return (
        <div className="w-full flex flex-col gap-4">
            <OverviewCard title="Current Performance Year" icon={<CalendarDays className="w-8 h-8 text-primary" />}>
                <div className="space-y-4">
                    <div className="flex flex-row gap-2 justify-between items-center">
                        <span className="text-sm text-gray-600">
                            {formatDate(currentYear.start)}
                        </span>
                        <span className="font-medium text-lg">{currentYear.name}</span>
                        <span className="text-sm text-gray-600">
                            {formatDate(currentYear.end)}
                        </span>
                    </div>
                    <div className="space-y-2">
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                                className="bg-blue-600 h-3 rounded-full transition-all duration-500 ease-in-out"
                                style={{ width: `${currentYearProgress * 100}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Start</span>
                            <span className="font-semibold">{Math.round(currentYearProgress * 100)}% completed</span>
                            <span>End</span>
                        </div>
                    </div>
                </div>
            </OverviewCard>
        </div>
    );
};

export default PeriodsOverview;