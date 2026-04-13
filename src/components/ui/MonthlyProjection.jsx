import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function MonthlyProjection() {
  // Mock projection data
  const data = [
    { month: 'Jan', projected: 8000, actual: 7500 },
    { month: 'Feb', projected: 8500, actual: 8200 },
    { month: 'Mar', projected: 9000, actual: 9500 },
    { month: 'Apr', projected: 9500, actual: null },
    { month: 'May', projected: 10000, actual: null },
    { month: 'Jun', projected: 10500, actual: null },
  ];

  const totalProjected = data.reduce((sum, item) => sum + item.projected, 0);
  const totalActual = data.reduce((sum, item) => sum + (item.actual || 0), 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-background-alt border border-border rounded-lg p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">6-Month Projection</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gold"></div>
            <span className="text-text-secondary">Projected</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-400"></div>
            <span className="text-text-secondary">Actual</span>
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="month" stroke="#94A3B8" />
            <YAxis stroke="#94A3B8" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0A0A0F',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
              }}
            />
            <Area
              type="monotone"
              dataKey="projected"
              stroke="#D4AF37"
              fill="#D4AF37"
              fillOpacity={0.3}
            />
            <Area
              type="monotone"
              dataKey="actual"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.3}
              connectNulls={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-text-secondary text-sm">Projected Total</p>
            <p className="text-xl font-bold text-gold">${totalProjected.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-text-secondary text-sm">Actual to Date</p>
            <p className="text-xl font-bold text-blue-400">${totalActual.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
