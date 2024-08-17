'use client'

import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

interface SavingsData {
    year: string;
    measure1: {
        kWh: number;
        m3: number;
        total: number;
    };
    measure2: {
        kWh: number;
        m3: number;
        total: number;
    };
    total: {
        kWh: number;
        m3: number;
        total: number;
    };
}

const savingsData: SavingsData[] = [
    {
        year: 'Année 1',
        measure1: { kWh: 344, m3: 344, total: 688 },
        measure2: { kWh: 344, m3: 344, total: 688 },
        total: { kWh: 344, m3: 344, total: 688 },
    },
    {
        year: 'Année 2',
        measure1: { kWh: 344, m3: 344, total: 688 },
        measure2: { kWh: 344, m3: 344, total: 688 },
        total: { kWh: 344, m3: 344, total: 688 },
    },
];



const EnergySavingsByMeasure: React.FC = () => {
    return (
        <div className="overflow-x-auto">
            <Table className="min-w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead></TableHead>
                        <TableHead colSpan={3} className="text-center">Mesure 1</TableHead>
                        <TableHead colSpan={3} className="text-center">Mesure 2</TableHead>
                        <TableHead colSpan={3} className="text-center">Total</TableHead>
                    </TableRow>
                    <TableRow>
                        <TableHead>Année</TableHead>
                        <TableHead>KWh</TableHead>
                        <TableHead>m³</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>KWh</TableHead>
                        <TableHead>m³</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>KWh</TableHead>
                        <TableHead>m³</TableHead>
                        <TableHead>Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {savingsData.map((saving, index) => (
                        <TableRow key={index}>
                            <TableCell>{saving.year}</TableCell>
                            <TableCell>{saving.measure1.kWh} $</TableCell>
                            <TableCell>{saving.measure1.m3} $</TableCell>
                            <TableCell>{saving.measure1.total} $</TableCell>
                            <TableCell>{saving.measure2.kWh} $</TableCell>
                            <TableCell>{saving.measure2.m3} $</TableCell>
                            <TableCell>{saving.measure2.total} $</TableCell>
                            <TableCell>{saving.total.kWh} $</TableCell>
                            <TableCell>{saving.total.m3} $</TableCell>
                            <TableCell>{saving.total.total} $</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default EnergySavingsByMeasure;
