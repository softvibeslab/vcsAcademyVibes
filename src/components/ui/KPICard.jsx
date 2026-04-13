import { motion } from 'framer-motion';

export default function KPICard({ title, value, change, trend, icon, color = 'gold', sparklineData = [] }) {
  const isPositive = change && change >= 0;
  const colorClasses = {
    gold: 'text-gold',
    green: 'text-green-400',
    blue: 'text-blue-400',
    purple: 'text-purple-400',
    red: 'text-red-400',
  };

  const bgClasses = {
    gold: 'bg-gold/10',
    green: 'bg-green-400/10',
    blue: 'bg-blue-400/10',
    purple: 'bg-purple-400/10',
    red: 'bg-red-400/10',
  };

  // Simple sparkline visualization
  const sparklineWidth = 80;
  const sparklineHeight = 30;
  const min = Math.min(...sparklineData);
  const max = Math.max(...sparklineData);
  const range = max - min || 1;

  const points = sparklineData.map((value, index) => {
    const x = (index / (sparklineData.length - 1)) * sparklineWidth;
    const y = sparklineHeight - ((value - min) / range) * sparklineHeight;
    return `${x},${y}`;
  }).join(' ');

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
      <p className={`text-3xl font-bold ${colorClasses[color]} mb-3`}>{value}</p>

      {/* Mini sparkline */}
      {sparklineData.length > 0 && (
        <svg width={sparklineWidth} height={sparklineHeight} className="opacity-50">
          <polyline
            fill="none"
            stroke={colorClasses[color].replace('text-', '')}
            strokeWidth="2"
            points={points}
          />
        </svg>
      )}
    </motion.div>
  );
}
