import { motion } from 'framer-motion';
import { CalendarIcon, ClockIcon, UserIcon, UsersIcon } from '@heroicons/react/24/outline';

export default function EventCard({ event, onRSVP, isRSVPd, onViewDetails }) {
  const isUpcoming = new Date(event.scheduled_date) > new Date();
  const attendeeCount = event.attendees?.length || 0;
  const isFull = event.max_attendees && attendeeCount >= event.max_attendees;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const getSessionTypeColor = (type) => {
    const colors = {
      'group': 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
      'q&a': 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
      'strategy_review': 'from-green-500/20 to-green-600/20 border-green-500/30',
      'roleplay': 'from-orange-500/20 to-orange-600/20 border-orange-500/30',
    };
    return colors[type] || 'from-gold/20 to-gold/30 border-gold/30';
  };

  const getSessionTypeLabel = (type) => {
    const labels = {
      'group': 'Group Coaching',
      'q&a': 'Q&A Session',
      'strategy_review': 'Strategy Review',
      'roleplay': 'Role Play',
    };
    return labels[type] || 'Coaching Session';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className={`bg-gradient-to-br ${getSessionTypeColor(event.session_type)} border rounded-lg p-6 transition-all cursor-pointer`}
      onClick={() => onViewDetails && onViewDetails(event)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-xs px-2 py-1 bg-background/50 rounded-full text-gold font-medium">
              {getSessionTypeLabel(event.session_type)}
            </span>
            {event.status === 'live' && (
              <span className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded-full animate-pulse">
                🔴 LIVE
              </span>
            )}
            {!isUpcoming && event.status === 'completed' && (
              <span className="text-xs px-2 py-1 bg-white/5 text-text-muted rounded-full">
                Completed
              </span>
            )}
          </div>
          <h3 className="text-xl font-semibold text-text-primary mb-2">{event.title}</h3>
          <p className="text-text-secondary text-sm">{event.description}</p>
        </div>
      </div>

      {/* Meta Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-text-secondary text-sm">
          <CalendarIcon className="h-4 w-4 mr-2 text-gold" />
          <span>{formatDate(event.scheduled_date)}</span>
        </div>
        <div className="flex items-center text-text-secondary text-sm">
          <ClockIcon className="h-4 w-4 mr-2 text-gold" />
          <span>{formatTime(event.scheduled_date)}</span>
          {event.duration_minutes && (
            <span className="ml-2">({event.duration_minutes} min)</span>
          )}
        </div>
        {event.host && (
          <div className="flex items-center text-text-secondary text-sm">
            <UserIcon className="h-4 w-4 mr-2 text-gold" />
            <span>{event.host.name}</span>
            {event.host.title && (
              <span className="ml-1 text-text-muted">- {event.host.title}</span>
            )}
          </div>
        )}
        <div className="flex items-center text-text-secondary text-sm">
          <UsersIcon className="h-4 w-4 mr-2 text-gold" />
          <span>{attendeeCount} attending</span>
          {event.max_attendees && (
            <span className="ml-1 text-text-muted">
              / {event.max_attendees} max
            </span>
          )}
        </div>
      </div>

      {/* Topics */}
      {event.topics && event.topics.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {event.topics.slice(0, 3).map((topic, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-background/50 text-text-secondary rounded-full"
            >
              {topic}
            </span>
          ))}
          {event.topics.length > 3 && (
            <span className="text-xs px-2 py-1 bg-background/50 text-text-secondary rounded-full">
              +{event.topics.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="text-sm">
          {isUpcoming ? (
            isFull ? (
              <span className="text-red-400">Session Full</span>
            ) : isRSVPd ? (
              <span className="text-green-400">✓ You're registered</span>
            ) : (
              <span className="text-gold">Register now</span>
            )
          ) : event.recording_url ? (
            <span className="text-blue-400">Recording available</span>
          ) : (
            <span className="text-text-muted">Recording coming soon</span>
          )}
        </div>

        {isUpcoming && !isFull && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onRSVP && onRSVP(event);
            }}
            disabled={isRSVPd}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              isRSVPd
                ? 'bg-green-500/20 text-green-400 cursor-default'
                : 'bg-gold text-background hover:bg-gold-light'
            }`}
          >
            {isRSVPd ? 'Registered' : 'Register'}
          </motion.button>
        )}

        {!isUpcoming && event.recording_url && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              window.open(event.recording_url, '_blank');
            }}
            className="px-4 py-2 rounded-lg font-medium text-sm bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            Watch Recording
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
