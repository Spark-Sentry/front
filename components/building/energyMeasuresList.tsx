'use client'
import React from 'react';
import Link from "next/link";

interface EnergyMeasure {
    id: number,
    name: string;
    goal: string;
    actual: string;
    naturalGasSaved: string;
    electricitySaved: string;
    icon: React.ReactNode;
}

interface Props {
    energyMeasures: EnergyMeasure[];
}

const div_style = "w-2/6 flex justify-center"

const EnergyEfficiencyList: React.FC<Props> = ({ energyMeasures }) => {
    return (
        <div>
            <div
                className="flex flex-row justify-around gap-4 border-gray-200 pb-2 dark:border-gray-700">
                <div className={div_style}>Measure</div>
                <div className={div_style}>Goal</div>
                <div className={div_style}>Gas saved</div>
                <div className={div_style}>Electricity saved</div>
                <div className={div_style}>Payback today</div>
            </div>
            <div className="grid gap-4">
            {energyMeasures.map((measure, index) => (
                    <Link
                        key={index}
                        href={`/energy-measures/${measure.id}`}
                        className="rounded-md border"
                    >
                        <div
                            className="flex flex-row justify-around gap-4 rounded-lg bg-gray-100 pt-4 pb-4 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <div className={`${div_style} font-medium flex gap-4`}>{measure.icon}{measure.name}</div>
                            <div className={`${div_style} text-gray-500 dark:text-gray-400`}>{measure.goal}</div>
                            <div className={`${div_style}`}>{measure.naturalGasSaved}</div>
                            <div className={`${div_style} font-medium`}>{measure.electricitySaved}</div>
                            <div className={`${div_style} font-medium`}>{measure.actual}</div>
                        </div>
                    </Link>
            ))}
            </div>
        </div>
    );
};

export default EnergyEfficiencyList;
