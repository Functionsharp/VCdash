import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Company } from '../../types/portfolio';
import { generateMonthlyData } from '../../utils/analysisUtils';
import { formatCurrency } from '../../utils/formatters';

interface YTDPerformanceProps {
  company: Company;
}

export const YTDPerformance: React.FC<YTDPerformanceProps> = ({ company }) => {
  const monthlyData = generateMonthlyData(company, 12);
  
  // Calculate cumulative data
  const data = monthlyData.map((month, index) => {
    const ytdData = monthlyData.slice(0, index + 1);
    return {
      month: month.month,
      revenue: ytdData.reduce((sum, m) => sum + m.revenue, 0),
      expenses: ytdData.reduce((sum, m) => sum + m.expenses, 0),
      profit: ytdData.reduce((sum, m) => sum + m.profit, 0)
    };
  });

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => `$${(value / 1000)}k`} />
          <Tooltip
            formatter={(value: number) => formatCurrency(value)}
            labelFormatter={(label) => `YTD through ${label}`}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="revenue"
            stackId="1"
            stroke="#4F46E5"
            fill="#4F46E5"
            fillOpacity={0.2}
            name="Revenue"
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stackId="2"
            stroke="#EF4444"
            fill="#EF4444"
            fillOpacity={0.2}
            name="Expenses"
          />
          <Area
            type="monotone"
            dataKey="profit"
            stackId="3"
            stroke="#10B981"
            fill="#10B981"
            fillOpacity={0.2}
            name="Profit"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};