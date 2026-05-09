import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminApi } from '../../lib/api';
import { useToast } from '../../components/Toast';
import DataTable from '../../components/DataTable';
import ConfirmDialog from '../../components/ConfirmDialog';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

export default function ResultsList() {
  const navigate = useNavigate();
  const toast = useToast();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    adminApi.get('/results')
      .then(res => setData(Array.isArray(res) ? res : (res?.data || [])))
      .catch(e => toast.error(e.message))
      .finally(() => setIsLoading(false));
  }, []);

  async function handleDelete() {
    try {
      await adminApi.delete(`/results/${deleteId}`);
      toast.success('Result deleted');
      setData(prev => prev.filter(r => r._id !== deleteId));
      setDeleteId(null);
    } catch (e) {
      toast.error(e.message);
    }
  }

  const columns = [
    {
      key: 'studentName',
      label: 'Student Name',
      sortable: true,
      render: r => (
        <div className="flex items-center gap-2">
          {r.photo || r.image ? (
            <img src={r.photo || r.image} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-semibold flex-shrink-0">
              {r.studentName?.[0]?.toUpperCase() || 'S'}
            </div>
          )}
          <span className="font-medium text-gray-900">{r.studentName}</span>
        </div>
      ),
    },
    { key: 'examName', label: 'Exam', sortable: true },
    {
      key: 'rank',
      label: 'Rank',
      render: r => (
        <span className="inline-block bg-green-50 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
          {r.rank}
        </span>
      ),
    },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'year', label: 'Year', sortable: true },
    {
      key: 'actions',
      label: '',
      render: r => (
        <div className="flex gap-1.5">
          <button
            onClick={() => navigate(`/results/${r._id}`)}
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
        title="Delete this result?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Results / Hall of Fame</h1>
        <Link
          to="/results/new"
          className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-red-600 transition-colors"
        >
          <FaPlus className="text-xs" />
          Add Achiever
        </Link>
      </div>
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        emptyMessage="No results added yet."
        searchKeys={['studentName', 'examName', 'category', 'rank']}
      />
    </div>
  );
}
