import { motion } from 'framer-motion';
import { useState } from 'react';
import { PlusIcon, CheckIcon } from '@heroicons/react/24/outline';

export default function SavingsGoalTracker() {
  const [goals, setGoals] = useState([
    {
      id: 1,
      name: 'Emergency Fund',
      target: 10000,
      current: 6500,
      icon: '🏦',
      color: 'gold',
    },
    {
      id: 2,
      name: 'Vacation',
      target: 5000,
      current: 2300,
      icon: '✈️',
      color: 'blue',
    },
    {
      id: 3,
      name: 'Investment',
      target: 20000,
      current: 8500,
      icon: '📈',
      color: 'green',
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-background-alt border border-border rounded-lg p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Savings Goals</h3>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors"
        >
          <PlusIcon className="h-5 w-5 text-gold" />
        </button>
      </div>

      <div className="space-y-4">
        {goals.map((goal) => {
          const percentage = (goal.current / goal.target) * 100;

          return (
            <div key={goal.id} className="bg-background border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{goal.icon}</span>
                  <span className="font-medium text-text-primary">{goal.name}</span>
                </div>
                <span className="text-gold font-semibold">{percentage.toFixed(0)}%</span>
              </div>

              <div className="w-full bg-white/5 rounded-full h-2 mb-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(percentage, 100)}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className={`h-full rounded-full ${
                    goal.color === 'gold' ? 'bg-gold' :
                    goal.color === 'blue' ? 'bg-blue-400' :
                    'bg-green-400'
                  }`}
                />
              </div>

              <div className="flex justify-between text-sm text-text-secondary">
                <span>${goal.current.toLocaleString()}</span>
                <span>${goal.target.toLocaleString()}</span>
              </div>
            </div>
          );
        })}
      </div>

      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 pt-4 border-t border-border"
        >
          <p className="text-text-secondary text-sm mb-2">Add new goal feature coming soon</p>
        </motion.div>
      )}
    </motion.div>
  );
}
