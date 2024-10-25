import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Company } from '../types/portfolio';
import { generateMonthlyData } from './analysisUtils';

export const generatePDFReport = (company: Company) => {
  const doc = new jsPDF();
  const monthlyData = generateMonthlyData(company);

  // Add title
  doc.setFontSize(20);
  doc.text(`Financial Report - ${company.name}`, 20, 20);

  // Add company overview
  doc.setFontSize(12);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 30);
  doc.text(`Industry: ${company.industry}`, 20, 40);

  // Add key metrics table
  autoTable(doc, {
    startY: 50,
    head: [['Metric', 'Value']],
    body: [
      ['Monthly Revenue', `$${company.financialMetrics.monthlyRevenue.toLocaleString()}`],
      ['Burn Rate', `$${company.financialMetrics.burnRate.toLocaleString()}`],
      ['Runway', `${company.financialMetrics.runway} months`],
      ['Gross Profit Margin', `${company.financialMetrics.grossProfitMargin}%`]
    ]
  });

  // Add monthly performance table
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 20,
    head: [['Month', 'Revenue', 'Expenses', 'Profit']],
    body: monthlyData.map(data => [
      data.month,
      `$${data.revenue.toLocaleString()}`,
      `$${data.expenses.toLocaleString()}`,
      `$${data.profit.toLocaleString()}`
    ])
  });

  // Save the PDF
  doc.save(`${company.name.toLowerCase()}-financial-report.pdf`);
};

export const exportToCSV = (company: Company) => {
  const monthlyData = generateMonthlyData(company);
  const headers = ['Month,Revenue,Expenses,Profit\n'];
  
  const rows = monthlyData.map(data => 
    `${data.month},${data.revenue},${data.expenses},${data.profit}`
  );

  const csvContent = headers.concat(rows.join('\n'));
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', `${company.name.toLowerCase()}-financial-data.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};