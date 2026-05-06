import { FaBars } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

function pathToLabel(pathname) {
  if (pathname === '/') return 'Dashboard';
  return pathname
    .slice(1)
    .split('/')
    .map(seg => seg.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()))
    .join(' › ');
}

export default function Topbar({ onMenuClick }) {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200 flex-shrink-0">
      <div className="flex items-center gap-3 px-4 md:px-6 h-16">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-1 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Open menu"
        >
          <FaBars className="text-gray-600" />
        </button>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-600 truncate">
            {pathToLabel(location.pathname)}
          </p>
        </div>

        <div className="text-xs text-gray-400 hidden sm:block">
          {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
        </div>
      </div>
    </header>
  );
}
