import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlayIcon, CheckCircleIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export default function TrainingPage() {
  const [tracks, setTracks] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrainingData();
  }, []);

  const fetchTrainingData = async () => {
    try {
      setLoading(true);

      // Fetch all tracks
      const tracksResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/development/tracks`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (tracksResponse.ok) {
        const tracksData = await tracksResponse.json();
        setTracks(tracksData);
      }

      // Fetch user progress
      const progressResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/development/progress`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (progressResponse.ok) {
        const progressData = await progressResponse.json();
        setProgress(progressData);
      }
    } catch (error) {
      console.error('Error fetching training data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTrackProgress = (trackId) => {
    if (!progress || !progress.track_progress) return 0;
    return progress.track_progress[trackId] || 0;
  };

  const isTrackCompleted = (trackId) => {
    return getTrackProgress(trackId) === 100;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  // Calculate overall progress
  const totalTracks = tracks.length;
  const completedTracks = tracks.filter(t => isTrackCompleted(t.track_id)).length;
  const overallProgress = totalTracks > 0 ? (completedTracks / totalTracks) * 100 : 0;

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

      {/* Overall Progress */}
      <div className="bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/30 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Your Journey</h2>
            <p className="text-text-secondary text-sm mt-1">
              {completedTracks} of {totalTracks} tracks completed
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-gold">{Math.round(overallProgress)}%</p>
            <p className="text-text-secondary text-xs">Complete</p>
          </div>
        </div>
        <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${overallProgress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-gold to-gold-light"
          />
        </div>

        {/* Readiness Score */}
        {progress && progress.readiness_score !== undefined && (
          <div className="mt-4 pt-4 border-t border-gold/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm">Readiness Score</p>
                <p className="text-xs text-text-muted mt-1">
                  Based on video completion, track progress, quick wins, and streaks
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gold">
                  {Math.round(progress.readiness_score)}%
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tracks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tracks.map((track, index) => {
          const trackProgress = getTrackProgress(track.track_id);
          const isCompleted = isTrackCompleted(track.track_id);

          return (
            <Link
              key={track.track_id}
              to={`/training/track/${track.track_id}`}
              className="block group"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-background-alt border rounded-lg p-6 transition-all h-full ${
                  isCompleted
                    ? 'border-green-500/30 bg-green-500/5 group-hover:border-green-500/50'
                    : 'border-border group-hover:border-gold/50'
                }`}
              >
                {/* Track Number & Status */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isCompleted
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-gold/20 text-gold'
                    }`}>
                      {isCompleted ? (
                        <CheckCircleIcon className="h-6 w-6" />
                      ) : (
                        <span className="font-bold">{track.track_number}</span>
                      )}
                    </div>
                    {isCompleted && (
                      <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                        Complete
                      </span>
                    )}
                  </div>
                </div>

                {/* Track Info */}
                <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-gold transition-colors">
                  {track.name}
                </h3>
                <p className="text-text-secondary text-sm mb-4">{track.purpose}</p>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-text-secondary">Progress</span>
                    <span className="text-xs font-medium text-gold">{Math.round(trackProgress)}%</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full transition-all"
                      style={{ width: `${trackProgress}%` }}
                    />
                  </div>
                </div>

                {/* Outcome */}
                <p className="text-xs text-text-secondary">
                  🎯 {track.outcome}
                </p>

                {/* Call to Action */}
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-text-secondary">
                    {track.total_duration ? `${track.total_duration} min` : '6 modules'}
                  </span>
                  <div className="flex items-center text-gold text-sm group-hover:translate-x-1 transition-transform">
                    <span>{isCompleted ? 'Review' : 'Continue'}</span>
                    <PlayIcon className="h-4 w-4 ml-1" />
                  </div>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>

      {/* Quick Stats */}
      {progress && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-background-alt border border-border rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-gold">{progress.points || 0}</p>
            <p className="text-text-secondary text-sm">Total Points</p>
          </div>
          <div className="bg-background-alt border border-border rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-gold">{progress.streak || 0}</p>
            <p className="text-text-secondary text-sm">Day Streak</p>
          </div>
          <div className="bg-background-alt border border-border rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-gold">
              {progress.badges?.length || 0}
            </p>
            <p className="text-text-secondary text-sm">Badges Earned</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
