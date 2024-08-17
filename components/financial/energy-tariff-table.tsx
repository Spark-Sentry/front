'use client'

import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

interface Tariff {
    year: string;
    gas: number;
    electricity: number;
    power: number;
}

const tariffs: Tariff[] = [
    { year: 'Reference Year', gas: 0.50, electricity: 0.12, power: 15.00 },
    { year: 'Year 1', gas: 0.55, electricity: 0.13, power: 15.50 },
    { year: 'Year 2', gas: 0.60, electricity: 0.14, power: 16.00 },
];

const EnergyTariffTable: React.FC = () => {
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Year</TableHead>
                        <TableHead>Gas ($/m³)</TableHead>
                        <TableHead>Electricity ($/kWh)</TableHead>
                        <TableHead>Power ($/kW)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tariffs.map((tariff) => (
                        <TableRow key={tariff.year}>
                            <TableCell>{tariff.year}</TableCell>
                            <TableCell>{tariff.gas.toFixed(2)}</TableCell>
                            <TableCell>{tariff.electricity.toFixed(2)}</TableCell>
                            <TableCell>{tariff.power.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default EnergyTariffTable;
