'use client'
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import {Button} from "@/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {CalendarClockIcon, AirVentIcon, SquareActivityIcon} from "lucide-react";
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
        goal: "1 558 GJ",
        actual: "3 742 GJ",
        naturalGasSaved: "77 502 m³",
        electricitySaved: "223 738 kWh",
        payback: "49 534 $",
        icon: <SquareActivityIcon/>
    },
    {
        id: 2,
        name: "Heat Pumps",
        goal: "1 036 GJ",
        actual: "510 GJ",
        naturalGasSaved: "16 809 m³",
        electricitySaved: "-35 179 kWh",
        payback: "6 533$",
        icon: <AirVentIcon/>
    }
];
const dataA1m3 = [
    { month: "06/01/2022", savings: 1101 },
    { month: "07/01/2022", savings: 97 },
    { month: "08/01/2022", savings: 680 },
    { month: "09/01/2022", savings: 5264 },
    { month: "10/01/2022", savings: 7257 },
    { month: "11/01/2022", savings: 10564 },
    { month: "12/01/2022", savings: 13419 },
    { month: "01/01/2022", savings: 14679 },
    { month: "02/01/2022", savings: 13633 },
    { month: "03/01/2022", savings: 12179 },
    { month: "04/01/2022", savings: 9636 },
    { month: "05/01/2022", savings: 5803 },
];

const dataA2m3 = [
    { month: "06/01/2023", savings: 1403 },
    { month: "07/01/2023", savings: 70 },
    { month: "08/01/2023", savings: 968 },
    { month: "09/01/2023", savings: 2657 },
    { month: "10/01/2023", savings: 6096 },
    { month: "11/01/2023", savings: 11573 },
    { month: "12/01/2023", savings: 13194 },
    { month: "01/01/2023", savings: 10712 },
    { month: "02/01/2023", savings: 9769 },
    { month: "03/01/2023", savings: 7129 },
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

const datasetsm3 = [
    { id: '2022', data: dataA1m3 },
    { id: '2023', data: dataA2m3 },
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
                        <SavingsLineChart datasets={datasetsm3} unit="kWh"/>
                        <PerformanceBarChart data={totalDataKwh} target={target.kWh} unit="kWh"/>
                        <DistributionByMeasure/>
                    </div>
                </div>
                <h1 className="text-2xl font-semibold leading-none tracking-tight">Natural Gas performance [m³]</h1>
                <div className="rounded-lg border bg-card shadow-sm p-2" title="Electricity performance">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <SavingsLineChart datasets={datasetsm3} unit="m³"/>
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

