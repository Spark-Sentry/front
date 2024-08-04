'use client'
import React, { useCallback, useState } from "react";
import FinancialDashboard from "@/components/financial/financial-dashboard";
import MeasurementAndVerificationDashboard from "@/components/m&v/measurement-and-verification-dashboard";
import EnergyDashboard from "@/components/energy/energy-dashboard";
import FinancialOverview from "@/components/financial/financial-overview";
import Modal from "@/components/ui/modal";
import EnergyOverview from "@/components/energy/energy-overview";
import MeasurementAndVerificationOverview from "@/components/m&v/measurement-and-verification-overview";

type DashboardSection = "financial" | "energy" | "m&v";

interface DashboardItemProps {
    label: DashboardSection;
    title: string;
    content: React.ReactNode;
}

const dashboardItems: DashboardItemProps[] = [
    { label: "financial", title: "Financial", content: <FinancialOverview /> },
    { label: "energy", title: "Energy", content: <EnergyOverview/> },
    { label: "m&v", title: "M&V", content: <MeasurementAndVerificationOverview/> },
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
            case "m&v":
                return <MeasurementAndVerificationDashboard />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 m-2 md:m-4 h-[calc(100vh-3.5rem-32px)]">
            {dashboardItems.map((item) => (
                <div
                    key={item.label}
                    className="w-full md:w-1/3 h-full border-2 rounded-xl overflow-y-auto cursor-pointer"
                    onClick={() => handleOpenDashboard(item.label)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Open ${item.title} dashboard`}
                >
                    {item.content}
                </div>
            ))}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {renderDashboardContent()}
            </Modal>
        </div>
    );
}