import { motion } from 'framer-motion';

const CATEGORIES = [
  { value: 'all', label: 'All Resources', icon: '📚' },
  { value: 'discovery', label: 'Discovery', icon: '🔍' },
  { value: 'closing', label: 'Closing', icon: '💼' },
  { value: 'objections', label: 'Objections', icon: '🎯' },
  { value: 'followup', label: 'Follow-Up', icon: '📞' },
  { value: 'presentation', label: 'Presentation', icon: '📊' },
  { value: 'mindset', label: 'Mindset', icon: '🧠' },
];

const TYPES = [
  { value: 'all', label: 'All Types' },
  { value: 'framework', label: 'Frameworks' },
  { value: 'script', label: 'Scripts' },
  { value: 'case_study', label: 'Case Studies' },
  { value: 'tool', label: 'Tools' },
  { value: 'template', label: 'Templates' },
];

export default function CategoryFilter({
  selectedCategory,
  selectedType,
  onCategoryChange,
  onTypeChange,
  categoryCounts = {},
}) {
  return (
    <div className="space-y-4">
      {/* Category Filter */}
      <div>
        <h3 className="text-sm font-medium text-text-secondary mb-3">Category</h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <motion.button
              key={category.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onCategoryChange && onCategoryChange(category.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
                selectedCategory === category.value
                  ? 'bg-gold text-background'
                  : 'bg-white/5 text-text-secondary hover:text-text-primary hover:bg-white/10'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
              {categoryCounts[category.value] !== undefined && (
                <span className={`text-xs ${
                  selectedCategory === category.value ? 'text-background/70' : 'text-text-muted'
                }`}>
                  ({categoryCounts[category.value]})
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Type Filter */}
      <div>
        <h3 className="text-sm font-medium text-text-secondary mb-3">Resource Type</h3>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((type) => (
            <motion.button
              key={type.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onTypeChange && onTypeChange(type.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedType === type.value
                  ? 'bg-gold text-background'
                  : 'bg-white/5 text-text-secondary hover:text-text-primary hover:bg-white/10'
              }`}
            >
              {type.label}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
