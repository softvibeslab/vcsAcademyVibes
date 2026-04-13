import { motion } from 'framer-motion';

export default function StatCard({ title, value, change, icon, color = 'gold' }) {
  const isPositive = change && change >= 0;
  const colorClasses = {
    gold: 'text-gold',
    green: 'text-green-400',
    red: 'text-red-400',
    blue: 'text-blue-400',
  };

  const bgClasses = {
    gold: 'bg-gold/10',
    green: 'bg-green-400/10',
    red: 'bg-red-400/10',
    blue: 'bg-blue-400/10',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-background-alt border border-border rounded-lg p-6 hover:border-gold/30 transition-colors"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`h-12 w-12 rounded-lg ${bgClasses[color]} flex items-center justify-center text-2xl`}>
          {icon}
        </div>
        {change !== undefined && (
          <div className={`flex items-center text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            <span className="mr-1">{isPositive ? '↑' : '↓'}</span>
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>

      <h3 className="text-text-secondary text-sm font-medium mb-1">{title}</h3>
      <p className={`text-3xl font-bold ${colorClasses[color]}`}>{value}</p>
    </motion.div>
  );
}
