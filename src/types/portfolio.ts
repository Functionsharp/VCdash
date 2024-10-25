export interface FinancialMetrics {
  cashInBank: number;
  monthlyRevenue: number;
  revenueGrowth: number;
  burnRate: number;
  runway: number;
  accountsReceivable: number;
  accountsPayable: number;
  grossProfitMargin: number;
  operatingExpenses: {
    salaries: number;
    rent: number;
    utilities: number;
    other: number;
  };
  ebitda: number;
}

export interface CustomerMetrics {
  cac: number;
  ltv: number;
  cacLtvRatio: number;
  churnRate: number;
  newClients: number;
}

export interface MarketingMetrics {
  marketingSpend: number;
  salesConversionRate: number;
  leadVelocityRate: number;
}

export interface OperationalMetrics {
  mau: number;
  dau: number;
  churnedCustomers: number;
  salesPipeline: {
    prospecting: number;
    qualification: number;
    proposal: number;
    negotiation: number;
    closing: number;
  };
}

export interface GrowthMetrics {
  arr: number;
  mrr: number;
  mrrGrowthRate: number;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  investmentDate: string;
  investmentAmount: number;
  valuation: number;
  financialMetrics: FinancialMetrics;
  customerMetrics: CustomerMetrics;
  marketingMetrics: MarketingMetrics;
  operationalMetrics: OperationalMetrics;
  growthMetrics: GrowthMetrics;
}

export interface PortfolioMetrics {
  totalInvestment: number;
  totalValuation: number;
  averageGrowth: number;
  portfolioCount: number;
}