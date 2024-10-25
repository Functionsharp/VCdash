import React from 'react';
import { LineChart as LucideLineChart } from 'lucide-react';
import { Company } from '../types/portfolio';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../utils/formatters';

interface PerformanceChartProps {
  companies: Company[];
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({ companies }) => {
  // Generate last 12 months of data for each company
  const generateMonthlyData = () => {
    const months = Array.from({ length: 12 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (11 - i));
      return date.toLocaleString('default', { month: 'short' });
    });

    return months.map((month, index) => {
      const dataPoint: any = { month };
      companies.forEach(company => {
        // Simulate historical MRR with growth rate
        const growthRate = 1 + (company.growthMetrics.mrrGrowthRate / 100);
        const monthsAgo = 11 - index;
        const historicalMRR = company.growthMetrics.mrr / Math.pow(growthRate, monthsAgo);
        dataPoint[company.name] = Math.round(historicalMRR);
      });
      return dataPoint;
    });
  };

  const data = generateMonthlyData();
  const colors = ['#4F46E5', '#7C3AED', '#2563EB', '#9333EA'];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Portfolio Performance</h2>
          <p className="text-sm text-gray-500">Monthly recurring revenue growth</p>
        </div>
        <LucideLineChart className="w-5 h-5 text-gray-400" />
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis 
              tickFormatter={(value) => `$${(value / 1000)}k`}
            />
            <Tooltip 
              formatter={(value: number) => formatCurrency(value)}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Legend />
            {companies.map((company, index) => (
              <Line
                key={company.name}
                type="monotone"
                dataKey={company.name}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};