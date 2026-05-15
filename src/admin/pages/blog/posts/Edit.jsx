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
  categories: [], tags: [], active: true, featured: false,
  author: { name: 'Samarth Academy', avatar: '' },
  seo: { title: '', description: '', keywords: [], ogImage: '', canonicalUrl: '', noindex: false },
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
    adminApi.get(`/blog/posts/manage/${id}`).then(res => { 
      const post = res.data;
      // Ensure seo structure exists
      if (!post.seo) post.seo = empty().seo;
      if (!post.author) post.author = empty().author;
      setData(post); 
      setIsLoading(false); 
    }).catch(() => setIsLoading(false));
  }, [id]);

  function stripHtml(html = '') {
    return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  }

  async function handleSave(d) {
    if (!d.title?.trim()) {
      toast.error('Title required');
      return;
    }
    if (!stripHtml(d.content).length) {
      toast.error('Content required');
      return;
    }
    if (!d.categories?.length) {
      toast.error('Select at least one category');
      return;
    }

    try {
      const res = isNew
        ? await adminApi.post('/blog/posts/manage', d)
        : await adminApi.put(`/blog/posts/manage/${id}`, d);
      toast.success(isNew ? 'Post created!' : 'Saved!');
      if (isNew) navigate(`/blog/posts/${res.data._id}`, { replace: true });
    } catch (error) {
      toast.error(error.message || 'Unable to save blog post');
    }
  }

  async function handleDelete() {
    await adminApi.delete(`/blog/posts/manage/${id}`);
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
          <div className="grid md:grid-cols-2 gap-5">
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
            <div className="flex gap-8 items-center pt-6">
              <TToggle label="Active (Published)" checked={!!d.active} onChange={v => update('active', v)} />
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
      id: 'author', label: 'Author',
      render: ({ data: d, update }) => (
        <div className="grid md:grid-cols-2 gap-5">
          <FormField label="Author Name"><TInput value={d.author?.name} onChange={v => update('author.name', v)} /></FormField>
          <ImageUpload
            label="Author Avatar"
            value={d.author?.avatar}
            onChange={v => update('author.avatar', v)}
          />
        </div>
      ),
    },
    {
      id: 'seo', label: 'SEO',
      render: ({ data: d, update }) => (
        <div className="space-y-5">
          <FormField label="Meta Title" hint="Max 200 chars"><TInput value={d.seo?.title} onChange={v => update('seo.title', v)} /></FormField>
          <FormField label="Meta Description" hint="Max 500 chars"><TTextarea value={d.seo?.description} onChange={v => update('seo.description', v)} rows={3} /></FormField>
          <FormField label="Keywords"><TagInput value={d.seo?.keywords || []} onChange={v => update('seo.keywords', v)} /></FormField>
          <FormField label="OG Image URL" hint="Leave blank to use cover image"><TInput value={d.seo?.ogImage} onChange={v => update('seo.ogImage', v)} /></FormField>
          <FormField label="Canonical URL"><TInput value={d.seo?.canonicalUrl} onChange={v => update('seo.canonicalUrl', v)} /></FormField>
          <TToggle label="Noindex (Hide from search engines)" checked={!!d.seo?.noindex} onChange={v => update('seo.noindex', v)} />
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
