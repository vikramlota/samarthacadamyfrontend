import { useState, useEffect } from 'react';
import { adminApi } from '../../lib/api';
import { useToast } from '../../components/Toast';
import DataTable from '../../components/DataTable';
import ConfirmDialog from '../../components/ConfirmDialog';
import { FaTrash, FaWhatsapp, FaPhone } from 'react-icons/fa';

const STATUS_CYCLE = { Pending: 'Contacted', Contacted: 'Resolved', Resolved: 'Pending' };

const STATUS_STYLES = {
  Pending:   'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
  Contacted: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
  Resolved:  'bg-green-100 text-green-700 hover:bg-green-200',
};

export default function DemoRequestsList() {
  const toast = useToast();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    adminApi.get('/demo-requests')
      .then(res => setData(Array.isArray(res) ? res : (res?.data || [])))
      .catch(e => toast.error(e.message))
      .finally(() => setIsLoading(false));
  }, [toast]);

  async function cycleStatus(row) {
    const next = STATUS_CYCLE[row.status] || 'Contacted';
    try {
      const res = await adminApi.put(`/demo-requests/${row._id}`, { status: next });
      const updated = res?.data || res;
      setData(prev => prev.map(r => r._id === row._id ? { ...r, status: updated.status || next } : r));
    } catch (e) {
      toast.error(e.message);
    }
  }

  async function handleDelete() {
    try {
      await adminApi.delete(`/demo-requests/${deleteId}`);
      toast.success('Request deleted');
      setData(prev => prev.filter(r => r._id !== deleteId));
      setDeleteId(null);
    } catch (e) {
      toast.error(e.message);
    }
  }

  const columns = [
    {
      key: 'createdAt',
      label: 'Date',
      sortable: true,
      render: r => {
        const d = r.createdAt || r.date;
        return d
          ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
          : '—';
      },
    },
    {
      key: 'name',
      label: 'Name / Email',
      sortable: true,
      render: r => (
        <div>
          <p className="font-medium text-gray-900">{r.name || r.studentName || '—'}</p>
          <p className="text-xs text-gray-400">{r.email || ''}</p>
        </div>
      ),
    },
    {
      key: 'phone',
      label: 'Phone',
      render: r => r.phone
        ? (
          <a
            href={`tel:${r.phone}`}
            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
          >
            <FaPhone className="text-xs" />
            {r.phone}
          </a>
        )
        : '—',
    },
    {
      key: 'whatsapp',
      label: 'WhatsApp',
      render: r => {
        const num = r.whatsapp || r.phone;
        if (!num) return '—';
        const clean = num.replace(/\D/g, '');
        return (
          <a
            href={`https://wa.me/${clean}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-green-600 hover:text-green-800 text-sm"
          >
            <FaWhatsapp className="text-base" />
            Chat
          </a>
        );
      },
    },
    {
      key: 'course',
      label: 'Course',
      render: r => <span className="text-sm text-gray-700">{r.course || r.courseName || '—'}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: r => {
        const status = r.status || 'Pending';
        const cls = STATUS_STYLES[status] || STATUS_STYLES.Pending;
        return (
          <button
            onClick={() => cycleStatus(r)}
            className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full transition-colors cursor-pointer ${cls}`}
            title={`Click to advance to ${STATUS_CYCLE[status] || 'Contacted'}`}
          >
            {status}
          </button>
        );
      },
    },
    {
      key: 'actions',
      label: '',
      render: r => (
        <button
          onClick={() => setDeleteId(r._id)}
          className="p-1.5 text-red-400 hover:text-red-600"
          title="Delete"
        >
          <FaTrash />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <ConfirmDialog
        open={!!deleteId}
        title="Delete this demo request?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Demo Requests</h1>
        <span className="text-sm text-gray-400">
          {data.length} total request{data.length !== 1 ? 's' : ''}
        </span>
      </div>
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        emptyMessage="No demo requests yet."
        searchKeys={['name', 'studentName', 'email', 'phone', 'course', 'courseName', 'status']}
      />
    </div>
  );
}
