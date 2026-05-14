import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
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
const BlogIndexPage           = React.lazy(() => import('./pages/BlogIndex.jsx'));
const BlogCategoryPage        = React.lazy(() => import('./pages/BlogCategory.jsx'));
const BlogPostPage            = React.lazy(() => import('./pages/BlogPost.jsx'));

// --- New Admin Panel (Lazy loaded as a single unit) ---
const AdminApp = React.lazy(() => import('./admin/AdminApp'));

// Lazy-load admin providers to keep the main bundle lean
const AdminAuthProvider = React.lazy(() =>
  import('./admin/context/AuthContext').then(m => ({ default: m.AuthProvider }))
);
const AdminToastProvider = React.lazy(() =>
  import('./admin/components/Toast').then(m => ({ default: m.ToastProvider }))
);
const AdminToastConsumer = React.lazy(() =>
  import('./admin/components/Toast').then(m => ({ default: m.ToastConsumer }))
);

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

// --- Admin Wrapper — loads providers + AdminApp together ---
function AdminWrapper() {
  return (
    <Suspense fallback={<ComponentSkeleton size="large" />}>
      <AdminToastProvider>
        <AdminToastConsumer />
        <AdminAuthProvider>
          <AdminApp />
        </AdminAuthProvider>
      </AdminToastProvider>
    </Suspense>
  );
}

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

            {/* Blog routes — all before /:slug */}
            <Route
              path="/blog"
              element={
                <Suspense fallback={<ComponentSkeleton size="large" />}>
                  <BlogIndexPage />
                </Suspense>
              }
            />
            <Route
              path="/blog/category/:slug"
              element={
                <Suspense fallback={<ComponentSkeleton size="large" />}>
                  <BlogCategoryPage />
                </Suspense>
              }
            />
            <Route
              path="/blog/:slug"
              element={
                <Suspense fallback={<ComponentSkeleton size="large" />}>
                  <BlogPostPage />
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

          {/* NEW ADMIN PANEL — single route mounts the entire admin SPA */}
          <Route
            path="/admin/*"
            element={
              <Suspense fallback={<ComponentSkeleton size="large" />}>
                <AdminWrapper />
              </Suspense>
            }
          />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;

