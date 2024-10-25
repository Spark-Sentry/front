import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CustomCardProps {
    title: string;
    icon: ReactNode;
    children: ReactNode;
}

const OverviewCard: React.FC<CustomCardProps> = ({ title, icon, children }) => {
    return (
        <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 px-4 py-1 bg-gray-100 dark:bg-slate-800 border-b">
                <div>
                    <CardTitle className="text-md font-bold">{title}</CardTitle>
                </div>
                {icon}
            </CardHeader>
            <CardContent className="px-2 pt-2">
                {children}
            </CardContent>
        </Card>
    );
};

export default OverviewCard;