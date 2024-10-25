import React, { useState } from 'react';
import { Briefcase } from 'lucide-react';
import { Company } from './types/portfolio';
import { companies, portfolioMetrics } from './data/mockData';
import { MetricsCard } from './components/MetricsCard';
import { PortfolioTable } from './components/PortfolioTable';
import { PerformanceChart } from './components/PerformanceChart';
import { CompanyMetrics } from './components/CompanyDetails/CompanyMetrics';

function App() {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(companies[0]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <Briefcase className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">VC Portfolio Dashboard</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricsCard
            title="Total Investment"
            value={`$${(portfolioMetrics.totalInvestment / 1000000).toFixed(1)}M`}
            type="money"
          />
          <MetricsCard
            title="Portfolio Valuation"
            value={`$${(portfolioMetrics.totalValuation / 1000000).toFixed(1)}M`}
            type="money"
            trend={215}
          />
          <MetricsCard
            title="Average Growth"
            value={`${portfolioMetrics.averageGrowth.toFixed(1)}%`}
            type="percentage"
          />
          <MetricsCard
            title="Portfolio Companies"
            value={portfolioMetrics.portfolioCount.toString()}
            type="number"
          />
        </div>

        {/* Performance Chart */}
        <div className="mb-8">
          <PerformanceChart companies={companies} />
        </div>

        {/* Portfolio Table and Company Details */}
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">Portfolio Companies</h2>
            </div>
            <PortfolioTable 
              companies={companies} 
              onSelectCompany={setSelectedCompany}
            />
          </div>

          {selectedCompany && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <CompanyMetrics company={selectedCompany} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;