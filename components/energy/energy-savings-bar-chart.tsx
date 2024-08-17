import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";

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

interface EnergySavingsBarChartProps {
    measures: Measure[];
}

const EnergySavingsBarChart: React.FC<EnergySavingsBarChartProps> = ({ measures }) => {
    const units = ['m3', 'kWh']; // Add other units if necessary

    const formatChartData = (measures: Measure[], unit: string) => {
        return measures.map(measure => ({
            name: measure.name,
            ...measure.years.reduce((acc, year) => {
                const source = year.sources.find(s => s.unit === unit);
                if (source) {
                    acc[year.year.toString()] = source.amount;
                }
                return acc;
            }, {} as Record<string, number>)
        }));
    };

    if (!measures || measures.length === 0) {
        return <div>No data available</div>;
    }

    return (
        <Tabs defaultValue="m3" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                {units.map(unit => (
                    <TabsTrigger key={unit} value={unit}>Savings in {unit}</TabsTrigger>
                ))}
            </TabsList>
            {units.map(unit => (
                <TabsContent key={unit} value={unit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Savings in {unit}</CardTitle>
                            <CardDescription>Comparison of savings by measure and year</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={formatChartData(measures, unit)}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    {measures[0].years.map((year, index) => (
                                        <Bar
                                            key={year.year}
                                            dataKey={year.year.toString()}
                                            name={year.year.toString()}
                                            fill={`hsl(${index * 120}, 70%, 50%)`}
                                        />
                                    ))}
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                        <CardFooter>
                            <Button>Download Data</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            ))}
        </Tabs>
    );
};

export default EnergySavingsBarChart;