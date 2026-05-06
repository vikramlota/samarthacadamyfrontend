import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { adminApi } from '../../lib/api';
import { useToast } from '../../components/Toast';
import { useAuth } from '../../context/AuthContext';
import FormBuilder from '../../components/FormBuilder';
import ImageUpload from '../../components/ImageUpload';
import FormField, { TInput, TTextarea, TToggle } from '../../components/FormField';

const empty = () => ({
  name: '', exam: '', rank: '', year: new Date().getFullYear(), batch: '',
  testimonial: '', photo: '', active: true, featured: false,
});

const TABS = [
  {
    id: 'details', label: 'Details',
    render: ({ data: d, update }) => (
      <div className="grid md:grid-cols-2 gap-5">
        <FormField label="Student Name" required><TInput value={d.name} onChange={v => update('name', v)} required /></FormField>
        <FormField label="Exam"><TInput value={d.exam || d.examName} onChange={v => { update('exam', v); update('examName', v); }} placeholder="UPSC CSE" /></FormField>
        <FormField label="Rank / Score"><TInput value={d.rank} onChange={v => update('rank', v)} placeholder="AIR 42" /></FormField>
        <FormField label="Year"><TInput type="number" value={d.year} onChange={v => update('year', v)} /></FormField>
        <FormField label="Batch"><TInput value={d.batch} onChange={v => update('batch', v)} placeholder="2023 Batch" /></FormField>
        <div className="space-y-3">
          <FormField label="Status"><TToggle label="Active" checked={d.active !== false} onChange={v => update('active', v)} /></FormField>
          <TToggle label="Featured on homepage" checked={!!d.featured} onChange={v => update('featured', v)} />
        </div>
        <div className="md:col-span-2">
          <FormField label="Testimonial / Quote"><TTextarea value={d.testimonial} onChange={v => update('testimonial', v)} rows={3} /></FormField>
        </div>
      </div>
    ),
  },
  {
    id: 'photo', label: 'Photo',
    render: ({ data: d, update }) => (
      <ImageUpload label="Student Photo" value={d.photo} onChange={v => update('photo', v)} />
    ),
  },
];

export default function SelectionEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { canDelete } = useAuth();
  const isNew = !id || id === 'new';

  const [data, setData] = useState(empty());
  const [isLoading, setIsLoading] = useState(!isNew);

  useEffect(() => {
    if (isNew) return;
    adminApi.get(`/selections/admin/${id}`).then(res => { setData(res.data); setIsLoading(false); }).catch(() => setIsLoading(false));
  }, [id]);

  async function handleSave(d) {
    const res = isNew
      ? await adminApi.post('/selections/admin', d)
      : await adminApi.put(`/selections/admin/${id}`, d);
    toast.success(isNew ? 'Created!' : 'Saved!');
    if (isNew) navigate(`/selections/${res.data._id}`, { replace: true });
  }

  async function handleDelete() {
    await adminApi.delete(`/selections/admin/${id}`);
    toast.success('Deleted');
    navigate('/selections');
  }

  return (
    <FormBuilder
      title={isNew ? 'Add Selection' : `Edit: ${data.name || '…'}`}
      tabs={TABS}
      data={data}
      onChange={setData}
      onSubmit={handleSave}
      onDelete={!isNew && canDelete ? handleDelete : undefined}
      isLoading={isLoading}
      backUrl="/selections"
    />
  );
}
