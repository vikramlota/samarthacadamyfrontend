import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { adminApi } from '../../lib/api';
import { useToast } from '../../components/Toast';
import { useAuth } from '../../context/AuthContext';
import FormBuilder from '../../components/FormBuilder';
import ImageUpload from '../../components/ImageUpload';
import FieldArray from '../../components/FieldArray';
import FormField, { TInput, TTextarea, TToggle, TSelect } from '../../components/FormField';

const empty = () => ({
  name: '', exam: '', mode: 'Offline', startDate: '', duration: '', fee: '',
  seatsTotal: '', seatsAvailable: '', schedule: '', highlights: [], active: true,
  image: '', description: '',
});

const TABS = [
  {
    id: 'details', label: 'Details',
    render: ({ data: d, update }) => (
      <div className="grid md:grid-cols-2 gap-5">
        <FormField label="Batch Name" required><TInput value={d.name || d.batchName} onChange={v => { update('name', v); update('batchName', v); }} required /></FormField>
        <FormField label="Exam"><TInput value={d.exam || d.examName} onChange={v => { update('exam', v); update('examName', v); }} placeholder="UPSC" /></FormField>
        <FormField label="Mode"><TSelect value={d.mode} onChange={v => update('mode', v)} options={['Offline', 'Online', 'Hybrid']} /></FormField>
        <FormField label="Start Date"><TInput type="date" value={d.startDate?.slice(0, 10)} onChange={v => update('startDate', v)} /></FormField>
        <FormField label="Duration"><TInput value={d.duration} onChange={v => update('duration', v)} placeholder="12 Months" /></FormField>
        <FormField label="Fee"><TInput value={d.fee} onChange={v => update('fee', v)} placeholder="₹45,000" /></FormField>
        <FormField label="Total Seats"><TInput type="number" value={d.seatsTotal} onChange={v => update('seatsTotal', v)} /></FormField>
        <FormField label="Available Seats"><TInput type="number" value={d.seatsAvailable} onChange={v => update('seatsAvailable', v)} /></FormField>
        <div className="md:col-span-2"><FormField label="Schedule / Timing"><TTextarea value={d.schedule} onChange={v => update('schedule', v)} rows={2} /></FormField></div>
        <div className="md:col-span-2"><FormField label="Description"><TTextarea value={d.description} onChange={v => update('description', v)} rows={3} /></FormField></div>
        <FormField label="Status"><TToggle label="Active" checked={d.active !== false} onChange={v => update('active', v)} /></FormField>
      </div>
    ),
  },
  {
    id: 'highlights', label: 'Highlights',
    render: ({ data: d, update }) => (
      <FieldArray
        label="Highlights"
        value={d.highlights || []}
        onChange={v => update('highlights', v)}
        itemSchema={[{ name: 'text', type: 'text', label: 'Highlight', required: true }]}
        emptyItem={{ text: '' }}
      />
    ),
  },
  {
    id: 'image', label: 'Image',
    render: ({ data: d, update }) => (
      <ImageUpload label="Batch Image" value={d.image} onChange={v => update('image', v)} />
    ),
  },
];

export default function BatchEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { canDelete } = useAuth();
  const isNew = !id || id === 'new';

  const [data, setData] = useState(empty());
  const [isLoading, setIsLoading] = useState(!isNew);

  useEffect(() => {
    if (isNew) return;
    adminApi.get(`/batches/admin/${id}`).then(res => { setData(res.data); setIsLoading(false); }).catch(() => setIsLoading(false));
  }, [id]);

  async function handleSave(d) {
    const res = isNew
      ? await adminApi.post('/batches/admin', d)
      : await adminApi.put(`/batches/admin/${id}`, d);
    toast.success(isNew ? 'Batch created!' : 'Saved!');
    if (isNew) navigate(`/batches/${res.data._id}`, { replace: true });
  }

  async function handleDelete() {
    await adminApi.delete(`/batches/admin/${id}`);
    toast.success('Deleted');
    navigate('/batches');
  }

  return (
    <FormBuilder
      title={isNew ? 'New Batch' : `Edit: ${data.name || data.batchName || '…'}`}
      tabs={TABS}
      data={data}
      onChange={setData}
      onSubmit={handleSave}
      onDelete={!isNew && canDelete ? handleDelete : undefined}
      isLoading={isLoading}
      backUrl="/batches"
    />
  );
}
