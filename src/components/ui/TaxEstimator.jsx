import { useState } from 'react';
import { motion } from 'framer-motion';

export default function TaxEstimator() {
  const [income, setIncome] = useState(50000);
  const [filingStatus, setFilingStatus] = useState('single');

  // Simplified tax calculation (for demo purposes)
  const calculateTax = () => {
    let standardDeduction = filingStatus === 'single' ? 13850 : 27700;
    let taxableIncome = Math.max(0, income - standardDeduction);

    // 2024 tax brackets (simplified)
    let tax = 0;
    if (taxableIncome > 0) {
      if (taxableIncome <= 11000) {
        tax = taxableIncome * 0.10;
      } else if (taxableIncome <= 44725) {
        tax = 1100 + (taxableIncome - 11000) * 0.12;
      } else if (taxableIncome <= 95375) {
        tax = 5147 + (taxableIncome - 44725) * 0.22;
      } else if (taxableIncome <= 182050) {
        tax = 16290 + (taxableIncome - 95375) * 0.24;
      } else {
        tax = 44685 + (taxableIncome - 182050) * 0.32;
      }
    }

    // Self-employment tax (simplified)
    const seTax = income * 0.153;

    return {
      federalTax: tax,
      seTax: seTax,
      totalTax: tax + seTax,
      effectiveRate: income > 0 ? ((tax + seTax) / income) * 100 : 0,
      netIncome: income - (tax + seTax),
    };
  };

  const tax = calculateTax();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-background-alt border border-border rounded-lg p-6"
    >
      <h3 className="text-lg font-semibold text-text-primary mb-4">Tax Estimator</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-text-secondary mb-2">Annual Income ($)</label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 bg-background border border-border rounded-md text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        <div>
          <label className="block text-sm text-text-secondary mb-2">Filing Status</label>
          <select
            value={filingStatus}
            onChange={(e) => setFilingStatus(e.target.value)}
            className="w-full px-4 py-2 bg-background border border-border rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
          </select>
        </div>

        <div className="pt-4 border-t border-border space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Federal Income Tax</span>
            <span className="text-text-primary">${tax.federalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Self-Employment Tax</span>
            <span className="text-text-primary">${tax.seTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
          </div>
          <div className="flex justify-between text-sm font-semibold pt-2 border-t border-border">
            <span className="text-text-primary">Total Tax</span>
            <span className="text-red-400">${tax.totalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Effective Rate</span>
            <span className="text-text-primary">{tax.effectiveRate.toFixed(1)}%</span>
          </div>
          <div className="flex justify-between text-lg font-semibold pt-2 border-t border-border">
            <span className="text-text-primary">Net Income</span>
            <span className="text-green-400">${tax.netIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-text-muted mt-4">
        *This is a simplified estimate for planning purposes only. Consult a tax professional for accurate calculations.
      </p>
    </motion.div>
  );
}
