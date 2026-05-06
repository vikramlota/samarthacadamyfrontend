import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { useAuth } from './context/AuthContext';
import AdminLayout from './layout/AdminLayout';
import LoadingScreen from './components/LoadingScreen';

const Login            = lazy(() => import('./pages/Login'));
const ForgotPassword   = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword    = lazy(() => import('./pages/ResetPassword'));
const Dashboard        = lazy(() => import('./pages/Dashboard'));
const LandingPagesList = lazy(() => import('./pages/landing-pages/List'));
const LandingPageEdit  = lazy(() => import('./pages/landing-pages/Edit'));
const AboutEdit        = lazy(() => import('./pages/about/Edit'));
const FacultyList      = lazy(() => import('./pages/faculty/List'));
const FacultyEdit      = lazy(() => import('./pages/faculty/Edit'));
const BatchesList      = lazy(() => import('./pages/batches/List'));
const BatchEdit        = lazy(() => import('./pages/batches/Edit'));
const SelectionsList   = lazy(() => import('./pages/selections/List'));
const SelectionEdit    = lazy(() => import('./pages/selections/Edit'));
const MediaList        = lazy(() => import('./pages/media/List'));
const MediaEdit        = lazy(() => import('./pages/media/Edit'));
const InquiriesList    = lazy(() => import('./pages/inquiries/List'));
const InquiryDetail    = lazy(() => import('./pages/inquiries/Detail'));
const BlogPostsList    = lazy(() => import('./pages/blog/posts/List'));
const BlogPostEdit     = lazy(() => import('./pages/blog/posts/Edit'));
const CategoriesList   = lazy(() => import('./pages/blog/categories/List'));
const CategoryEdit     = lazy(() => import('./pages/blog/categories/Edit'));
const Profile          = lazy(() => import('./pages/Profile'));

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <LoadingScreen />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

const S = ({ children }) => <Suspense fallback={<LoadingScreen />}>{children}</Suspense>;

export default function AdminApp() {
  return (
    <S>
      <Routes>
        <Route path="/login"          element={<S><Login /></S>} />
        <Route path="/forgot-password" element={<S><ForgotPassword /></S>} />
        <Route path="/reset-password" element={<S><ResetPassword /></S>} />

        <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<S><Dashboard /></S>} />

          <Route path="landing-pages"      element={<S><LandingPagesList /></S>} />
          <Route path="landing-pages/new"  element={<S><LandingPageEdit /></S>} />
          <Route path="landing-pages/:id"  element={<S><LandingPageEdit /></S>} />

          <Route path="about"              element={<S><AboutEdit /></S>} />

          <Route path="faculty"            element={<S><FacultyList /></S>} />
          <Route path="faculty/new"        element={<S><FacultyEdit /></S>} />
          <Route path="faculty/:id"        element={<S><FacultyEdit /></S>} />

          <Route path="batches"            element={<S><BatchesList /></S>} />
          <Route path="batches/new"        element={<S><BatchEdit /></S>} />
          <Route path="batches/:id"        element={<S><BatchEdit /></S>} />

          <Route path="selections"         element={<S><SelectionsList /></S>} />
          <Route path="selections/new"     element={<S><SelectionEdit /></S>} />
          <Route path="selections/:id"     element={<S><SelectionEdit /></S>} />

          <Route path="media-coverage"     element={<S><MediaList /></S>} />
          <Route path="media-coverage/new" element={<S><MediaEdit /></S>} />
          <Route path="media-coverage/:id" element={<S><MediaEdit /></S>} />

          <Route path="inquiries"          element={<S><InquiriesList /></S>} />
          <Route path="inquiries/:id"      element={<S><InquiryDetail /></S>} />

          <Route path="blog/posts"         element={<S><BlogPostsList /></S>} />
          <Route path="blog/posts/new"     element={<S><BlogPostEdit /></S>} />
          <Route path="blog/posts/:id"     element={<S><BlogPostEdit /></S>} />

          <Route path="blog/categories"    element={<S><CategoriesList /></S>} />
          <Route path="blog/categories/new" element={<S><CategoryEdit /></S>} />
          <Route path="blog/categories/:id" element={<S><CategoryEdit /></S>} />

          <Route path="profile"            element={<S><Profile /></S>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </S>
  );
}
