import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = {
  gold: '#D4AF37',
  navy: '#1E3A8A',
  green: '#22c55e',
  blue: '#3b82f6',
  purple: '#a855f7',
  red: '#ef4444',
};

export default function IncomeBreakdown({ data }) {
  const defaultData = data || [
    { name: 'Commission', value: 4500, color: COLORS.gold },
    { name: 'Bonuses', value: 1200, color: COLORS.green },
    { name: 'Overrides', value: 800, color: COLORS.blue },
    { name: 'Other', value: 500, color: COLORS.purple },
  ];

  const total = defaultData.reduce((sum, item) => sum + item.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-background-alt border border-border rounded-lg p-6"
    >
      <h3 className="text-lg font-semibold text-text-primary mb-4">Income Breakdown</h3>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={defaultData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {defaultData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#0A0A0F',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex justify-between items-center">
          <span className="text-text-secondary">Total Income</span>
          <span className="text-2xl font-bold text-gold">${total.toLocaleString()}</span>
        </div>
      </div>
    </motion.div>
  );
}
