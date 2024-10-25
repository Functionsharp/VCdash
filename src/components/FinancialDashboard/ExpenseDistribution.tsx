import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Company } from '../../types/portfolio';
import { formatCurrency } from '../../utils/formatters';

interface ExpenseDistributionProps {
  company: Company;
}

export const ExpenseDistribution: React.FC<ExpenseDistributionProps> = ({ company }) => {
  const expenses = company.financialMetrics.operatingExpenses;
  const data = [
    { name: 'Salaries', value: expenses.salaries },
    { name: 'Rent', value: expenses.rent },
    { name: 'Utilities', value: expenses.utilities },
    { name: 'Other', value: expenses.other }
  ];

  const COLORS = ['#4F46E5', '#7C3AED', '#2563EB', '#9333EA'];

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => formatCurrency(value)} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-2 gap-2 mt-4">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: COLORS[index] }}
              />
              <span className="text-sm text-gray-600">{item.name}</span>
            </div>
            <span className="text-sm font-medium">
              {((item.value / data.reduce((acc, curr) => acc + curr.value, 0)) * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};