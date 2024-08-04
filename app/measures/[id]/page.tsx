import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import SavingsLineChart from "@/components/energy/savings-line-chart";
import PerformanceBarChart from "@/components/ui/performance-bar-chart";

interface InfoCardProps {
    title: string;
    content: { label: string; value: string }[];
}

const InfoCard: React.FC<InfoCardProps> = ({ title, content }) => (
    <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
            {content.map(({ label, value }, index) => (
                <div key={index} className="flex items-center justify-between">
                    <span>{label}</span>
                    <span className="font-semibold">{value}</span>
                </div>
            ))}
        </CardContent>
    </Card>
);

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
    { id: '2023', data: data2023 },
    { id: '2024', data: data2024 },
];

const totalData=[
    { name: "2023", count: 157 },
    { name: "2024", count: 170 },
]

const target = {
    GES:130,
    $:34000,
    kWh:12000,
    m3:9000
};

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id

    const energyConsumptionData = [
        { label: 'Total cost', value: '32 000 $' },
        { label: 'Subsidies', value: '17 000 $' },
        { label: 'Annual savings', value: '3 000 $' },
        { label: 'Return', value: '20%' },
    ];

    const energyProductionData = [
        { label: 'Annual electricity savings', value: '9 876 kWh' },
        { label: 'Annual gas savings', value: '6 543 m³' },
        { label: 'Annual GES reduction', value: '12,4 t GES' },
    ];

    const energyEfficiencyData = [
        { label: 'Operation time ratio', value: '34 %' },
        { label: 'Heat provided ratio', value: '76 %' },
        { label: 'Average COP', value: '3.28' },
    ];

    return (
        <div className="p-6">
                <div className="flex flex-col xl:flex-row gap-4">
                    <div className="flex flex-col gap-4 w-full xl:w-3/12">
                        <InfoCard title="Fiancial" content={energyConsumptionData}/>
                        <InfoCard title="Energy performace" content={energyProductionData}/>
                        <InfoCard title="Operation data" content={energyEfficiencyData}/>
                    </div>
                    <div className="flex flex-col gap-4 w-full xl:w-5/12">
                        <Card>
                            <CardHeader>
                                <CardTitle>Electricity savings - kWh</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <SavingsLineChart datasets={datasets} unit="m³"/>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Natural gas savings - m³</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <SavingsLineChart datasets={datasets} unit="kWh"/>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="flex flex-col gap-4 w-full xl:w-4/12">
                        <Card>
                            <CardHeader>
                                <CardTitle>Energy Efficiency Metrics</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {/*<BarChart className="aspect-[4/3]"/>*/}
                                <PerformanceBarChart data={totalData} target={target.kWh} unit="kWh"/>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            {/*</main>*/}
        </div>
    );
};
