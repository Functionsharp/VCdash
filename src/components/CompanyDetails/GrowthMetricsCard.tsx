import React from 'react';
import { TrendingUp } from 'lucide-react';
import { GrowthMetrics } from '../../types/portfolio';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface GrowthMetricsCardProps {
  metrics: GrowthMetrics;
}

export const GrowthMetricsCard: React.FC<GrowthMetricsCardProps> = ({ metrics }) => {
  // Generate last 6 months of MRR data
  const generateMRRData = () => {
    const data = [];
    const growthRate = 1 + (metrics.mrrGrowthRate / 100);
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const month = date.toLocaleString('default', { month: 'short' });
      const historicalMRR = metrics.mrr / Math.pow(growthRate, i);
      
      data.push({
        month,
        mrr: Math.round(historicalMRR)
      });
    }
    
    return data;
  };

  const mrrData = generateMRRData();

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Growth Metrics</h3>
        <TrendingUp className="w-5 h-5 text-indigo-600" />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-500">ARR</p>
          <p className="text-base font-semibold">{formatCurrency(metrics.arr)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">MRR</p>
          <p className="text-base font-semibold">{formatCurrency(metrics.mrr)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">MRR Growth Rate</p>
          <p className={`text-base font-semibold ${metrics.mrrGrowthRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatPercentage(metrics.mrrGrowthRate)}
          </p>
        </div>
      </div>

      <div className="h-48 mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mrrData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `$${(value / 1000)}k`} />
            <Tooltip formatter={(value: number) => formatCurrency(value)} />
            <Area 
              type="monotone" 
              dataKey="mrr" 
              stroke="#4F46E5" 
              fill="#4F46E5" 
              fillOpacity={0.2} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};