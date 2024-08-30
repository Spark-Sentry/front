'use client'
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useTheme } from "next-themes";

interface DataPoint {
    month: string;
    savings: number;
}

interface Dataset {
    id: string;
    data: DataPoint[];
}

interface LineChartProps {
    datasets: Dataset[];
    unit: string;
    height: string
}

const SavingsLineChart: React.FC<LineChartProps> = ({ datasets, unit, height }) => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    console.log(datasets)

    // Transform the input data.ts to the format required by Recharts
    const formattedData = datasets[0].data.map(point => {
        const formattedMonth = new Date(point.month).toLocaleString('default', { month: 'short' });

        return {
            month: formattedMonth,
            ...datasets.reduce((acc, dataset) => {
                const matchingData = dataset.data.find(d => {
                    const formattedDatasetMonth = new Date(d.month).toLocaleString('default', { month: 'short' });
                    return formattedDatasetMonth === formattedMonth;
                });

                return {
                    ...acc,
                    [dataset.id]: matchingData ? matchingData.savings : 0
                };
            }, {})
        };
    });

    const colors = ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33'];

    return (
        <div style={{ width: '100%', height: height }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={formattedData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#595959' : '#cccccc'} />
                    <XAxis
                        dataKey="month"
                        stroke={isDarkMode ? '#d8d8d8' : '#777777'}
                        tick={{ fill: isDarkMode ? '#bfbfbf' : '#777777', fontSize: 11 }}
                    />
                    <YAxis
                        stroke={isDarkMode ? '#d8d8d8' : '#777777'}
                        tick={{ fill: isDarkMode ? '#bfbfbf' : '#777777', fontSize: 11 }}
                        label={{ value: unit, angle: -90, position: 'insideLeft', fill: isDarkMode ? '#d8d8d8' : '#777777' }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: isDarkMode ? '#333' : '#fff',
                            border: `1px solid ${isDarkMode ? '#555' : '#ccc'}`,
                            borderRadius: '6px',
                            fontSize: '12px'
                        }}
                    />
                    <Legend />
                    {datasets.map((dataset, index) => (
                        <Line
                            key={dataset.id}
                            type="monotone"
                            dataKey={dataset.id}
                            stroke={colors[index % colors.length]}
                            activeDot={{ r: 8 }}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SavingsLineChart;
