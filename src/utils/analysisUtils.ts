import { Company } from '../types/portfolio';

export const calculateMoMChange = (current: number, previous: number): number => {
  return previous ? ((current - previous) / previous) * 100 : 0;
};

export const calculateYoYChange = (current: number, previousYear: number): number => {
  return previousYear ? ((current - previousYear) / previousYear) * 100 : 0;
};

export const analyzeSeasonalPatterns = (monthlyData: number[]): {
  pattern: 'increasing' | 'decreasing' | 'stable';
  confidence: number;
} => {
  // Simple linear regression to detect trends
  const n = monthlyData.length;
  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
  
  monthlyData.forEach((value, index) => {
    sumX += index;
    sumY += value;
    sumXY += index * value;
    sumX2 += index * index;
  });

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const confidence = Math.abs(slope) / (Math.max(...monthlyData) - Math.min(...monthlyData));

  return {
    pattern: slope > 0 ? 'increasing' : slope < 0 ? 'decreasing' : 'stable',
    confidence: Math.min(confidence * 100, 100)
  };
};

export const calculateVariance = (
  actual: number,
  expected: number
): { variance: number; percentage: number } => {
  const variance = actual - expected;
  const percentage = expected ? (variance / expected) * 100 : 0;
  
  return { variance, percentage };
};

export const generateMonthlyData = (company: Company, months: number = 12) => {
  const data = [];
  const monthlyRevenue = company.financialMetrics.monthlyRevenue;
  const growthRate = 1 + (company.financialMetrics.revenueGrowth / 100);

  for (let i = months - 1; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    
    // Simulate historical data with some variance
    const variance = 0.1; // 10% maximum variance
    const randomFactor = 1 + (Math.random() * variance * 2 - variance);
    
    const historicalRevenue = monthlyRevenue / Math.pow(growthRate, i) * randomFactor;
    const expenses = company.financialMetrics.burnRate * randomFactor;
    
    data.push({
      month: date.toLocaleString('default', { month: 'short' }),
      revenue: Math.round(historicalRevenue),
      expenses: Math.round(expenses),
      profit: Math.round(historicalRevenue - expenses)
    });
  }

  return data;
};