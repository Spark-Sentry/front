'use client'
import React from 'react';
import { ResponsiveBar, BarDatum } from "@nivo/bar";

interface DataPoint extends BarDatum {
    name: string;
    count: number;
}

interface PerformanceBarChartProps {
    data: DataPoint[];
    target: number;
    unit: string;
}

const PerformanceBarChart: React.FC<PerformanceBarChartProps> = ({ data, target, unit }) => {
    return (
        <div className="aspect-[16/9]">
            <ResponsiveBar
                data={data}
                keys={["count"]}
                indexBy="name"
                margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
                padding={0.3}
                colors={{ scheme: 'nivo' }}
                axisBottom={{
                    tickSize: 0,
                    tickPadding: 16,
                    legendPosition: 'middle',
                    legendOffset: 32,
                }}
                axisLeft={{
                    tickSize: 0,
                    tickPadding: 16,
                    legend: unit,
                    legendPosition: 'middle',
                    legendOffset: -50,
                }}
                gridYValues={6}
                theme={{
                    tooltip: {
                        chip: {
                            borderRadius: "9999px",
                        },
                        container: {
                            fontSize: "12px",
                            textTransform: "capitalize",
                            borderRadius: "6px",
                        },
                    },
                    grid: {
                        line: {
                            stroke: "#f3f4f6",
                        },
                    },
                }}
                tooltipLabel={({ id }) => `${id}`}
                enableLabel={false}
                role="application"
                ariaLabel="A bar chart showing data"
                layers={[
                    'grid',
                    'axes',
                    'bars',
                    'markers',
                    'legends',
                    ({ bars, xScale, yScale, width, height }) => (
                        <g transform={`translate(-60,0)`}>
                            <line
                                x1={60}
                                x2={width-60}
                                y1={yScale(target)}
                                y2={yScale(target)}
                                stroke="#e11d48"
                                strokeDasharray="4 4"
                                strokeWidth={2}
                            />
                            <text
                                x={width - 10}
                                y={yScale(target) - 5}
                                textAnchor="end"
                                fill="#e11d48"
                                fontSize={12}
                            >
                                Target: {target}
                            </text>
                        </g>
                    ),
                ]}
            />
        </div>
    );
};

export default PerformanceBarChart;
