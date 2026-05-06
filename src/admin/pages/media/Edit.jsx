import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { adminApi } from '../../lib/api';
import { useToast } from '../../components/Toast';
import { useAuth } from '../../context/AuthContext';
import FormBuilder from '../../components/FormBuilder';
import ImageUpload from '../../components/ImageUpload';
import FormField, { TInput, TTextarea, TToggle } from '../../components/FormField';

const empty = () => ({ source: '', title: '', url: '', date: '', description: '', image: '', active: true, featured: false });

const TABS = [
  {
    id: 'details', label: 'Details',
    render: ({ data: d, update }) => (
      <div className="grid md:grid-cols-2 gap-5">
        <FormField label="Source / Publication" required><TInput value={d.source || d.publication} onChange={v => { update('source', v); update('publication', v); }} required /></FormField>
        <FormField label="Date"><TInput type="date" value={d.date?.slice(0, 10)} onChange={v => update('date', v)} /></FormField>
        <div className="md:col-span-2"><FormField label="Headline / Title" required><TInput value={d.title} onChange={v => update('title', v)} required /></FormField></div>
        <div className="md:col-span-2"><FormField label="Article URL"><TInput type="url" value={d.url} onChange={v => update('url', v)} placeholder="https://" /></FormField></div>
        <div className="md:col-span-2"><FormField label="Description"><TTextarea value={d.description} onChange={v => update('description', v)} rows={3} /></FormField></div>
        <FormField label="Status"><TToggle label="Active" checked={d.active !== false} onChange={v => update('active', v)} /></FormField>
        <FormField label="Featured"><TToggle label="Featured on About page" checked={!!d.featured} onChange={v => update('featured', v)} /></FormField>
      </div>
    ),
  },
  {
    id: 'image', label: 'Image',
    render: ({ data: d, update }) => (
      <ImageUpload label="Article Image / Logo" value={d.image} onChange={v => update('image', v)} />
    ),
  },
];

export default function MediaEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { canDelete } = useAuth();
  const isNew = !id || id === 'new';

  const [data, setData] = useState(empty());
  const [isLoading, setIsLoading] = useState(!isNew);

  useEffect(() => {
    if (isNew) return;
    adminApi.get(`/media-coverage/admin/${id}`).then(res => { setData(res.data); setIsLoading(false); }).catch(() => setIsLoading(false));
  }, [id]);

  async function handleSave(d) {
    const res = isNew
      ? await adminApi.post('/media-coverage/admin', d)
      : await adminApi.put(`/media-coverage/admin/${id}`, d);
    toast.success(isNew ? 'Created!' : 'Saved!');
    if (isNew) navigate(`/media-coverage/${res.data._id}`, { replace: true });
  }

  async function handleDelete() {
    await adminApi.delete(`/media-coverage/admin/${id}`);
    toast.success('Deleted');
    navigate('/media-coverage');
  }

  return (
    <FormBuilder
      title={isNew ? 'Add Coverage' : `Edit: ${data.source || '…'}`}
      tabs={TABS}
      data={data}
      onChange={setData}
      onSubmit={handleSave}
      onDelete={!isNew && canDelete ? handleDelete : undefined}
      isLoading={isLoading}
      backUrl="/media-coverage"
    />
  );
}
