import React, { useState } from 'react';
import {BackButton} from "@/components/buttons";
import SummaryTable from "@/components/ui/summary-table";
import SavingsLineChart from "@/components/energy/savings-line-chart";
import DashboardCard from "@/components/ui/dashboard-card";
import WaterfallChart from "@/components/financial/waterfall-chart";
import EnergyTariffTable from "@/components/financial/energy-tariff-table";
import FinancialSavingsByMeasure from "@/components/financial/financial-savings-by-measures";

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

const financialData = [
    { label: "Total Cost", value: "$120,000" },
    { label: "Energy Efficiency Cost", value: "$80,000" },
    { label: "Subsidies Obtained", value: "$40,000" },
    { label: "Actual Return of Investment", value: "15%" },
    { label: "Annual average savings", value: "$38,000" },
];

const FinancialDashboard: React.FC = () => {

    const [reportType, setReportType] = useState<'monthly' | 'annually'>('monthly');

    const monthlySavings = [
        { measure: 'HVAC Optimization', savings: 1200 },
        { measure: 'Lighting Upgrades', savings: 800 },
        { measure: 'Insulation Improvements', savings: 500 },
        // Add more measures
    ];

    const annuallySavings = [
        { measure: 'HVAC Optimization', savings: 14400 },
        { measure: 'Lighting Upgrades', savings: 9600 },
        { measure: 'Insulation Improvements', savings: 6000 },
        // Add more measures
    ];

    const data = reportType === 'monthly' ? monthlySavings : annuallySavings;

    return (
        <div className="md:px-6 md:pt-4">
            <div className="flex flex-row items-center gap-4 mb-4">
                <BackButton/>
                <h1 className="font-semibold text-lg md:text-2xl">Building Energy Dashboard</h1>
            </div>
            <div className="flex flex-col lg:flex-row lg:flex-wrap md:-mx-2">
                <div className="w-full lg:w-1/2 lg:px-2 mb-4">
                    <DashboardCard title="Key numbers">
                        <SummaryTable data={financialData}/>
                    </DashboardCard>
                </div>
                <div className="w-full lg:w-1/2 lg:px-2 mb-4">
                    <DashboardCard title="Financial Overview" className="h-full">
                        <WaterfallChart/>
                    </DashboardCard>
                </div>
                <div className="w-full xl:w-3/5 md:px-2 mb-4">
                    <DashboardCard title="Savings $" className="h-full">
                        <SavingsLineChart datasets={datasetsm3} unit="m³" height="300px"/>
                    </DashboardCard>
                </div>
                <div className="w-full md:px-2 xl:w-2/5 mb-4">
                    <DashboardCard title="Energy Tariff">
                        <EnergyTariffTable/>
                    </DashboardCard>
                </div>
                <div className="w-full md:px-2 mb-4">
                    <DashboardCard title="Savings By Measure" className="h-full">
                        <FinancialSavingsByMeasure/>
                    </DashboardCard>
                </div>
            </div>
        </div>
    );
};

export default FinancialDashboard;