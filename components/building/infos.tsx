import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import Image from 'next/image';
import IlotBalmoral from '@/public/Ilot-Balmoral-Montreal.jpg'
import ContractorCard from "@/components/building/contractor-card";

// Mock data
const mockBuilding = {
    name: "Skyline Tower",
    location: "123 Main St, Metropolis",
    currentProject: "Energy Efficiency Upgrade",
    projectDescription: "Implementing solar panels and smart energy management systems",
    contractor: "Baulne",
    implementationDate: "2023-05-15",
    contractTimeRemaining: "2 years 3 months",
    currentIRR: 12.5,
};

interface BuildingDetailProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
}

const BuildingDetail: React.FC<BuildingDetailProps> = ({ icon, label, value }) => (
    <div className="flex items-center space-x-2">
        <div className="w-4 flex-shrink-0">{icon}</div>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{label}:</span>
        <span className="text-base font-semibold text-gray-900 dark:text-gray-100">{value}</span>
    </div>
);

const InfosOverview: React.FC = () => {
    return (
        <div>
            <Card className="lg:col-span-2 overflow-hidden bg-white dark:bg-gray-800 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b">
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Project Overview</CardTitle>
                    <Icons.building className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </CardHeader>
                <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/5">
                            <div className="relative h-full rounded-lg overflow-hidden">
                                <Image
                                    src={IlotBalmoral}
                                    alt={mockBuilding.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                        </div>
                        <div className="md:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                            <BuildingDetail
                                icon={<Icons.building className="w-4 h-4 text-blue-600 dark:text-blue-400"/>}
                                label="Building"
                                value={mockBuilding.name}
                            />
                            <BuildingDetail
                                icon={<Icons.mapPin className="w-4 h-4 text-red-600 dark:text-red-400"/>}
                                label="Location"
                                value={mockBuilding.location}
                            />
                            <BuildingDetail
                                icon={<Icons.briefcase className="w-4 h-4 text-green-600 dark:text-green-400"/>}
                                label="Current Project"
                                value={mockBuilding.currentProject}
                            />
                            <BuildingDetail
                                icon={<Icons.file className="w-4 h-4 text-indigo-600 dark:text-indigo-400"/>}
                                label="Project Description"
                                value={mockBuilding.projectDescription}
                            />
                            <BuildingDetail
                                icon={<Icons.clock className="w-4 h-4 text-purple-600 dark:text-purple-400"/>}
                                label="Implementation Date"
                                value={mockBuilding.implementationDate}
                            />
                            <BuildingDetail
                                icon={<Icons.clock className="w-4 h-4 text-orange-600 dark:text-orange-400"/>}
                                label="Contract Time Remaining"
                                value={mockBuilding.contractTimeRemaining}
                            />
                            <BuildingDetail
                                icon={<Icons.trendingUp className="w-4 h-4 text-teal-600 dark:text-teal-400"/>}
                                label="Current IRR"
                                value={`${mockBuilding.currentIRR}%`}
                            />
                        </div>
                        <div className="md:w-1/5">
                            <ContractorCard />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default InfosOverview;