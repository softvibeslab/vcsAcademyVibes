import { useState } from 'react';
import { motion } from 'framer-motion';

export default function DateRangeFilter({ onPeriodChange }) {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  const periods = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '6m', label: '6 Months' },
    { value: '1y', label: '1 Year' },
    { value: 'custom', label: 'Custom' },
  ];

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    onPeriodChange && onPeriodChange(period);
  };

  return (
    <div className="flex items-center space-x-2 bg-background-alt border border-border rounded-lg p-1">
      {periods.map((period) => (
        <button
          key={period.value}
          onClick={() => handlePeriodChange(period.value)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedPeriod === period.value
              ? 'bg-gold text-background'
              : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
          }`}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
}
