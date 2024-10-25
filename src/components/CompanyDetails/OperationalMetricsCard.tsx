import React from 'react';
import { Activity } from 'lucide-react';
import { OperationalMetrics } from '../../types/portfolio';

interface OperationalMetricsCardProps {
  metrics: OperationalMetrics;
}

export const OperationalMetricsCard: React.FC<OperationalMetricsCardProps> = ({ metrics }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Operational Metrics</h3>
        <Activity className="w-5 h-5 text-indigo-600" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">MAU</p>
          <p className="text-base font-semibold">{metrics.mau.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">DAU</p>
          <p className="text-base font-semibold">{metrics.dau.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Churned Customers</p>
          <p className="text-base font-semibold">{metrics.churnedCustomers}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500 mb-2">Sales Pipeline</p>
        <div className="space-y-2">
          {Object.entries(metrics.salesPipeline).map(([stage, count]) => (
            <div key={stage} className="flex items-center justify-between">
              <p className="text-sm capitalize">{stage}</p>
              <p className="text-sm font-semibold">{count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};