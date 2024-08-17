import React, { useState, useEffect } from 'react';
import { BackButton } from "@/components/buttons";
import { TotalCard } from "@/components/energy/total-card";
import EnergySavingsBarChart from "@/components/energy/energy-savings-bar-chart";
import SavingsLineChart from "@/components/energy/savings-line-chart";
import {Card} from "@/components/ui/card";
import EnergyMeasuresList from "@/components/energy/energy-measures-list";
import {AirVentIcon, SquareActivityIcon} from "lucide-react";

interface Source {
    unit: string;
    amount: number;
}

interface Year {
    year: number;
    sources: Source[];
}

interface Measure {
    name: string;
    years: Year[];
}

interface TotalValue {
    year: number;
    amount: number;
}

interface Totals {
    m3: TotalValue[];
    kWh: TotalValue[];
    GJ: TotalValue[];
    tCO2e: TotalValue[];
}

const measures: Measure[] = [
    {
        name: "Insulation",
        years: [
            { year: 2022, sources: [{ unit: "m3", amount: 0 }, { unit: "kWh", amount: 0 }] },
            { year: 2023, sources: [{ unit: "m3", amount: 0 }, { unit: "kWh", amount: 0 }] },
            { year: 2024, sources: [{ unit: "m3", amount: 0 }, { unit: "kWh", amount: 0 }] }
        ]
    },
    {
        name: "LED Lighting",
        years: [
            { year: 2022, sources: [{ unit: "m3", amount: 0 }, { unit: "kWh", amount: 0 }] },
            { year: 2023, sources: [{ unit: "m3", amount: 0 }, { unit: "kWh", amount: 0 }] },
            { year: 2024, sources: [{ unit: "m3", amount: 0 }, { unit: "kWh", amount: 0 }] }
        ]
    },
    {
        name: "Smart Thermostat",
        years: [
            { year: 2022, sources: [{ unit: "m3", amount: 0 }, { unit: "kWh", amount: 0 }] },
            { year: 2023, sources: [{ unit: "m3", amount: 0 }, { unit: "kWh", amount: 0 }] },
            { year: 2024, sources: [{ unit: "m3", amount: 0 }, { unit: "kWh", amount: 0 }] }
        ]
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

const datasetsm3 = [
    { id: '2022', data: dataA1m3 },
    { id: '2023', data: dataA2m3 },
];

const datasetskwh = [
    { id: '2022', data: dataA1m3 },
    { id: '2023', data: dataA2m3 },
];

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

const generateData = (): Measure[] => {
    return measures.map(measure => ({
        ...measure,
        years: measure.years.map(year => ({
            ...year,
            sources: year.sources.map(source => ({
                ...source,
                amount: Math.floor(Math.random() * 1000)
            }))
        }))
    }));
};

const calculateTotals = (data: Measure[]): Totals => {
    const totals: { [key: string]: { [year: number]: number } } = {
        m3: {}, kWh: {}, GJ: {}, tCO2e: {}
    };

    data.forEach(measure => {
        measure.years.forEach(year => {
            year.sources.forEach(source => {
                if (!totals[source.unit][year.year]) {
                    totals[source.unit][year.year] = 0;
                }
                totals[source.unit][year.year] += source.amount;
            });
        });
    });

    // Calculate GJ and tCO2e
    Object.keys(totals.kWh).forEach(year => {
        const numYear = Number(year);
        const kWh = totals.kWh[numYear];
        totals.GJ[numYear] = Number((kWh * 0.0036).toFixed(2));
        totals.tCO2e[numYear] = Number((kWh * 0.000181).toFixed(2));
    });

    // Convert to array format
    return Object.entries(totals).reduce((acc, [unit, yearValues]) => {
        acc[unit as keyof Totals] = Object.entries(yearValues).map(([year, amount]) => ({
            year: Number(year),
            amount
        }));
        return acc;
    }, {} as Totals);
};

const EnergyDashboard: React.FC = () => {
    const [generatedData, setGeneratedData] = useState<Measure[]>([]);
    const [totals, setTotals] = useState<Totals>({ m3: [], kWh: [], GJ: [], tCO2e: [] });

    useEffect(() => {
        const data = generateData();
        setGeneratedData(data);
        const calculatedTotals = calculateTotals(data);
        setTotals(calculatedTotals);
    }, []);

    return (
        <div className="md:px-6 md:pt-4 rounded-md">
            <div className="flex flex-row items-center gap-4 mb-4">
                <BackButton />
                <h1 className="font-semibold text-lg md:text-2xl">Energy Dashboard</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-row justify-center gap-4 m-8">
                <TotalCard unit="m3" values={totals.m3}/>
                <TotalCard unit="kWh" values={totals.kWh}/>
                <TotalCard unit="GJ" values={totals.GJ}/>
                <TotalCard unit="tCO2e" values={totals.tCO2e}/>
            </div>
            <div className="flex flex-col gap-4">
                <EnergyMeasuresList energyMeasures={energyMeasures}/>
                <div className="flex flex-row gap-4">
                    <div className="w-3/5">
                        <Card className="p-4">
                            <SavingsLineChart datasets={datasetskwh} unit="kWh" height="300px"/>
                            <SavingsLineChart datasets={datasetsm3} unit="m3" height="300px"/>
                        </Card>
                    </div>
                    <div className="w-2/5">
                        <EnergySavingsBarChart measures={generatedData}/>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default EnergyDashboard;