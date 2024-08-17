import React from 'react';
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';

// Définir le type pour les éléments de données
interface DataItem {
    name: string;
    amount: number;
    sum?: number;
}

const initialData: DataItem[] = [
    { name: 'Solde initial', amount: 1000 },
    { name: 'Salaire', amount: 2000 },
    { name: 'Loyer', amount: -800 },
    { name: 'Courses', amount: -300 },
    { name: 'Prime', amount: 500 },
    { name: 'Factures', amount: -200 },
];

// Calcul de la somme cumulée avec des types explicites
const data: DataItem[] = initialData.reduce<DataItem[]>((acc, item, index) => {
    const sum = index === 0 ? item.amount : (acc[index - 1].sum || 0) + item.amount;
    return [...acc, { ...item, sum }];
}, []);

const formatEuro = (value: number): string =>
    new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);

const WaterfallChart: React.FC = () => (
    <div style={{ width: '100%', height: '400px' }}>
        <ResponsiveContainer>
            <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={formatEuro} />
                <Tooltip
                    formatter={(value: number, name: string) =>
                        [formatEuro(value), name === 'sum' ? 'Somme cumulée' : 'Montant']}
                    labelFormatter={(label: string) => `Transaction: ${label}`}
                />
                <Legend />
                <ReferenceLine y={0} stroke="#000" />
                <Bar dataKey="amount" fill="#8884d8" />
                <Line
                    type="monotone"
                    dataKey="sum"
                    stroke="#ff7300"
                    strokeWidth={2}
                    dot={{ stroke: '#ff7300', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                />
            </ComposedChart>
        </ResponsiveContainer>
    </div>
);

export default WaterfallChart;