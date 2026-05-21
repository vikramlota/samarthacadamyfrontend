import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { adminApi } from '../../lib/api';
import { useToast } from '../../components/Toast';
import { useAuth } from '../../context/AuthContext';
import FormBuilder from '../../components/FormBuilder';
import FormField, { TInput, TToggle, TSelect } from '../../components/FormField';

const empty = () => ({
  courseSlug: '', name: '', mode: 'classroom', startDate: '', endDate: '', timing: '',
  faculty: '', totalSeats: '', seatsAvailable: '', active: true, featured: false,
});

const TABS = [
  {
    id: 'details', label: 'Batch Details',
    render: ({ data: d, update }) => (
      <div className="grid md:grid-cols-2 gap-5">
        <FormField label="Batch Name" required><TInput value={d.name} onChange={v => update('name', v)} required placeholder="e.g. Target SSC 2026" /></FormField>
        <FormField label="Course Slug" required hint="Must match an existing Landing Page slug"><TInput value={d.courseSlug} onChange={v => update('courseSlug', v)} placeholder="e.g. ssc-coaching" required /></FormField>
        
        <FormField label="Mode"><TSelect value={d.mode} onChange={v => update('mode', v)} options={[{value: 'classroom', label: 'Classroom'}, {value: 'online', label: 'Online'}, {value: 'hybrid', label: 'Hybrid'}]} /></FormField>
        <FormField label="Faculty" required><TInput value={d.faculty} onChange={v => update('faculty', v)} placeholder="e.g. Rajinder Sir & Team" required /></FormField>
        
        <FormField label="Start Date" required><TInput type="date" value={d.startDate?.slice(0, 10)} onChange={v => update('startDate', v)} required /></FormField>
        <FormField label="End Date (Estimated)"><TInput type="date" value={d.endDate?.slice(0, 10)} onChange={v => update('endDate', v)} /></FormField>
        
        <div className="md:col-span-2"><FormField label="Timing / Schedule" required><TInput value={d.timing} onChange={v => update('timing', v)} placeholder="e.g. Mon-Fri, 9:00 AM - 1:00 PM" required /></FormField></div>
        
        <FormField label="Total Seats" required><TInput type="number" value={d.totalSeats} onChange={v => update('totalSeats', Number(v))} required /></FormField>
        <FormField label="Available Seats" required><TInput type="number" value={d.seatsAvailable} onChange={v => update('seatsAvailable', Number(v))} required /></FormField>
        
        <FormField label="Status"><TToggle label="Active (visible)" checked={d.active !== false} onChange={v => update('active', v)} /></FormField>
        <FormField label="Featured"><TToggle label="Featured Badge" checked={!!d.featured} onChange={v => update('featured', v)} /></FormField>
      </div>
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
    adminApi.get(`/batches/admin/${id}`)
      .then(res => { setData(res.data?.data || res.data); setIsLoading(false); })
      .catch(() => setIsLoading(false));
  }, [id, isNew]);

  async function handleSave(d) {
    try {
      const res = isNew
        ? await adminApi.post('/batches/admin', d)
        : await adminApi.put(`/batches/admin/${id}`, d);
      toast.success(isNew ? 'Batch created!' : 'Saved!');
      if (isNew) navigate(`/admin/batches/${res.data?.data?._id || res.data?._id}`, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.error || err.message);
    }
  }

  async function handleDelete() {
    try {
      await adminApi.delete(`/batches/admin/${id}`);
      toast.success('Deleted');
      navigate('/admin/batches');
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <FormBuilder
      title={isNew ? 'New Batch' : `Edit: ${data.name || '…'}`}
      tabs={TABS}
      data={data}
      onChange={setData}
      onSubmit={handleSave}
      onDelete={!isNew && canDelete ? handleDelete : undefined}
      isLoading={isLoading}
      backUrl="/admin/batches"
    />
  );
}
