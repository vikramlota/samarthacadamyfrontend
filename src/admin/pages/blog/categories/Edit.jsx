import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { adminApi } from '../../../lib/api';
import { useToast } from '../../../components/Toast';
import { useAuth } from '../../../context/AuthContext';
import FormBuilder from '../../../components/FormBuilder';
import ColorPicker from '../../../components/ColorPicker';
import FormField, { TInput, TTextarea } from '../../../components/FormField';

const empty = () => ({
  name: '',
  slug: '',
  description: '',
  color: 'red',
});

// 🔥 normalize ANY garbage → valid enum
const normalizeColor = (c) => {
  if (!c) return 'red';

  const HEX_TO_NAME = {
    '#ef4444': 'red',
    '#f97316': 'orange',
    '#6b7280': 'gray',
    '#22c55e': 'green',
    '#3b82f6': 'blue',
  };

  const cleaned = String(c).toLowerCase().trim();

  // if hex → convert
  if (HEX_TO_NAME[cleaned]) return HEX_TO_NAME[cleaned];

  // if already valid → return
  const allowed = ['red', 'orange', 'gray', 'green', 'blue'];
  if (allowed.includes(cleaned)) return cleaned;

  return 'red'; // fallback
};

const TABS = [
  {
    id: 'details',
    label: 'Details',
    render: ({ data: d, update }) => {
      const safeColor = normalizeColor(d.color); // 👈 FORCE before render

      return (
        <div className="space-y-5">
          <FormField label="Category Name" required>
            <TInput
              value={d.name}
              onChange={(v) => {
                update('name', v);
                if (!d.slug) {
                  update(
                    'slug',
                    v
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, '-')
                      .replace(/(^-|-$)/g, '')
                  );
                }
              }}
              required
            />
          </FormField>

          <FormField label="Slug">
            <TInput
              value={d.slug}
              onChange={(v) =>
                update('slug', v.toLowerCase().replace(/[^a-z0-9-]+/g, ''))
              }
            />
          </FormField>

          <FormField label="Description">
            <TTextarea
              value={d.description}
              onChange={(v) => update('description', v)}
              rows={3}
            />
          </FormField>
          <p className="text-sm text-gray-500">
  Color: {JSON.stringify(d.color)}
</p>    
          {/* 🎯 Color Picker */}
          <ColorPicker
            label="Category Colour"
            value={safeColor} // 👈 ALWAYS VALID
            onChange={(v) => update('color', v)}
          />
            
          {/* 🧪 DEBUG (remove later) */}
          {/* <pre>{JSON.stringify(d, null, 2)}</pre> */}
        </div>
      );
    },
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

    adminApi
      .get(`/blog/categories/admin/${id}`)
      .then((res) => {
        const incoming = res.data;

        setData({
          ...incoming,
          color: normalizeColor(incoming.color), // 👈 normalize ON LOAD
        });

        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [id]);

  async function handleSave(d) {
    const payload = {
      ...d,
      color: normalizeColor(d.color), // 👈 normalize BEFORE SAVE
    };

    const res = isNew
      ? await adminApi.post('/blog/categories/admin', payload)
      : await adminApi.put(`/blog/categories/admin/${id}`, payload);

    toast.success(isNew ? 'Category created!' : 'Saved!');

    if (isNew) {
      navigate(`/admin/blog/categories/${res.data._id}`, { replace: true });
    }
  }

  async function handleDelete() {
    await adminApi.delete(`/blog/categories/admin/${id}`);
    toast.success('Deleted');
    navigate('/admin/blog/categories');
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
      backUrl="/admin/blog/categories"
      
    />
  );
}