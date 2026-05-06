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
import { FaPlus, FaEdit, FaTrash, FaExternalLinkAlt } from 'react-icons/fa';

export default function MediaList() {
  const navigate = useNavigate();
  const toast = useToast();
  const { canDelete } = useAuth();
  const { data, isLoading, refetch } = useApiData('/media-coverage/admin/all');
  const [deleteId, setDeleteId] = useState(null);

  async function handleDelete() {
    try {
      await adminApi.delete(`/media-coverage/admin/${deleteId}`);
      toast.success('Deleted');
      setDeleteId(null);
      refetch();
    } catch (e) { toast.error(e.message); }
  }

  const columns = [
    { key: 'source', label: 'Source', sortable: true, render: r => <span className="font-medium">{r.source || r.publication}</span> },
    { key: 'title', label: 'Title', render: r => <span className="line-clamp-1">{r.title}</span> },
    { key: 'date', label: 'Date', sortable: true, render: r => r.date ? new Date(r.date).toLocaleDateString('en-IN') : '—' },
    { key: 'active', label: 'Status', render: r => <StatusBadge status={r.active !== false ? 'active' : 'inactive'} /> },
    {
      key: 'actions', label: '',
      render: r => (
        <div className="flex gap-1.5">
          <button onClick={() => navigate(`/media-coverage/${r._id}`)} className="p-1.5 text-blue-500 hover:text-blue-700"><FaEdit /></button>
          {r.url && <a href={r.url} target="_blank" rel="noopener noreferrer" className="p-1.5 text-gray-400 hover:text-gray-600"><FaExternalLinkAlt /></a>}
          {canDelete && <button onClick={() => setDeleteId(r._id)} className="p-1.5 text-red-400 hover:text-red-600"><FaTrash /></button>}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <ConfirmDialog open={!!deleteId} title="Delete this coverage?" onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Media Coverage</h1>
        <Button variant="primary" icon={FaPlus} onClick={() => navigate('/media-coverage/new')}>Add Coverage</Button>
      </div>
      <DataTable columns={columns} data={data?.data || []} isLoading={isLoading} emptyMessage="No media coverage added." searchKeys={['source', 'publication', 'title']} />
    </div>
  );
}
