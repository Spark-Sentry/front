'use client'
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import {Button} from "@/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {CalendarClockIcon, AirVentIcon, LightbulbIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar";
import React from "react";
import EnergyMeasuresList from "@/components/building/energyMeasuresList";
import {BackButton} from "@/components/buttons";
import FinancialSummaryTable from "@/components/building/financialSummaryTable";
import SavingsLineChart from "@/components/building/savingsLineChart";
import PerformanceBarChart from "@/components/building/performanceBarChart";
import DistributionByMeasure from "@/components/building/distributionByMeasure";

const energyMeasures = [
    {
        id: 1,
        name: "Variable Frequency Drive",
        goal: "20% reduction",
        actual: "18% reduction",
        naturalGasSaved: "12,345 therms",
        electricitySaved: "45,678 kWh",
        icon: <LightbulbIcon/>
    },
    {
        id: 2,
        name: "HVAC Optimization",
        goal: "15% reduction",
        actual: "17% reduction",
        naturalGasSaved: "6,789 therms",
        electricitySaved: "23,456 kWh",
        icon: <AirVentIcon/>
    }
];
const data2022 = [
    { month: "01/01/2022", savings: 19000 },
    { month: "02/01/2022", savings: 20000 },
    { month: "03/01/2022", savings: 16000 },
    { month: "04/01/2022", savings: 22000 },
    { month: "05/01/2022", savings: 21000 },
    { month: "06/01/2022", savings: 23000 },
    { month: "07/01/2022", savings: 19000 },
    { month: "08/01/2022", savings: 26000 },
    { month: "09/01/2022", savings: 21000 },
    { month: "10/01/2022", savings: 17000 },
    { month: "11/01/2022", savings: 16000 },
    { month: "12/01/2022", savings: 13000 },
];

const data2023 = [
    { month: "01/01/2023", savings: 20000 },
    { month: "02/01/2023", savings: 22000 },
    { month: "03/01/2023", savings: 18000 },
    { month: "04/01/2023", savings: 24000 },
    { month: "05/01/2023", savings: 20000 },
    { month: "06/01/2023", savings: 25000 },
    { month: "07/01/2023", savings: 18000 },
    { month: "08/01/2023", savings: 28000 },
    { month: "09/01/2023", savings: 23000 },
    { month: "10/01/2023", savings: 21000 },
    { month: "11/01/2023", savings: 19000 },
    { month: "12/01/2023", savings: 15000 },
];

const data2024 = [
    { month: "01/01/2023", savings: 18000 },
    { month: "02/01/2023", savings: 20000 },
    { month: "03/01/2023", savings: 21000 },
    { month: "04/01/2023", savings: 23000 },
    { month: "05/01/2023", savings: 19000 },
    { month: "06/01/2023", savings: 23000 },
    { month: "07/01/2023", savings: 16000 },
    { month: "08/01/2023", savings: 18000 },
    { month: "09/01/2023", savings: 24000 },
    { month: "10/01/2023", savings: 25000 },
    { month: "11/01/2023", savings: 21000 },
    { month: "12/01/2023", savings: 17000 },
];

const datasets = [
    { id: '2022', data: data2022 },
    { id: '2023', data: data2023 },
    { id: '2024', data: data2024 },
];

const totalDataKwh=[
    { name: "2022", count: 12000 },
    { name: "2023", count: 12560 },
    { name: "2024", count: 13400 },
]

const totalData$=[
    { name: "2022", count: 33000 },
    { name: "2023", count: 37000 },
    { name: "2024", count: 35500 },
]

const totalDataGES=[
    { name: "2022", count: 111 },
    { name: "2023", count: 157 },
    { name: "2024", count: 170 },
]

const target = {
    GES:130,
    $:34000,
    kWh:12000,
    m3:9000
};

export default function Page() {
    return (
        <>
            <div className="pl-6 pr-6 pt-4 flex flex-col gap-4">
                <div className="flex items-center gap-4 flex-col xl:flex-row">
                    <div className="flex items-center gap-4 w-full">
                        <BackButton/>
                        <h1 className="font-semibold text-lg md:text-2xl">Building Energy Dashboard</h1>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <Button className="hidden sm:flex" variant="outline">
                            Today
                        </Button>
                        <Button className="hidden md:flex" variant="outline">
                            This Month
                        </Button>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button className="w-[280px] justify-start text-left font-normal" id="date"
                                        variant="outline">
                                    <CalendarClockIcon className="mr-2 h-4 w-4"/>
                                    June 01, 2023 - June 30, 2023
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent align="end" className="w-auto p-0">
                                <Calendar initialFocus mode="range" numberOfMonths={2}/>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <DashboardCard title="Key numbers">
                        <FinancialSummaryTable/>
                    </DashboardCard>
                    <DashboardCard title="Tons GES saved per year">
                        <PerformanceBarChart data={totalDataGES} target={target.GES} unit="t GES"/>
                    </DashboardCard>
                    <DashboardCard title="$ saved per year">
                        <PerformanceBarChart data={totalData$} target={target.$} unit="$ (taxes inc.)"/>
                    </DashboardCard>
                </div>
                <h1 className="text-2xl font-semibold leading-none tracking-tight">Electricity performance [kWh]</h1>
                <div className="rounded-lg border bg-card shadow-sm p-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <SavingsLineChart datasets={datasets} unit="kWh"/>
                        <PerformanceBarChart data={totalDataKwh} target={target.kWh} unit="kWh"/>
                        <DistributionByMeasure/>
                    </div>
                </div>
                <h1 className="text-2xl font-semibold leading-none tracking-tight">Natural Gas performance [m³]</h1>
                <div className="rounded-lg border bg-card shadow-sm p-2" title="Electricity performance">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <SavingsLineChart datasets={datasets} unit="m³"/>
                        <PerformanceBarChart data={totalDataKwh} target={target.m3} unit="m³"/>
                        <DistributionByMeasure/>
                    </div>
                </div>
                <DashboardCard title="Energy Efficiency Measures">
                    <EnergyMeasuresList energyMeasures={energyMeasures}/>
                </DashboardCard>
            </div>
        </>
    )
}

interface DashboardCardProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

function DashboardCard({title, children, className}: DashboardCardProps) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    )
}

interface DashboardItemProps {
    label: string;
    value: string;
}

