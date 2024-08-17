import React, {useState, useMemo, ReactNode} from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import { Button } from "@/components/ui/button";
import OperationCard from "@/components/operation/operation-card";

interface TrendlogChartProps {
    title: string;
    data: Array<{ timestamp: string; value: number; setpoint: number }>;
    unit: string;
    icon: ReactNode;
}

const CustomSlider: React.FC<{ value: number; onChange: (value: number) => void; max: number }> = ({ value, onChange, max }) => {
    return (
        <input
            type="range"
            min={0}
            max={max}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-3/5 h-1 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
        />
    );
};

const TrendlogChart: React.FC<TrendlogChartProps> = ({ title, data, unit, icon }) => {
    const [timeRange, setTimeRange] = useState('week');
    const [startIndex, setStartIndex] = useState(0);

    const timeRanges = {
        day: 24,
        week: 24 * 7,
        month: 24 * 30,
        year: 24 * 365
    };

    const formatXAxis = (tickItem: string) => {
        const date = new Date(tickItem);
        if (timeRange === 'day') {
            return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        }
        if (timeRange === 'week') {
            return date.toLocaleString('fr-FR', { weekday: 'short', hour: '2-digit' });
        }
        if (timeRange === 'month') {
            return date.toLocaleString('fr-FR', { day: 'numeric', month: 'short' });
        }
        return date.toLocaleString('fr-FR', { month: 'short', year: '2-digit' });
    };

    const visibleData = useMemo(() => {
        return data.slice(startIndex, startIndex + timeRanges[timeRange as keyof typeof timeRanges]);
    }, [data, startIndex, timeRange]);

    const currentValue = data[data.length - 1]?.value ?? 0;
    const currentSetpoint = data[data.length - 1]?.setpoint ?? 0;

    const midPointDate = useMemo(() => {
        const midIndex = Math.floor(visibleData.length / 2);
        return new Date(visibleData[midIndex]?.timestamp);
    }, [visibleData]);

    const formatMidPointDate = (date: Date) => {
        return date.toLocaleString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    const handleRangeChange = (range: string) => {
        setTimeRange(range);
        setStartIndex(0);
    };

    return (
        <OperationCard title={title} icon={icon}>
            <div className="flex flex-row justify-between">
                <div className="flex mb-4 space-x-2">
                        {['day', 'week', 'month', 'year'].map((range) => (
                            <Button
                                key={range}
                                onClick={() => handleRangeChange(range)}
                                variant={timeRange === range ? 'default' : 'outline'}
                                className="text-sm"
                            >
                                {range === 'day' ? 'Jour' : range === 'week' ? 'Semaine' : range === 'month' ? 'Mois' : 'Année'}
                            </Button>
                        ))}
                </div>
                    <Button variant="outline" className="text-sm">Télécharger les données</Button>
            </div>
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-3/4 pr-4">
                        <div className="text-center text-sm text-gray-500 mb-2">
                            {formatMidPointDate(midPointDate)}
                        </div>
                        <div className="mb-4 text-center">
                            <CustomSlider
                                value={startIndex}
                                onChange={setStartIndex}
                                max={data.length - timeRanges[timeRange as keyof typeof timeRanges]}
                            />
                        </div>
                        <div style={{ height: '400px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={visibleData}
                                    margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis
                                        dataKey="timestamp"
                                        tickFormatter={formatXAxis}
                                        interval={Math.ceil(visibleData.length / 6)}
                                        tick={{ fontSize: 12 }}
                                    />
                                    <YAxis
                                        label={{ value: unit, angle: -90, position: 'insideLeft' }}
                                        tick={{ fontSize: 12 }}
                                    />
                                    <Tooltip
                                        formatter={(value) => [`${value} ${unit}`, '']}
                                        labelFormatter={(label) => new Date(label as string).toLocaleString('fr-FR')}
                                    />
                                    <Legend />
                                    <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} name="Actuel" />
                                    <Line type="monotone" dataKey="setpoint" stroke="#82ca9d" dot={false} name="Consigne" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="w-full md:w-1/4 mt-4 md:mt-0 flex flex-col justify-center items-center">
                        <div className="text-center mb-4">
                            <p className="text-lg font-semibold">Valeur actuelle</p>
                            <p className="text-3xl">{currentValue.toFixed(1)} {unit}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-semibold">Consigne actuelle</p>
                            <p className="text-3xl">{currentSetpoint.toFixed(1)} {unit}</p>
                        </div>
                    </div>
                </div>
        </OperationCard>
    );
};

export default TrendlogChart;