/**
 * API Client for VCSAVibes
 * Connects to VCSA backend API
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Make an API request to VCSA backend
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions = {
    credentials: 'include', // Include cookies for JWT auth
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config = { ...defaultOptions, ...options };

  try {
    const response = await fetch(url, config);

    // Handle 401 Unauthorized - redirect to login
    if (response.status === 401) {
      window.location.href = '/login';
      throw new Error('Unauthorized');
    }

    // Handle other errors
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(error.message || error.detail || 'Request failed');
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

/**
 * Auth API
 */
export const authAPI = {
  login: (email, password) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (data) =>
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  logout: () =>
    apiRequest('/auth/logout', {
      method: 'POST',
    }),

  getMe: () => apiRequest('/auth/me'),

  googleAuth: (token) =>
    apiRequest('/auth/google', {
      method: 'POST',
      body: JSON.stringify({ token }),
    }),
};

/**
 * Development API (Goal Sheet, Progress, Badges)
 */
export const developmentAPI = {
  // Stages & Tracks
  getStages: () => apiRequest('/development/stages'),
  getTracks: () => apiRequest('/development/tracks'),
  getTrack: (trackId) => apiRequest(`/development/tracks/${trackId}`),

  // Content
  getContent: (contentId) => apiRequest(`/development/content/${contentId}`),
  completeContent: (contentId) =>
    apiRequest(`/development/content/${contentId}/complete`, {
      method: 'POST',
    }),

  // Progress
  getProgress: () => apiRequest('/development/progress'),

  // Badges
  getBadges: () => apiRequest('/development/badges'),

  // Deal Breakdowns
  getBreakdowns: () => apiRequest('/development/breakdowns'),

  // Quick Wins
  getQuickWins: () => apiRequest('/development/quickwins'),
};

/**
 * Goal Sheet API
 */
export const goalSheetAPI = {
  getData: () => apiRequest('/goalsheet'),
  getStats: () => apiRequest('/goalsheet/stats'),
  createGoal: (goal) =>
    apiRequest('/goalsheet/goals', {
      method: 'POST',
      body: JSON.stringify(goal),
    }),
  updateGoal: (goalId, progress) =>
    apiRequest(`/goalsheet/goals/${goalId}`, {
      method: 'PUT',
      body: JSON.stringify({ progress }),
    }),
  unlockAchievement: (achievementId) =>
    apiRequest(`/goalsheet/achievements/${achievementId}/unlock`, {
      method: 'POST',
    }),
};

/**
 * Resources API
 */
export const resourcesAPI = {
  getAll: () => apiRequest('/resources'),
  getByCategory: (category) => apiRequest(`/resources?category=${category}`),
  download: (resourceId) =>
    apiRequest(`/resources/${resourceId}/download`, { method: 'POST' }),
};

/**
 * Events API
 */
export const eventsAPI = {
  getAll: () => apiRequest('/events'),
  register: (eventId) =>
    apiRequest(`/events/${eventId}/register`, { method: 'POST' }),
};

/**
 * Courses API (Legacy)
 */
export const coursesAPI = {
  getAll: () => apiRequest('/courses'),
  getById: (courseId) => apiRequest(`/courses/${courseId}`),
  getLesson: (lessonId) => apiRequest(`/lessons/${lessonId}`),
};

export default apiRequest;
