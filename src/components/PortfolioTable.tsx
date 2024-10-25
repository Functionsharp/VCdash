import React from 'react';
import { Company } from '../types/portfolio';
import { ChevronRight } from 'lucide-react';

interface PortfolioTableProps {
  companies: Company[];
  onSelectCompany: (company: Company) => void;
}

export const PortfolioTable: React.FC<PortfolioTableProps> = ({ companies, onSelectCompany }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MRR</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Runway</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {companies.map((company) => (
            <tr key={company.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img className="h-10 w-10 rounded-full" src={company.logo} alt={company.name} />
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{company.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{company.industry}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${(company.growthMetrics.mrr / 1000).toFixed(1)}k
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  company.growthMetrics.mrrGrowthRate > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {company.growthMetrics.mrrGrowthRate}%
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  company.financialMetrics.runway > 12 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {company.financialMetrics.runway} months
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onSelectCompany(company)}
                  className="text-indigo-600 hover:text-indigo-900 flex items-center"
                >
                  View Details
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};