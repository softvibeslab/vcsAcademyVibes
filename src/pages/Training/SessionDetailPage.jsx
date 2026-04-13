import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, CheckCircleIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import VideoPlayer from '@/components/ui/VideoPlayer';

export default function SessionDetailPage() {
  const { contentId } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [track, setTrack] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [markingComplete, setMarkingComplete] = useState(false);

  useEffect(() => {
    fetchContentData();
  }, [contentId]);

  const fetchContentData = async () => {
    try {
      setLoading(true);

      // Fetch content details
      const contentResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/development/content/${contentId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!contentResponse.ok) throw new Error('Failed to fetch content');

      const contentData = await contentResponse.json();
      setContent(contentData);

      // Check if already completed
      if (contentData.user_progress?.completed) {
        setIsCompleted(true);
      }

      // Check if bookmarked
      if (contentData.user_bookmark) {
        setIsBookmarked(true);
      }

      // Fetch track info if available
      if (contentData.track_id) {
        const trackResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/development/tracks/${contentData.track_id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (trackResponse.ok) {
          const trackData = await trackResponse.json();
          setTrack(trackData);
        }
      }
    } catch (error) {
      console.error('Error fetching content data:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsComplete = async () => {
    if (isCompleted || markingComplete) return;

    try {
      setMarkingComplete(true);

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/development/content/${contentId}/complete`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setIsCompleted(true);
        // Show success animation/toast
      }
    } catch (error) {
      console.error('Error marking complete:', error);
    } finally {
      setMarkingComplete(false);
    }
  };

  const toggleBookmark = async () => {
    try {
      const method = isBookmarked ? 'DELETE' : 'POST';
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/development/bookmarks`, {
        method,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content_id: contentId }),
      });

      if (response.ok) {
        setIsBookmarked(!isBookmarked);
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  const handleVideoComplete = () => {
    if (!isCompleted) {
      markAsComplete();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary">Content not found</p>
        <Link to="/training" className="text-gold hover:underline">
          Back to Training
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to={track ? `/training/track/${track.track_id}` : '/training'}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 text-text-primary" />
          </Link>
          <div>
            {track && (
              <p className="text-sm text-gold mb-1">{track.name}</p>
            )}
            <h1 className="text-2xl font-display font-bold text-text-primary">
              {content.title}
            </h1>
          </div>
        </div>

        <button
          onClick={toggleBookmark}
          className={`p-2 rounded-lg transition-colors ${
            isBookmarked
              ? 'bg-gold/20 text-gold'
              : 'bg-white/5 text-text-secondary hover:text-gold'
          }`}
        >
          <BookmarkIcon className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Video Player */}
      {content.video_url && (
        <VideoPlayer
          videoUrl={content.video_url}
          title={content.title}
          onComplete={handleVideoComplete}
        />
      )}

      {/* Content Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-background-alt border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-3">Overview</h2>
            <p className="text-text-secondary">{content.description}</p>
          </div>

          {/* Key Move */}
          {content.key_move && (
            <div className="bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/30 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gold mb-3">💡 The Key Move</h2>
              <p className="text-text-primary text-lg">{content.key_move}</p>
            </div>
          )}

          {/* Tags */}
          {content.tags && content.tags.length > 0 && (
            <div className="bg-background-alt border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-text-primary mb-3">Topics Covered</h2>
              <div className="flex flex-wrap gap-2">
                {content.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/5 text-text-secondary text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Expert Info (if masterclass) */}
          {content.expert && (
            <div className="bg-background-alt border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-text-primary mb-3">Your Expert</h2>
              <div className="flex items-center space-x-4">
                {content.expert.photo_url && (
                  <img
                    src={content.expert.photo_url}
                    alt={content.expert.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="text-text-primary font-medium">{content.expert.name}</p>
                  <p className="text-text-secondary text-sm">{content.expert.title}</p>
                  <p className="text-text-secondary text-sm">{content.expert.company}</p>
                </div>
              </div>
              {content.expert.bio && (
                <p className="text-text-secondary text-sm mt-3">{content.expert.bio}</p>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Complete Button */}
          <motion.button
            whileHover={{ scale: isCompleted ? 1 : 1.02 }}
            whileTap={{ scale: isCompleted ? 1 : 0.98 }}
            onClick={markAsComplete}
            disabled={isCompleted || markingComplete}
            className={`w-full py-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 ${
              isCompleted
                ? 'bg-green-500/20 text-green-400 cursor-default'
                : 'bg-gold text-background hover:bg-gold-light'
            }`}
          >
            <CheckCircleIcon className="h-5 w-5" />
            <span>
              {markingComplete
                ? 'Marking...'
                : isCompleted
                ? 'Completed ✓'
                : 'Mark as Complete'}
            </span>
          </motion.button>

          {/* Meta Info */}
          <div className="bg-background-alt border border-border rounded-lg p-4 space-y-3">
            {content.duration && (
              <div className="flex justify-between">
                <span className="text-text-secondary">Duration</span>
                <span className="text-text-primary font-medium">{content.duration} min</span>
              </div>
            )}
            {content.difficulty && (
              <div className="flex justify-between">
                <span className="text-text-secondary">Level</span>
                <span className="text-text-primary font-medium capitalize">{content.difficulty}</span>
              </div>
            )}
            {content.type && (
              <div className="flex justify-between">
                <span className="text-text-secondary">Type</span>
                <span className="text-text-primary font-medium capitalize">{content.type.replace('_', ' ')}</span>
              </div>
            )}
            {content.view_count !== undefined && (
              <div className="flex justify-between">
                <span className="text-text-secondary">Views</span>
                <span className="text-text-primary font-medium">{content.view_count.toLocaleString()}</span>
              </div>
            )}
          </div>

          {/* Next Up */}
          {track && !isCompleted && (
            <div className="bg-background-alt border border-border rounded-lg p-4">
              <p className="text-text-secondary text-sm mb-2">Next in {track.name}</p>
              <p className="text-text-primary font-medium">Continue your training journey</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
