import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './components/ui/ProtectedRoute';
import AuthProvider from './contexts/AuthContext';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/Auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/Auth/RegisterPage'));

// Strategy pages
const StrategyPage = lazy(() => import('./pages/Strategy/StrategyPage'));
const DailyPerformancePage = lazy(() => import('./pages/Strategy/DailyPerformancePage'));
const GoalSheetPage = lazy(() => import('./pages/Strategy/GoalSheetPage'));
const FinancialPlannerPage = lazy(() => import('./pages/Strategy/FinancialPlannerPage'));
const AnalyticsPage = lazy(() => import('./pages/Strategy/AnalyticsPage'));

// Other module pages
const TrainingPage = lazy(() => import('./pages/Training/TrainingPage'));
const CoachingPage = lazy(() => import('./pages/Coaching/CoachingPage'));
const ResourcesPage = lazy(() => import('./pages/Resources/ResourcesPage'));

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<HomePage />} />
            <Route path="strategy" element={<StrategyPage />} />
            <Route path="strategy/daily-performance" element={<DailyPerformancePage />} />
            <Route path="strategy/goal-sheet" element={<GoalSheetPage />} />
            <Route path="strategy/financial-planner" element={<FinancialPlannerPage />} />
            <Route path="strategy/analytics" element={<AnalyticsPage />} />
            <Route path="training" element={<TrainingPage />} />
            <Route path="coaching" element={<CoachingPage />} />
            <Route path="resources" element={<ResourcesPage />} />
          </Route>

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
