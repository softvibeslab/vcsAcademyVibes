import { motion } from 'framer-motion';

export default function TrainingPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
          Top Producer Path
        </h1>
        <p className="text-text-secondary">
          Master the skills that top performers use to close consistently
        </p>
      </div>

      {/* Progress Overview */}
      <div className="bg-background-alt border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-text-primary">Your Progress</h2>
          <span className="text-gold font-medium">0% Complete</span>
        </div>
        <div className="w-full bg-white/5 rounded-full h-2">
          <div className="bg-gold h-2 rounded-full" style={{ width: '0%' }}></div>
        </div>
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { session: 1, title: 'Foundation', status: 'Coming Soon' },
          { session: 2, title: 'Discovery', status: 'Coming Soon' },
          { session: 3, title: 'Value Building', status: 'Coming Soon' },
          { session: 4, title: 'Closing', status: 'Coming Soon' },
          { session: 5, title: 'Objections', status: 'Coming Soon' },
          { session: 6, title: 'Follow-up', status: 'Coming Soon' },
        ].map((item) => (
          <div
            key={item.session}
            className="bg-background-alt border border-border rounded-lg p-6 hover:border-gold/50 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gold font-medium">Session {item.session}</span>
              <span className="text-xs px-2 py-1 bg-white/5 rounded-full text-text-secondary">
                {item.status}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">{item.title}</h3>
            <p className="text-sm text-text-secondary">
              Master the essential skills for this stage of the sales process
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
