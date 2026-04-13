import { motion } from 'framer-motion';

export default function CircularProgress({ value, max, size = 120, strokeWidth = 8, color = 'gold' }) {
  const percentage = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const colorClasses = {
    gold: '#D4AF37',
    green: '#22c55e',
    blue: '#3b82f6',
    purple: '#a855f7',
    red: '#ef4444',
  };

  const strokeColor = colorClasses[color] || colorClasses.gold;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
        />

        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{
            strokeDasharray: circumference,
          }}
        />
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <span className="text-2xl font-bold text-text-primary">{percentage.toFixed(0)}%</span>
        {value !== undefined && max !== undefined && (
          <span className="text-xs text-text-secondary">
            {value}/{max}
          </span>
        )}
      </div>
    </div>
  );
}
