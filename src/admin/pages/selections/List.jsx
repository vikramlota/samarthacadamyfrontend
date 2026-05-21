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

export default function SelectionsList() {
  const navigate = useNavigate();
  const toast = useToast();
  const { canDelete } = useAuth();
  const { data, isLoading, refetch } = useApiData('/selections/admin/all');
  const [deleteId, setDeleteId] = useState(null);

  async function handleDelete() {
    try {
      await adminApi.delete(`/selections/admin/${deleteId}`);
      toast.success('Selection deleted');
      setDeleteId(null);
      refetch();
    } catch (e) { toast.error(e.message); }
  }

  const columns = [
    {
      key: 'photo', label: '',
      render: r => r.photo ? <img src={r.photo} alt="" className="w-9 h-9 rounded-full object-cover" /> : <div className="w-9 h-9 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-semibold">{r.name?.[0]}</div>,
    },
    { key: 'name', label: 'Student Name', sortable: true, render: r => <span className="font-medium">{r.name}</span> },
    { key: 'rank', label: 'Rank', render: r => r.rank ? `Rank ${r.rank}` : '—' },
    { key: 'exam', label: 'Exam', render: r => r.exam || r.examName || '—' },
    { key: 'year', label: 'Year', sortable: true },
    { key: 'active', label: 'Status', render: r => <StatusBadge status={r.active !== false ? 'active' : 'inactive'} /> },
    {
      key: 'actions', label: '',
      render: r => (
        <div className="flex gap-1.5">
          <button onClick={() => navigate(`/admin/selections/${r._id}`)} className="p-1.5 text-blue-500 hover:text-blue-700"><FaEdit /></button>
          {canDelete && <button onClick={() => setDeleteId(r._id)} className="p-1.5 text-red-400 hover:text-red-600"><FaTrash /></button>}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <ConfirmDialog open={!!deleteId} title="Delete this selection?" onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Selections</h1>
        <Button variant="primary" icon={FaPlus} onClick={() => navigate('/admin/selections/new')}>Add Selection</Button>
      </div>
      <DataTable columns={columns} data={data?.data || []} isLoading={isLoading} emptyMessage="No selections added yet." searchKeys={['name', 'exam', 'examName']} />
    </div>
  );
}
