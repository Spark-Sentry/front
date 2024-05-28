import React from 'react';

const headers = [
    "Year",
    "Lighting Efficiency",
    "HVAC Efficiency",
];

const data = [
    { year: 2022, lighting: "85%", hvac: "78%"},
    { year: 2023, lighting: "90%", hvac: "82%"},
    { year: 2024, lighting: "70%", hvac: "28%"},
];

export default function DistributionByMeasure() {
    return (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {headers.map(header => (
                    <th key={header} className="px-6 py-3" scope="col">{header}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((row, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" scope="row">{row.year}</th>
                    <td className="px-6 py-4">{row.lighting}</td>
                    <td className="px-6 py-4">{row.hvac}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}
