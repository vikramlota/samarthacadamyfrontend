import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider, ToastConsumer } from './components/Toast';
import AdminApp from './AdminApp';
import './admin.css';

createRoot(document.getElementById('admin-root')).render(
  <HelmetProvider>
    <BrowserRouter basename="/admin">
      <ToastProvider>
        <ToastConsumer />
        <AuthProvider>
          <AdminApp />
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  </HelmetProvider>
);
