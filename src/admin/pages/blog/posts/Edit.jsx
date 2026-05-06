import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { adminApi } from '../../../lib/api';
import { useToast } from '../../../components/Toast';
import { useAuth } from '../../../context/AuthContext';
import { useApiData } from '../../../hooks/useApiData';
import FormBuilder from '../../../components/FormBuilder';
import ImageUpload from '../../../components/ImageUpload';
import JoditEditor from '../../../components/JoditEditor';
import MultiSelect from '../../../components/MultiSelect';
import FormField, { TInput, TTextarea, TToggle, TSelect, TagInput } from '../../../components/FormField';

const empty = () => ({
  title: '', slug: '', excerpt: '', content: '', coverImage: '', coverImageAlt: '',
  categories: [], tags: [], status: 'draft', featured: false,
  seo: { title: '', description: '', keywords: [] },
  readingTime: 0,
});

export default function BlogPostEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { canDelete } = useAuth();
  const isNew = !id || id === 'new';

  const [data, setData] = useState(empty());
  const [isLoading, setIsLoading] = useState(!isNew);
  const { data: catData } = useApiData('/blog/categories');

  const categories = catData?.data || [];

  useEffect(() => {
    if (isNew) return;
    adminApi.get(`/blog/posts/admin/${id}`).then(res => { setData(res.data); setIsLoading(false); }).catch(() => setIsLoading(false));
  }, [id]);

  async function handleSave(d) {
    const res = isNew
      ? await adminApi.post('/blog/posts/admin', d)
      : await adminApi.put(`/blog/posts/admin/${id}`, d);
    toast.success(isNew ? 'Post created!' : 'Saved!');
    if (isNew) navigate(`/blog/posts/${res.data._id}`, { replace: true });
  }

  async function handleDelete() {
    await adminApi.delete(`/blog/posts/admin/${id}`);
    toast.success('Deleted');
    navigate('/blog/posts');
  }

  const TABS = [
    {
      id: 'basic', label: 'Basic',
      render: ({ data: d, update }) => (
        <div className="space-y-5">
          <FormField label="Title" required><TInput value={d.title} onChange={v => { update('title', v); if (!d.slug || d.slug === d.title?.toLowerCase().replace(/\s+/g,'-')) update('slug', v.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')); }} required /></FormField>
          <FormField label="Slug"><TInput value={d.slug} onChange={v => update('slug', v.toLowerCase().replace(/[^a-z0-9-]+/g,''))} /></FormField>
          <FormField label="Excerpt / Summary" hint="150–200 chars"><TTextarea value={d.excerpt} onChange={v => update('excerpt', v)} rows={3} /></FormField>
          <div className="grid md:grid-cols-3 gap-5">
            <FormField label="Status">
              <TSelect value={d.status} onChange={v => update('status', v)} options={['draft', 'published', 'archived']} />
            </FormField>
            <FormField label="Categories">
              <MultiSelect
                options={categories}
                value={d.categories || []}
                onChange={v => update('categories', v)}
                getLabel={o => o.name ?? o}
                getValue={o => o._id ?? o}
                placeholder="Select categories"
              />
            </FormField>
            <div className="space-y-3 pt-6">
              <TToggle label="Featured post" checked={!!d.featured} onChange={v => update('featured', v)} />
            </div>
          </div>
          <FormField label="Tags"><TagInput value={d.tags || []} onChange={v => update('tags', v)} /></FormField>
        </div>
      ),
    },
    {
      id: 'content', label: 'Content',
      render: ({ data: d, update }) => (
        <JoditEditor label="Article Content" value={d.content} onChange={v => update('content', v)} height={500} />
      ),
    },
    {
      id: 'cover', label: 'Cover Image',
      render: ({ data: d, update }) => (
        <ImageUpload
          label="Cover Image"
          value={d.coverImage}
          onChange={v => update('coverImage', v)}
          altValue={d.coverImageAlt}
          onAltChange={v => update('coverImageAlt', v)}
        />
      ),
    },
    {
      id: 'seo', label: 'SEO',
      render: ({ data: d, update }) => (
        <div className="space-y-5">
          <FormField label="Meta Title"><TInput value={d.seo?.title} onChange={v => update('seo.title', v)} /></FormField>
          <FormField label="Meta Description"><TTextarea value={d.seo?.description} onChange={v => update('seo.description', v)} rows={3} /></FormField>
          <FormField label="Keywords"><TagInput value={d.seo?.keywords || []} onChange={v => update('seo.keywords', v)} /></FormField>
        </div>
      ),
    },
  ];

  return (
    <FormBuilder
      title={isNew ? 'New Blog Post' : `Edit: ${data.title || '…'}`}
      tabs={TABS}
      data={data}
      onChange={setData}
      onSubmit={handleSave}
      onDelete={!isNew && canDelete ? handleDelete : undefined}
      isLoading={isLoading}
      backUrl="/blog/posts"
    />
  );
}
