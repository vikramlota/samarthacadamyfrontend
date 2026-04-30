import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './App.css';
import { HelmetProvider } from 'react-helmet-async';

// --- SEO root schemas (on every page) ---
import RootSchemas from '@/components/seo/RootSchemas';

// --- Layouts (always loaded for UX) ---
import Navbar             from './components/layout/Navbar';
import Footer             from './components/layout/Footer';
import FloatingButtons    from './components/layout/FloatingButtons';
import GlobalCourseSidebar from './components/GlobalCourseSidebar';

// --- Loading Fallback Component ---
import { ComponentSkeleton } from './components/SkeletonLoader';

// --- Public Pages (Lazy loaded) ---
const HomePage                = React.lazy(() => import('./pages/Home.jsx'));
const LandingPage             = React.lazy(() => import('./pages/LandingPage.jsx'));
const CoursesIndexPage        = React.lazy(() => import('./pages/CoursesIndex.jsx'));
const CoursesPage             = React.lazy(() => import('./pages/CoursePage.jsx'));
const UpdatesPage             = React.lazy(() => import('./pages/Updates.jsx'));
const NotificationPage        = React.lazy(() => import('./pages/Notification.jsx'));
const SelectionPage           = React.lazy(() => import('./pages/Selections.jsx'));
const CurrentAffairsPage      = React.lazy(() => import('./pages/CurrentAffairsPage.jsx'));
const CurrentAffairDetailPage = React.lazy(() => import('./pages/CurrentAffairDetailPage.jsx'));
const CourseDetailPage        = React.lazy(() => import('./pages/CourseDetailpage.jsx'));
const BookDemoPage            = React.lazy(() => import('./pages/BookDemoPage.jsx'));
const AboutPage               = React.lazy(() => import('./pages/About.jsx'));
const FacultyPage             = React.lazy(() => import('./pages/Faculty.jsx'));
const FacultyDetailPage       = React.lazy(() => import('./pages/FacultyDetail.jsx'));
const ContactPage             = React.lazy(() => import('./pages/Contact.jsx'));

// --- Admin Pages (Lazy loaded) ---
const AdminLayout          = React.lazy(() => import('./admin/AdminLayout'));
const Login                = React.lazy(() => import('./admin/Login'));
const Dashboard            = React.lazy(() => import('./admin/Dashboard.jsx'));
const ManageCourses        = React.lazy(() => import('./admin/ManageCourses'));
const ManageUpdates        = React.lazy(() => import('./admin/ManageUpdates'));
const ManageResults        = React.lazy(() => import('./admin/ManageResults'));
const ManageCurrentAffairs = React.lazy(() => import('./admin/ManageCurrentAffairs'));
const ManageDemoRequests   = React.lazy(() => import('./admin/ManageDemoRequests.jsx'));

// --- Layout Wrapper for Public Pages ---
const PublicLayout = () => (
  <div className="font-sans text-gray-700 bg-gray-50 min-h-screen flex flex-col">
    <Navbar />
    <div className="flex grow w-full">
      <GlobalCourseSidebar />
      <main className="flex-1 bg-white min-w-0">
        <Outlet />
      </main>
    </div>
    <Footer />
    <FloatingButtons />
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
        {/* Organization + WebSite + LocalBusiness schemas on every page */}
        <RootSchemas />

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

            {/* /courses — NEW rich index page (MUST be before /:slug) */}
            <Route
              path="/courses"
              element={
                <Suspense fallback={<ComponentSkeleton size="large" />}>
                  <CoursesIndexPage />
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
            <Route
              path="/faculty"
              element={
                <Suspense fallback={<ComponentSkeleton size="large" />}>
                  <FacultyPage />
                </Suspense>
              }
            />
            <Route
              path="/faculty/:idOrSlug"
              element={
                <Suspense fallback={<ComponentSkeleton size="large" />}>
                  <FacultyDetailPage />
                </Suspense>
              }
            />
            <Route
              path="/contact"
              element={
                <Suspense fallback={<ComponentSkeleton size="large" />}>
                  <ContactPage />
                </Suspense>
              }
            />

            {/* Dynamic landing pages — MUST be last */}
            <Route
              path="/:slug"
              element={
                <Suspense fallback={<ComponentSkeleton size="large" />}>
                  <LandingPage />
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
            <Route path="dashboard"      element={<Suspense fallback={<ComponentSkeleton size="large" />}><Dashboard /></Suspense>} />
            <Route path="courses"        element={<Suspense fallback={<ComponentSkeleton size="large" />}><ManageCourses /></Suspense>} />
            <Route path="updates"        element={<Suspense fallback={<ComponentSkeleton size="large" />}><ManageUpdates /></Suspense>} />
            <Route path="results"        element={<Suspense fallback={<ComponentSkeleton size="large" />}><ManageResults /></Suspense>} />
            <Route path="current-affairs" element={<Suspense fallback={<ComponentSkeleton size="large" />}><ManageCurrentAffairs /></Suspense>} />
            <Route path="demo-requests"  element={<Suspense fallback={<ComponentSkeleton size="large" />}><ManageDemoRequests /></Suspense>} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
