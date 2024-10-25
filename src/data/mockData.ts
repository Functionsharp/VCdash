import { Company, PortfolioMetrics } from '../types/portfolio';

export const companies: Company[] = [
  {
    id: '1',
    name: 'TechFlow',
    logo: 'https://images.unsplash.com/photo-1549421263-5ec394a5ad4c?w=100&h=100&fit=crop',
    industry: 'SaaS',
    investmentDate: '2023-01-15',
    investmentAmount: 2000000,
    valuation: 15000000,
    financialMetrics: {
      cashInBank: 1500000,
      monthlyRevenue: 250000,
      revenueGrowth: 15.5,
      burnRate: 180000,
      runway: 18,
      accountsReceivable: 300000,
      accountsPayable: 150000,
      grossProfitMargin: 75,
      operatingExpenses: {
        salaries: 120000,
        rent: 15000,
        utilities: 5000,
        other: 40000
      },
      ebitda: 70000
    },
    customerMetrics: {
      cac: 500,
      ltv: 5000,
      cacLtvRatio: 10,
      churnRate: 2.5,
      newClients: 45
    },
    marketingMetrics: {
      marketingSpend: 50000,
      salesConversionRate: 12,
      leadVelocityRate: 25
    },
    operationalMetrics: {
      mau: 25000,
      dau: 5000,
      churnedCustomers: 15,
      salesPipeline: {
        prospecting: 150,
        qualification: 80,
        proposal: 40,
        negotiation: 20,
        closing: 10
      }
    },
    growthMetrics: {
      arr: 3000000,
      mrr: 250000,
      mrrGrowthRate: 15.5
    }
  },
  {
    id: '2',
    name: 'DataSense',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop',
    industry: 'Analytics',
    investmentDate: '2023-03-20',
    investmentAmount: 1500000,
    valuation: 10000000,
    financialMetrics: {
      cashInBank: 1200000,
      monthlyRevenue: 180000,
      revenueGrowth: 12.8,
      burnRate: 150000,
      runway: 14,
      accountsReceivable: 250000,
      accountsPayable: 120000,
      grossProfitMargin: 80,
      operatingExpenses: {
        salaries: 100000,
        rent: 12000,
        utilities: 4000,
        other: 34000
      },
      ebitda: 50000
    },
    customerMetrics: {
      cac: 600,
      ltv: 4500,
      cacLtvRatio: 7.5,
      churnRate: 3.2,
      newClients: 35
    },
    marketingMetrics: {
      marketingSpend: 40000,
      salesConversionRate: 10,
      leadVelocityRate: 20
    },
    operationalMetrics: {
      mau: 18000,
      dau: 3500,
      churnedCustomers: 12,
      salesPipeline: {
        prospecting: 120,
        qualification: 60,
        proposal: 30,
        negotiation: 15,
        closing: 8
      }
    },
    growthMetrics: {
      arr: 2160000,
      mrr: 180000,
      mrrGrowthRate: 12.8
    }
  }
];

export const portfolioMetrics: PortfolioMetrics = {
  totalInvestment: 3500000,
  totalValuation: 25000000,
  averageGrowth: 14.15,
  portfolioCount: 2
};