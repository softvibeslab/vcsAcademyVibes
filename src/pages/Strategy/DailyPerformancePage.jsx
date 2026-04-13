import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpIcon, CurrencyDollarIcon, UserGroupIcon, FireIcon } from '@heroicons/react/24/outline';
import StatCard from '@/components/ui/StatCard';
import ProgressCard from '@/components/ui/ProgressCard';
import ActivityCard from '@/components/ui/ActivityCard';
import MetricChart from '@/components/ui/MetricChart';
import { developmentAPI, goalSheetAPI } from '@/lib/api';

export default function DailyPerformancePage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    todayVolume: '$0',
    tours: 0,
    sales: 0,
    closingRate: 0,
    weeklyVolume: '$0',
    streak: 0,
  });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchDailyStats();
    fetchChartData();
  }, []);

  const fetchDailyStats = async () => {
    try {
      setLoading(true);
      const data = await goalSheetAPI.getStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Set mock data for now
      setStats({
        todayVolume: '$12,450',
        tours: 8,
        sales: 3,
        closingRate: 37.5,
        weeklyVolume: '$45,200',
        streak: 5,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchChartData = async () => {
    try {
      // Mock data for now - replace with API call
      const mockData = [
        { name: 'Mon', value: 8500 },
        { name: 'Tue', value: 12450 },
        { name: 'Wed', value: 9200 },
        { name: 'Thu', value: 15800 },
        { name: 'Fri', value: 11200 },
        { name: 'Sat', value: 18500 },
        { name: 'Sun', value: 7500 },
      ];
      setChartData(mockData);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  const dailyActivities = [
    {
      title: 'Complete Morning Training',
      description: 'Watch today\'s training module',
      completed: true,
      points: 10,
    },
    {
      title: 'Review Goal Sheet',
      description: 'Check your daily targets',
      completed: true,
      points: 5,
    },
    {
      title: 'Practice Objections',
      description: 'Role play for 15 minutes',
      completed: false,
      points: 15,
    },
    {
      title: 'Update Daily Stats',
      description: 'Log your tours and sales',
      completed: false,
      points: 5,
    },
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
            Daily Performance
          </h1>
          <p className="text-text-secondary">Track your daily metrics and progress</p>
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 bg-gold/10 border border-gold/20 rounded-lg">
          <FireIcon className="h-5 w-5 text-gold" />
          <span className="text-gold font-semibold">{stats.streak} Day Streak!</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Today's Volume"
          value={stats.todayVolume}
          change={12}
          icon="💰"
          color="gold"
        />
        <StatCard
          title="Tours"
          value={stats.tours}
          change={8}
          icon="👥"
          color="blue"
        />
        <StatCard
          title="Sales"
          value={stats.sales}
          change={-5}
          icon="🎯"
          color="green"
        />
        <StatCard
          title="Closing Rate"
          value={`${stats.closingRate}%`}
          change={15}
          icon="📈"
          color="purple"
        />
      </div>

      {/* Weekly Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MetricChart
            type="area"
            data={chartData}
            color="gold"
            height={300}
          />
        </div>
        <div className="space-y-4">
          <ProgressCard
            title="Weekly Volume Goal"
            progress={45200}
            total={60000}
            unit="$"
            color="gold"
          />
          <ProgressCard
            title="Tours This Week"
            progress={42}
            total={50}
            color="blue"
          />
          <ProgressCard
            title="Training Progress"
            progress={8}
            total={12}
            color="purple"
          />
        </div>
      </div>

      {/* Daily Activities */}
      <div>
        <h2 className="text-xl font-semibold text-text-primary mb-4">Today's Activities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ActivityCard
            title="Morning Routine"
            activities={dailyActivities.slice(0, 2)}
            icon="🌅"
          />
          <ActivityCard
            title="Afternoon Tasks"
            activities={dailyActivities.slice(2)}
            icon="🎯"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="px-4 py-3 bg-gold text-background font-medium rounded-lg hover:bg-gold-light transition-colors">
            Log Sale
          </button>
          <button className="px-4 py-3 bg-background-alt border border-border text-text-primary font-medium rounded-lg hover:bg-background transition-colors">
            Log Tour
          </button>
          <button className="px-4 py-3 bg-background-alt border border-border text-text-primary font-medium rounded-lg hover:bg-background transition-colors">
            View Training
          </button>
          <button className="px-4 py-3 bg-background-alt border border-border text-text-primary font-medium rounded-lg hover:bg-background transition-colors">
            Update Goals
          </button>
        </div>
      </div>
    </motion.div>
  );
}
