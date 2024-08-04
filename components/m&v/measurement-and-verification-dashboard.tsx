import React from 'react';
import TrendlogChart from "@/components/m&v/trendlog-chart";

const MeasurementAndVerificationDashboard: React.FC = () => {
    const supplyTempData = [
        { timestamp: '2023-01-01', value: 70 },
        { timestamp: '2023-01-02', value: 72 },
        { timestamp: '2023-01-03', value: 71 },
        // Add more data points
    ];

    const modulationData = [
        { timestamp: '2023-01-01', value: 60 },
        { timestamp: '2023-01-02', value: 65 },
        { timestamp: '2023-01-03', value: 62 },
        // Add more data points
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Measurement and Verification</h2>
            <div className="space-y-6">
                <TrendlogChart title="Supply Temperature" data={supplyTempData} unit="°F" />
                <TrendlogChart title="Modulation" data={modulationData} unit="%" />
            </div>
        </div>
    );
};

export default MeasurementAndVerificationDashboard;