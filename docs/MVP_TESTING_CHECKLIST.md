# VCSAVibes MVP - Testing Checklist

## 🚀 Quick Start Testing

### Prerequisites
```bash
cd /rogervibes/vcs/Vcsa-

# Start VCSA Backend (if not running)
cd backend
uvicorn server:app --reload --host 0.0.0.0 --port 8000

# In another terminal, start VCSAVibes
cd apps/vcsavibes
npm install  # If dependencies not installed
npm run dev
```

**Access**: http://localhost:3001

**Test Credentials**:
- Email: demo@vcsa.com
- Password: demo123

---

## 📋 Module 1: Strategy (5 pages)

### 1.1 Strategy Hub Page (`/strategy`)
- [ ] Page loads without errors
- [ ] 4 module cards display (Daily Performance, Goal Sheet, Financial Planner, Analytics)
- [ ] All cards are clickable
- [ ] Quick stats section displays (weekly volume, sales, streak)
- [ ] Navigation to all 4 sub-pages works

### 1.2 Daily Performance (`/strategy/daily-performance`)
- [ ] Page loads with mock data
- [ ] Stat cards display (Tours, Presentations, Sales, Volume)
- [ ] Progress cards show goal progress
- [ ] Activity feed displays
- [ ] Metric chart renders

### 1.3 Goal Sheet (`/strategy/goal-sheet`)
- [ ] Goals display with progress
- [ ] Milestone tracker shows progress
- [ ] Achievement badges display
- [ ] Add goal functionality works

### 1.4 Financial Planner (`/strategy/financial-planner`)
- [ ] Income breakdown displays
- [ ] Commission calculator works
- [ ] Monthly projection shows
- [ ] Tax estimator displays
- [ ] Savings goal tracker works

### 1.5 Analytics Dashboard (`/strategy/analytics`)
- [ ] KPI cards display with sparklines
- [ ] Date range filter works (7d, 30d, 90d, 6m, 1y)
- [ ] KPI data updates when changing period
- [ ] Performance Trends chart toggles (line/bar)
- [ ] Goal vs Actual chart displays
- [ ] Leaderboard shows top performers
- [ ] Revenue breakdown section shows
- [ ] Key insights section displays

---

## 📋 Module 2: Training (3 pages)

### 2.1 Training Library (`/training`)
- [ ] Page loads with 6 tracks
- [ ] Overall progress displays correctly
- [ ] Readiness score shows
- [ ] Stats display (points, streak, badges)
- [ ] All track cards are clickable
- [ ] Track progress bars display

### 2.2 Track Detail (`/training/track/:trackId`)
- [ ] Track detail page loads
- [ ] All modules display for the track
- [ ] Module status indicators work (completed, available, locked)
- [ ] Progress bar shows correct %
- [ ] Key Move displays for each module
- [ ] Click on available/locked module works

### 2.3 Session Detail (`/training/session/:contentId`)
- [ ] Session detail page loads
- [ ] Video player embeds correctly (YouTube/Vimeo)
- [ ] Video player controls work (play/pause, progress, fullscreen)
- [ ] Description and Key Move display
- [ ] Expert info shows (if masterclass)
- [ ] Topics/tags display
- [ ] Mark as Complete button works
- [ ] Bookmark toggle works
- [ ] Stats show (duration, difficulty, views)

---

## 📋 Module 3: Coaching (1 page)

### 3.1 Coaching & Events (`/coaching`)
- [ ] Page loads without errors
- [ ] Stats display (upcoming, registered, recordings)
- [ ] Calendar displays current month
- [ ] Calendar navigation works (prev/next month)
- [ ] Calendar shows event indicators
- [ ] Date selection filters sessions
- [ ] Session type filter works (All, Group, Q&A, Role Play, Strategy)
- [ ] Upcoming sessions display
- [ ] Past sessions with recordings display
- [ ] RSVP button works
- [ ] Cancel RSVP works
- [ ] Event cards show all info (date, time, host, attendees)
- [ ] Recording link works for past sessions

---

## 📋 Module 4: Resources (1 page)

### 4.1 Resources Center (`/resources`)
- [ ] Page loads without errors
- [ ] Stats display (total, favorites, new this week)
- [ ] Search bar works
- [ ] Real-time search filters results
- [ ] Search clear button works
- [ ] Category filter works (7 categories)
- [ ] Type filter works (5 types)
- [ ] Sort dropdown works (newest, popular, A-Z)
- [ ] Favorites toggle works
- [ ] Favorites persist on page reload
- [ ] Resource cards display with file icons
- [ ] Download button works
- [ ] Resources grid is responsive

---

## 📋 Cross-Module Tests

### Navigation
- [ ] All nav links work
- [ ] Browser back/forward works
- [ ] Direct URL access works
- [ ] Redirect to login on protected routes

### Authentication
- [ ] Login works with demo credentials
- [ ] Logout works
- [ ] Auth state persists across page refresh
- [ ] Protected routes redirect to login when not authenticated

### Responsive Design
- [ ] Mobile view (< 768px) works
- [ ] Tablet view (768px - 1024px) works
- [ ] Desktop view (> 1024px) works
- [ ] Navigation menu works on mobile

### Loading & Error States
- [ ] Loading spinners display during API calls
- [ ] Error messages display when API fails
- [ ] Empty states display when no data

### Performance
- [ ] Page load time < 3s
- [ ] No console errors
- [ ] No memory leaks (check browser console)
- [ ] Images optimize properly

---

## 🔍 API Integration Tests

### Backend Endpoints (VCSA)
Test these endpoints are accessible from VCSAVibes:

- [ ] `GET /api/auth/me` - User info
- [ ] `GET /api/development/tracks` - Training tracks
- [ ] `GET /api/development/tracks/:id` - Track detail
- [ ] `GET /api/development/content/:id` - Content detail
- [ ] `POST /api/development/content/:id/complete` - Mark complete
- [ ] `GET /api/development/progress` - User progress
- [ ] `GET /api/coaching/sessions` - Coaching sessions
- [ ] `POST /api/coaching/sessions/:id/rsvp` - RSVP
- [ ] `GET /api/resources` - Resources list
- [ ] `POST /api/resources/:id/download` - Download

---

## 🐛 Known Issues to Fix

### Critical (Blocker)
- None expected

### High Priority
- None expected

### Medium Priority
- [ ] Add more mock data for demo purposes
- [ ] Add loading skeletons for better UX
- [ ] Add error boundaries for error handling

---

## ✅ Sign-Off Criteria

- [ ] All 4 modules load without errors
- [ ] All core functionality works (navigation, CRUD operations)
- [ ] Responsive design works on all screen sizes
- [ ] No console errors
- [ ] API integration works for all endpoints
- [ ] Authentication flow works correctly

---

## 📝 Test Notes

**Tester**: ___________
**Date**: ___________
**Build**: MVP v1.0 (commit 93f2274)
**Browser**: ___________
**Result**: PASS / FAIL

**Issues Found**:
1.
2.
3.

**Overall Assessment**: ___________
