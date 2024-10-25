import React from 'react';
import { Target } from 'lucide-react';
import { MarketingMetrics } from '../../types/portfolio';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

interface MarketingMetricsCardProps {
  metrics: MarketingMetrics;
}

export const MarketingMetricsCard: React.FC<MarketingMetricsCardProps> = ({ metrics }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Marketing Metrics</h3>
        <Target className="w-5 h-5 text-indigo-600" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Marketing Spend</p>
          <p className="text-base font-semibold">{formatCurrency(metrics.marketingSpend)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Sales Conversion</p>
          <p className="text-base font-semibold">{formatPercentage(metrics.salesConversionRate)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Lead Velocity Rate</p>
          <p className={`text-base font-semibold ${metrics.leadVelocityRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatPercentage(metrics.leadVelocityRate)}
          </p>
        </div>
      </div>
    </div>
  );
};