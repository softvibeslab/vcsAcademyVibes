import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CommissionCalculator() {
  const [saleAmount, setSaleAmount] = useState('');
  const [commissionRate, setCommissionRate] = useState(10);
  const [bonus, setBonus] = useState(0);

  const commission = saleAmount ? (parseFloat(saleAmount) * commissionRate) / 100 : 0;
  const total = commission + bonus;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-background-alt border border-border rounded-lg p-6"
    >
      <h3 className="text-lg font-semibold text-text-primary mb-4">Commission Calculator</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-text-secondary mb-2">Sale Amount ($)</label>
          <input
            type="number"
            value={saleAmount}
            onChange={(e) => setSaleAmount(e.target.value)}
            placeholder="50000"
            className="w-full px-4 py-2 bg-background border border-border rounded-md text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        <div>
          <label className="block text-sm text-text-secondary mb-2">
            Commission Rate: {commissionRate}%
          </label>
          <input
            type="range"
            min="1"
            max="20"
            value={commissionRate}
            onChange={(e) => setCommissionRate(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-text-muted mt-1">
            <span>1%</span>
            <span>20%</span>
          </div>
        </div>

        <div>
          <label className="block text-sm text-text-secondary mb-2">Bonus ($)</label>
          <input
            type="number"
            value={bonus}
            onChange={(e) => setBonus(parseFloat(e.target.value) || 0)}
            placeholder="0"
            className="w-full px-4 py-2 bg-background border border-border rounded-md text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        <div className="pt-4 border-t border-border">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Commission</span>
              <span className="text-text-primary">${commission.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Bonus</span>
              <span className="text-text-primary">${bonus.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold pt-2 border-t border-border">
              <span className="text-text-primary">Total</span>
              <span className="text-gold">${total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
