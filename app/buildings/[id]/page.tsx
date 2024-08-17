'use client'
import React, { useCallback, useState } from "react";
import FinancialDashboard from "@/components/financial/financial-dashboard";
import OperationDashboard from "@/components/operation/operation-dashboard";
import EnergyDashboard from "@/components/energy/energy-dashboard";
import FinancialOverview from "@/components/financial/financial-overview";
import Modal from "@/components/ui/modal";
import EnergyOverview from "@/components/energy/energy-overview";
import OperationOverview from "@/components/operation/operation-overview";
import PeriodsDashboard from "@/components/periods/periods-dashboard";
import PeriodsOverview from "@/components/periods/periods-overview";

type DashboardSection = "financial" | "energy" | "operation" | "periods";

interface Period {
    name: string;
    start: Date;
    end: Date;
}

interface Dates {
    reference: Period;
    performance: Period[];
}

const dates: Dates = {
    reference: {
        name: "Reference Period",
        start: new Date("2019-12-31"),
        end: new Date("2020-12-30")
    },
    performance: [
        {
            name: "Year 1",
            start: new Date("2021-03-31"),
            end: new Date("2022-03-30")
        },
        {
            name: "Year 2",
            start: new Date("2022-03-31"),
            end: new Date("2023-03-30")
        },
        {
            name: "Year 3",
            start: new Date("2023-03-31"),
            end: new Date("2024-03-30")
        },
        {
            name: "Year 4",
            start: new Date("2024-03-31"),
            end: new Date("2025-03-30")
        }
    ]
};

interface DashboardItemProps {
    label: DashboardSection;
    title: string;
    content: React.ReactNode;
}

const dashboardItems: DashboardItemProps[] = [
    { label: "financial", title: "Financial", content: <FinancialOverview /> },
    { label: "energy", title: "Energy", content: <EnergyOverview /> },
    { label: "operation", title: "Operation", content: <OperationOverview /> },
    { label: "periods", title: "Periods", content: <PeriodsOverview dates={dates}/> },
];

export default function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [section, setSection] = useState<DashboardSection | null>(null);

    const openModal = useCallback(() => setIsModalOpen(true), []);
    const closeModal = useCallback(() => setIsModalOpen(false), []);

    const handleOpenDashboard = useCallback((selectedSection: DashboardSection) => {
        setSection(selectedSection);
        openModal();
    }, [openModal]);

    const renderDashboardContent = () => {
        switch (section) {
            case "financial":
                return <FinancialDashboard />;
            case "energy":
                return <EnergyDashboard />;
            case "operation":
                return <OperationDashboard />;
            case "periods":
                return <PeriodsDashboard dates={dates} />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col gap-4 p-4 h-[calc(100vh-50px)] overflow-hidden">
            <div className="flex-1 flex flex-col md:flex-row gap-4 min-h-0">
                {dashboardItems.slice(0, 3).map((item) => (
                    <div
                        key={item.label}
                        className="flex-1 border-2 rounded-xl overflow-hidden cursor-pointer"
                        onClick={() => handleOpenDashboard(item.label)}
                        role="button"
                        tabIndex={0}
                        aria-label={`Open ${item.title} dashboard`}
                    >
                        <div className="h-full overflow-auto">
                            {item.content}
                        </div>
                    </div>
                ))}
            </div>
            <div className="h-1/5 min-h-[100px] border-2 rounded-xl overflow-hidden cursor-pointer"
                 onClick={() => handleOpenDashboard("periods")}
                 role="button"
                 tabIndex={0}
                 aria-label="Open Periods dashboard">
                <div className="h-full overflow-auto">
                    <PeriodsOverview dates={dates}/>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {renderDashboardContent()}
            </Modal>
        </div>
    );
}