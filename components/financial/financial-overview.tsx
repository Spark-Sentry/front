import React from 'react';
import {CardContent} from "@/components/ui/card";
import {HandCoins} from "lucide-react";
import OverviewCard from "@/components/ui/overview-card";

const FinancialOverview: React.FC = () => {
    return (
        <div>
            <OverviewCard title="Financials" icon={<HandCoins className="w-8 h-8 text-muted-foreground" />}>
                <CardContent className="flex flex-col gap-4 items-center justify-around">
                    <div className="flex md:flex-col items-center gap-2">
                        <div className="text-2xl md:text-4xl font-bold">13 480$</div>
                        <div className="text-sm lg:text-lg text-muted-foreground font-semibold">Average annual savings</div>
                    </div>
                    <div className="flex md:flex-col items-center gap-2">
                        <div className="text-2xl md:text-4xl font-bold">+18%</div>
                        <div className="text-sm lg:text-lg text-muted-foreground font-semibold">On the baseline this year</div>
                    </div>
                    <div className="flex md:flex-col items-center gap-2">
                        <div className="text-2xl md:text-4xl font-bold">-2%</div>
                        <div className="text-sm lg:text-lg text-muted-foreground font-semibold">On last year</div>
                    </div>
                </CardContent>
            </OverviewCard>
        </div>
    );
};

export default FinancialOverview;