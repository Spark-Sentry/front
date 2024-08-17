import React from 'react';
import TrendlogChart from "@/components/operation/trendlog-chart";
import { Thermometer, CircleGauge} from "lucide-react";
import {BackButton} from "@/components/buttons";


const OperationDashboard: React.FC = () => {
    const generateData = (startDate: Date, hours: number, baseValue: number, fluctuation: number, setpointDiff: number) => {
        const data = [];
        for (let i = 0; i < hours; i++) {
            const currentDate = new Date(startDate);
            currentDate.setHours(currentDate.getHours() + i);
            const value = baseValue + (Math.random() - 0.5) * fluctuation;
            const setpoint = baseValue + setpointDiff + (Math.random() - 0.5) * (fluctuation / 2);
            data.push({
                timestamp: currentDate.toISOString(),
                value: Number(value.toFixed(1)),
                setpoint: Number(setpoint.toFixed(1))
            });
        }
        return data;
    };

    const supplyTempData = generateData(new Date('2023-01-01'), 24 * 365, 70, 10, 2);
    const modulationData = generateData(new Date('2023-01-01'), 24 * 365, 60, 20, 5);

    return (
        <div className="md:px-6 md:pt-4 rounded-md">
            <div className="flex flex-row items-center gap-4 mb-4">
                <BackButton/>
                <h1 className="font-semibold text-lg md:text-2xl">Building Operation Parameters</h1>
            </div>
            <div className="flex flex-col gap-4">
                <TrendlogChart title="Supply Temperature" data={supplyTempData} unit="°F" icon={<Thermometer/>}/>
                <TrendlogChart title="Modulation" data={modulationData} unit="%" icon={<CircleGauge/>}/>
            </div>
        </div>
    );
};

export default OperationDashboard;