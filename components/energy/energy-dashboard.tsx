import React, { useState } from 'react';
import SavingsSummaryTable from "@/components/energy/savings-summary-table";

const EnergyDashboard: React.FC = () => {
    const [reportType, setReportType] = useState<'monthly' | 'annually'>('monthly');

    const monthlySavings = [
        { measure: 'HVAC Optimization', savings: 1200 },
        { measure: 'Lighting Upgrades', savings: 800 },
        { measure: 'Insulation Improvements', savings: 500 },
        // Add more measures
    ];

    const annuallySavings = [
        { measure: 'HVAC Optimization', savings: 14400 },
        { measure: 'Lighting Upgrades', savings: 9600 },
        { measure: 'Insulation Improvements', savings: 6000 },
        // Add more measures
    ];

    const data = reportType === 'monthly' ? monthlySavings : annuallySavings;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Energy Savings Report</h2>
            <div className="mb-4">
                <select
                    className="border rounded p-2"
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value as 'monthly' | 'annually')}
                >
                    <option value="monthly">Monthly</option>
                    <option value="annually">Annually</option>
                </select>
            </div>
            <SavingsSummaryTable/>
        </div>
    );
};

export default EnergyDashboard;