import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function GoalVsActualChart({ data = [] }) {
  const chartData = data.length > 0 ? data : [
    { month: 'Jan', goal: 40000, actual: 42500 },
    { month: 'Feb', goal: 42000, actual: 39800 },
    { month: 'Mar', goal: 45000, actual: 48200 },
    { month: 'Apr', goal: 47000, actual: 45100 },
    { month: 'May', goal: 50000, actual: 38600 },
    { month: 'Jun', goal: 52000, actual: 49800 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-background-alt border border-border rounded-lg p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Goal vs Actual</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gold"></div>
            <span className="text-text-secondary">Goal</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-400"></div>
            <span className="text-text-secondary">Actual</span>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="month" stroke="#94A3B8" />
            <YAxis stroke="#94A3B8" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0A0A0F',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
              }}
              formatter={(value) => `$${value.toLocaleString()}`}
            />
            <Legend />
            <Bar dataKey="goal" fill="#D4AF37" radius={[4, 4, 0, 0]} />
            <Bar dataKey="actual" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-text-secondary text-xs">Total Goal</p>
            <p className="text-lg font-bold text-gold">
              ${chartData.reduce((sum, item) => sum + item.goal, 0).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-text-secondary text-xs">Total Actual</p>
            <p className="text-lg font-bold text-blue-400">
              ${chartData.reduce((sum, item) => sum + item.actual, 0).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-text-secondary text-xs">Achievement</p>
            <p className={`text-lg font-bold ${
              chartData.reduce((sum, item) => sum + item.actual, 0) >=
              chartData.reduce((sum, item) => sum + item.goal, 0)
                ? 'text-green-400'
                : 'text-red-400'
            }`}>
              {(
                (chartData.reduce((sum, item) => sum + item.actual, 0) /
                chartData.reduce((sum, item) => sum + item.goal, 0)) * 100
              ).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
