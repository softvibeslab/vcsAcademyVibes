import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import KPICard from '@/components/ui/KPICard';
import DateRangeFilter from '@/components/ui/DateRangeFilter';
import Leaderboard from '@/components/ui/Leaderboard';
import GoalVsActualChart from '@/components/ui/GoalVsActualChart';
import PerformanceTrends from '@/components/ui/PerformanceTrends';

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('30d');
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    fetchAnalyticsData(period);
  }, [period]);

  const fetchAnalyticsData = async (selectedPeriod) => {
    try {
      setLoading(true);
      // In real implementation: fetch from API
      // const data = await analyticsAPI.getData(selectedPeriod);

      // Mock data
      setAnalyticsData({
        totalRevenue: 156000,
        sales: 143,
        tours: 285,
        closingRate: 50.2,
        avgDealSize: 10909,
      });
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
  };

  // Mock sparkline data
  const sparklineData = {
    revenue: [42000, 45000, 43000, 48000, 52000, 51000, 56000],
    sales: [12, 14, 13, 15, 16, 15, 18],
    tours: [25, 28, 27, 31, 33, 32, 35],
    closingRate: [48, 50, 48, 52, 51, 50, 53],
  };

  const kpiData = [
    {
      title: 'Total Revenue',
      value: '$156,000',
      change: 18.5,
      icon: '💰',
      color: 'gold',
      sparklineData: sparklineData.revenue,
    },
    {
      title: 'Sales',
      value: '143',
      change: 22.3,
      icon: '🎯',
      color: 'green',
      sparklineData: sparklineData.sales,
    },
    {
      title: 'Tours',
      value: '285',
      change: 15.7,
      icon: '👥',
      color: 'blue',
      sparklineData: sparklineData.tours,
    },
    {
      title: 'Closing Rate',
      value: '50.2%',
      change: 8.4,
      icon: '📈',
      color: 'purple',
      sparklineData: sparklineData.closingRate,
    },
  ];

  const categoryData = [
    { name: 'New Sales', value: 45000, color: '#D4AF37' },
    { name: 'Upgrades', value: 32000, color: '#3b82f6' },
    { name: 'Referrals', value: 28000, color: '#22c55e' },
    { name: 'Add-ons', value: 18000, color: '#a855f7' },
    { name: 'Other', value: 12000, color: '#ef4444' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-text-secondary">Track your performance trends and insights</p>
        </div>
        <DateRangeFilter onPeriodChange={handlePeriodChange} />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trends */}
        <PerformanceTrends />

        {/* Goal vs Actual */}
        <GoalVsActualChart />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leaderboard */}
        <div className="lg:col-span-2">
          <Leaderboard />
        </div>

        {/* Revenue Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-background-alt border border-border rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-text-primary mb-4">Revenue by Category</h3>

          <div className="space-y-3">
            {categoryData.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-text-primary">{category.name}</span>
                  <span className="text-sm font-semibold" style={{ color: category.color }}>
                    ${category.value.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(category.value / 45000) * 100}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex justify-between">
              <span className="text-text-secondary text-sm">Total Revenue</span>
              <span className="text-gold font-bold">
                ${categoryData.reduce((sum, cat) => sum + cat.value, 0).toLocaleString()}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Insights Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-6"
      >
        <h3 className="text-lg font-semibold text-text-primary mb-4">🔍 Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-background/50 rounded-lg p-4">
            <h4 className="font-semibold text-text-primary mb-2">Strong Performance</h4>
            <p className="text-sm text-text-secondary">
              Your closing rate of 50.2% is above the team average of 45%. Keep up the great work!
            </p>
          </div>
          <div className="bg-background/50 rounded-lg p-4">
            <h4 className="font-semibold text-text-primary mb-2">Growth Opportunity</h4>
            <p className="text-sm text-text-secondary">
              Focus on referral sales to increase your revenue by an estimated 15-20%.
            </p>
          </div>
          <div className="bg-background/50 rounded-lg p-4">
            <h4 className="font-semibold text-text-primary mb-2">Recommendation</h4>
            <p className="text-sm text-text-secondary">
              Consider upgrading your presentation skills to improve deal sizes by 10%.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
