import { createContext, useContext, useState, useCallback } from 'react';
import { FaCheckCircle, FaTimesCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';
import { cn } from '@/lib/utils';

const ToastContext = createContext(null);

let id = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const add = useCallback((message, type = 'info', duration = 4000) => {
    const toast = { id: ++id, message, type };
    setToasts(prev => [...prev, toast]);
    if (duration > 0) setTimeout(() => remove(toast.id), duration);
  }, []); // eslint-disable-line

  const remove = useCallback((toastId) => {
    setToasts(prev => prev.filter(t => t.id !== toastId));
  }, []);

  const toast = {
    success: (msg, d) => add(msg, 'success', d),
    error: (msg, d) => add(msg, 'error', d),
    info: (msg, d) => add(msg, 'info', d),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map(t => (
          <ToastItem key={t.id} toast={t} onClose={() => remove(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

const ICONS = {
  success: <FaCheckCircle className="text-green-500 text-lg flex-shrink-0" />,
  error: <FaTimesCircle className="text-red-500 text-lg flex-shrink-0" />,
  info: <FaInfoCircle className="text-blue-500 text-lg flex-shrink-0" />,
};

const BORDERS = {
  success: 'border-green-200',
  error: 'border-red-200',
  info: 'border-blue-200',
};

function ToastItem({ toast, onClose }) {
  return (
    <div className={cn(
      'pointer-events-auto bg-white rounded-lg border shadow-lg px-4 py-3 flex items-start gap-3 animate-in slide-in-from-right duration-200',
      BORDERS[toast.type]
    )}>
      {ICONS[toast.type]}
      <p className="text-sm text-gray-800 flex-1">{toast.message}</p>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
        <FaTimes className="text-xs" />
      </button>
    </div>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

// Convenience singleton-style export so pages can import toast directly
export let toast = { success: () => {}, error: () => {}, info: () => {} };
export function setToastInstance(t) { toast = t; }

export function ToastConsumer() {
  const t = useContext(ToastContext);
  if (t) setToastInstance(t);
  return null;
}
