import { motion } from 'framer-motion';
import { DocumentTextIcon, FolderIcon, TagIcon, ArrowDownTrayIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function ResourceCard({ resource, onDownload, isFavorite, onToggleFavorite }) {
  const getFileIcon = (type) => {
    const icons = {
      'pdf': '📄',
      'doc': '📝',
      'docx': '📝',
      'xls': '📊',
      'xlsx': '📊',
      'ppt': '📽️',
      'pptx': '📽️',
      'zip': '📦',
      'mp3': '🎵',
      'mp4': '🎥',
      'jpg': '🖼️',
      'png': '🖼️',
    };
    return icons[type?.toLowerCase()] || '📁';
  };

  const getTypeColor = (type) => {
    const colors = {
      'framework': 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
      'script': 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
      'case_study': 'from-green-500/20 to-green-600/20 border-green-500/30',
      'tool': 'from-orange-500/20 to-orange-600/20 border-orange-500/30',
      'template': 'from-gold/20 to-gold/30 border-gold/30',
    };
    return colors[type] || 'from-gray-500/20 to-gray-600/20 border-gray-500/30';
  };

  const getFileType = (url) => {
    if (!url) return 'unknown';
    const ext = url.split('.').pop()?.toLowerCase() || '';
    return ext;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className={`bg-gradient-to-br ${getTypeColor(resource.resource_type)} border rounded-lg p-6 transition-all group`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-3xl">{getFileIcon(getFileType(resource.file_url))}</div>
          <div>
            <span className="text-xs px-2 py-1 bg-background/50 rounded-full text-gold font-medium capitalize">
              {resource.resource_type?.replace('_', ' ') || 'Resource'}
            </span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggleFavorite && onToggleFavorite(resource)}
          className={`p-2 rounded-lg transition-colors ${
            isFavorite
              ? 'bg-gold/20 text-gold'
              : 'bg-white/5 text-text-secondary hover:text-gold'
          }`}
        >
          <svg className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </motion.button>
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-gold transition-colors">
        {resource.title}
      </h3>
      <p className="text-text-secondary text-sm mb-4 line-clamp-2">
        {resource.description}
      </p>

      {/* Category Badge */}
      {resource.category && (
        <div className="flex items-center space-x-2 mb-4">
          <FolderIcon className="h-4 w-4 text-text-secondary" />
          <span className="text-sm text-text-secondary capitalize">{resource.category}</span>
        </div>
      )}

      {/* Tags */}
      {resource.tags && resource.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {resource.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-background/50 text-text-secondary rounded-full flex items-center space-x-1"
            >
              <TagIcon className="h-3 w-3" />
              <span>{tag}</span>
            </span>
          ))}
          {resource.tags.length > 3 && (
            <span className="text-xs px-2 py-1 bg-background/50 text-text-secondary rounded-full">
              +{resource.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center text-text-secondary text-xs">
          <ClockIcon className="h-3 w-3 mr-1" />
          <span>{formatDate(resource.created_at)}</span>
        </div>

        <div className="flex items-center space-x-2">
          {resource.usage_count !== undefined && (
            <span className="text-xs text-text-muted">
              {resource.usage_count} downloads
            </span>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDownload && onDownload(resource)}
            className="flex items-center space-x-1 px-3 py-1.5 bg-gold text-background rounded-lg text-sm font-medium hover:bg-gold-light transition-colors"
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
            <span>Download</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
