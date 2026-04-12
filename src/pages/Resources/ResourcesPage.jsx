import { motion } from 'framer-motion';

export default function ResourcesPage() {
  const categories = [
    { name: 'Sales Scripts', count: 0, icon: '📝' },
    { name: 'Objection Handlers', count: 0, icon: '🎯' },
    { name: 'Ebooks & Guides', count: 0, icon: '📚' },
    { name: 'Templates', count: 0, icon: '📄' },
    { name: 'Video Tutorials', count: 0, icon: '🎥' },
    { name: 'Audio Training', count: 0, icon: '🎧' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
          Resources
        </h1>
        <p className="text-text-secondary">
          Download scripts, templates, guides, and more to accelerate your success
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-background-alt border border-border rounded-lg p-4">
        <input
          type="text"
          placeholder="Search resources..."
          className="w-full bg-background border border-border rounded-md px-4 py-2 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gold"
        />
      </div>

      {/* Categories Grid */}
      <div>
        <h2 className="text-xl font-semibold text-text-primary mb-4">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-background-alt border border-border rounded-lg p-6 hover:border-gold/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{category.icon}</span>
                  <div>
                    <h3 className="font-semibold text-text-primary">{category.name}</h3>
                    <p className="text-sm text-text-secondary">{category.count} resources</p>
                  </div>
                </div>
                <svg className="h-5 w-5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Resources */}
      <div>
        <h2 className="text-xl font-semibold text-text-primary mb-4">Recent Resources</h2>
        <div className="bg-background-alt border border-border rounded-lg p-12 text-center">
          <svg className="h-16 w-16 text-text-muted mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="text-text-secondary mb-2">No resources yet</p>
          <p className="text-sm text-text-muted">Resources will be available soon</p>
        </div>
      </div>
    </motion.div>
  );
}
