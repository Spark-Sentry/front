import React from 'react';
import { TrendingUp} from "lucide-react";
import {TotalCard} from "@/components/energy/total-card";
import OverviewCard from "@/components/ui/overview-card";

interface TotalValue {
    month: number;
    percentage: number;
    amount: number
}

interface Totals {
    m3: TotalValue[];
    kWh: TotalValue[];
    GJ: TotalValue[];
    tCO2e: TotalValue[];
}

const totals = {
    m3: [{
        month: 0,
        percentage: -0.13,
        amount: -2238
    },{
        month: 7,
        percentage: 0.32,
        amount: 28238
    },
    ],
    kWh: [{
        month: 0,
        percentage: 0.23,
        amount: 28238
    },{
        month: 7,
        percentage: -0.21,
        amount: -28238
    },
    ],
    GJ: [{
        month: 0,
        percentage: 0.24,
        amount: 28238
    },{
        month: 7,
        percentage: 0.23,
        amount: 28238
    },
    ],
    tCO2e: [{
        month: 0,
        percentage: 0.3,
        amount: 307
    },{
        month: 7,
        percentage: 0.32,
        amount: 307
    },
    ],
}


const EnergyOverview: React.FC = () => {

    return (
        <div>
            <OverviewCard title="Performances" icon={<TrendingUp className="w-6 h-6 text-muted-foreground" />}>
                <div className="flex flex-col gap-2">
                <TotalCard unit="m3" values={totals.m3}/>
                <TotalCard unit="kWh" values={totals.kWh}/>
                <TotalCard unit="GJ" values={totals.GJ}/>
                <TotalCard unit="tCO2e" values={totals.tCO2e}/>
                </div>
            </OverviewCard>
        </div>
    );
};

export default EnergyOverview;