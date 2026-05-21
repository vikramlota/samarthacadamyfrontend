import { NavLink } from 'react-router-dom';
import {
  FaTachometerAlt, FaFileAlt, FaInfoCircle, FaChalkboardTeacher,
  FaCalendarAlt, FaTrophy, FaNewspaper, FaInbox, FaBlog, FaTags,
  FaTimes, FaSignOutAlt, FaUser, FaBook, FaBell, FaClipboardList,
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { cn } from '@/lib/utils';

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: FaTachometerAlt, end: true },
  {
    label: 'Content',
    items: [
      { to: '/admin/landing-pages',  label: 'Landing Pages',  icon: FaFileAlt },
      { to: '/admin/about',          label: 'About Page',     icon: FaInfoCircle },
      { to: '/admin/faculty',        label: 'Faculty',        icon: FaChalkboardTeacher },
      { to: '/admin/batches',        label: 'Batches',        icon: FaCalendarAlt },
      { to: '/admin/selections',     label: 'Selections',     icon: FaTrophy },
      { to: '/admin/media-coverage', label: 'Media Coverage', icon: FaNewspaper },
      { to: '/admin/courses',        label: 'Courses',        icon: FaBook },
    ],
  },
  {
    label: 'Updates',
    items: [
      { to: '/admin/current-affairs', label: 'Current Affairs',    icon: FaNewspaper },
      { to: '/admin/notifications',   label: 'Notifications',      icon: FaBell },
      { to: '/admin/results',         label: 'Results / Hall of Fame', icon: FaTrophy },
    ],
  },
  {
    label: 'Engagement',
    items: [
      { to: '/admin/inquiries',     label: 'Inquiries',      icon: FaInbox },
      { to: '/admin/demo-requests', label: 'Demo Requests',  icon: FaClipboardList },
    ],
  },
  {
    label: 'Blog',
    items: [
      { to: '/admin/blog/posts',      label: 'Posts',      icon: FaBlog },
      { to: '/admin/blog/categories', label: 'Categories', icon: FaTags },
    ],
  },
];

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={cn(
        'fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200',
        'transform transition-transform duration-200 lg:translate-x-0',
        isOpen ? 'translate-x-0' : '-translate-x-full',
      )}>
        <div className="h-full flex flex-col overflow-hidden">
          {/* Logo */}
          <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                S
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm leading-none">Samarth Academy</p>
                <p className="text-xs text-gray-400 mt-0.5">Admin Panel</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100"
              aria-label="Close menu"
            >
              <FaTimes className="text-gray-500" />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
            {NAV.map((item, idx) =>
              item.items ? (
                <div key={idx}>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 px-3">
                    {item.label}
                  </p>
                  <div className="space-y-0.5">
                    {item.items.map(sub => (
                      <NavLink
                        key={sub.to}
                        to={sub.to}
                        onClick={onClose}
                        className={({ isActive }) =>
                          cn('admin-nav-item', isActive && 'active')
                        }
                      >
                        <sub.icon className="text-sm flex-shrink-0" />
                        <span className="flex-1 truncate">{sub.label}</span>
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={onClose}
                  className={({ isActive }) => cn('admin-nav-item', isActive && 'active')}
                >
                  <item.icon className="text-sm flex-shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              )
            )}
          </nav>

          {/* User footer */}
          <div className="p-4 border-t border-gray-200 flex-shrink-0">
            <NavLink
              to="/admin/profile"
              onClick={onClose}
              className="flex items-center gap-3 mb-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-9 h-9 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                {user?.name?.[0]?.toUpperCase() || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
                <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
              </div>
              <FaUser className="text-gray-300 text-xs flex-shrink-0" />
            </NavLink>
            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <FaSignOutAlt className="text-sm" />
              Sign out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
