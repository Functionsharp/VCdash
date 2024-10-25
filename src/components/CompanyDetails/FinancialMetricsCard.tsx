import React from 'react';
import { DollarSign } from 'lucide-react';
import { FinancialMetrics } from '../../types/portfolio';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface FinancialMetricsCardProps {
  metrics: FinancialMetrics;
}

export const FinancialMetricsCard: React.FC<FinancialMetricsCardProps> = ({ metrics }) => {
  const expensesData = [
    { name: 'Salaries', value: metrics.operatingExpenses.salaries },
    { name: 'Rent', value: metrics.operatingExpenses.rent },
    { name: 'Utilities', value: metrics.operatingExpenses.utilities },
    { name: 'Other', value: metrics.operatingExpenses.other },
  ];

  const COLORS = ['#4F46E5', '#7C3AED', '#2563EB', '#9333EA'];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Financial Metrics</h3>
        <DollarSign className="w-5 h-5 text-indigo-600" />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-500">Cash in Bank</p>
          <p className="text-base font-semibold">{formatCurrency(metrics.cashInBank)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Monthly Revenue</p>
          <p className="text-base font-semibold">{formatCurrency(metrics.monthlyRevenue)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Revenue Growth</p>
          <p className={`text-base font-semibold ${metrics.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatPercentage(metrics.revenueGrowth)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Burn Rate</p>
          <p className="text-base font-semibold">{formatCurrency(metrics.burnRate)}/mo</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Runway</p>
          <p className={`text-base font-semibold ${metrics.runway > 12 ? 'text-green-600' : 'text-red-600'}`}>
            {metrics.runway} months
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Gross Profit Margin</p>
          <p className="text-base font-semibold">{formatPercentage(metrics.grossProfitMargin)}</p>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-900 mb-4">Operating Expenses Breakdown</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expensesData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {expensesData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {expensesData.map((item, index) => (
            <div key={item.name} className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index] }} />
              <span className="text-sm text-gray-600">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};