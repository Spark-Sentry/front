import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Clock, LineChart, ArrowRight, HandCoins } from 'lucide-react';
import OverviewCard from '@/components/ui/overview-card';

const FinancialOverview = ({ data }) => {
  // Simulation de données pour l'exemple
  const metrics = {
    currentROI: 15.2,
    lastMonthROI: 14.8,
    remainingPayback: 3.5,
    addedValue: 250000,
    performance: 105,
  };

  const ROIChange = metrics.currentROI - metrics.lastMonthROI;
  const isPositiveROI = ROIChange >= 0;

  return (
    // <Card className="w-full max-w-md">
    //   <CardHeader className="px-4 py-2">
    //     <CardTitle className="flex items-center justify-between">
    //       <span className="text-lg">Performance Globale</span>
    //       <span className="text-sm text-gray-500">Mise à jour: {new Date().toLocaleDateString()}</span>
    //     </CardTitle>
    //   </CardHeader>
    <OverviewCard title="Financials" icon={<HandCoins className="w-6 h-6 text-muted-foreground" />}>
      <div className="grid gap-2">
        {/* ROI Global */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">ROI Global Actualisé</p>
            <div className="flex items-center gap-2">
              <p className="text-lg font-bold">{metrics.currentROI}%</p>
              <div className={`flex items-center gap-1 text-sm ${isPositiveROI ? 'text-green-600' : 'text-red-600'}`}>
                {isPositiveROI ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                <span>{Math.abs(ROIChange).toFixed(1)}%</span>
              </div>
              <p className="text-xs text-gray-500">vs mois dernier</p>
            </div>
          </div>
        </div>

        {/* Temps de retour restant */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Temps de Retour Restant</p>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-blue-500" />
              <p className="text-lg font-bold">{metrics.remainingPayback} ans</p>
            </div>
          </div>
        </div>

        {/* Valeur ajoutée */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Valeur Ajoutée</p>
            <div className="flex items-center gap-2">
              <ArrowRight size={16} className="text-green-500" />
              <p className="text-lg font-bold">+{metrics.addedValue.toLocaleString()}€</p>
            </div>
          </div>
        </div>

        {/* Performance vs Prévisions */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Performance vs Prévisions</p>
            <div className="flex items-center gap-2">
              <LineChart size={16} className={metrics.performance >= 100 ? 'text-green-500' : 'text-orange-500'} />
              <p className="text-lg font-bold">{metrics.performance}%</p>
            </div>
          </div>
        </div>
      </div>
    </OverviewCard>
  );
};

export default FinancialOverview;

// import React, { useState } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
//
// const FinancialOverview = () => {
//   // Données simulées d'un immeuble
//   const buildingData = {
//     id: 1,
//     name: 'Immeuble Bureau Paris',
//     baseRentalIncome: 500000,
//     baseOperatingCosts: 100000,
//     projects: [
//       {
//         id: 1,
//         name: 'LED Retrofit',
//         cost: 200000,
//         annualSavings: 50000,
//         implementationDate: '2023-01',
//       },
//       {
//         id: 2,
//         name: 'HVAC Optimization',
//         cost: 300000,
//         annualSavings: 75000,
//         implementationDate: '2023-06',
//       },
//     ],
//   };
//
//   const [capRate, setCapRate] = useState(0.05);
//
//   // Calcul VNE de base
//   const baseNOI = buildingData.baseRentalIncome - buildingData.baseOperatingCosts;
//
//   // Calcul des économies totales des projets
//   const totalAnnualSavings = buildingData.projects.reduce((sum, project) => sum + project.annualSavings, 0);
//
//   // VNE actuelle
//   const currentNOI = baseNOI + totalAnnualSavings;
//
//   // VNI
//   const basePropertyValue = baseNOI / capRate;
//   const currentPropertyValue = currentNOI / capRate;
//   const valueIncrease = currentPropertyValue - basePropertyValue;
//
//   return (
//     <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle>{buildingData.name}</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex items-center space-x-4 mb-4">
//             <label htmlFor="capRate">Cap Rate (%)</label>
//             <Input
//               id="capRate"
//               type="number"
//               value={capRate * 100}
//               onChange={(e) => setCapRate(Number(e.target.value) / 100)}
//               className="w-32"
//             />
//           </div>
//         </CardContent>
//       </Card>
//
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <Card>
//           <CardHeader>
//             <CardTitle>Valeur Nette d'Exploitation (VNE)</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-2">
//               <div className="flex justify-between">
//                 <span>VNE Initiale:</span>
//                 <span>{baseNOI.toLocaleString()}€/an</span>
//               </div>
//               <div className="flex justify-between text-green-600">
//                 <span>Économies Projets:</span>
//                 <span>+{totalAnnualSavings.toLocaleString()}€/an</span>
//               </div>
//               <div className="flex justify-between font-bold">
//                 <span>VNE Actuelle:</span>
//                 <span>{currentNOI.toLocaleString()}€/an</span>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//
//         <Card>
//           <CardHeader>
//             <CardTitle>Valeur Nette d'Investissement (VNI)</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-2">
//               <div className="flex justify-between">
//                 <span>VNI Initiale:</span>
//                 <span>{basePropertyValue.toLocaleString()}€</span>
//               </div>
//               <div className="flex justify-between text-green-600">
//                 <span>Augmentation:</span>
//                 <span>+{valueIncrease.toLocaleString()}€</span>
//               </div>
//               <div className="flex justify-between font-bold">
//                 <span>VNI Actuelle:</span>
//                 <span>{currentPropertyValue.toLocaleString()}€</span>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//
//       <Card>
//         <CardHeader>
//           <CardTitle>Projets d'Amélioration</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {buildingData.projects.map((project) => {
//               const valueImpact = project.annualSavings / capRate;
//               const monthsSinceImplementation = Math.floor(
//                 (new Date() - new Date(project.implementationDate)) / (1000 * 60 * 60 * 24 * 30.44)
//               );
//               const totalSavingsToDate = (project.annualSavings / 12) * monthsSinceImplementation;
//               const roi = ((totalSavingsToDate - project.cost) / project.cost) * 100;
//
//               return (
//                 <div key={project.id} className="border p-4 rounded">
//                   <h3 className="font-semibold">{project.name}</h3>
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
//                     <div>
//                       <div className="text-sm text-gray-600">Investissement</div>
//                       <div>{project.cost.toLocaleString()}€</div>
//                     </div>
//                     <div>
//                       <div className="text-sm text-gray-600">Économies/an</div>
//                       <div>{project.annualSavings.toLocaleString()}€</div>
//                     </div>
//                     <div>
//                       <div className="text-sm text-gray-600">Impact VNI</div>
//                       <div>{valueImpact.toLocaleString()}€</div>
//                     </div>
//                     <div>
//                       <div className="text-sm text-gray-600">ROI à date</div>
//                       <div>{roi.toFixed(1)}%</div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };
//
// export default FinancialOverview;
// import React from 'react';
// import { CardContent } from '@/components/ui/card';
// import { HandCoins } from 'lucide-react';
// import OverviewCard from '@/components/ui/overview-card';
//
// const FinancialOverview: React.FC = () => {
//   return (
//     <div>
//       <OverviewCard title="Financials" icon={<HandCoins className="w-6 h-6 text-muted-foreground" />}>
//         <div className="flex md:flex-col items-center gap-2">
//           <div className="text-2xl md:text-4xl font-bold">13 480$</div>
//           <div className="text-sm lg:text-lg text-muted-foreground font-semibold">Average annual savings</div>
//         </div>
//         <div className="flex md:flex-col items-center gap-2">
//           <div className="text-2xl md:text-4xl font-bold">+18%</div>
//           <div className="text-sm lg:text-lg text-muted-foreground font-semibold">On the baseline this year</div>
//         </div>
//         <div className="flex md:flex-col items-center gap-2">
//           <div className="text-2xl md:text-4xl font-bold">-2%</div>
//           <div className="text-sm lg:text-lg text-muted-foreground font-semibold">On last year</div>
//         </div>
//       </OverviewCard>
//     </div>
//   );
// };
//
// export default FinancialOverview;
