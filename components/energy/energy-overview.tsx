import React from 'react';
import SummaryTable from "@/components/ui/summary-table";
import SavingsLineChart from "@/components/energy/savings-line-chart";

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

const dataA1kWh = [
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

const dataA2kWh = [
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

const datasetskWh = [
    { id: '2022', data: dataA1kWh },
    { id: '2023', data: dataA2kWh },
];

const energyData = [
    { label: "GHG", value: "-307 tons" },
    { label: "m3", value: "86 000 m3" },
    { label: "kWh", value: "143 000 kWh" },
    { label: "total", value: "25%" },
];

const EnergyOverview: React.FC = () => {

    return (
        <div>
            <h1 className="text-2xl font-semibold md:mb-2 text-center">Energy Overview</h1>
            <div className="w-full flex flex-row md:flex-col gap-4">
                <div>
                    <h2 className="text-xl font-semibold p-2">Average annual savings</h2>
                    <SummaryTable data={energyData}/>
                </div>
                <div className="hidden md:block border-2 p-2" style={{height: '300px', position: 'relative'}}>
                    <SavingsLineChart datasets={datasetsm3} unit="m³"/>
                </div>
                <div className="hidden md:block border-2 p-2" style={{height: '300px', position: 'relative'}}>
                    <SavingsLineChart datasets={datasetskWh} unit="$kWh"/>
                </div>
            </div>
        </div>
    );
};

export default EnergyOverview;