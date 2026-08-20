import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { adminApi } from '../../lib/api';
import { useToast } from '../../components/Toast';
import JoditEditor from '../../components/JoditEditor';

const TYPES = [
  'Job', 'Admit Card Update', 'Result', 'New Notification', 'Exam Strategy',
  'Exam Pattern', 'Cut-Off Analysis', 'Answer Key', 'Syllabus Update', 'Important Dates', 'General',
];

const EMPTY = {
  title: '', type: 'General', description: '', linkUrl: '',
  seo: {
    title: '',
    description: '',
    keywords: '',
    ogImage: '',
    canonicalUrl: '',
    noindex: false
  }
};

export default function NotificationsEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const isNew = !id || id === 'new';

  const [form, setForm] = useState(EMPTY);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const [showSeo, setShowSeo] = useState(false);

  useEffect(() => {
    if (isNew) return;
    setIsLoading(true);
    adminApi.get(`/notifications/${id}`)
      .then(res => {
        const d = res?.data || res;
        setForm({
          title: d.title || '',
          type: d.type || 'General',
          description: d.description || '',
          linkUrl: d.linkUrl || '',
          seo: {
            title: d.seo?.title || '',
            description: d.seo?.description || '',
            keywords: d.seo?.keywords || '',
            ogImage: d.seo?.ogImage || '',
            canonicalUrl: d.seo?.canonicalUrl || '',
            noindex: d.seo?.noindex || false,
          }
        });
        if (d.image || d.imageUrl) setImagePreview(d.image || d.imageUrl);
      })
      .catch(async () => {
        try {
          const list = await adminApi.get('/notifications');
          const all = Array.isArray(list) ? list : (list?.data || []);
          const found = all.find(n => n._id === id);
          if (found) {
            setForm({
              title: found.title || '',
              type: found.type || 'General',
              description: found.description || '',
              linkUrl: found.linkUrl || '',
              seo: {
                title: found.seo?.title || '',
                description: found.seo?.description || '',
                keywords: found.seo?.keywords || '',
                ogImage: found.seo?.ogImage || '',
                canonicalUrl: found.seo?.canonicalUrl || '',
                noindex: found.seo?.noindex || false,
              }
            });
            if (found.image || found.imageUrl) setImagePreview(found.image || found.imageUrl);
          }
        } catch {}
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) return toast.error('Title is required');

    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('title', form.title);
      fd.append('type', form.type);
      fd.append('description', form.description);
      fd.append('linkUrl', form.linkUrl);
      fd.append('seo', JSON.stringify(form.seo));
      if (imageFile) fd.append('image', imageFile);

      const res = isNew
        ? await adminApi.post('/notifications', fd)
        : await adminApi.put(`/notifications/${id}`, fd);

      toast.success(isNew ? 'Notification created!' : 'Notification saved!');
      const newId = res?._id || res?.data?._id || id;
      if (isNew && newId) navigate(`/admin/notifications/${newId}`, { replace: true });
    } catch (e) {
      toast.error(e.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-64 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Link to="/admin/notifications" className="text-sm text-gray-500 hover:text-gray-700">
            ← Back
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {isNew ? 'New Notification' : `Edit: ${form.title || '…'}`}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <h2 className="text-base font-semibold text-gray-800">Notification Details</h2>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                required
                placeholder="e.g. SSC CGL 2024 Admit Card Released"
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={form.type}
                onChange={e => setForm(p => ({ ...p, type: e.target.value }))}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500"
              >
                {TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link URL (optional)</label>
              <input
                type="url"
                value={form.linkUrl}
                onChange={e => setForm(p => ({ ...p, linkUrl: e.target.value }))}
                placeholder="https://..."
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <JoditEditor
            label="Description"
            value={form.description}
            onChange={v => setForm(p => ({ ...p, description: v }))}
          />
        </div>

        {/* Image */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="text-base font-semibold text-gray-800">Image (optional)</h2>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-48 h-28 object-cover rounded-xl border border-gray-200"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
          />
        </div>

        {/* SEO Settings Section (Collapsible & 100% Optional) */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => setShowSeo(v => !v)}
            className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50/80 transition-colors"
          >
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold text-gray-800">Search Engine Optimization (SEO)</h2>
                <span className="text-xs bg-emerald-50 text-emerald-700 font-medium px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Optional — Auto-generated if empty
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Customize meta title, snippet description, focus keywords & OpenGraph preview.</p>
            </div>
            <span className="text-sm font-semibold text-gray-500">
              {showSeo ? '▲ Hide' : '▼ Customize SEO'}
            </span>
          </button>

          {showSeo && (
            <div className="p-6 pt-0 border-t border-gray-100 space-y-5 mt-2">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-gray-700">Meta Title</label>
                    <span className={`text-xs ${((form.seo?.title || '').length > 60) ? 'text-amber-600 font-semibold' : 'text-gray-400'}`}>
                      {(form.seo?.title || '').length}/70 chars
                    </span>
                  </div>
                  <input
                    type="text"
                    value={form.seo?.title || ''}
                    onChange={e => setForm(p => ({ ...p, seo: { ...p.seo, title: e.target.value } }))}
                    placeholder={form.title || 'Leave blank to use notification title'}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-gray-700">Meta Description</label>
                    <span className={`text-xs ${((form.seo?.description || '').length > 160) ? 'text-amber-600 font-semibold' : 'text-gray-400'}`}>
                      {(form.seo?.description || '').length}/160 chars
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    value={form.seo?.description || ''}
                    onChange={e => setForm(p => ({ ...p, seo: { ...p.seo, description: e.target.value } }))}
                    placeholder="Brief summary for Google search snippet. Leave blank to auto-generate from description."
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Keywords</label>
                    <input
                      type="text"
                      value={form.seo?.keywords || ''}
                      onChange={e => setForm(p => ({ ...p, seo: { ...p.seo, keywords: e.target.value } }))}
                      placeholder="e.g. ssc cgl 2024, admit card, govt exam"
                      className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Canonical URL (optional)</label>
                    <input
                      type="url"
                      value={form.seo?.canonicalUrl || ''}
                      onChange={e => setForm(p => ({ ...p, seo: { ...p.seo, canonicalUrl: e.target.value } }))}
                      placeholder="https://thesamarthacademy.in/notifications/..."
                      className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">OpenGraph / Social Image URL (optional)</label>
                  <input
                    type="url"
                    value={form.seo?.ogImage || ''}
                    onChange={e => setForm(p => ({ ...p, seo: { ...p.seo, ogImage: e.target.value } }))}
                    placeholder="Leave empty to use main notification image"
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500"
                  />
                </div>

                <div className="pt-2">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.seo?.noindex || false}
                      onChange={e => setForm(p => ({ ...p, seo: { ...p.seo, noindex: e.target.checked } }))}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-500 relative"></div>
                    <span className="ml-3 text-sm font-medium text-gray-700">Hide from Search Engines (noindex)</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-red-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving…' : isNew ? 'Create Notification' : 'Save Changes'}
          </button>
          <Link to="/admin/notifications" className="text-sm text-gray-500 hover:text-gray-700">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
