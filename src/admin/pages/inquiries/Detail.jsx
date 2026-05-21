import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { adminApi } from '../../lib/api';
import { useApiData } from '../../hooks/useApiData';
import { useToast } from '../../components/Toast';
import { useAuth } from '../../context/AuthContext';
import StatusBadge from '../../components/StatusBadge';
import ConfirmDialog from '../../components/ConfirmDialog';
import { Button } from '@/components/ui/Button';
import { FaArrowLeft, FaWhatsapp, FaTrash } from 'react-icons/fa';

const STATUSES = ['new', 'contacted', 'converted', 'spam'];

function Field({ label, value }) {
  return value ? (
    <div>
      <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
      <p className="text-sm text-gray-800 mt-0.5">{value}</p>
    </div>
  ) : null;
}

export default function InquiryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { canDelete } = useAuth();

  const { data, refetch } = useApiData(`/inquiries/admin/${id}`);
  const inquiry = data?.data;

  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');
  const [savingNote, setSavingNote] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const currentStatus = status || inquiry?.status || 'new';

  async function saveStatus(s) {
    setStatus(s);
    try {
      await adminApi.patch(`/inquiries/admin/${id}`, { status: s });
      toast.success('Status updated');
      refetch();
    } catch (e) {
      toast.error(e.message);
    }
  }

  async function addNote(e) {
    e.preventDefault();
    if (!note.trim()) return;
    setSavingNote(true);
    try {
      await adminApi.post(`/inquiries/admin/${id}/notes`, { text: note });
      toast.success('Note added');
      setNote('');
      refetch();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSavingNote(false);
    }
  }

  async function handleDelete() {
    try {
      await adminApi.delete(`/inquiries/admin/${id}`);
      toast.success('Deleted');
      navigate('/admin/inquiries');
    } catch (e) {
      toast.error(e.message);
    }
  }

  if (!inquiry) {
    return <div className="animate-pulse space-y-3"><div className="h-8 bg-gray-200 rounded w-48" /><div className="h-48 bg-gray-100 rounded-xl" /></div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <ConfirmDialog open={showDelete} title="Delete this inquiry?" onConfirm={handleDelete} onCancel={() => setShowDelete(false)} />

      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/admin/inquiries')} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
          <FaArrowLeft />
        </button>
        <h1 className="text-xl font-bold text-gray-900 flex-1">{inquiry.name}</h1>
        {inquiry.phone && (
          <a
            href={`https://wa.me/91${inquiry.phone.replace(/\D/g, '')}?text=Hi ${encodeURIComponent(inquiry.name)}, this is regarding your inquiry at Samarth Academy.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 text-white px-3 py-2 rounded-xl text-sm font-medium hover:bg-green-600"
          >
            <FaWhatsapp /> WhatsApp
          </a>
        )}
        {canDelete && (
          <Button variant="ghost" icon={FaTrash} onClick={() => setShowDelete(true)} className="text-red-500 hover:bg-red-50">
            Delete
          </Button>
        )}
      </div>

      {/* Details */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 grid grid-cols-2 gap-5">
        <Field label="Phone" value={inquiry.phone} />
        <Field label="Email" value={inquiry.email} />
        <Field label="Inquiry Type" value={inquiry.inquiryType} />
        <Field label="Source" value={inquiry.source} />
        <Field label="Exam / Course" value={inquiry.examName || inquiry.course} />
        <Field label="City" value={inquiry.city} />
        <Field label="Submitted" value={new Date(inquiry.createdAt).toLocaleString('en-IN')} />
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Status</p>
          <select
            value={currentStatus}
            onChange={e => saveStatus(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-100"
          >
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        {inquiry.message && (
          <div className="col-span-2">
            <p className="text-xs text-gray-400 uppercase tracking-wide">Message</p>
            <p className="text-sm text-gray-700 mt-0.5 whitespace-pre-wrap">{inquiry.message}</p>
          </div>
        )}
      </div>

      {/* Notes */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
        <h3 className="font-semibold text-gray-900">Notes</h3>

        {(inquiry.notes || []).length === 0 ? (
          <p className="text-sm text-gray-400">No notes yet.</p>
        ) : (
          <div className="space-y-3">
            {inquiry.notes.map((n, i) => (
              <div key={i} className="border-l-2 border-red-200 pl-3">
                <p className="text-sm text-gray-700">{n.text}</p>
                <p className="text-xs text-gray-400 mt-0.5">{new Date(n.createdAt || n.date).toLocaleString('en-IN')}</p>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={addNote} className="flex gap-2">
          <input
            type="text"
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Add a note…"
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400"
          />
          <Button type="submit" variant="primary" size="sm" loading={savingNote}>Add</Button>
        </form>
      </div>
    </div>
  );
}
