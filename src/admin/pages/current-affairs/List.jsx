import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminApi } from '../../lib/api';
import { useToast } from '../../components/Toast';
import DataTable from '../../components/DataTable';
import ConfirmDialog from '../../components/ConfirmDialog';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

export default function CurrentAffairsList() {
  const navigate = useNavigate();
  const toast = useToast();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    adminApi.get('/current-affairs')
      .then(res => setData(Array.isArray(res) ? res : (res?.data || [])))
      .catch(e => toast.error(e.message))
      .finally(() => setIsLoading(false));
  }, []);

  async function handleDelete() {
    try {
      await adminApi.delete(`/current-affairs/${deleteId}`);
      toast.success('Article deleted');
      setData(prev => prev.filter(a => a._id !== deleteId));
      setDeleteId(null);
    } catch (e) {
      toast.error(e.message);
    }
  }

  const columns = [
    {
      key: 'headline',
      label: 'Headline',
      sortable: true,
      render: r => <span className="font-medium text-gray-900">{r.headline}</span>,
    },
    { key: 'category', label: 'Category', sortable: true },
    {
      key: 'isSpotlight',
      label: 'Spotlight',
      render: r => r.isSpotlight
        ? <span className="inline-block bg-yellow-100 text-yellow-700 text-xs font-semibold px-2 py-0.5 rounded-full">Yes</span>
        : <span className="inline-block bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">No</span>,
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
            onClick={() => navigate(`/current-affairs/${r._id}`)}
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
        title="Delete this article?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Current Affairs</h1>
        <Link
          to="/current-affairs/new"
          className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-red-600 transition-colors"
        >
          <FaPlus className="text-xs" />
          New Article
        </Link>
      </div>
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        emptyMessage="No current affairs articles yet."
        searchKeys={['headline', 'category']}
      />
    </div>
  );
}
