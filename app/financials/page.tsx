'use client'
import React, { useState } from 'react';
import {CalendarClockIcon} from "lucide-react";
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
import {Button} from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar"
import { Progress } from "@/components/ui/progress"
import { CardDescription, CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import FilledtimeseriesChart from "@/components/charts/filledtimeseriesChart";
import BarChart from "@/components/charts/barChart";
import CurvedlineChart from "@/components/charts/curvedlineChart";
import {BackButton} from "@/components/buttons";

interface FinancialItem {
    label: string;
    amount: string;
    isPositive?: boolean;
}

interface KpiSnapshotItem {
    label: string;
    value: number;
}

const financialItems: FinancialItem[] = [
    { label: "Energy Costs", amount: "$45,678" },
    { label: "Maintenance Expenses", amount: "$12,345" },
    { label: "Budget Projection", amount: "$75,000" },
    { label: "Net Savings", amount: "$17,000", isPositive: true },
];

const kpiSnapshotItems: KpiSnapshotItem[] = [
    { label: "Energy Efficiency", value: 85 },
    { label: "Maintenance Productivity", value: 92 },
    { label: "Budget Utilization", value: 78 }
];

function FinancialsPage() {
    const [selectedDate, setSelectedDate] = useState({
        startDate: new Date(2023, 5, 1),
        endDate: new Date(2023, 5, 30),
        key: 'selection',
    });

    return (
        <main className="pl-6 pr-6 pt-4 flex flex-col gap-4">
            <div className="flex items-center gap-4">
                <BackButton/>
                <h1 className="font-semibold text-lg md:text-2xl">Financials</h1>
                <div className="ml-auto flex items-center gap-2">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button className="w-[280px] justify-start text-left font-normal" id="date"
                                    variant="outline">
                                <CalendarClockIcon className="mr-2 h-4 w-4" />
                                {selectedDate.startDate.toLocaleDateString()} - {selectedDate.endDate.toLocaleDateString()}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align="end" className="w-auto p-0">
                            <Calendar initialFocus mode="range" numberOfMonths={2} />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <div className="grid gap-4">
                <div className="grid md:grid-cols-3 gap-4">
                    <Card>
                        <CardHeader>
                            <CardDescription>Energy Costs</CardDescription>
                            <CardTitle>$45,678</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <FilledtimeseriesChart className="aspect-[4/3]" />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardDescription>Maintenance Expenses</CardDescription>
                            <CardTitle>$12,345</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <BarChart className="aspect-[4/3]" />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardDescription>Budget Projection</CardDescription>
                            <CardTitle>$75,000</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CurvedlineChart className="aspect-[4/3]" />
                        </CardContent>
                    </Card>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Financial Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                <div className="grid gap-4">
                                    {financialItems.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <span>{item.label}</span>
                                            <span
                                                className={`font-medium ${item.isPositive ? 'text-green-500' : ''}`}>{item.amount}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>KPI Snapshot</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                {kpiSnapshotItems.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <span>{item.label}</span>
                                        <Progress value={item.value} />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}


export default FinancialsPage;


