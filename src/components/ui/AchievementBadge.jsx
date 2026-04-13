import { motion } from 'framer-motion';

export default function AchievementBadge({ achievement }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className={`relative bg-background-alt border rounded-lg p-6 text-center transition-all ${
        achievement.unlocked
          ? 'border-gold/30 hover:border-gold'
          : 'border-border opacity-60'
      }`}
    >
      {/* Badge Icon */}
      <div className={`text-5xl mb-3 ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
        {achievement.icon}
      </div>

      {/* Badge Name */}
      <h4 className={`font-semibold mb-1 ${achievement.unlocked ? 'text-gold' : 'text-text-secondary'}`}>
        {achievement.name}
      </h4>

      {/* Badge Description */}
      <p className="text-xs text-text-secondary mb-2">{achievement.description}</p>

      {/* Unlock Date */}
      {achievement.unlocked && achievement.unlockedAt && (
        <div className="text-xs text-text-muted">
          Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
        </div>
      )}

      {/* Lock indicator */}
      {!achievement.unlocked && (
        <div className="absolute top-2 right-2">
          <svg className="h-4 w-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      )}

      {/* Progress indicator for partially completed */}
      {achievement.progress !== undefined && !achievement.unlocked && (
        <div className="mt-3">
          <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gold h-full rounded-full transition-all"
              style={{ width: `${achievement.progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-text-muted mt-1">{achievement.progress}% complete</p>
        </div>
      )}
    </motion.div>
  );
}
