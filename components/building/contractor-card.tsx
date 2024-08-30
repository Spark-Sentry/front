import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import BaulneLogo from '@/public/Baulne-Logo.webp'

const mockContractor = {
    name: "Baulne",
    contactPerson: "John Doe",
    phoneNumber: "+1 (555) 123-4567",
};

interface ContractorDetailProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
}

const ContractorDetail: React.FC<ContractorDetailProps> = ({ icon, label, value }) => (
    <div className="flex items-center space-x-2">
        <div className="w-4 flex-shrink-0">{icon}</div>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{label}:</span>
        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{value}</span>
    </div>
);

const ContractorCard: React.FC = () => {
    return (
        <Card className="overflow-hidden bg-white dark:bg-gray-800 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b">
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Contractor</CardTitle>
                <Icons.hartHat className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </CardHeader>
            <CardContent className="flex flex-col items-center">
                <div className="w-full h-12 relative my-4">
                    <Image
                        src={BaulneLogo}
                        alt={mockContractor.name}
                        layout="fill"
                        objectFit="contain"
                        className="invert"
                    />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{mockContractor.name}</h3>
                <ContractorDetail
                    icon={<Icons.user className="w-4 h-4 text-blue-600 dark:text-blue-400"/>}
                    label="Contact"
                    value={mockContractor.contactPerson}
                />
                <ContractorDetail
                    icon={<Icons.phone className="w-4 h-4 text-green-600 dark:text-green-400"/>}
                    label="Phone"
                    value={mockContractor.phoneNumber}
                />
            </CardContent>
        </Card>
    );
};

export default ContractorCard;