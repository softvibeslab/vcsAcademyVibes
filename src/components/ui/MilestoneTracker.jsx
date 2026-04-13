import { motion } from 'framer-motion';
import { CheckCircleIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export default function MilestoneTracker({ milestones }) {
  const completedCount = milestones.filter(m => m.completed).length;
  const percentage = milestones.length > 0 ? (completedCount / milestones.length) * 100 : 0;

  return (
    <div className="bg-background-alt border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Milestones</h3>
        <span className="text-sm text-text-secondary">
          {completedCount}/{milestones.length} completed
        </span>
      </div>

      <div className="relative">
        {/* Progress line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/10"></div>
        <div
          className="absolute left-4 top-0 w-0.5 bg-gold transition-all duration-500"
          style={{ height: `${percentage}%` }}
        ></div>

        {/* Milestones */}
        <div className="space-y-6">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-start space-x-4"
            >
              {/* Icon */}
              <div className="relative z-10 flex-shrink-0">
                {milestone.completed ? (
                  <div className="h-8 w-8 rounded-full bg-gold/20 flex items-center justify-center">
                    <CheckCircleIcon className="h-5 w-5 text-gold" />
                  </div>
                ) : milestone.locked ? (
                  <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center">
                    <LockClosedIcon className="h-4 w-4 text-text-muted" />
                  </div>
                ) : (
                  <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-sm text-text-secondary">{index + 1}</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className={`flex-1 pb-2 ${index === milestones.length - 1 ? '' : 'border-b border-border'}`}>
                <h4 className={`font-medium ${milestone.completed ? 'text-text-primary line-through' : 'text-text-primary'}`}>
                  {milestone.title}
                </h4>
                <p className="text-sm text-text-secondary mt-1">{milestone.description}</p>
                {milestone.reward && milestone.completed && (
                  <div className="mt-2 inline-flex items-center px-2 py-1 bg-gold/10 rounded-full">
                    <span className="text-xs text-gold">+{milestone.reward} pts</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
