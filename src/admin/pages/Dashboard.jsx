import { Link } from 'react-router-dom';
import { FaInbox, FaBlog, FaFileAlt, FaChalkboardTeacher, FaArrowRight, FaWhatsapp } from 'react-icons/fa';
import { useApiData } from '../hooks/useApiData';
import StatusBadge from '../components/StatusBadge';

function StatCard({ label, value, icon: Icon, color, to }) {
  const inner = (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 ${to ? 'hover:shadow-md transition-shadow' : ''}`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl text-white ${color}`}>
        <Icon />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value ?? '—'}</p>
        <p className="text-xs text-gray-500 mt-0.5">{label}</p>
      </div>
    </div>
  );
  return to ? <Link to={to}>{inner}</Link> : inner;
}

function SectionTitle({ children }) {
  return <h2 className="text-base font-semibold text-gray-800 mb-3">{children}</h2>;
}

export default function Dashboard() {
  const { data: inqStats } = useApiData('/inquiries/admin/stats/summary');
  const { data: blogStats } = useApiData('/blog/posts/admin/stats/summary');
  const { data: recentInq } = useApiData('/inquiries/admin/all?limit=5&sort=newest');
  const { data: lpData } = useApiData('/landing-pages/admin/all');
  const { data: facultyData } = useApiData('/faculty/admin/all');

  const inq = inqStats?.data || {};
  const blog = blogStats?.data || {};
  const inquiries = recentInq?.data || [];
  const activeLPs = (lpData?.data || []).filter(p => p.active).length;
  const facultyCount = (facultyData?.data || []).length;

  const quickLinks = [
    { label: 'New Landing Page', to: '/landing-pages/new', color: 'text-blue-600' },
    { label: 'New Blog Post', to: '/blog/posts/new', color: 'text-green-600' },
    { label: 'New Faculty', to: '/faculty/new', color: 'text-purple-600' },
    { label: 'View Inquiries', to: '/inquiries', color: 'text-orange-600' },
    { label: 'Edit About Page', to: '/about', color: 'text-red-600' },
    { label: 'Manage Batches', to: '/batches', color: 'text-teal-600' },
  ];

  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">Welcome back — here's what's happening.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Inquiries" value={inq.total} icon={FaInbox} color="bg-red-500" to="/inquiries" />
        <StatCard label="New This Week" value={inq.newThisWeek} icon={FaInbox} color="bg-orange-500" to="/inquiries" />
        <StatCard label="Published Posts" value={blog.published} icon={FaBlog} color="bg-green-500" to="/blog/posts" />
        <StatCard label="Active Pages" value={activeLPs} icon={FaFileAlt} color="bg-blue-500" to="/landing-pages" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Inquiries */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <SectionTitle>Recent Inquiries</SectionTitle>
            <Link to="/inquiries" className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1">
              View all <FaArrowRight className="text-[10px]" />
            </Link>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            {inquiries.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-10">No inquiries yet</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map(inq => (
                    <tr key={inq._id}>
                      <td className="font-medium text-gray-900">{inq.name}</td>
                      <td className="text-gray-500">{inq.phone}</td>
                      <td><StatusBadge status={inq.status} /></td>
                      <td className="text-gray-400 text-xs">
                        {new Date(inq.createdAt).toLocaleDateString('en-IN')}
                      </td>
                      <td>
                        <Link to={`/inquiries/${inq._id}`} className="text-xs text-red-500 hover:underline">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <SectionTitle>Quick Actions</SectionTitle>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-1">
            {quickLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <span className={`text-sm font-medium ${link.color}`}>{link.label}</span>
                <FaArrowRight className="text-gray-300 text-xs group-hover:text-gray-500 transition-colors" />
              </Link>
            ))}
          </div>

          <div className="mt-4 bg-green-50 border border-green-100 rounded-xl p-4">
            <p className="text-xs font-semibold text-green-800 mb-1">Faculty &amp; Selections</p>
            <div className="flex gap-4 mt-2 text-sm">
              <div>
                <p className="text-xl font-bold text-green-700">{facultyCount}</p>
                <p className="text-xs text-green-600">Faculty</p>
              </div>
              <div>
                <p className="text-xl font-bold text-green-700">{inq.converted || 0}</p>
                <p className="text-xs text-green-600">Converted</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
