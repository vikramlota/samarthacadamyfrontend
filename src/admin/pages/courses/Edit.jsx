import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { adminApi } from '../../lib/api';
import { useToast } from '../../components/Toast';
import JoditEditor from '../../components/JoditEditor';

const CATEGORIES = ['SSC', 'Banking', 'State', 'Defence', 'Teaching', 'Punjab Police', 'Other'];

const COLOR_THEMES = {
  red:   { from: '#ef4444', to: '#b91c1c', text: '#ffffff', border: '#ef4444' },
  blue:  { from: '#3b82f6', to: '#1d4ed8', text: '#ffffff', border: '#3b82f6' },
  green: { from: '#22c55e', to: '#15803d', text: '#ffffff', border: '#22c55e' },
};

function slugify(str) {
  return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

const EMPTY = {
  title: '', slug: '', category: 'SSC', badgeText: '', link: '', youtubeLink: '',
  description: '', colorTheme: 'red', features: [],
};

export default function CourseEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const isNew = !id || id === 'new';

  const [form, setForm] = useState(EMPTY);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const slugTouched = useRef(false);

  useEffect(() => {
    if (isNew) return;
    setIsLoading(true);
    adminApi.get(`/courses/${id}`)
      .then(res => {
        const d = res?.data || res;
        // Determine color theme key from colorTheme object or string
        let colorTheme = 'red';
        if (d.colorTheme) {
          if (typeof d.colorTheme === 'string') {
            colorTheme = d.colorTheme;
          } else if (d.colorTheme.from) {
            const match = Object.entries(COLOR_THEMES).find(
              ([, v]) => v.from === d.colorTheme.from
            );
            if (match) colorTheme = match[0];
          }
        }
        setForm({
          title: d.title || '',
          slug: d.slug || '',
          category: d.category || 'SSC',
          badgeText: d.badgeText || '',
          link: d.link || '',
          youtubeLink: d.youtubeLink || '',
          description: d.description || '',
          colorTheme,
          features: Array.isArray(d.features) ? d.features : [],
        });
        if (d.image) setImagePreview(d.image);
        slugTouched.current = true;
      })
      .catch(async () => {
        // Fallback: get list and find by id
        try {
          const list = await adminApi.get('/courses');
          const all = Array.isArray(list) ? list : (list?.data || []);
          const found = all.find(c => c._id === id);
          if (found) {
            let colorTheme = 'red';
            if (found.colorTheme && typeof found.colorTheme === 'string') colorTheme = found.colorTheme;
            setForm({
              title: found.title || '',
              slug: found.slug || '',
              category: found.category || 'SSC',
              badgeText: found.badgeText || '',
              link: found.link || '',
              youtubeLink: found.youtubeLink || '',
              description: found.description || '',
              colorTheme,
              features: Array.isArray(found.features) ? found.features : [],
            });
            if (found.image) setImagePreview(found.image);
            slugTouched.current = true;
          }
        } catch {}
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  function handleTitleChange(e) {
    const title = e.target.value;
    setForm(prev => ({
      ...prev,
      title,
      slug: (!slugTouched.current || isNew) ? slugify(title) : prev.slug,
    }));
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function addFeature() {
    const val = featureInput.trim();
    if (!val) return;
    setForm(prev => ({ ...prev, features: [...prev.features, val] }));
    setFeatureInput('');
  }

  function removeFeature(idx) {
    setForm(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== idx) }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) return toast.error('Title is required');
    if (!form.slug.trim()) return toast.error('Slug is required');

    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('title', form.title);
      fd.append('slug', form.slug);
      fd.append('category', form.category);
      fd.append('badgeText', form.badgeText);
      fd.append('link', form.link);
      fd.append('youtubeLink', form.youtubeLink);
      fd.append('description', form.description);

      const theme = COLOR_THEMES[form.colorTheme] || COLOR_THEMES.red;
      fd.append('colorTheme[from]', theme.from);
      fd.append('colorTheme[to]', theme.to);
      fd.append('colorTheme[text]', theme.text);
      fd.append('colorTheme[border]', theme.border);

      form.features.forEach((f, i) => fd.append(`features[${i}]`, f));

      if (imageFile) fd.append('image', imageFile);

      const res = isNew
        ? await adminApi.post('/courses', fd)
        : await adminApi.put(`/courses/${id}`, fd);

      toast.success(isNew ? 'Course created!' : 'Course saved!');
      const newId = res?._id || res?.data?._id || id;
      if (isNew && newId) navigate(`/courses/${newId}`, { replace: true });
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
          <Link to="/courses" className="text-sm text-gray-500 hover:text-gray-700">
            ← Back
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {isNew ? 'New Course' : `Edit: ${form.title || '…'}`}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Basic Info */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <h2 className="text-base font-semibold text-gray-800">Basic Information</h2>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={handleTitleChange}
                required
                placeholder="e.g. SSC CGL 2024 Batch"
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.slug}
                onChange={e => { slugTouched.current = true; setForm(p => ({ ...p, slug: e.target.value })); }}
                required
                placeholder="ssc-cgl-2024-batch"
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Badge Text</label>
              <input
                type="text"
                value={form.badgeText}
                onChange={e => setForm(p => ({ ...p, badgeText: e.target.value }))}
                placeholder="e.g. New, Popular"
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Link (URL)</label>
              <input
                type="url"
                value={form.link}
                onChange={e => setForm(p => ({ ...p, link: e.target.value }))}
                placeholder="https://..."
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">YouTube Link</label>
              <input
                type="url"
                value={form.youtubeLink}
                onChange={e => setForm(p => ({ ...p, youtubeLink: e.target.value }))}
                placeholder="https://youtube.com/..."
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500"
              />
            </div>
          </div>
        </div>

        {/* Color Theme */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="text-base font-semibold text-gray-800">Color Theme</h2>
          <div className="flex gap-4">
            {Object.keys(COLOR_THEMES).map(theme => (
              <label key={theme} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="colorTheme"
                  value={theme}
                  checked={form.colorTheme === theme}
                  onChange={() => setForm(p => ({ ...p, colorTheme: theme }))}
                  className="sr-only"
                />
                <span
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    form.colorTheme === theme ? 'border-gray-800 scale-110' : 'border-transparent'
                  }`}
                  style={{ background: COLOR_THEMES[theme].from }}
                />
                <span className="text-sm capitalize text-gray-700">{theme}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="text-base font-semibold text-gray-800">Features</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={featureInput}
              onChange={e => setFeatureInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addFeature(); } }}
              placeholder="Add a feature..."
              className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500"
            />
            <button
              type="button"
              onClick={addFeature}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
            >
              Add
            </button>
          </div>
          {form.features.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {form.features.map((f, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 text-sm px-3 py-1 rounded-full"
                >
                  {f}
                  <button
                    type="button"
                    onClick={() => removeFeature(i)}
                    className="text-red-400 hover:text-red-600 font-bold leading-none"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
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
          <h2 className="text-base font-semibold text-gray-800">Course Image</h2>
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
            {saving ? 'Saving…' : isNew ? 'Create Course' : 'Save Changes'}
          </button>
          <Link to="/courses" className="text-sm text-gray-500 hover:text-gray-700">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
