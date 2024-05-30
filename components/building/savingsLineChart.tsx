'use client'
import React from 'react';
import { ResponsiveLine } from '@nivo/line';

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
    unit: string
}

const SavingsLineChart: React.FC<LineChartProps> = ({ datasets, unit}) => {
    // Transform the input data to the format required by ResponsiveLine
    const formattedData = datasets.map(dataset => ({
        id: dataset.id,
        data: dataset.data.map(point => ({
            x: new Date(point.month).toLocaleString('default', { month: 'short' }),
            y: point.savings,
        })),
    }));

    return (
        <div>
            {/*<h2 className="mb-4 text-2xl font-bold">{title}</h2>*/}
            <div className="aspect-[16/9]">
                <ResponsiveLine
                    data={formattedData}
                    margin={{ top: 10, right: 50, bottom: 60, left: 60 }}
                    xScale={{ type: 'point' }}
                    yScale={{ type: 'linear' }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 10,
                        tickRotation: 0,
                        legendOffset: 40,
                        legendPosition: 'middle',
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickValues: 5,
                        tickPadding: 5,
                        legend: unit,
                        legendPosition: 'middle', // Pour aligner la légende au milieu
                        legendOffset: -50, // Pour déplacer la légende plus près de l'axe
                    }}
                    colors={{ scheme: 'nivo' }}
                    pointSize={6}
                    useMesh={true}
                    gridYValues={6}
                    enableGridX={false}
                    legends={[
                        {
                            anchor: 'bottom',
                            direction: 'row',
                            justify: false,
                            translateX: 0,
                            translateY: 56,
                            itemsSpacing: 0,
                            itemDirection: 'left-to-right',
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1,
                                    },
                                },
                            ],
                        },
                    ]}
                    theme={{
                        tooltip: {
                            chip: {
                                borderRadius: '9999px',
                            },
                            container: {
                                fontSize: '12px',
                                textTransform: 'capitalize',
                                borderRadius: '6px',
                            },
                        },
                        grid: {
                            line: {
                                stroke: '#f3f4f6',
                            },
                        },
                    }}
                    role="application"
                />
            </div>
        </div>
    );
};

export default SavingsLineChart;
