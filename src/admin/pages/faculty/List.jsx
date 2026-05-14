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

export default function FacultyList() {
  const navigate = useNavigate();
  const toast = useToast();
  const { canDelete } = useAuth();
  const { data, isLoading, refetch } = useApiData('/faculty/admin/all');
  const [deleteId, setDeleteId] = useState(null);

  async function handleDelete() {
    try {
      await adminApi.delete(`/faculty/admin/${deleteId}`);
      toast.success('Faculty deleted');
      setDeleteId(null);
      refetch();
    } catch (e) { toast.error(e.message); }
  }

  const columns = [
    {
      key: 'photo', label: '',
      render: r => r.photo ? <img src={r.photo} alt="" className="w-9 h-9 rounded-full object-cover" /> : <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">{r.name?.[0]}</div>,
    },
    { key: 'name', label: 'Name', sortable: true, render: r => <span className="font-medium">{r.name}</span> },
    { key: 'subjects', label: 'Subjects', render: r => r.subjects?.length ? r.subjects.join(', ') : '—' },
    { key: 'designation', label: 'Designation' },
    { key: 'active', label: 'Status', render: r => <StatusBadge status={r.active !== false ? 'active' : 'inactive'} /> },
    { key: 'featured', label: 'Featured', render: r => r.featured ? <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-medium">Featured</span> : '—' },
    {
      key: 'actions', label: '',
      render: r => (
        <div className="flex gap-1.5">
          <button onClick={() => navigate(`/faculty/${r._id}`)} className="p-1.5 text-blue-500 hover:text-blue-700"><FaEdit /></button>
          {canDelete && <button onClick={() => setDeleteId(r._id)} className="p-1.5 text-red-400 hover:text-red-600"><FaTrash /></button>}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <ConfirmDialog open={!!deleteId} title="Delete faculty member?" onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Faculty</h1>
        <Button variant="primary" icon={FaPlus} onClick={() => navigate('/faculty/new')}>Add Faculty</Button>
      </div>
      <DataTable columns={columns} data={data?.data || []} isLoading={isLoading} emptyMessage="No faculty added yet." searchKeys={['name', 'subjects', 'designation']} />
    </div>
  );
}
