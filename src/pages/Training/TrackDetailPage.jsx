import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, CheckCircleIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export default function TrackDetailPage() {
  const { trackId } = useParams();
  const navigate = useNavigate();
  const [track, setTrack] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedModules, setCompletedModules] = useState(new Set());

  useEffect(() => {
    fetchTrackData();
  }, [trackId]);

  const fetchTrackData = async () => {
    try {
      setLoading(true);

      // Fetch track details
      const trackResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/development/tracks/${trackId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!trackResponse.ok) throw new Error('Failed to fetch track');

      const trackData = await trackResponse.json();
      setTrack(trackData);

      // Fetch modules for this track
      if (trackData.modules) {
        setModules(trackData.modules);
      }

      // Fetch user progress
      const progressResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/development/progress`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (progressResponse.ok) {
        const progressData = await progressResponse.json();
        if (progressData.completed_modules) {
          setCompletedModules(new Set(progressData.completed_modules));
        }
      }
    } catch (error) {
      console.error('Error fetching track data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getModuleStatus = (module, index) => {
    if (completedModules.has(module.content_id)) {
      return 'completed';
    }
    if (index === 0 || completedModules.has(modules[index - 1]?.content_id)) {
      return 'available';
    }
    return 'locked';
  };

  const isTrackCompleted = () => {
    return modules.length > 0 && modules.every(m => completedModules.has(m.content_id));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  if (!track) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary">Track not found</p>
        <Link to="/training" className="text-gold hover:underline">
          Back to Training
        </Link>
      </div>
    );
  }

  const completedCount = modules.filter(m => completedModules.has(m.content_id)).length;
  const progressPercent = modules.length > 0 ? (completedCount / modules.length) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/training"
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 text-text-primary" />
          </Link>
          <div>
            <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
              {track.name}
            </h1>
            <p className="text-text-secondary">{track.purpose}</p>
          </div>
        </div>

        {isTrackCompleted() && (
          <div className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg">
            <CheckCircleIcon className="h-5 w-5" />
            <span className="font-medium">Track Complete!</span>
          </div>
        )}
      </div>

      {/* Progress Overview */}
      <div className="bg-background-alt border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-text-primary">Track Progress</h2>
          <div className="text-right">
            <span className="text-2xl font-bold text-gold">{completedCount}</span>
            <span className="text-text-secondary"> / {modules.length}</span>
          </div>
        </div>

        <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-gold to-gold-light"
          />
        </div>

        <p className="text-text-secondary text-sm mt-2">{track.outcome}</p>
      </div>

      {/* Modules Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">Training Modules</h2>

        <div className="grid grid-cols-1 gap-4">
          {modules.map((module, index) => {
            const status = getModuleStatus(module, index);
            const isCompleted = status === 'completed';

            return (
              <motion.div
                key={module.content_id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`relative bg-background-alt border rounded-lg p-6 transition-all ${
                  status === 'available'
                    ? 'border-border hover:border-gold/50 cursor-pointer'
                    : status === 'completed'
                    ? 'border-green-500/30 bg-green-500/5'
                    : 'border-white/5 opacity-60 cursor-not-allowed'
                }`}
                onClick={() => {
                  if (status === 'available' || status === 'completed') {
                    navigate(`/training/session/${module.content_id}`);
                  }
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    {/* Status Icon */}
                    <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                      isCompleted
                        ? 'bg-green-500/20 text-green-400'
                        : status === 'available'
                        ? 'bg-gold/20 text-gold'
                        : 'bg-white/5 text-text-muted'
                    }`}>
                      {isCompleted ? (
                        <CheckCircleIcon className="h-6 w-6" />
                      ) : status === 'locked' ? (
                        <LockClosedIcon className="h-6 w-6" />
                      ) : (
                        <span className="text-lg font-bold">{index + 1}</span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-text-primary">
                          {module.title}
                        </h3>
                        {isCompleted && (
                          <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                            Completed
                          </span>
                        )}
                        {status === 'locked' && (
                          <span className="text-xs px-2 py-1 bg-white/5 text-text-muted rounded-full">
                            Locked
                          </span>
                        )}
                      </div>

                      <p className="text-text-secondary text-sm mb-3">
                        {module.description}
                      </p>

                      {module.key_move && (
                        <div className="bg-background border border-border rounded p-3">
                          <p className="text-xs text-gold font-medium mb-1">Key Move</p>
                          <p className="text-sm text-text-primary">{module.key_move}</p>
                        </div>
                      )}

                      {/* Meta */}
                      <div className="flex items-center space-x-4 mt-3 text-xs text-text-secondary">
                        {module.duration && (
                          <span>⏱ {module.duration} min</span>
                        )}
                        {module.difficulty && (
                          <span>📊 {module.difficulty}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  {(status === 'available' || status === 'completed') && (
                    <div className="text-gold">
                      →
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
