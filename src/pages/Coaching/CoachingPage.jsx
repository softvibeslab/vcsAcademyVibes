import { motion } from 'framer-motion';

export default function CoachingPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
          Coaching & Events
        </h1>
        <p className="text-text-secondary">
          Live coaching sessions, role plays, and Q&A with top performers
        </p>
      </div>

      {/* Coaching Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Group Coaching */}
        <div className="bg-background-alt border border-border rounded-lg p-6 hover:border-gold/50 transition-colors">
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-gold/10 flex items-center justify-center">
              <svg className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-text-primary">Group Live Coaching</h3>
          </div>
          <p className="text-text-secondary text-sm mb-4">
            Weekly group coaching sessions with experienced trainers
          </p>
          <div className="text-sm text-gold">Coming Soon</div>
        </div>

        {/* Role Play */}
        <div className="bg-background-alt border border-border rounded-lg p-6 hover:border-gold/50 transition-colors">
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-gold/10 flex items-center justify-center">
              <svg className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-text-primary">Role Play Sessions</h3>
          </div>
          <p className="text-text-secondary text-sm mb-4">
            Practice your skills in realistic sales scenarios
          </p>
          <div className="text-sm text-gold">Coming Soon</div>
        </div>

        {/* Q&A Sessions */}
        <div className="bg-background-alt border border-border rounded-lg p-6 hover:border-gold/50 transition-colors">
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-gold/10 flex items-center justify-center">
              <svg className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-text-primary">Q&A Sessions</h3>
          </div>
          <p className="text-text-secondary text-sm mb-4">
            Get answers to your questions from top producers
          </p>
          <div className="text-sm text-gold">Coming Soon</div>
        </div>

        {/* Events Calendar */}
        <div className="bg-background-alt border border-border rounded-lg p-6 hover:border-gold/50 transition-colors">
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-gold/10 flex items-center justify-center">
              <svg className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-text-primary">Events Calendar</h3>
          </div>
          <p className="text-text-secondary text-sm mb-4">
            View upcoming events and register for sessions
          </p>
          <div className="text-sm text-gold">Coming Soon</div>
        </div>
      </div>
    </motion.div>
  );
}
