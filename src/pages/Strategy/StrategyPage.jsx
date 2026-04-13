import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function StrategyPage() {
  const modules = [
    {
      id: 'daily-performance',
      title: 'Daily Performance',
      description: 'Track your daily sales metrics, tours, and closing rates',
      icon: '📈',
      path: '/strategy/daily-performance',
      status: 'live',
      color: 'from-blue-500/20 to-blue-600/20',
    },
    {
      id: 'goal-sheet',
      title: 'Goal Sheet',
      description: 'Set and track your sales, revenue, and personal development goals',
      icon: '🎯',
      path: '/strategy/goal-sheet',
      status: 'live',
      color: 'from-gold/20 to-gold-light/20',
    },
    {
      id: 'financial-planner',
      title: 'Financial Planner',
      description: 'Plan your income, commissions, and bonus targets',
      icon: '💰',
      path: '/strategy/financial-planner',
      status: 'live',
      color: 'from-green-500/20 to-green-600/20',
    },
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'Visualize your performance trends and identify improvement areas',
      icon: '📊',
      path: '/strategy/analytics',
      status: 'live',
      color: 'from-purple-500/20 to-purple-600/20',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
          Strategy
        </h1>
        <p className="text-text-secondary">
          Track your performance, set goals, and analyze your progress
        </p>
      </div>

      {/* Module Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((module) => (
          <Link
            key={module.id}
            to={module.path}
            className={`block bg-gradient-to-br ${module.color} border border-border rounded-lg p-6 hover:border-gold/50 transition-all group`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-lg bg-background/50 flex items-center justify-center text-2xl">
                  {module.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-text-primary">{module.title}</h3>
                  {module.status === 'live' && (
                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                      Live
                    </span>
                  )}
                </div>
              </div>
              <ArrowRightIcon className="h-5 w-5 text-text-secondary group-hover:text-gold group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-text-secondary text-sm">{module.description}</p>
            {module.status === 'coming-soon' && (
              <div className="mt-4 text-sm text-gold">Coming Soon</div>
            )}
          </Link>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="bg-background-alt border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Your Progress This Week</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <p className="text-3xl font-bold text-gold">$45,200</p>
            <p className="text-text-secondary text-sm mt-1">Weekly Volume</p>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <p className="text-3xl font-bold text-gold">12</p>
            <p className="text-text-secondary text-sm mt-1">Sales</p>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <p className="text-3xl font-bold text-gold">5</p>
            <p className="text-text-secondary text-sm mt-1">Day Streak</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
