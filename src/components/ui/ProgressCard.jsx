import { motion } from 'framer-motion';

export default function ProgressCard({ title, progress, total, unit = '', color = 'gold' }) {
  const percentage = total > 0 ? Math.min((progress / total) * 100, 100) : 0;
  const colorClasses = {
    gold: 'bg-gold',
    green: 'bg-green-400',
    blue: 'bg-blue-400',
    purple: 'bg-purple-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-background-alt border border-border rounded-lg p-6 hover:border-gold/30 transition-colors"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-text-primary font-semibold">{title}</h3>
        <span className="text-gold font-medium">{progress}/{total}{unit}</span>
      </div>

      <div className="relative w-full bg-white/5 rounded-full h-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`absolute top-0 left-0 h-full ${colorClasses[color]} rounded-full`}
        />
      </div>

      <p className="text-text-secondary text-sm mt-2">{percentage.toFixed(0)}% complete</p>
    </motion.div>
  );
}
