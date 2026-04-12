import { motion } from 'framer-motion';

export default function StrategyPage() {
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
        {/* Daily Performance */}
        <div className="bg-background-alt border border-border rounded-lg p-6 hover:border-gold/50 transition-colors">
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-gold/10 flex items-center justify-center">
              <svg className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-text-primary">Daily Performance</h3>
          </div>
          <p className="text-text-secondary text-sm">
            Track your daily sales metrics, tours, and closing rates
          </p>
          <div className="mt-4 text-sm text-gold">Coming Soon</div>
        </div>

        {/* Goal Sheet */}
        <div className="bg-background-alt border border-border rounded-lg p-6 hover:border-gold/50 transition-colors">
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-gold/10 flex items-center justify-center">
              <svg className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-text-primary">Goal Sheet</h3>
          </div>
          <p className="text-text-secondary text-sm">
            Set and track your sales, revenue, and personal development goals
          </p>
          <div className="mt-4 text-sm text-gold">Coming Soon</div>
        </div>

        {/* Financial Planner */}
        <div className="bg-background-alt border border-border rounded-lg p-6 hover:border-gold/50 transition-colors">
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-gold/10 flex items-center justify-center">
              <svg className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-text-primary">Financial Planner</h3>
          </div>
          <p className="text-text-secondary text-sm">
            Plan your income, commissions, and bonus targets
          </p>
          <div className="mt-4 text-sm text-gold">Coming Soon</div>
        </div>

        {/* Analytics */}
        <div className="bg-background-alt border border-border rounded-lg p-6 hover:border-gold/50 transition-colors">
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-gold/10 flex items-center justify-center">
              <svg className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-text-primary">Analytics</h3>
          </div>
          <p className="text-text-secondary text-sm">
            Visualize your performance trends and identify improvement areas
          </p>
          <div className="mt-4 text-sm text-gold">Coming Soon</div>
        </div>
      </div>
    </motion.div>
  );
}
