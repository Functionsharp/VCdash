import React from 'react';
import { Company } from '../../types/portfolio';
import { FinancialDashboard } from '../FinancialDashboard/FinancialDashboard';

interface CompanyMetricsProps {
  company: Company;
}

export const CompanyMetrics: React.FC<CompanyMetricsProps> = ({ company }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <img src={company.logo} alt={company.name} className="w-12 h-12 rounded-full" />
        <div>
          <h2 className="text-xl font-bold text-gray-900">{company.name}</h2>
          <p className="text-sm text-gray-500">{company.industry}</p>
        </div>
      </div>

      <FinancialDashboard company={company} />
    </div>
  );
};