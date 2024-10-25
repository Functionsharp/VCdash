import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Company } from '../../types/portfolio';
import { calculateMoMChange, calculateYoYChange } from '../../utils/analysisUtils';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

interface MetricsOverviewProps {
  company: Company;
  timeframe: '1M' | '3M' | '6M' | '1Y';
}

export const MetricsOverview: React.FC<MetricsOverviewProps> = ({ company, timeframe }) => {
  const metrics = [
    {
      title: 'Monthly Revenue',
      value: company.financialMetrics.monthlyRevenue,
      momChange: 15.2, // Simulated MoM change
      yoyChange: 85.5  // Simulated YoY change
    },
    {
      title: 'Monthly Expenses',
      value: company.financialMetrics.burnRate,
      momChange: 8.4,
      yoyChange: 45.2
    },
    {
      title: 'Gross Profit',
      value: company.financialMetrics.monthlyRevenue - company.financialMetrics.burnRate,
      momChange: 22.1,
      yoyChange: 125.8
    },
    {
      title: 'Profit Margin',
      value: company.financialMetrics.grossProfitMargin,
      momChange: 5.5,
      yoyChange: 15.2,
      isPercentage: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <div key={metric.title} className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">{metric.title}</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">
              {metric.isPercentage ? formatPercentage(metric.value) : formatCurrency(metric.value)}
            </p>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">MoM Change</span>
              <span className={`flex items-center ${metric.momChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {metric.momChange >= 0 ? (
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                )}
                {formatPercentage(Math.abs(metric.momChange))}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">YoY Change</span>
              <span className={`flex items-center ${metric.yoyChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {metric.yoyChange >= 0 ? (
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                )}
                {formatPercentage(Math.abs(metric.yoyChange))}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};