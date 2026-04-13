import { motion } from 'framer-motion';

export default function ActivityCard({ title, activities, icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-background-alt border border-border rounded-lg p-6 hover:border-gold/30 transition-colors"
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className="h-10 w-10 rounded-lg bg-gold/10 flex items-center justify-center text-xl">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
      </div>

      <div className="space-y-3">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center justify-between p-3 rounded-lg ${
              activity.completed ? 'bg-green-500/10 border border-green-500/20' : 'bg-white/5 border border-border'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                activity.completed ? 'bg-green-500/20' : 'bg-white/10'
              }`}>
                {activity.completed ? '✓' : (index + 1)}
              </div>
              <div>
                <p className="text-text-primary font-medium text-sm">{activity.title}</p>
                <p className="text-text-secondary text-xs">{activity.description}</p>
              </div>
            </div>
            {activity.points && (
              <span className="text-gold text-sm font-medium">+{activity.points} pts</span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
