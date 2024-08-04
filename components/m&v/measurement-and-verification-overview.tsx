import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {GaugeIcon, Timer} from "lucide-react";

const EnergyOverview: React.FC = () => {

    return (
        <div>
            <div className="w-full flex flex-row md:flex-col gap-4">
                <Card>
                    <CardHeader className="flex items-center justify-between">
                        <div className="grid gap-1">
                            <CardTitle>M&V Overview</CardTitle>
                            <CardDescription>Operational parameters</CardDescription>
                        </div>
                        <GaugeIcon className="w-8 h-8 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col items-center gap-2">
                            <div className="text-4xl font-bold">72°F</div>
                            <div className="text-sm text-muted-foreground">Supply Temperature</div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="text-4xl font-bold">85%</div>
                            <div className="text-sm text-muted-foreground">Air Flow Modulation</div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex items-center justify-between">
                        <div className="grid gap-1">
                            <CardTitle>Time Remain</CardTitle>
                            <CardDescription>On the performance year</CardDescription>
                        </div>
                        <Timer className="w-8 h-8 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="">
                        <div className="flex flex-col items-center gap-2">
                            <div className="text-4xl font-bold">6 months</div>
                        </div>
                        <div className="flex flex-row gap-6 items-center justify-center w-full">
                            <div className="text-lg font-semibold">1 april 2024</div>
                            <div className="text-lg font-semibold">31 mars 2025</div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default EnergyOverview;