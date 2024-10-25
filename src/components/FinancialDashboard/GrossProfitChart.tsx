import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Company } from '../../types/portfolio';
import { generateMonthlyData } from '../../utils/analysisUtils';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

interface GrossProfitChartProps {
  company: Company;
  timeframe: '1M' | '3M' | '6M' | '1Y';
}

export const GrossProfitChart: React.FC<GrossProfitChartProps> = ({ company, timeframe }) => {
  const monthsMap = { '1M': 1, '3M': 3, '6M': 6, '1Y': 12 };
  const data = generateMonthlyData(company, monthsMap[timeframe]);

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis yAxisId="left" tickFormatter={(value) => `$${(value / 1000)}k`} />
          <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${value}%`} />
          <Tooltip
            formatter={(value: number, name: string) => [
              name === 'margin' ? formatPercentage(value) : formatCurrency(value),
              name.charAt(0).toUpperCase() + name.slice(1)
            ]}
          />
          <Legend />
          <Bar yAxisId="left" dataKey="profit" fill="#4F46E5" name="Gross Profit" />
          <Bar
            yAxisId="right"
            dataKey="margin"
            fill="#10B981"
            name="Margin %"
            data={data.map(item => ({
              ...item,
              margin: ((item.profit / item.revenue) * 100).toFixed(1)
            }))}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};