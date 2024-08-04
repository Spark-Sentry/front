'use client'
import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import {useTheme} from "next-themes";

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
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    // Transform the input data to the format required by ResponsiveLine
    const formattedData = datasets.map(dataset => ({
        id: dataset.id,
        data: dataset.data.map(point => ({
            x: new Date(point.month).toLocaleString('default', { month: 'short' }),
            y: point.savings,
        })),
    }));

    return (
        <div style={{width: '100%', height: '100%', position: 'relative'}}>
            {/*<h2 className="mb-4 text-2xl font-bold">{title}</h2>*/}
            {/*<div className="aspect-[16/9]">*/}
            <ResponsiveLine
                curve="monotoneX"
                data={formattedData}
                margin={{top: 10, right: 50, bottom: 60, left: 60}}
                xScale={{type: 'point'}}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: true,
                    reverse: false
                }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 10,
                    tickRotation: 0,
                    legend: 'Month',
                    legendOffset: 40,
                    legendPosition: 'middle',
                    truncateTickAt: 0
                }}
                axisLeft={{
                    tickSize: 5,
                    tickValues: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: unit,
                    legendPosition: 'middle', // Pour aligner la légende au milieu
                    legendOffset: -50, // Pour déplacer la légende plus près de l'axe
                    truncateTickAt: 0
                }}
                colors={{scheme: 'nivo'}}
                // colors={isDarkMode ? ['#9ca3af'] : { scheme: 'nivo' }} // gray-400 pour le mode sombre
                pointSize={6}
                pointColor={{theme: 'background'}}
                pointBorderWidth={2}
                pointBorderColor={{from: 'serieColor'}}
                useMesh={true}
                enableTouchCrosshair={true}
                gridYValues={6}
                pointLabelYOffset={-12}
                enableGridX={false}
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: 100,
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
                    axis: {
                        domain: {
                            line: {
                                stroke: isDarkMode ? '#d8d8d8' : '#777777', // gray-600 pour le mode sombre
                                strokeWidth: 1
                            }
                        },
                        legend: {
                            text: {
                                fill: isDarkMode ? '#d8d8d8' : '#777777', // gray-600 pour le mode sombre
                                fontSize: 12
                            }
                        },
                        ticks: {
                            line: {
                                stroke: isDarkMode ? '#d8d8d8' : '#777777', // gray-600 pour le mode sombre
                                strokeWidth: 1
                            },
                            text: {
                                stroke: isDarkMode ? '#bfbfbf' : '#777777', // gray-600 pour le mode sombre
                                fontSize: 11
                            }
                        }
                    },
                    grid: {
                        line: {
                            stroke: isDarkMode ? '#595959' : '#cccccc', // gray-600 pour le mode sombre
                        },
                    },
                    legends: {
                        text: {
                            fill: isDarkMode ? '#ffffff' : '#333333', // gray-400 pour le mode sombre
                        }
                    }
                }}
                role="application"
            />
            {/*</div>*/}
        </div>
    );
};

export default SavingsLineChart;
