import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Company } from '../../types/portfolio';
import { generateMonthlyData } from '../../utils/analysisUtils';
import { formatCurrency } from '../../utils/formatters';

interface RevenueExpenseChartProps {
  company: Company;
  timeframe: '1M' | '3M' | '6M' | '1Y';
}

export const RevenueExpenseChart: React.FC<RevenueExpenseChartProps> = ({ company, timeframe }) => {
  const monthsMap = { '1M': 1, '3M': 3, '6M': 6, '1Y': 12 };
  const data = generateMonthlyData(company, monthsMap[timeframe]);

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => `$${(value / 1000)}k`} />
          <Tooltip
            formatter={(value: number) => formatCurrency(value)}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#4F46E5"
            strokeWidth={2}
            dot={false}
            name="Revenue"
          />
          <Line
            type="monotone"
            dataKey="expenses"
            stroke="#EF4444"
            strokeWidth={2}
            dot={false}
            name="Expenses"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};