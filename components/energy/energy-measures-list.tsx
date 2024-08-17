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
    payback: string,
    icon: React.ReactNode;
}

interface Props {
    energyMeasures: EnergyMeasure[];
}


const EnergyEfficiencyList: React.FC<Props> = ({ energyMeasures }) => {
    return (
        <div>
            <div
                className="hidden xl:flex flex-row justify-around border-gray-200 pb-2 dark:border-gray-700">
                <div className="flex w-3/12 pl-2">Measure</div>
                <div className="flex w-2/12">Goal</div>
                <div className="flex w-2/12">Total saved</div>
                <div className="flex w-2/12">Gas saved</div>
                <div className="flex w-2/12">Electricity saved</div>
                <div className="flex w-2/12">Payback today</div>
            </div>
            <div className="grid gap-4">
                {energyMeasures.map((measure, index) => (
                    <Link
                        key={index}
                        href={`/measures/${measure.id}`}
                        className="rounded-md border"
                    >
                        <div className="font-bold text-lg flex flex-col xl:flex-row gap-2 xl:gap-0 xl:justify-around rounded-lg bg-white  dark:bg-slate-900 bg-opacity-90 pt-4 pb-4 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 items-center">
                            <div className="flex gap-2 xl:w-3/12 ml-2 items-center">
                                <div>{measure.icon}</div>
                                {measure.name}
                            </div>
                            <div className="w-full sm:w-1/2 px-8 sm:pl-0 xl:ml-0 flex text-gray-500 dark:text-gray-400 xl:w-2/12 justify-between">
                                <div className="font-light text-gray-500 xl:hidden justify-between">Goal</div>
                                {measure.goal}
                            </div>
                            <div className="w-full sm:w-1/2 px-8 sm:pl-0 xl:ml-0 flex xl:w-2/12 justify-between">
                                <div className="font-light xl:hidden">Total saved</div>
                                {measure.actual}
                            </div>
                            <div className="w-full sm:w-1/2 px-8 sm:pl-0 xl:ml-0 flex xl:w-2/12 justify-between">
                                <div className="font-light xl:hidden">Gas save</div>
                                {measure.naturalGasSaved}
                            </div>
                            <div className="w-full sm:w-1/2 px-8 sm:pl-0 xl:ml-0 flex xl:w-2/12 justify-between">
                                <div className="font-light xl:hidden">Electricity saved</div>
                                {measure.electricitySaved}</div>
                            <div className="w-full sm:w-1/2 px-8 sm:pl-0 xl:ml-0 flex xl:w-2/12 justify-between">
                                <div className="font-light xl:hidden">Payback</div>
                                {measure.payback}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default EnergyEfficiencyList;
