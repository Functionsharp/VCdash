import React, { useState } from 'react';
import { Download, TrendingUp, DollarSign, PieChart as PieChartIcon } from 'lucide-react';
import { RevenueExpenseChart } from './RevenueExpenseChart';
import { GrossProfitChart } from './GrossProfitChart';
import { ExpenseDistribution } from './ExpenseDistribution';
import { MonthlyComparison } from './MonthlyComparison';
import { YTDPerformance } from './YTDPerformance';
import { MetricsOverview } from './MetricsOverview';
import { generatePDFReport, exportToCSV } from '../../utils/exportUtils';
import { analyzeSeasonalPatterns, calculateVariance } from '../../utils/analysisUtils';
import { Company } from '../../types/portfolio';

interface FinancialDashboardProps {
  company: Company;
}

export const FinancialDashboard: React.FC<FinancialDashboardProps> = ({ company }) => {
  const [timeframe, setTimeframe] = useState<'1M' | '3M' | '6M' | '1Y'>('1Y');

  const handleExportPDF = () => {
    generatePDFReport(company);
  };

  const handleExportCSV = () => {
    exportToCSV(company);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Financial Dashboard</h2>
        <div className="flex space-x-4">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value as any)}
            className="rounded-lg border-gray-300 text-sm"
          >
            <option value="1M">Last Month</option>
            <option value="3M">Last 3 Months</option>
            <option value="6M">Last 6 Months</option>
            <option value="1Y">Last Year</option>
          </select>
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Export CSV
          </button>
          <button
            onClick={handleExportPDF}
            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Generate Report
          </button>
        </div>
      </div>

      <MetricsOverview company={company} timeframe={timeframe} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Revenue & Expenses</h3>
            <TrendingUp className="w-5 h-5 text-indigo-600" />
          </div>
          <RevenueExpenseChart company={company} timeframe={timeframe} />
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Gross Profit Margins</h3>
            <DollarSign className="w-5 h-5 text-indigo-600" />
          </div>
          <GrossProfitChart company={company} timeframe={timeframe} />
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Expense Distribution</h3>
            <PieChartIcon className="w-5 h-5 text-indigo-600" />
          </div>
          <ExpenseDistribution company={company} />
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Monthly Comparison</h3>
            <TrendingUp className="w-5 h-5 text-indigo-600" />
          </div>
          <MonthlyComparison company={company} />
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">YTD Performance</h3>
            <TrendingUp className="w-5 h-5 text-indigo-600" />
          </div>
          <YTDPerformance company={company} />
        </div>
      </div>
    </div>
  );
};