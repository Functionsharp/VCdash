import React from 'react';
import { Users } from 'lucide-react';
import { CustomerMetrics } from '../../types/portfolio';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

interface CustomerMetricsCardProps {
  metrics: CustomerMetrics;
}

export const CustomerMetricsCard: React.FC<CustomerMetricsCardProps> = ({ metrics }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Customer Metrics</h3>
        <Users className="w-5 h-5 text-indigo-600" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">CAC</p>
          <p className="text-base font-semibold">{formatCurrency(metrics.cac)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">LTV</p>
          <p className="text-base font-semibold">{formatCurrency(metrics.ltv)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">CAC:LTV Ratio</p>
          <p className="text-base font-semibold">{metrics.cacLtvRatio.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Churn Rate</p>
          <p className={`text-base font-semibold ${metrics.churnRate <= 5 ? 'text-green-600' : 'text-red-600'}`}>
            {formatPercentage(metrics.churnRate)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">New Clients</p>
          <p className="text-base font-semibold">{metrics.newClients}</p>
        </div>
      </div>
    </div>
  );
};