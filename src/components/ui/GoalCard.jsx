import { motion } from 'framer-motion';
import { useState } from 'react';
import CircularProgress from './CircularProgress';
import { PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function GoalCard({ goal, onUpdate, onDelete, color = 'gold' }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState(goal.current);

  const handleUpdate = () => {
    onUpdate(goal.id, newValue);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-background-alt border border-border rounded-lg p-6 hover:border-gold/30 transition-colors"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-2xl">{goal.icon}</span>
            <h3 className="text-lg font-semibold text-text-primary">{goal.title}</h3>
          </div>
          <p className="text-text-secondary text-sm">{goal.description}</p>
        </div>

        <div className="flex items-center space-x-2">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <PencilIcon className="h-4 w-4 text-text-secondary" />
            </button>
          ) : (
            <>
              <button
                onClick={handleUpdate}
                className="p-2 hover:bg-green-500/20 rounded-lg transition-colors"
              >
                <CheckIcon className="h-4 w-4 text-green-400" />
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
              >
                <XMarkIcon className="h-4 w-4 text-red-400" />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <CircularProgress
          value={goal.current}
          max={goal.target}
          size={100}
          color={color}
        />

        <div className="flex-1 ml-6">
          {isEditing ? (
            <div className="space-y-2">
              <label className="text-sm text-text-secondary">Update Progress:</label>
              <input
                type="number"
                value={newValue}
                onChange={(e) => setNewValue(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
          ) : (
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Current</span>
                <span className="text-text-primary font-medium">{goal.current} {goal.unit}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Target</span>
                <span className="text-gold font-medium">{goal.target} {goal.unit}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Remaining</span>
                <span className="text-text-primary font-medium">
                  {Math.max(0, goal.target - goal.current)} {goal.unit}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {goal.deadline && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Deadline</span>
            <span className="text-text-primary">{new Date(goal.deadline).toLocaleDateString()}</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
