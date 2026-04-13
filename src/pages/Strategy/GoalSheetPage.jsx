import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, TrophyIcon } from '@heroicons/react/24/outline';
import GoalCard from '@/components/ui/GoalCard';
import MilestoneTracker from '@/components/ui/MilestoneTracker';
import AchievementBadge from '@/components/ui/AchievementBadge';
import { goalSheetAPI, developmentAPI } from '@/lib/api';

export default function GoalSheetPage() {
  const [loading, setLoading] = useState(true);
  const [goals, setGoals] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  useEffect(() => {
    fetchGoalSheetData();
  }, []);

  const fetchGoalSheetData = async () => {
    try {
      setLoading(true);
      // In a real implementation, fetch from API
      // const data = await goalSheetAPI.getData();

      // Mock data for now
      setGoals([
        {
          id: 1,
          title: 'Monthly Sales Volume',
          description: 'Achieve $50,000 in sales this month',
          icon: '💰',
          current: 35200,
          target: 50000,
          unit: '$',
          deadline: '2026-04-30',
          color: 'gold',
        },
        {
          id: 2,
          title: 'Tours Completed',
          description: 'Complete 50 tours this month',
          icon: '👥',
          current: 32,
          target: 50,
          unit: '',
          deadline: '2026-04-30',
          color: 'blue',
        },
        {
          id: 3,
          title: 'Training Modules',
          description: 'Complete 12 training modules',
          icon: '📚',
          current: 8,
          target: 12,
          unit: '',
          deadline: '2026-04-30',
          color: 'purple',
        },
        {
          id: 4,
          title: 'Closing Rate',
          description: 'Maintain 35% closing rate',
          icon: '🎯',
          current: 37.5,
          target: 35,
          unit: '%',
          deadline: '2026-04-30',
          color: 'green',
        },
      ]);

      setMilestones([
        { id: 1, title: 'First $10k', description: 'Reach $10,000 in monthly sales', completed: true, locked: false, reward: 100 },
        { id: 2, title: '10 Tours', description: 'Complete 10 tours in a month', completed: true, locked: false, reward: 50 },
        { id: 3, title: '5 Sales Streak', description: '5 days of consistent sales', completed: true, locked: false, reward: 75 },
        { id: 4, title: '$25k Mark', description: 'Reach $25,000 in monthly sales', completed: true, locked: false, reward: 150 },
        { id: 5, title: 'Top 20%', description: 'Reach top 20% of performers', completed: false, locked: false, reward: 200 },
        { id: 6, title: '$50k Goal', description: 'Achieve $50,000 monthly sales', completed: false, locked: true, reward: 300 },
      ]);

      setAchievements([
        {
          id: 1,
          name: 'Fast Starter',
          description: 'Make a sale in your first week',
          icon: '🚀',
          unlocked: true,
          unlockedAt: '2026-03-15',
          progress: 100,
        },
        {
          id: 2,
          name: 'Century Club',
          description: 'Achieve $100k in career sales',
          icon: '💎',
          unlocked: true,
          unlockedAt: '2026-04-01',
          progress: 100,
        },
        {
          id: 3,
          name: 'Top Performer',
          description: 'Reach top 10% of the team',
          icon: '🏆',
          unlocked: false,
          progress: 75,
        },
        {
          id: 4,
          name: 'Perfect Week',
          description: 'Hit all targets for a full week',
          icon: '⭐',
          unlocked: false,
          progress: 60,
        },
      ]);
    } catch (error) {
      console.error('Error fetching goal sheet data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateGoal = async (goalId, newValue) => {
    try {
      // In real implementation: await goalSheetAPI.updateGoal(goalId, newValue);
      setGoals(goals.map(goal =>
        goal.id === goalId ? { ...goal, current: newValue } : goal
      ));
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  const handleUnlockAchievement = async (achievementId) => {
    try {
      // In real implementation: await goalSheetAPI.unlockAchievement(achievementId);
      setAchievements(achievements.map(a =>
        a.id === achievementId ? { ...a, unlocked: true, unlockedAt: new Date().toISOString() } : a
      ));
    } catch (error) {
      console.error('Error unlocking achievement:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
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
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
            Goal Sheet
          </h1>
          <p className="text-text-secondary">Track your sales goals and personal development targets</p>
        </div>
        <button
          onClick={() => setShowCreateDialog(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gold text-background font-medium rounded-lg hover:bg-gold-light transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          <span>New Goal</span>
        </button>
      </div>

      {/* Goals Grid */}
      <div>
        <h2 className="text-xl font-semibold text-text-primary mb-4">Active Goals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onUpdate={handleUpdateGoal}
              color={goal.color}
            />
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Milestones */}
        <div>
          <h2 className="text-xl font-semibold text-text-primary mb-4">Milestones</h2>
          <MilestoneTracker milestones={milestones} />
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Overview</h2>

          <div className="bg-background-alt border border-border rounded-lg p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <p className="text-3xl font-bold text-gold">{goals.length}</p>
                <p className="text-text-secondary text-sm mt-1">Active Goals</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <p className="text-3xl font-bold text-gold">
                  {milestones.filter(m => m.completed).length}
                </p>
                <p className="text-text-secondary text-sm mt-1">Milestones</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <p className="text-3xl font-bold text-gold">
                  {achievements.filter(a => a.unlocked).length}
                </p>
                <p className="text-text-secondary text-sm mt-1">Achievements</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <p className="text-3xl font-bold text-gold">
                  {Math.round(goals.reduce((acc, goal) => {
                    const progress = (goal.current / goal.target) * 100;
                    return acc + progress;
                  }, 0) / goals.length)}%
                </p>
                <p className="text-text-secondary text-sm mt-1">Avg Progress</p>
              </div>
            </div>
          </div>

          {/* Progress by Category */}
          <div className="bg-background-alt border border-border rounded-lg p-6">
            <h3 className="font-semibold text-text-primary mb-4">Progress by Category</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-secondary">Sales Goals</span>
                  <span className="text-gold">70%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2">
                  <div className="bg-gold h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-secondary">Activity Goals</span>
                  <span className="text-blue-400">64%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2">
                  <div className="bg-blue-400 h-2 rounded-full" style={{ width: '64%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-secondary">Development Goals</span>
                  <span className="text-purple-400">67%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2">
                  <div className="bg-purple-400 h-2 rounded-full" style={{ width: '67%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <TrophyIcon className="h-6 w-6 text-gold" />
          <h2 className="text-xl font-semibold text-text-primary">Achievements</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.map((achievement) => (
            <AchievementBadge key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>

      {/* Create Goal Dialog (placeholder) */}
      {showCreateDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background-alt border border-border rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold text-text-primary mb-4">Create New Goal</h2>
            <p className="text-text-secondary mb-4">
              This feature will be implemented soon. For now, you can update existing goals.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowCreateDialog(false)}
                className="px-4 py-2 bg-gold text-background font-medium rounded-lg hover:bg-gold-light transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
