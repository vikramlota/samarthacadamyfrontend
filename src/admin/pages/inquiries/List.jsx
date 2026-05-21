import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../../lib/api';
import { useApiData } from '../../hooks/useApiData';
import { useToast } from '../../components/Toast';
import { useAuth } from '../../context/AuthContext';
import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';
import { FaTrash, FaEye, FaWhatsapp } from 'react-icons/fa';
import ConfirmDialog from '../../components/ConfirmDialog';

const STATUSES = ['new', 'contacted', 'converted', 'spam'];

export default function InquiriesList() {
  const navigate = useNavigate();
  const toast = useToast();
  const { canDelete } = useAuth();
  const { data, isLoading, refetch } = useApiData('/inquiries/admin/all');
  const [filterStatus, setFilterStatus] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  const rows = (data?.data || []).filter(r => !filterStatus || r.status === filterStatus);

  async function quickStatus(id, status) {
    try {
      await adminApi.patch(`/inquiries/admin/${id}`, { status });
      toast.success('Status updated');
      refetch();
    } catch (e) {
      toast.error(e.message);
    }
  }

  async function handleDelete() {
    try {
      await adminApi.delete(`/inquiries/admin/${deleteId}`);
      toast.success('Inquiry deleted');
      setDeleteId(null);
      refetch();
    } catch (e) {
      toast.error(e.message);
    }
  }

  const columns = [
    {
      key: 'name', label: 'Name', sortable: true,
      render: r => <span className="font-medium text-gray-900">{r.name}</span>,
    },
    { key: 'phone', label: 'Phone', render: r => r.phone || '—' },
    { key: 'inquiryType', label: 'Type', render: r => r.inquiryType || '—' },
    { key: 'source', label: 'Source', render: r => r.source || '—' },
    {
      key: 'status', label: 'Status',
      render: r => (
        <select
          value={r.status}
          onClick={e => e.stopPropagation()}
          onChange={e => quickStatus(r._id, e.target.value)}
          className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-red-300"
        >
          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      ),
    },
    {
      key: 'createdAt', label: 'Date', sortable: true,
      render: r => new Date(r.createdAt).toLocaleDateString('en-IN'),
    },
    {
      key: 'actions', label: '',
      render: r => (
        <div className="flex gap-2">
          <button onClick={() => navigate(`/admin/inquiries/${r._id}`)} className="p-1.5 text-blue-500 hover:text-blue-700" title="View">
            <FaEye />
          </button>
          {r.phone && (
            <a
              href={`https://wa.me/91${r.phone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-green-500 hover:text-green-700"
              title="WhatsApp"
              onClick={e => e.stopPropagation()}
            >
              <FaWhatsapp />
            </a>
          )}
          {canDelete && (
            <button onClick={() => setDeleteId(r._id)} className="p-1.5 text-red-400 hover:text-red-600" title="Delete">
              <FaTrash />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <ConfirmDialog
        open={!!deleteId}
        title="Delete inquiry?"
        message="This cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-gray-900">Inquiries</h1>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Filter:</label>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-100"
          >
            <option value="">All statuses</option>
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={rows}
        isLoading={isLoading}
        emptyMessage="No inquiries found."
        searchKeys={['name', 'phone', 'inquiryType', 'source']}
      />
    </div>
  );
}
