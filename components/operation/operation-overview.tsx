import React from 'react';
import {GaugeIcon, Thermometer, Wind, Droplets, Zap, Sun} from "lucide-react";
import OverviewCard from "@/components/ui/overview-card";
import ParameterCard from "@/components/operation/parameter-card";

interface OperationalParameter {
    name: string;
    icon: React.ReactNode;
    currentValue: number;
    monthlyAverage: number;
    unit: string;
}

const operationalParameters: OperationalParameter[] = [
    { name: "Supply Temperature", icon: <Thermometer className="w-6 h-6" />, currentValue: 71, monthlyAverage: 70, unit: "°F" },
    { name: "Air Flow Modulation", icon: <Wind className="w-6 h-6" />, currentValue: 83, monthlyAverage: 80, unit: "%" },
    { name: "Humidity", icon: <Droplets className="w-6 h-6" />, currentValue: 48, monthlyAverage: 52, unit: "%" },
    { name: "Power Consumption", icon: <Zap className="w-6 h-6" />, currentValue: 95, monthlyAverage: 98, unit: "kW" },
    { name: "Brightness", icon: <Sun className="w-6 h-6" />, currentValue: 480, monthlyAverage: 490, unit: "lux" },
];


const OperationOverview: React.FC = () => {

    return (
        <OverviewCard title="Operation" icon={<GaugeIcon className="w-8 h-8 text-primary" />}>
            <div className="grid grid-cols-3 gap-2 mb-4 md:hidden xl:grid text-sm font-semibold text-muted-foreground">
                <div>Parameter</div>
                <div className="text-right">Current Value</div>
                <div className="text-right">Monthly Average</div>
            </div>
            <div className="flex flex-col gap-2">
            {operationalParameters.map((param, index) => (
                    <ParameterCard key={index} param={param} />
                ))}
            </div>
        </OverviewCard>
    );
};

export default OperationOverview;