// import React, { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Icons } from '@/components/icons';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
//
// // Types
// interface FinancialMetrics {
//   savingsCurrentYear: number;
//   savingsPercentage: number;
//   baselineAmount: number;
//   previousYearsSavings: {
//     year: number;
//     savings: number;
//     capRate: number;
//     initialInvestment: number;
//   }[];
// }
//
// interface Equipment {
//   id: string;
//   name: string;
//   status: 'ON' | 'OFF' | 'FAULT';
//   currentValue: number;
//   averageValue: number;
//   unit: string;
//   parameterName: string;
//   lastMaintenance: string;
//   nextMaintenance: string;
//   historicalData: {
//     date: string;
//     value: number;
//   }[];
// }
//
// interface EnergyMetrics {
//   monthlyGasSavings: {
//     month: string;
//     savings: number;
//     target: number;
//   }[];
//   yearlyTarget: number;
//   progressFromLastMonth: number;
//   co2Savings: number;
// }
//
// // Mock Data
// const mockFinancialData: FinancialMetrics = {
//   savingsCurrentYear: 245000,
//   savingsPercentage: 32.5,
//   baselineAmount: 753846,
//   previousYearsSavings: [
//     { year: 2023, savings: 220000, capRate: 15.7, initialInvestment: 1400000 },
//     { year: 2022, savings: 180000, capRate: 12.9, initialInvestment: 1400000 },
//   ],
// };
//
// const mockEquipments: Equipment[] = [
//   {
//     id: 'hp-central',
//     name: 'Central Heat Pump',
//     status: 'ON',
//     currentValue: 4.2,
//     averageValue: 3.8,
//     unit: 'COP',
//     parameterName: 'Coefficient of Performance',
//     lastMaintenance: '2024-02-15',
//     nextMaintenance: '2024-05-15',
//     historicalData: Array(30)
//       .fill(null)
//       .map((_, i) => ({
//         date: `2024-${String(i + 1).padStart(2, '0')}-01`,
//         value: 3.5 + Math.random() * 1,
//       })),
//   },
//   {
//     id: 'boiler',
//     name: 'Boilers',
//     status: 'ON',
//     currentValue: 92.5,
//     averageValue: 89.8,
//     unit: '%',
//     parameterName: 'Efficiency',
//     lastMaintenance: '2024-01-20',
//     nextMaintenance: '2024-04-20',
//     historicalData: Array(30)
//       .fill(null)
//       .map((_, i) => ({
//         date: `2024-${String(i + 1).padStart(2, '0')}-01`,
//         value: 85 + Math.random() * 10,
//       })),
//   },
//   {
//     id: 'rooftop-1',
//     name: 'Rooftop #1',
//     status: 'ON',
//     currentValue: 13.5,
//     averageValue: 12.8,
//     unit: 'SEER',
//     parameterName: 'Efficiency Rating',
//     lastMaintenance: '2024-03-01',
//     nextMaintenance: '2024-06-01',
//     historicalData: Array(30)
//       .fill(null)
//       .map((_, i) => ({
//         date: `2024-${String(i + 1).padStart(2, '0')}-01`,
//         value: 12 + Math.random() * 2,
//       })),
//   },
//   {
//     id: 'makeup-air',
//     name: 'Make-up Air',
//     status: 'ON',
//     currentValue: 75.8,
//     averageValue: 72.5,
//     unit: '%',
//     parameterName: 'Recovery Efficiency',
//     lastMaintenance: '2024-02-28',
//     nextMaintenance: '2024-05-28',
//     historicalData: Array(30)
//       .fill(null)
//       .map((_, i) => ({
//         date: `2024-${String(i + 1).padStart(2, '0')}-01`,
//         value: 70 + Math.random() * 10,
//       })),
//   },
// ];
//
// const mockEnergyData: EnergyMetrics = {
//   monthlyGasSavings: Array(12)
//     .fill(null)
//     .map((_, i) => ({
//       month: new Date(2024, i, 1).toLocaleString('default', { month: 'short' }),
//       savings: 15000 + Math.random() * 5000,
//       target: 18000,
//     })),
//   yearlyTarget: 216000,
//   progressFromLastMonth: 8.5,
//   co2Savings: 125.4,
// };
//
// // Components
// const FinancialSection = ({ data }: { data: FinancialMetrics }) => (
//   <Card className="col-span-3">
//     <CardHeader>
//       <CardTitle className="text-xl font-bold flex items-center gap-2">
//         <Icons.dollarSign className="w-6 h-6 text-green-600" />
//         Financial Performance
//       </CardTitle>
//     </CardHeader>
//     <CardContent className="grid grid-cols-3 gap-4">
//       <Card className="bg-green-50 dark:bg-green-900/20">
//         <CardContent className="pt-6">
//           <div className="text-2xl font-bold text-green-700 dark:text-green-400">
//             ${data.savingsCurrentYear.toLocaleString()}
//           </div>
//           <div className="text-sm text-green-600 dark:text-green-500">
//             Current Year Savings ({data.savingsPercentage}% vs baseline)
//           </div>
//         </CardContent>
//       </Card>
//       {data.previousYearsSavings.map((year) => (
//         <Card key={year.year}>
//           <CardContent className="pt-6">
//             <div className="text-2xl font-bold">${year.savings.toLocaleString()}</div>
//             <div className="text-sm text-gray-600 dark:text-gray-400">
//               {year.year} Savings (CAP Rate: {year.capRate}%)
//             </div>
//           </CardContent>
//         </Card>
//       ))}
//     </CardContent>
//   </Card>
// );
//
// const EquipmentCard = ({ equipment }: { equipment: Equipment }) => {
//   const [showDetails, setShowDetails] = useState(false);
//
//   const getStatusColor = (status: Equipment['status']) => {
//     switch (status) {
//       case 'ON':
//         return 'text-green-600';
//       case 'OFF':
//         return 'text-gray-600';
//       case 'FAULT':
//         return 'text-red-600';
//     }
//   };
//
//   return (
//     <>
//       <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowDetails(true)}>
//         <CardContent className="pt-6">
//           <div className="flex justify-between items-start mb-4">
//             <h3 className="font-semibold text-lg">{equipment.name}</h3>
//             <span className={`font-medium ${getStatusColor(equipment.status)}`}>{equipment.status}</span>
//           </div>
//
//           <div className="space-y-4">
//             <div>
//               <div className="text-sm text-gray-600 dark:text-gray-400">Current {equipment.parameterName}</div>
//               <div className="text-xl font-bold">
//                 {equipment.currentValue} {equipment.unit}
//               </div>
//             </div>
//
//             <div>
//               <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Average</div>
//               <div className="text-lg">
//                 {equipment.averageValue} {equipment.unit}
//               </div>
//             </div>
//
//             <div className="text-sm text-gray-600 dark:text-gray-400">
//               Next Maintenance: {new Date(equipment.nextMaintenance).toLocaleDateString()}
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//
//       <Dialog open={showDetails} onOpenChange={setShowDetails}>
//         <DialogContent className="max-w-3xl">
//           <DialogHeader>
//             <DialogTitle>{equipment.name} Details</DialogTitle>
//           </DialogHeader>
//           <div className="mt-4">
//             <div className="grid grid-cols-2 gap-4 mb-6">
//               <div>
//                 <div className="text-sm text-gray-600 dark:text-gray-400">Last Maintenance</div>
//                 <div className="font-medium">{new Date(equipment.lastMaintenance).toLocaleDateString()}</div>
//               </div>
//               <div>
//                 <div className="text-sm text-gray-600 dark:text-gray-400">Next Maintenance</div>
//                 <div className="font-medium">{new Date(equipment.nextMaintenance).toLocaleDateString()}</div>
//               </div>
//             </div>
//
//             <div className="h-[300px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={equipment.historicalData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis
//                     dataKey="date"
//                     tickFormatter={(date) =>
//                       new Date(date).toLocaleDateString('default', { month: 'short', day: 'numeric' })
//                     }
//                   />
//                   <YAxis unit={equipment.unit} />
//                   <Tooltip
//                     formatter={(value: number) => [`${value} ${equipment.unit}`, equipment.parameterName]}
//                     labelFormatter={(date) => new Date(date).toLocaleDateString()}
//                   />
//                   <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} />
//                   <ReferenceLine y={equipment.averageValue} stroke="#64748b" strokeDasharray="3 3" label="Average" />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };
//
// const EnergySection = ({ data }: { data: EnergyMetrics }) => (
//   <Card className="col-span-3">
//     <CardHeader>
//       <CardTitle className="text-xl font-bold flex items-center gap-2">
//         <Icons.zap className="w-6 h-6 text-yellow-600" />
//         Energy Savings
//       </CardTitle>
//     </CardHeader>
//     <CardContent>
//       <div className="grid grid-cols-3 gap-4 mb-6">
//         <Card>
//           <CardContent className="pt-6">
//             <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
//               {data.monthlyGasSavings[11].savings.toFixed(0)} m³
//             </div>
//             <div className="text-sm text-blue-600 dark:text-blue-500">
//               Last Month Gas Savings
//               <div className="text-sm">
//                 <span className={data.progressFromLastMonth >= 0 ? 'text-green-600' : 'text-red-600'}>
//                   {data.progressFromLastMonth >= 0 ? '↑' : '↓'} {Math.abs(data.progressFromLastMonth)}%
//                 </span>{' '}
//                 vs Previous Month
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//
//         <Card>
//           <CardContent className="pt-6">
//             <div className="text-2xl font-bold">{data.yearlyTarget.toLocaleString()} m³</div>
//             <div className="text-sm text-gray-600 dark:text-gray-400">Yearly Target</div>
//           </CardContent>
//         </Card>
//
//         <Card>
//           <CardContent className="pt-6">
//             <div className="text-2xl font-bold text-green-700 dark:text-green-400">
//               {data.co2Savings.toFixed(1)} tonnes
//             </div>
//             <div className="text-sm text-green-600 dark:text-green-500">CO₂ Emissions Avoided</div>
//           </CardContent>
//         </Card>
//       </div>
//
//       <div className="h-[300px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={data.monthlyGasSavings}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="month" />
//             <YAxis unit=" m³" />
//             <Tooltip />
//             <Line type="monotone" dataKey="savings" stroke="#2563eb" strokeWidth={2} name="Actual Savings" />
//             <ReferenceLine y={data.yearlyTarget / 12} stroke="#64748b" strokeDasharray="3 3" label="Monthly Target" />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </CardContent>
//   </Card>
// );
//
// const BuildingDashboard: React.FC = () => {
//   return (
//     <div className="p-6 space-y-6">
//       <FinancialSection data={mockFinancialData} />
//
//       <Card className="col-span-3">
//         <CardHeader>
//           <CardTitle className="text-xl font-bold flex items-center gap-2">
//             <Icons.settings className="w-6 h-6 text-blue-600" />
//             Equipment Status
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-4 gap-4">
//             {mockEquipments.map((equipment) => (
//               <EquipmentCard key={equipment.id} equipment={equipment} />
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//
//       <EnergySection data={mockEnergyData} />
//     </div>
//   );
// };
//
// export default BuildingDashboard;

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import Image from 'next/image';
import IlotBalmoral from '@/public/Ilot-Balmoral-Montreal.jpg';
import ContractorCard from '@/components/building/contractor-card';
import {
  ArrowDownToLine, // Pour Current Project (flèche vers le bas)
  Calendar, // Pour Implementation Date
  FileText, // Pour Contract Type
  Settings, // Pour Maintenance icon
  TrendingUp, // Pour Current IRR
  Building2, // Pour Contractor
} from 'lucide-react';
import BaulneLogo from '@/public/Baulne-Logo.webp';

// Mock data
const mockBuilding = {
  name: 'Skyline Tower',
  location: '123 Main St, Metropolis',
  currentProject: 'Energy Efficiency Upgrade',
  projectDescription: 'Implementing solar panels and smart energy management systems',
  contractor: 'Baulne',
  implementationDate: '2023-05-15',
  contractTimeRemaining: '2 years 3 months',
  currentIRR: 12.5,
};

interface BuildingDetailProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

const BuildingDetail: React.FC<BuildingDetailProps> = ({ icon, label, value }) => (
  <div className="flex flex-row items-center gap-4">
    {/*<span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-4">*/}
    <div className="flex-shrink-0">{icon}</div>
    {/*</span>*/}
    <div className="flex flex-col justify-start">
      <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-4 whitespace-nowrap">{label}</div>
      <span className="text-base font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">{value}</span>
    </div>
  </div>
);

const InfosOverview: React.FC = () => {
  return (
    <div>
      {/*<Card className="lg:col-span-2 overflow-hidden bg-white dark:bg-gray-800 shadow-lg">*/}
      {/*<CardHeader className="py-2 px-4 bg-gray-50 dark:bg-gray-700 border-b">*/}
      <div className="flex items-center justify-between p-4">
        <div className="flex flex-row gap-4">
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">{mockBuilding.name}</CardTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
            <Icons.mapPin className="w-4 h-4" />
            {mockBuilding.location}
          </p>
        </div>
        <Icons.building className="w-6 h-6 text-blue-600 dark:text-blue-400" />
      </div>
      {/*</CardHeader>*/}

      {/*<CardContent className="p-2">*/}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/3">
          <div className="relative h-48 md:h-full rounded-lg overflow-hidden">
            <Image
              src={IlotBalmoral}
              alt={mockBuilding.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        <Card className="flex-1">
          <CardHeader className="px-4 py-2">Latest Projects</CardHeader>
          <CardContent className="flex flex-row gap-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex flex-col gap-2">
              <BuildingDetail
                icon={<Icons.briefcase className="h-5 w-5 text-green-600 dark:text-green-400" />}
                label="Current Project"
                value={mockBuilding.currentProject}
              />
              <BuildingDetail
                icon={<Icons.clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />}
                label="Implementation Date"
                value={mockBuilding.implementationDate}
              />
              <BuildingDetail
                icon={<Icons.trendingUp className="h-5 w-5 text-teal-600 dark:text-teal-400" />}
                label="Current IRR"
                value={`${mockBuilding.currentIRR}%`}
              />
            </div>
            <div>
              <ContractorCard />
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader className="px-4 py-2">Service Maintenance</CardHeader>
          <CardContent className="flex flex-row gap-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg justify-between">
            <div className="flex flex-col gap-2">
              <BuildingDetail
                icon={<Icons.wind className="h-5 w-5 text-green-600 dark:text-green-400" />}
                label="Systems"
                value="HVAC"
              />
              <BuildingDetail
                icon={<Icons.file className="h-5 w-5 text-green-600 dark:text-green-400" />}
                label="Contract Type"
                value="Integral"
              />
            </div>
            <div>
              <ContractorCard />
            </div>
          </CardContent>
        </Card>
      </div>
      {/*</CardContent>*/}
      {/*</Card>*/}
    </div>
  );
};

export default InfosOverview;
//
// //
// // import React from 'react';
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Icons } from "@/components/icons";
// // import Image from 'next/image';
// // import IlotBalmoral from '@/public/Ilot-Balmoral-Montreal.jpg'
// // import ContractorCard from "@/components/building/contractor-card";
// //
// // // Mock data
// // const mockBuilding = {
// //     name: "Skyline Tower",
// //     location: "123 Main St, Metropolis",
// //     currentProject: "Energy Efficiency Upgrade",
// //     projectDescription: "Implementing solar panels and smart energy management systems",
// //     contractor: "Baulne",
// //     implementationDate: "2023-05-15",
// //     contractTimeRemaining: "2 years 3 months",
// //     currentIRR: 12.5,
// // };
// //
// // interface BuildingDetailProps {
// //     icon: React.ReactNode;
// //     label: string;
// //     value: string | number;
// // }
// //
// // const BuildingDetail: React.FC<BuildingDetailProps> = ({ icon, label, value }) => (
// //     <div className="flex items-center space-x-2">
// //         <div className="w-4 flex-shrink-0">{icon}</div>
// //         <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{label}:</span>
// //         <span className="text-base font-semibold text-gray-900 dark:text-gray-100">{value}</span>
// //     </div>
// // );
// //
// // const InfosOverview: React.FC = () => {
// //     return (
// //         <div>
// //             <Card className="lg:col-span-2 overflow-hidden bg-white dark:bg-gray-800 shadow-lg">
// //                 <CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b">
// //                     <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Project Overview</CardTitle>
// //                     <Icons.building className="w-6 h-6 text-blue-600 dark:text-blue-400" />
// //                 </CardHeader>
// //                 <CardContent className="p-4">
// //                     <div className="flex flex-col md:flex-row gap-6">
// //                         <div className="md:w-1/5">
// //                             <div className="relative h-full rounded-lg overflow-hidden">
// //                                 <Image
// //                                     src={IlotBalmoral}
// //                                     alt={mockBuilding.name}
// //                                     layout="fill"
// //                                     objectFit="cover"
// //                                     className="transition-transform duration-300 hover:scale-105"
// //                                 />
// //                             </div>
// //                         </div>
// //                         <div className="md:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
// //                             <BuildingDetail
// //                                 icon={<Icons.building className="w-4 h-4 text-blue-600 dark:text-blue-400"/>}
// //                                 label="Building"
// //                                 value={mockBuilding.name}
// //                             />
// //                             <BuildingDetail
// //                                 icon={<Icons.mapPin className="w-4 h-4 text-red-600 dark:text-red-400"/>}
// //                                 label="Location"
// //                                 value={mockBuilding.location}
// //                             />
// //                             <BuildingDetail
// //                                 icon={<Icons.briefcase className="w-4 h-4 text-green-600 dark:text-green-400"/>}
// //                                 label="Current Project"
// //                                 value={mockBuilding.currentProject}
// //                             />
// //                             <BuildingDetail
// //                                 icon={<Icons.file className="w-4 h-4 text-indigo-600 dark:text-indigo-400"/>}
// //                                 label="Project Description"
// //                                 value={mockBuilding.projectDescription}
// //                             />
// //                             <BuildingDetail
// //                                 icon={<Icons.clock className="w-4 h-4 text-purple-600 dark:text-purple-400"/>}
// //                                 label="Implementation Date"
// //                                 value={mockBuilding.implementationDate}
// //                             />
// //                             <BuildingDetail
// //                                 icon={<Icons.clock className="w-4 h-4 text-orange-600 dark:text-orange-400"/>}
// //                                 label="Contract Time Remaining"
// //                                 value={mockBuilding.contractTimeRemaining}
// //                             />
// //                             <BuildingDetail
// //                                 icon={<Icons.trendingUp className="w-4 h-4 text-teal-600 dark:text-teal-400"/>}
// //                                 label="Current IRR"
// //                                 value={`${mockBuilding.currentIRR}%`}
// //                             />
// //                         </div>
// //                         <div className="md:w-1/5">
// //                             <ContractorCard />
// //                         </div>
// //                     </div>
// //                 </CardContent>
// //             </Card>
// //         </div>
// //     );
// // };
// //
// // export default InfosOverview;
