import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../../lib/api';
import { useApiData } from '../../hooks/useApiData';
import { useToast } from '../../components/Toast';
import { useAuth } from '../../context/AuthContext';
import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';
import ConfirmDialog from '../../components/ConfirmDialog';
import { Button } from '@/components/ui/Button';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

export default function BatchesList() {
  const navigate = useNavigate();
  const toast = useToast();
  const { canDelete } = useAuth();
  const { data, isLoading, refetch } = useApiData('/batches/admin/all');
  const [deleteId, setDeleteId] = useState(null);

  async function handleDelete() {
    try {
      await adminApi.delete(`/batches/admin/${deleteId}`);
      toast.success('Batch deleted');
      setDeleteId(null);
      refetch();
    } catch (e) { toast.error(e.message); }
  }

  const columns = [
    { key: 'name', label: 'Batch Name', sortable: true, render: r => <span className="font-medium">{r.name}</span> },
    { key: 'courseSlug', label: 'Course Slug', render: r => r.courseSlug || '—' },
    { key: 'startDate', label: 'Start Date', sortable: true, render: r => r.startDate ? new Date(r.startDate).toLocaleDateString('en-IN') : '—' },
    { key: 'mode', label: 'Mode', render: r => <span className="capitalize">{r.mode || '—'}</span> },
    { key: 'featured', label: 'Featured', render: r => r.featured ? '⭐️ Yes' : '—' },
    { key: 'active', label: 'Status', render: r => <StatusBadge status={r.active !== false ? 'active' : 'inactive'} /> },
    {
      key: 'actions', label: '',
      render: r => (
        <div className="flex gap-1.5 justify-end">
          <button onClick={() => navigate(`/admin/batches/${r._id}`)} className="p-1.5 text-blue-500 hover:text-blue-700"><FaEdit /></button>
          {canDelete && <button onClick={() => setDeleteId(r._id)} className="p-1.5 text-red-400 hover:text-red-600"><FaTrash /></button>}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <ConfirmDialog open={!!deleteId} title="Delete this batch?" onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Batches</h1>
        <Button variant="primary" icon={FaPlus} onClick={() => navigate('/admin/batches/new')}>New Batch</Button>
      </div>
      <DataTable columns={columns} data={data?.data || []} isLoading={isLoading} emptyMessage="No batches found." searchKeys={['name', 'courseSlug', 'faculty']} />
    </div>
  );
}
