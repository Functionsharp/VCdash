import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Company } from '../../types/portfolio';
import { generateMonthlyData } from '../../utils/analysisUtils';
import { formatCurrency } from '../../utils/formatters';

interface MonthlyComparisonProps {
  company: Company;
}

export const MonthlyComparison: React.FC<MonthlyComparisonProps> = ({ company }) => {
  const currentMonth = generateMonthlyData(company, 1)[0];
  const previousMonth = generateMonthlyData(company, 2)[0];

  const data = [
    {
      category: 'Revenue',
      Current: currentMonth.revenue,
      Previous: previousMonth.revenue
    },
    {
      category: 'Expenses',
      Current: currentMonth.expenses,
      Previous: previousMonth.expenses
    },
    {
      category: 'Profit',
      Current: currentMonth.profit,
      Previous: previousMonth.profit
    }
  ];

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis tickFormatter={(value) => `$${(value / 1000)}k`} />
          <Tooltip formatter={(value: number) => formatCurrency(value)} />
          <Legend />
          <Bar dataKey="Current" fill="#4F46E5" name="Current Month" />
          <Bar dataKey="Previous" fill="#9333EA" name="Previous Month" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};