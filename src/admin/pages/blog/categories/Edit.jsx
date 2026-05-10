import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { adminApi } from '../../../lib/api';
import { useToast } from '../../../components/Toast';
import { useAuth } from '../../../context/AuthContext';
import FormBuilder from '../../../components/FormBuilder';
import ColorPicker from '../../../components/ColorPicker';
import FormField, { TInput, TTextarea } from '../../../components/FormField';

const empty = () => ({ name: '', slug: '', description: '', color: 'red' });

const TABS = [
  {
    id: 'details', label: 'Details',
    render: ({ data: d, update }) => (
      <div className="space-y-5">
        <FormField label="Category Name" required>
          <TInput
            value={d.name}
            onChange={v => {
              update('name', v);
              if (!d.slug) update('slug', v.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
            }}
            required
          />
        </FormField>
        <FormField label="Slug">
          <TInput value={d.slug} onChange={v => update('slug', v.toLowerCase().replace(/[^a-z0-9-]+/g, ''))} />
        </FormField>
        <FormField label="Description">
          <TTextarea value={d.description} onChange={v => update('description', v)} rows={3} />
        </FormField>
        <ColorPicker label="Category Colour" value={d.color} onChange={v => update('color', v)} />
      </div>
    ),
  },
];

export default function CategoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { canDelete } = useAuth();
  const isNew = !id || id === 'new';

  const [data, setData] = useState(empty());
  const [isLoading, setIsLoading] = useState(!isNew);

  useEffect(() => {
    if (isNew) return;
    adminApi.get(`/blog/categories/admin/${id}`).then(res => { setData(res.data); setIsLoading(false); }).catch(() => setIsLoading(false));
  }, [id]);

  async function handleSave(d) {
    const res = isNew
      ? await adminApi.post('/blog/categories/admin', d)
      : await adminApi.put(`/blog/categories/admin/${id}`, d);
    toast.success(isNew ? 'Category created!' : 'Saved!');
    if (isNew) navigate(`/blog/categories/${res.data._id}`, { replace: true });
  }

  async function handleDelete() {
    await adminApi.delete(`/blog/categories/admin/${id}`);
    toast.success('Deleted');
    navigate('/blog/categories');
  }

  return (
    <FormBuilder
      title={isNew ? 'New Category' : `Edit: ${data.name || '…'}`}
      tabs={TABS}
      data={data}
      onChange={setData}
      onSubmit={handleSave}
      onDelete={!isNew && canDelete ? handleDelete : undefined}
      isLoading={isLoading}
      backUrl="/blog/categories"
    />
  );
}
