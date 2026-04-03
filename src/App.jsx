import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './App.css';
import { HelmetProvider } from 'react-helmet-async';

// --- Layouts (always loaded for UX) ---
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GlobalCourseSidebar from './components/GlobalCourseSidebar';
import QuickConnect from './components/QuickConnect';

// --- Loading Fallback Component ---
import { ComponentSkeleton } from './components/SkeletonLoader';

// --- Public Pages (Lazy loaded) ---
const HomePage = React.lazy(() => import('./pages/HomePage.jsx'));
const CoursesPage = React.lazy(() => import('./pages/CoursePage.jsx'));
const UpdatesPage = React.lazy(() => import('./pages/Updates.jsx'));
const NotificationPage = React.lazy(() => import('./pages/Notification.jsx'));
const SelectionPage = React.lazy(() => import('./pages/Selections.jsx'));
const CurrentAffairsPage = React.lazy(() => import('./pages/CurrentAffairsPage.jsx'));
const CurrentAffairDetailPage = React.lazy(() => import('./pages/CurrentAffairDetailPage.jsx'));
const CourseDetailPage = React.lazy(() => import('./pages/CourseDetailpage.jsx'));
const BookDemoPage = React.lazy(() => import('./pages/BookDemoPage.jsx'));
const AboutPage = React.lazy(() => import('./pages/About.jsx'));

// --- Admin Pages (Lazy loaded) ---
const AdminLayout = React.lazy(() => import('./admin/AdminLayout'));
const Login = React.lazy(() => import('./admin/Login'));
const Dashboard = React.lazy(() => import('./admin/Dashboard.jsx'));
const ManageCourses = React.lazy(() => import('./admin/ManageCourses'));
const ManageUpdates = React.lazy(() => import('./admin/ManageUpdates'));
const ManageResults = React.lazy(() => import('./admin/ManageResults'));
const ManageCurrentAffairs = React.lazy(() => import('./admin/ManageCurrentAffairs'));
const ManageDemoRequests = React.lazy(() => import('./admin/ManageDemoRequests.jsx'));
// --- Layout Wrapper for Public Pages ---
const PublicLayout = () => (
  // 1. The outermost wrapper is now a Flex Column (Top-to-Bottom)
  <div className="font-sans text-gray-700 bg-gray-50 min-h-screen flex flex-col">
    
    {/* 2. TOP: Navbar spans the entire width of the screen */}
    <Navbar />

    {/* 3. MIDDLE: We create a Flex Row just for the Sidebar and Main Content */}
    <div className="flex flex-grow w-full">
      
      {/* LEFT: The Global Sidebar */}
      <GlobalCourseSidebar />

      {/* RIGHT: Main Content Area */}
      <main className="flex-1 bg-white min-w-0">
        <Outlet />
      </main>

    </div>

    {/* 4. BOTTOM: Footer spans the entire width of the screen */}
    <Footer />
    <QuickConnect />
  </div>
);
// --- Protected Route Wrapper ---
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  return token ? children : <Navigate to="/admin/login" replace />;
};

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          {/* PUBLIC WEBSITE ROUTES */}
          <Route element={<PublicLayout />}>
            <Route
              path="/"
              element={
                <Suspense fallback={<ComponentSkeleton size="large" />}>
                  <HomePage />
                </Suspense>
              }
            />
            <Route
              path="/courses"
              element={
                <Suspense fallback={<ComponentSkeleton size="large" />}>
                  <CoursesPage />
                </Suspense>
              }
            />
            <Route
              path="/courses/:slug"
              element={
                <Suspense fallback={<ComponentSkeleton size="large" />}>
                  <CourseDetailPage />
                </Suspense>
              }
            />

            {/* Updates & Notifications */}
            <Route
              path="/notifications"
              element={
                <Suspense fallback={<ComponentSkeleton size="large" />}>
                  <UpdatesPage />
                </Suspense>
              }
            />
            <Route
              path="/notifications/:slug"
              element={
                <Suspense fallback={<ComponentSkeleton size="large" />}>
                  <NotificationPage />
                </Suspense>
              }
            />

            {/* Current Affairs */}
            <Route
              path="/current-affairs"
              element={
                <Suspense fallback={<ComponentSkeleton size="large" />}>
                  <CurrentAffairsPage />
                </Suspense>
              }
            />
            <Route
              path="/current-affairs/:slug"
              element={
                <Suspense fallback={<ComponentSkeleton size="large" />}>
                  <CurrentAffairDetailPage />
                </Suspense>
              }
            />

            {/* Results / Hall of Fame */}
            <Route
              path="/book-demo"
              element={
                <Suspense fallback={<ComponentSkeleton size="medium" />}>
                  <BookDemoPage />
                </Suspense>
              }
            />
            <Route
              path="/Selections"
              element={
                <Suspense fallback={<ComponentSkeleton size="large" />}>
                  <SelectionPage />
                </Suspense>
              }
            />

            <Route
              path="/about"
              element={
                <Suspense fallback={<ComponentSkeleton size="large" />}>
                  <AboutPage />
                </Suspense>
              }
            />
          </Route>

          {/* ADMIN ROUTES */}
          <Route
            path="/admin/login"
            element={
              <Suspense fallback={<ComponentSkeleton size="medium" />}>
                <Login />
              </Suspense>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Suspense fallback={<ComponentSkeleton size="large" />}>
                  <AdminLayout />
                </Suspense>
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route
              path="dashboard"
              element={
                <Suspense fallback={<ComponentSkeleton size="large" />}>
                  <Dashboard />
                </Suspense>
              }
            />
            {/* Management Pages */}
            <Route
              path="courses"
              element={
                <Suspense fallback={<ComponentSkeleton size="large" />}>
                  <ManageCourses />
                </Suspense>
              }
            />
            <Route
              path="updates"
              element={
                <Suspense fallback={<ComponentSkeleton size="large" />}>
                  <ManageUpdates />
                </Suspense>
              }
            />
            <Route
              path="results"
              element={
                <Suspense fallback={<ComponentSkeleton size="large" />}>
                  <ManageResults />
                </Suspense>
              }
            />
            <Route
              path="current-affairs"
              element={
                <Suspense fallback={<ComponentSkeleton size="large" />}>
                  <ManageCurrentAffairs />
                </Suspense>
              }
            />
            <Route
              path="demo-requests"
              element={
                <Suspense fallback={<ComponentSkeleton size="large" />}>
                  <ManageDemoRequests />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;