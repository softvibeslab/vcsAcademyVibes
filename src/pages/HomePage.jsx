import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function HomePage() {
  const { user } = useAuth();

  const quickStats = [
    { label: 'Training Progress', value: '0%', icon: '📚' },
    { label: 'Current Streak', value: '0 days', icon: '🔥' },
    { label: 'Points Earned', value: '0', icon: '⭐' },
    { label: 'Badges', value: '0/11', icon: '🏆' },
  ];

  const modules = [
    {
      title: 'Strategy',
      description: 'Track your daily performance, set goals, and analyze your progress',
      path: '/strategy',
      icon: '📊',
      color: 'from-blue-500/20 to-blue-600/20',
    },
    {
      title: 'Training',
      description: 'Master the skills that top producers use to close consistently',
      path: '/training',
      icon: '🎓',
      color: 'from-purple-500/20 to-purple-600/20',
    },
    {
      title: 'Coaching',
      description: 'Join live sessions, role plays, and Q&A with experts',
      path: '/coaching',
      icon: '🎯',
      color: 'from-gold/20 to-gold-light/20',
    },
    {
      title: 'Resources',
      description: 'Download scripts, templates, guides, and more',
      path: '/resources',
      icon: '📚',
      color: 'from-green-500/20 to-green-600/20',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-navy/20 to-navy/10 border border-border rounded-lg p-8">
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
          Welcome back, {user?.name || 'User'}!
        </h1>
        <p className="text-text-secondary">
          Ready to accelerate your performance today? Here's your overview.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-background-alt border border-border rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-xs text-text-secondary">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Module Cards */}
      <div>
        <h2 className="text-xl font-semibold text-text-primary mb-4">Your Path to Success</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((module, index) => (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Link
                to={module.path}
                className="block bg-gradient-to-br from-background-alt to-background border border-border rounded-lg p-6 hover:border-gold/50 transition-all group"
              >
                <div className="flex items-start space-x-4">
                  <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${module.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                    {module.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-gold transition-colors">
                      {module.title}
                    </h3>
                    <p className="text-sm text-text-secondary">{module.description}</p>
                  </div>
                  <svg className="h-5 w-5 text-text-secondary group-hover:text-gold group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-gold/5 border border-gold/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gold mb-2">🚀 Getting Started</h3>
        <p className="text-text-secondary mb-4">
          Start your journey by exploring the Training module to build your foundation, then track your progress in Strategy.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/training"
            className="px-4 py-2 bg-gold text-background font-medium rounded-md hover:bg-gold-light transition-colors"
          >
            Start Training
          </Link>
          <Link
            to="/strategy"
            className="px-4 py-2 bg-background-alt border border-border text-text-primary font-medium rounded-md hover:bg-background transition-colors"
          >
            Set Goals
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

