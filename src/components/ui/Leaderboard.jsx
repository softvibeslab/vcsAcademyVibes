import { motion } from 'framer-motion';
import { TrophyIcon } from '@heroicons/react/24/outline';

export default function Leaderboard({ data = [] }) {
  const leaderboardData = data.length > 0 ? data : [
    { rank: 1, name: 'Sarah Johnson', score: 9850, sales: 156, change: 0 },
    { rank: 2, name: 'Mike Chen', score: 9420, sales: 143, change: 1 },
    { rank: 3, name: 'Emily Davis', score: 8930, sales: 138, change: -1 },
    { rank: 4, name: 'Alex Turner', score: 8750, sales: 132, change: 0 },
    { rank: 5, name: 'Jessica Brown', score: 8420, sales: 128, change: 2 },
    { rank: 6, name: 'David Wilson', score: 8190, sales: 125, change: -2 },
    { rank: 7, name: 'Maria Garcia', score: 7950, sales: 121, change: 0 },
    { rank: 8, name: 'James Taylor', score: 7720, sales: 118, change: 1 },
  ];

  const getRankIcon = (rank) => {
    if (rank === 1) return <TrophyIcon className="h-5 w-5 text-gold" />;
    if (rank === 2) return <TrophyIcon className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <TrophyIcon className="h-5 w-5 text-amber-700" />;
    return <span className="text-text-secondary font-medium">#{rank}</span>;
  };

  const getChangeIndicator = (change) => {
    if (change === 0) return <span className="text-text-muted">-</span>;
    if (change > 0) return <span className="text-green-400 text-xs">↑ {change}</span>;
    return <span className="text-red-400 text-xs">↓ {Math.abs(change)}</span>;
  };

  const getRowBackground = (rank) => {
    if (rank === 1) return 'bg-gold/10 border-gold/30';
    if (rank === 2) return 'bg-gray-400/10 border-gray-400/30';
    if (rank === 3) return 'bg-amber-700/10 border-amber-700/30';
    return '';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-background-alt border border-border rounded-lg p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Leaderboard</h3>
        <span className="text-sm text-text-secondary">Top 8 Performers</span>
      </div>

      <div className="space-y-2">
        {leaderboardData.slice(0, 8).map((person) => (
          <motion.div
            key={person.rank}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: person.rank * 0.05 }}
            className={`flex items-center justify-between p-3 rounded-lg border transition-colors hover:bg-white/5 ${getRowBackground(person.rank)}`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 flex justify-center">{getRankIcon(person.rank)}</div>
              <div>
                <p className="font-medium text-text-primary text-sm">{person.name}</p>
                <p className="text-xs text-text-secondary">{person.sales} sales</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {getChangeIndicator(person.change)}
              <div className="text-right">
                <p className="font-bold text-gold">{person.score.toLocaleString()}</p>
                <p className="text-xs text-text-secondary">pts</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border text-center">
        <p className="text-sm text-text-secondary">
          Your rank: <span className="text-gold font-semibold">#12</span>
        </p>
      </div>
    </motion.div>
  );
}
