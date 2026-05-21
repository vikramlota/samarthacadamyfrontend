import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { adminApi } from '../../lib/api';
import { useToast } from '../../components/Toast';
import { useAuth } from '../../context/AuthContext';
import FormBuilder from '../../components/FormBuilder';
import ImageUpload from '../../components/ImageUpload';
import FormField, { TInput, TTextarea, TToggle } from '../../components/FormField';

const empty = () => ({ outletName: '', outletLogo: '', articleTitle: '', articleUrl: '', publishedDate: '', excerpt: '', thumbnailImage: '', active: true, featured: false, displayOrder: 0 });

const TABS = [
  {
    id: 'details', label: 'Details',
    render: ({ data: d, update }) => (
      <div className="grid md:grid-cols-2 gap-5">
        <FormField label="Outlet Name (Source)" required><TInput value={d.outletName} onChange={v => update('outletName', v)} required placeholder="e.g. The Times of India" /></FormField>
        <FormField label="Published Date" required><TInput type="date" value={d.publishedDate?.slice(0, 10)} onChange={v => update('publishedDate', v)} required /></FormField>
        <div className="md:col-span-2"><FormField label="Article Title / Headline" required><TInput value={d.articleTitle} onChange={v => update('articleTitle', v)} required /></FormField></div>
        <div className="md:col-span-2"><FormField label="Article URL" required><TInput type="url" value={d.articleUrl} onChange={v => update('articleUrl', v)} placeholder="https://" required /></FormField></div>
        <div className="md:col-span-2"><FormField label="Excerpt / Description"><TTextarea value={d.excerpt} onChange={v => update('excerpt', v)} rows={3} /></FormField></div>
        
        <FormField label="Status"><TToggle label="Active (visible)" checked={d.active !== false} onChange={v => update('active', v)} /></FormField>
        <FormField label="Featured"><TToggle label="Featured on Home/About" checked={!!d.featured} onChange={v => update('featured', v)} /></FormField>
        <FormField label="Display Order"><TInput type="number" value={d.displayOrder} onChange={v => update('displayOrder', Number(v))} /></FormField>
      </div>
    ),
  },
  {
    id: 'images', label: 'Images',
    render: ({ data: d, update }) => (
      <div className="space-y-5">
        <ImageUpload label="Thumbnail Image" value={d.thumbnailImage} onChange={v => update('thumbnailImage', v)} />
        <ImageUpload label="Outlet Logo (Optional)" value={d.outletLogo} onChange={v => update('outletLogo', v)} />
      </div>
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
    adminApi.get(`/media-coverage/admin/${id}`).then(res => { setData(res.data?.data || res.data); setIsLoading(false); }).catch(() => setIsLoading(false));
  }, [id, isNew]);

  async function handleSave(d) {
    try {
      const res = isNew
        ? await adminApi.post('/media-coverage/admin', d)
        : await adminApi.put(`/media-coverage/admin/${id}`, d);
      toast.success(isNew ? 'Created!' : 'Saved!');
      if (isNew) navigate(`/admin/media-coverage/${res.data?.data?._id || res.data?._id}`, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.error || err.message);
    }
  }

  async function handleDelete() {
    try {
      await adminApi.delete(`/media-coverage/admin/${id}`);
      toast.success('Deleted');
      navigate('/admin/media-coverage');
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <FormBuilder
      title={isNew ? 'Add Media Coverage' : `Edit: ${data.outletName || '…'}`}
      tabs={TABS}
      data={data}
      onChange={setData}
      onSubmit={handleSave}
      onDelete={!isNew && canDelete ? handleDelete : undefined}
      isLoading={isLoading}
      backUrl="/admin/media-coverage"
    />
  );
}
