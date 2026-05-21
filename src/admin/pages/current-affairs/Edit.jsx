import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { adminApi } from '../../lib/api';
import { useToast } from '../../components/Toast';
import JoditEditor from '../../components/JoditEditor';

const CATEGORIES = [
  'National', 'International', 'Defence', 'Sports', 'Science',
  'Economy', 'Tech', 'Awards', 'Important Days', 'Obituary', 'Miscellaneous',
];

function slugify(str) {
  return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

const EMPTY = {
  headline: '', category: 'National', tags: '', isSpotlight: false, contentBody: '',
};

export default function CurrentAffairsEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const isNew = !id || id === 'new';

  const [form, setForm] = useState(EMPTY);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (isNew) return;
    setIsLoading(true);
    adminApi.get(`/current-affairs/${id}`)
      .then(res => {
        const d = res?.data || res;
        setForm({
          headline: d.headline || '',
          category: d.category || 'National',
          tags: Array.isArray(d.tags) ? d.tags.join(', ') : (d.tags || ''),
          isSpotlight: !!d.isSpotlight,
          contentBody: d.contentBody || '',
        });
        if (d.image) setImagePreview(d.image);
      })
      .catch(async () => {
        try {
          const list = await adminApi.get('/current-affairs');
          const all = Array.isArray(list) ? list : (list?.data || []);
          const found = all.find(a => a._id === id);
          if (found) {
            setForm({
              headline: found.headline || '',
              category: found.category || 'National',
              tags: Array.isArray(found.tags) ? found.tags.join(', ') : (found.tags || ''),
              isSpotlight: !!found.isSpotlight,
              contentBody: found.contentBody || '',
            });
            if (found.image) setImagePreview(found.image);
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
    if (!form.headline.trim()) return toast.error('Headline is required');

    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('headline', form.headline);
      fd.append('slug', slugify(form.headline));
      fd.append('category', form.category);
      fd.append('tags', form.tags);
      fd.append('isSpotlight', form.isSpotlight ? 'true' : 'false');
      fd.append('contentBody', form.contentBody);
      if (imageFile) fd.append('image', imageFile);

      const res = isNew
        ? await adminApi.post('/current-affairs', fd)
        : await adminApi.put(`/current-affairs/${id}`, fd);

      toast.success(isNew ? 'Article created!' : 'Article saved!');
      const newId = res?._id || res?.data?._id || id;
      if (isNew && newId) navigate(`/admin/current-affairs/${newId}`, { replace: true });
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
          <Link to="/admin/current-affairs" className="text-sm text-gray-500 hover:text-gray-700">
            ← Back
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {isNew ? 'New Article' : `Edit: ${form.headline || '…'}`}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <h2 className="text-base font-semibold text-gray-800">Article Details</h2>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Headline <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.headline}
                onChange={e => setForm(p => ({ ...p, headline: e.target.value }))}
                required
                placeholder="e.g. India launches new satellite mission"
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={form.category}
                onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500"
              >
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags <span className="text-xs text-gray-400">(comma-separated)</span>
              </label>
              <input
                type="text"
                value={form.tags}
                onChange={e => setForm(p => ({ ...p, tags: e.target.value }))}
                placeholder="India, Space, ISRO"
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500"
              />
            </div>

            <div className="flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isSpotlight}
                  onChange={e => setForm(p => ({ ...p, isSpotlight: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500" />
              </label>
              <span className="text-sm font-medium text-gray-700">Spotlight Article</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <JoditEditor
            label="Content"
            value={form.contentBody}
            onChange={v => setForm(p => ({ ...p, contentBody: v }))}
          />
        </div>

        {/* Image */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="text-base font-semibold text-gray-800">Featured Image</h2>
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

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-red-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving…' : isNew ? 'Publish Article' : 'Save Changes'}
          </button>
          <Link to="/admin/current-affairs" className="text-sm text-gray-500 hover:text-gray-700">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
