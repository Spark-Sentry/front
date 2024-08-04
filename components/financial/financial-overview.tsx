import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {HandCoins} from "lucide-react";

const FinancialOverview: React.FC = () => {

    return (
        <div>
            <Card>
                <CardHeader className="flex items-center justify-between">
                    <div className="grid gap-1">
                        <CardTitle>Financial Overview</CardTitle>
                        <CardDescription>Key metrics at a glance</CardDescription>
                    </div>
                    <HandCoins className="w-8 h-8 text-muted-foreground" />
                </CardHeader>
                <CardContent className="flex flex-row gap-4 items-center justify-around">
                    <div className="flex flex-col items-center gap-2">
                        <div className="text-4xl font-bold">13 480$</div>
                        <div className="text-sm text-muted-foreground">Average annual savings</div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="text-4xl font-bold">+18%</div>
                        <div className="text-sm text-muted-foreground">On the baseline this year</div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="text-4xl font-bold">-2%</div>
                        <div className="text-sm text-muted-foreground">On last year</div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default FinancialOverview;