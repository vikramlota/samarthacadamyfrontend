import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../../../lib/api';
import { useApiData } from '../../../hooks/useApiData';
import { useToast } from '../../../components/Toast';
import { useAuth } from '../../../context/AuthContext';
import DataTable from '../../../components/DataTable';
import ConfirmDialog from '../../../components/ConfirmDialog';
import { Button } from '@/components/ui/Button';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

export default function CategoriesList() {
  const navigate = useNavigate();
  const toast = useToast();
  const { canDelete } = useAuth();
  const { data, isLoading, refetch } = useApiData('/blog/categories');
  const [deleteId, setDeleteId] = useState(null);

  async function handleDelete() {
    try {
      await adminApi.delete(`/blog/categories/admin/${deleteId}`);
      toast.success('Category deleted');
      setDeleteId(null);
      refetch();
    } catch (e) { toast.error(e.message); }
  }

  const columns = [
    {
      key: 'color', label: '',
      render: r => r.color ? <div className="w-5 h-5 rounded-full border" style={{ background: r.color }} /> : null,
    },
    { key: 'name', label: 'Name', sortable: true, render: r => <span className="font-medium">{r.name}</span> },
    { key: 'slug', label: 'Slug', render: r => <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{r.slug}</code> },
    { key: 'description', label: 'Description', render: r => <span className="line-clamp-1 text-gray-500">{r.description || '—'}</span> },
    {
      key: 'actions', label: '',
      render: r => (
        <div className="flex gap-1.5">
          <button onClick={() => navigate(`/admin/blog/categories/${r._id}`)} className="p-1.5 text-blue-500 hover:text-blue-700"><FaEdit /></button>
          {canDelete && <button onClick={() => setDeleteId(r._id)} className="p-1.5 text-red-400 hover:text-red-600"><FaTrash /></button>}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <ConfirmDialog open={!!deleteId} title="Delete this category?" message="This may affect posts using it." onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Blog Categories</h1>
        <Button variant="primary" icon={FaPlus} onClick={() => navigate('/admin/blog/categories/new')}>New Category</Button>
      </div>
      <DataTable columns={columns} data={data?.data || []} isLoading={isLoading} emptyMessage="No categories yet." searchKeys={['name', 'slug']} />
    </div>
  );
}
