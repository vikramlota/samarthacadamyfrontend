import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminApi } from '../../lib/api';
import { useToast } from '../../components/Toast';
import DataTable from '../../components/DataTable';
import ConfirmDialog from '../../components/ConfirmDialog';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const TYPE_COLORS = {
  'Job': 'bg-green-100 text-green-700',
  'Admit Card Update': 'bg-blue-100 text-blue-700',
  'Result': 'bg-purple-100 text-purple-700',
  'New Notification': 'bg-red-100 text-red-700',
  'Exam Strategy': 'bg-yellow-100 text-yellow-700',
  'Exam Pattern': 'bg-orange-100 text-orange-700',
  'Cut-Off Analysis': 'bg-pink-100 text-pink-700',
  'Answer Key': 'bg-indigo-100 text-indigo-700',
  'Syllabus Update': 'bg-teal-100 text-teal-700',
  'Important Dates': 'bg-cyan-100 text-cyan-700',
  'General': 'bg-gray-100 text-gray-600',
};

export default function NotificationsList() {
  const navigate = useNavigate();
  const toast = useToast();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  useState(() => {
    adminApi.get('/notifications')
      .then(res => setData(Array.isArray(res) ? res : (res?.data || [])))
      .catch(e => toast.error(e.message))
      .finally(() => setIsLoading(false));
  });

  async function handleDelete() {
    try {
      await adminApi.delete(`/notifications/${deleteId}`);
      toast.success('Notification deleted');
      setData(prev => prev.filter(n => n._id !== deleteId));
      setDeleteId(null);
    } catch (e) {
      toast.error(e.message);
    }
  }

  const columns = [
    {
      key: 'title',
      label: 'Title',
      sortable: true,
      render: r => <span className="font-medium text-gray-900">{r.title}</span>,
    },
    {
      key: 'type',
      label: 'Type',
      sortable: true,
      render: r => {
        const cls = TYPE_COLORS[r.type] || 'bg-gray-100 text-gray-600';
        return (
          <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${cls}`}>
            {r.type || 'General'}
          </span>
        );
      },
    },
    {
      key: 'createdAt',
      label: 'Date',
      sortable: true,
      render: r => {
        const d = r.createdAt || r.date;
        return d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
      },
    },
    {
      key: 'actions',
      label: '',
      render: r => (
        <div className="flex gap-1.5">
          <button
            onClick={() => navigate(`/notifications/${r._id}`)}
            className="p-1.5 text-blue-500 hover:text-blue-700"
            title="Edit"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => setDeleteId(r._id)}
            className="p-1.5 text-red-400 hover:text-red-600"
            title="Delete"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <ConfirmDialog
        open={!!deleteId}
        title="Delete this notification?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <Link
          to="/notifications/new"
          className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-red-600 transition-colors"
        >
          <FaPlus className="text-xs" />
          New Update
        </Link>
      </div>
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        emptyMessage="No notifications yet."
        searchKeys={['title', 'type']}
      />
    </div>
  );
}
