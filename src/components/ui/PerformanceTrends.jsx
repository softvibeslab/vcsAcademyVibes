import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ArrowUpIcon, ArrowDownIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';

export default function PerformanceTrends() {
  const [chartType, setChartType] = useState('line');

  const trendsData = [
    { month: 'Jan', sales: 45000, tours: 28, closingRate: 35 },
    { month: 'Feb', sales: 52000, tours: 32, closingRate: 38 },
    { month: 'Mar', sales: 48000, tours: 30, closingRate: 36 },
    { month: 'Apr', sales: 61000, tours: 35, closingRate: 41 },
    { month: 'May', sales: 58000, tours: 33, closingRate: 39 },
    { month: 'Jun', sales: 65000, tours: 38, closingRate: 43 },
  ];

  const metrics = [
    {
      title: 'Total Sales',
      value: '$329,000',
      change: 18.5,
      icon: '💰',
      trend: 'up',
    },
    {
      title: 'Avg Tours/Month',
      value: '33',
      change: 12.1,
      icon: '👥',
      trend: 'up',
    },
    {
      title: 'Avg Closing Rate',
      value: '38.7%',
      change: 5.2,
      icon: '🎯',
      trend: 'up',
    },
    {
      title: 'Avg Deal Size',
      value: '$5,483',
      change: -2.3,
      icon: '📊',
      trend: 'down',
    },
  ];

  const exportReport = () => {
    // Placeholder for export functionality
    alert('Export functionality will be implemented soon');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-background-alt border border-border rounded-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Performance Trends</h3>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setChartType('line')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              chartType === 'line'
                ? 'bg-gold text-background'
                : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
            }`}
          >
            Line
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              chartType === 'bar'
                ? 'bg-gold text-background'
                : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
            }`}
          >
            Bar
          </button>
          <button
            onClick={exportReport}
            className="flex items-center space-x-2 px-3 py-1.5 bg-white/5 border border-border rounded-md text-sm text-text-secondary hover:text-text-primary hover:bg-white/10 transition-colors"
          >
            <DocumentArrowDownIcon className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <div key={index} className="text-center p-4 bg-background border border-border rounded-lg">
            <p className="text-2xl mb-1">{metric.icon}</p>
            <p className="text-text-secondary text-xs">{metric.title}</p>
            <p className="text-lg font-bold text-text-primary mt-1">{metric.value}</p>
            <div className={`flex items-center justify-center text-sm mt-1 ${
              metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
            }`}>
              {metric.trend === 'up' ? (
                <ArrowUpIcon className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDownIcon className="h-3 w-3 mr-1" />
              )}
              <span>{Math.abs(metric.change)}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={trendsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#94A3B8" />
              <YAxis yAxisId="sales" stroke="#94A3B8" />
              <YAxis yAxisId="rate" orientation="right" stroke="#94A3B8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0A0A0F',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                }}
              />
              <Line
                yAxisId="sales"
                type="monotone"
                dataKey="sales"
                stroke="#D4AF37"
                strokeWidth={2}
                dot={{ fill: '#D4AF37' }}
              />
              <Line
                yAxisId="rate"
                type="monotone"
                dataKey="closingRate"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6' }}
              />
            </LineChart>
          ) : (
            <BarChart data={trendsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#94A3B8" />
              <YAxis yAxisId="sales" stroke="#94A3B8" />
              <YAxis yAxisId="tours" orientation="right" stroke="#94A3B8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0A0A0F',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                }}
              />
              <Bar yAxisId="sales" dataKey="sales" fill="#D4AF37" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="tours" dataKey="tours" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Chart Legend */}
      <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
        {chartType === 'line' ? (
          <>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gold"></div>
              <span className="text-text-secondary">Sales ($)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-400"></div>
              <span className="text-text-secondary">Closing Rate (%)</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gold"></div>
              <span className="text-text-secondary">Sales ($)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-400"></div>
              <span className="text-text-secondary">Tours</span>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
