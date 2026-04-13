import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FunnelIcon } from '@heroicons/react/24/outline';
import EventCard from '@/components/ui/EventCard';
import EventCalendar from '@/components/ui/EventCalendar';

export default function CoachingPage() {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState(null);
  const [rsvpdSessions, setRsvpdSessions] = useState(new Set());

  useEffect(() => {
    fetchCoachingSessions();
  }, []);

  useEffect(() => {
    filterSessions();
  }, [sessions, selectedFilter, selectedDate]);

  const fetchCoachingSessions = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/coaching/sessions`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSessions(data);

        // Set RSVP'd sessions
        const rsvpd = new Set();
        data.forEach(session => {
          if (session.attendees && session.attendees.includes(localStorage.getItem('userId'))) {
            rsvpd.add(session.session_id);
          }
        });
        setRsvpdSessions(rsvpd);
      }
    } catch (error) {
      console.error('Error fetching coaching sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterSessions = () => {
    let filtered = [...sessions];

    // Filter by type
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(s => s.session_type === selectedFilter);
    }

    // Filter by date if selected
    if (selectedDate) {
      filtered = filtered.filter(s => {
        const sessionDate = new Date(s.scheduled_date);
        return (
          sessionDate.getDate() === selectedDate.getDate() &&
          sessionDate.getMonth() === selectedDate.getMonth() &&
          sessionDate.getFullYear() === selectedDate.getFullYear()
        );
      });
    }

    // Sort by date
    filtered.sort((a, b) => new Date(a.scheduled_date) - new Date(b.scheduled_date));

    setFilteredSessions(filtered);
  };

  const handleRSVP = async (session) => {
    const isRSVPd = rsvpdSessions.has(session.session_id);
    const endpoint = isRSVPd ? 'cancel_rsvp' : 'rsvp';
    const method = isRSVPd ? 'DELETE' : 'POST';

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/coaching/sessions/${session.session_id}/${endpoint}`,
        {
          method,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.ok) {
        const newRsvpd = new Set(rsvpdSessions);
        if (isRSVPd) {
          newRsvpd.delete(session.session_id);
        } else {
          newRsvpd.add(session.session_id);
        }
        setRsvpdSessions(newRsvpd);

        // Refresh sessions to update attendee count
        await fetchCoachingSessions();
      }
    } catch (error) {
      console.error('Error RSVPing:', error);
    }
  };

  const filters = [
    { value: 'all', label: 'All Sessions' },
    { value: 'group', label: 'Group Coaching' },
    { value: 'q&a', label: 'Q&A Sessions' },
    { value: 'roleplay', label: 'Role Play' },
    { value: 'strategy_review', label: 'Strategy Review' },
  ];

  const upcomingSessions = filteredSessions.filter(s => new Date(s.scheduled_date) > new Date());
  const pastSessions = filteredSessions.filter(s => new Date(s.scheduled_date) <= new Date());

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
      <div>
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
          Coaching & Events
        </h1>
        <p className="text-text-secondary">
          Live coaching sessions, role plays, and Q&A with top performers
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/30 rounded-lg p-4">
          <p className="text-2xl font-bold text-gold">{upcomingSessions.length}</p>
          <p className="text-text-secondary text-sm">Upcoming Sessions</p>
        </div>
        <div className="bg-background-alt border border-border rounded-lg p-4">
          <p className="text-2xl font-bold text-gold">{rsvpdSessions.size}</p>
          <p className="text-text-secondary text-sm">You're Registered For</p>
        </div>
        <div className="bg-background-alt border border-border rounded-lg p-4">
          <p className="text-2xl font-bold text-gold">{pastSessions.filter(s => s.recording_url).length}</p>
          <p className="text-text-secondary text-sm">Recordings Available</p>
        </div>
      </div>

      {/* Calendar and Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-1">
          <EventCalendar
            events={sessions}
            selectedDate={selectedDate}
            onDateSelect={(date) => setSelectedDate(date)}
          />
        </div>

        {/* Filters and Sessions List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filters */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <FunnelIcon className="h-5 w-5 text-text-secondary flex-shrink-0" />
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedFilter(filter.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedFilter === filter.value
                    ? 'bg-gold text-background'
                    : 'bg-white/5 text-text-secondary hover:text-text-primary hover:bg-white/10'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Upcoming Sessions */}
          {upcomingSessions.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-text-primary mb-4">Upcoming Sessions</h2>
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <EventCard
                    key={session.session_id}
                    event={session}
                    isRSVPd={rsvpdSessions.has(session.session_id)}
                    onRSVP={handleRSVP}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Past Sessions with Recordings */}
          {pastSessions.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-text-primary mb-4">
                Past Sessions {selectedDate ? '' : '(with Recordings)'}
              </h2>
              <div className="space-y-4">
                {pastSessions
                  .filter(s => !selectedDate || s.recording_url)
                  .slice(0, selectedDate ? undefined : 6)
                  .map((session) => (
                    <EventCard
                      key={session.session_id}
                      event={session}
                      isRSVPd={rsvpdSessions.has(session.session_id)}
                      onRSVP={handleRSVP}
                    />
                  ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredSessions.length === 0 && (
            <div className="text-center py-12 bg-background-alt border border-border rounded-lg">
              <p className="text-text-secondary mb-2">
                {selectedFilter === 'all' && !selectedDate
                  ? 'No coaching sessions scheduled yet'
                  : `No ${selectedFilter} sessions found${selectedDate ? ' for this date' : ''}`}
              </p>
              <p className="text-text-muted text-sm">Check back soon for new sessions</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
