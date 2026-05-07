import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminApi } from '../../lib/api';
import { useToast } from '../../components/Toast';
import DataTable from '../../components/DataTable';
import ConfirmDialog from '../../components/ConfirmDialog';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

export default function CoursesList() {
  const navigate = useNavigate();
  const toast = useToast();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  useState(() => {
    adminApi.get('/courses')
      .then(res => setData(Array.isArray(res) ? res : (res?.data || [])))
      .catch(e => toast.error(e.message))
      .finally(() => setIsLoading(false));
  });

  async function handleDelete() {
    try {
      await adminApi.delete(`/courses/${deleteId}`);
      toast.success('Course deleted');
      setData(prev => prev.filter(c => c._id !== deleteId));
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
    { key: 'category', label: 'Category', sortable: true },
    {
      key: 'badgeText',
      label: 'Badge',
      render: r => r.badgeText
        ? <span className="inline-block bg-red-100 text-red-700 text-xs font-semibold px-2 py-0.5 rounded-full">{r.badgeText}</span>
        : <span className="text-gray-400 text-sm">—</span>,
    },
    {
      key: 'actions',
      label: '',
      render: r => (
        <div className="flex gap-1.5">
          <button
            onClick={() => navigate(`/courses/${r._id}`)}
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
        title="Delete this course?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
        <Link
          to="/courses/new"
          className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-red-600 transition-colors"
        >
          <FaPlus className="text-xs" />
          New Course
        </Link>
      </div>
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        emptyMessage="No courses added yet."
        searchKeys={['title', 'category', 'badgeText']}
      />
    </div>
  );
}
