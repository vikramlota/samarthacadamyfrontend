import { useNavigate } from 'react-router-dom';
import { adminApi } from '../../lib/api';
import { useApiData } from '../../hooks/useApiData';
import { useToast } from '../../components/Toast';
import { useAuth } from '../../context/AuthContext';
import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';
import ConfirmDialog from '../../components/ConfirmDialog';
import { Button } from '@/components/ui/Button';
import { FaPlus, FaEdit, FaTrash, FaCopy } from 'react-icons/fa';
import { useState } from 'react';

export default function LandingPagesList() {
  const navigate = useNavigate();
  const toast = useToast();
  const { canDelete } = useAuth();
  const { data, isLoading, refetch } = useApiData('/landing-pages/admin/all');
  const [deleteId, setDeleteId] = useState(null);

  async function handleDelete() {
    try {
      await adminApi.delete(`/landing-pages/admin/${deleteId}`);
      toast.success('Page deactivated');
      setDeleteId(null);
      refetch();
    } catch (e) { toast.error(e.message); }
  }

  async function handleDuplicate(id) {
    try {
      await adminApi.post(`/landing-pages/admin/${id}/duplicate`);
      toast.success('Page duplicated');
      refetch();
    } catch (e) { toast.error(e.message); }
  }

  const columns = [
    { key: 'examShortName', label: 'Exam', sortable: true, render: r => <span className="font-medium">{r.examShortName}</span> },
    { key: 'slug', label: 'Slug', render: r => <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{r.slug}</code> },
    { key: 'active', label: 'Status', render: r => <StatusBadge status={r.active ? 'active' : 'inactive'} /> },
    { key: 'updatedAt', label: 'Updated', sortable: true, render: r => new Date(r.updatedAt).toLocaleDateString('en-IN') },
    {
      key: 'actions', label: '',
      render: r => (
        <div className="flex gap-1.5">
          <button onClick={() => navigate(`/landing-pages/${r._id}`)} className="p-1.5 text-blue-500 hover:text-blue-700"><FaEdit /></button>
          <button onClick={() => handleDuplicate(r._id)} className="p-1.5 text-gray-400 hover:text-gray-600"><FaCopy /></button>
          {canDelete && <button onClick={() => setDeleteId(r._id)} className="p-1.5 text-red-400 hover:text-red-600"><FaTrash /></button>}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <ConfirmDialog open={!!deleteId} title="Deactivate this page?" onConfirm={handleDelete} onCancel={() => setDeleteId(null)} confirmLabel="Deactivate" />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Landing Pages</h1>
        <Button variant="primary" icon={FaPlus} onClick={() => navigate('/landing-pages/new')}>New Page</Button>
      </div>
      <DataTable columns={columns} data={data?.data || []} isLoading={isLoading} emptyMessage="No landing pages yet." searchKeys={['examShortName', 'slug']} />
    </div>
  );
}
