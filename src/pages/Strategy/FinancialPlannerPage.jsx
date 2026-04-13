import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import CommissionCalculator from '@/components/ui/CommissionCalculator';
import IncomeBreakdown from '@/components/ui/IncomeBreakdown';
import SavingsGoalTracker from '@/components/ui/SavingsGoalTracker';
import MonthlyProjection from '@/components/ui/MonthlyProjection';
import TaxEstimator from '@/components/ui/TaxEstimator';

export default function FinancialPlannerPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [loading, setLoading] = useState(true);
  const [financialData, setFinancialData] = useState(null);

  useEffect(() => {
    fetchFinancialData();
  }, [selectedPeriod]);

  const fetchFinancialData = async () => {
    try {
      setLoading(true);
      // In real implementation: fetch from API
      // const data = await financialAPI.getProjection(selectedPeriod);

      // Mock data
      setFinancialData({
        totalIncome: 15600,
        totalExpenses: 4200,
        netIncome: 11400,
        savingsRate: 73,
        averageDealSize: 5200,
        monthlyCommission: 9800,
      });
    } catch (error) {
      console.error('Error fetching financial data:', error);
    } finally {
      setLoading(false);
    }
  };

  const periods = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'yearly', label: 'Yearly' },
  ];

  const quickStats = [
    {
      title: 'Total Income',
      value: '$15,600',
      change: 12,
      icon: '💰',
      color: 'gold',
    },
    {
      title: 'Net Income',
      value: '$11,400',
      change: 8,
      icon: '📈',
      color: 'green',
    },
    {
      title: 'Savings Rate',
      value: '73%',
      change: 5,
      icon: '🏦',
      color: 'blue',
    },
    {
      title: 'Avg Deal Size',
      value: '$5,200',
      change: -3,
      icon: '🎯',
      color: 'purple',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
            Financial Planner
          </h1>
          <p className="text-text-secondary">Plan your income, commissions, and financial goals</p>
        </div>

        {/* Period Selector */}
        <div className="flex items-center space-x-2 bg-background-alt border border-border rounded-lg p-1">
          {periods.map((period) => (
            <button
              key={period.value}
              onClick={() => setSelectedPeriod(period.value)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedPeriod === period.value
                  ? 'bg-gold text-background'
                  : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-background-alt border border-border rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{stat.icon}</span>
              {stat.change !== undefined && (
                <div className={`flex items-center text-sm ${
                  stat.change >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.change >= 0 ? (
                    <ArrowUpIcon className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4 mr-1" />
                  )}
                  <span>{Math.abs(stat.change)}%</span>
                </div>
              )}
            </div>
            <p className="text-text-secondary text-sm mb-1">{stat.title}</p>
            <p className={`text-2xl font-bold text-${stat.color === 'gold' ? 'gold' : stat.color + '-400'}`}>
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Financial Tools Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Commission Calculator */}
        <CommissionCalculator />

        {/* Tax Estimator */}
        <TaxEstimator />
      </div>

      {/* Income Breakdown and Projections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <IncomeBreakdown />
        <MonthlyProjection />
      </div>

      {/* Savings Goals */}
      <SavingsGoalTracker />

      {/* Financial Tips */}
      <div className="bg-gradient-to-r from-gold/10 to-blue-500/10 border border-gold/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gold mb-4">💡 Financial Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-background/50 rounded-lg p-4">
            <h4 className="font-semibold text-text-primary mb-2">Diversify Income</h4>
            <p className="text-sm text-text-secondary">
              Don't rely solely on commissions. Build multiple income streams through bonuses and overrides.
            </p>
          </div>
          <div className="bg-background/50 rounded-lg p-4">
            <h4 className="font-semibold text-text-primary mb-2">Tax Planning</h4>
            <p className="text-sm text-text-secondary">
              Set aside 25-30% of each commission check for taxes to avoid surprises at tax time.
            </p>
          </div>
          <div className="bg-background/50 rounded-lg p-4">
            <h4 className="font-semibold text-text-primary mb-2">Build Reserves</h4>
            <p className="text-sm text-text-secondary">
              Aim for 6 months of expenses in your emergency fund for financial security.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
