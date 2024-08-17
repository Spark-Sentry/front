import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CustomCardProps {
    title: string;
    icon: ReactNode;
    children: ReactNode;
}

const OperationCard: React.FC<CustomCardProps> = ({ title, icon, children }) => {
    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gray-50 dark:bg-slate-800 rounded-t-md">
                <div>
                    <CardTitle className="text-xl font-semibold">{title}</CardTitle>
                </div>
                {icon}
            </CardHeader>
            <CardContent className="pt-4 dark:bg-slate-900">
                {children}
            </CardContent>
        </Card>
    );
};

export default OperationCard;