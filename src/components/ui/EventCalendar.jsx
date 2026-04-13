import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function EventCalendar({ events = [], onDateSelect, selectedDate }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getMonthData = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay();
    const totalDays = lastDay.getDate();

    return { year, month, startDay, totalDays };
  };

  const getEventsForDate = (date) => {
    if (!date) return [];
    return events.filter(event => {
      const eventDate = new Date(event.scheduled_date);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const hasEvents = (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return getEventsForDate(date).length > 0;
  };

  const isPastDate = (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return date < new Date().setHours(0, 0, 0, 0);
  };

  const isSelected = (day) => {
    if (!selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const selectDate = (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    onDateSelect && onDateSelect(date);
  };

  const { year, month, startDay, totalDays } = getMonthData(currentDate);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Get events for selected date
  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="bg-background-alt border border-border rounded-lg p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          <ChevronLeftIcon className="h-5 w-5 text-text-primary" />
        </button>
        <h3 className="text-xl font-semibold text-text-primary">
          {monthNames[month]} {year}
        </h3>
        <button
          onClick={nextMonth}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          <ChevronRightIcon className="h-5 w-5 text-text-primary" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="mb-6">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="text-center text-text-secondary text-xs font-medium py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells before first day */}
          {Array.from({ length: startDay }).map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square" />
          ))}

          {/* Days of month */}
          {Array.from({ length: totalDays }).map((_, index) => {
            const day = index + 1;
            const past = isPastDate(day);
            const selected = isSelected(day);
            const today = isToday(day);
            const events = hasEvents(day);

            return (
              <button
                key={day}
                onClick={() => !past && selectDate(day)}
                disabled={past}
                className={`aspect-square rounded-lg text-sm font-medium transition-all relative ${
                  past
                    ? 'text-text-muted cursor-not-allowed'
                    : selected
                    ? 'bg-gold text-background'
                    : today
                    ? 'bg-gold/20 text-gold border border-gold/30'
                    : 'text-text-primary hover:bg-white/5'
                }`}
              >
                <span className="relative z-10">{day}</span>
                {events && (
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex space-x-0.5">
                    <div className="w-1 h-1 rounded-full bg-gold" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Date Events */}
      {selectedDateEvents.length > 0 && (
        <div className="border-t border-border pt-4">
          <h4 className="text-sm font-medium text-text-primary mb-3">
            Events on {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </h4>
          <div className="space-y-2">
            {selectedDateEvents.map((event) => (
              <motion.div
                key={event.session_id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-background border border-border rounded-lg p-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-text-primary font-medium text-sm">{event.title}</p>
                    <p className="text-text-secondary text-xs mt-1">
                      {new Date(event.scheduled_date).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-gold/20 text-gold rounded-full">
                    {event.attendees?.length || 0} attending
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Today Button */}
      <button
        onClick={() => {
          setCurrentDate(new Date());
          onDateSelect && onDateSelect(new Date());
        }}
        className="w-full mt-4 py-2 text-sm text-gold hover:text-gold-light transition-colors"
      >
        Jump to Today
      </button>
    </div>
  );
}
