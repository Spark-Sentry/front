import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const FinancialImpacts = () => {
  const [buildingData, setBuildingData] = useState({
    name: 'Haussmann Building Paris 9',
    rentalIncome: 300000,
    operatingCosts: 80000,
    marketCapRate: 0.045,
    projects: [
      {
        id: 1,
        name: 'LED Lighting Retrofit',
        cost: 45000,
        expectedSavings: 12000,
        actualSavings: 13500,
        implementationDate: '2023-06',
        paybackPeriod: 3.75,
      },
      {
        id: 2,
        name: 'Facade Thermal Insulation',
        cost: 120000,
        expectedSavings: 25000,
        actualSavings: 24000,
        implementationDate: '2023-09',
        paybackPeriod: 4.8,
      },
    ],
  });

  const [showUpdateForm, setShowUpdateForm] = useState(false);

  // Base calculations
  const baseNOI = buildingData.rentalIncome - buildingData.operatingCosts;
  const totalActualSavings = buildingData.projects.reduce((sum, p) => sum + p.actualSavings, 0);
  const totalInvestment = buildingData.projects.reduce((sum, p) => sum + p.cost, 0);

  // Value calculations
  const currentNOI = baseNOI + totalActualSavings;
  const propertyValue = currentNOI / buildingData.marketCapRate;
  const valueIncrease = totalActualSavings / buildingData.marketCapRate;

  return (
    <div className="w-full mx-auto space-y-6 pb-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold">{buildingData.name}</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Update Data</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Building Data</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label>Annual Rental Income</label>
                <Input type="number" defaultValue={buildingData.rentalIncome} />
              </div>
              <div>
                <label>Annual Operating Costs</label>
                <Input type="number" defaultValue={buildingData.operatingCosts} />
              </div>
              <div>
                <label>Market Cap Rate (%)</label>
                <Input type="number" defaultValue={buildingData.marketCapRate * 100} />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="py-2 px-4">
            <CardTitle className="text-lg">Overall Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-500">Total Investment</span>
                <p className="text-lg font-bold">{totalInvestment.toLocaleString()}€</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Annual Savings (NOI Variation)</span>
                <p className="text-lg font-bold text-green-600">+{totalActualSavings.toLocaleString()}€</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Average Payback Period (ROI)</span>
                <p className="text-lg font-bold">{(totalInvestment / totalActualSavings).toFixed(1)} years</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-2 px-4">
            <CardTitle className="text-lg">Net Income (Net Operating Income - NOI)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Rental Income</span>
                <span>{buildingData.rentalIncome.toLocaleString()}€</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Operating Costs</span>
                <span className="text-red-500">-{buildingData.operatingCosts.toLocaleString()}€</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Projects Savings</span>
                <span className="text-green-500">+{totalActualSavings.toLocaleString()}€</span>
              </div>
              <div className="border-t pt-2 font-bold">
                <div className="flex justify-between items-center">
                  <span>Total (Current NOI)</span>
                  <span>{currentNOI.toLocaleString()}€/year</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-2 px-4">
            <CardTitle className="text-lg">Value Impact (Net Investment Value - NIV)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-500">Cap Rate</span>
                <p className="text-xl">{(buildingData.marketCapRate * 100).toFixed(2)}%</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Estimated Value (NIV)</span>
                <p className="text-lg font-bold">{propertyValue.toLocaleString()}€</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Projects Value Increase</span>
                <p className="text-lg text-green-600">+{valueIncrease.toLocaleString()}€</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="py-2 px-4">
          <CardTitle className="text-lg">Improvement Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {buildingData.projects.map((project) => {
              const monthsSinceStart = Math.floor(
                (new Date() - new Date(project.implementationDate)) / (1000 * 60 * 60 * 24 * 30.44)
              );
              const savingsToDate = (project.actualSavings / 12) * monthsSinceStart;
              const roi = (savingsToDate / project.cost) * 100;
              const valueImpact = project.actualSavings / buildingData.marketCapRate;

              return (
                <div key={project.id} className="border p-4 rounded">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{project.name}</h3>
                    <span className="text-sm text-gray-500">
                      {new Date(project.implementationDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Investment</div>
                      <div className="font-medium">{project.cost.toLocaleString()}€</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Annual Savings</div>
                      <div className="font-medium">
                        {project.actualSavings.toLocaleString()}€
                        {project.actualSavings > project.expectedSavings ? (
                          <span className="text-green-500 text-sm">
                            {' '}
                            (+{((project.actualSavings / project.expectedSavings - 1) * 100).toFixed(0)}%)
                          </span>
                        ) : (
                          <span className="text-red-500 text-sm">
                            {' '}
                            ({((project.actualSavings / project.expectedSavings - 1) * 100).toFixed(0)}%)
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">ROI to date</div>
                      <div className="font-medium">{roi.toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Value Impact (NIV)</div>
                      <div className="font-medium">+{valueImpact.toLocaleString()}€</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialImpacts;
