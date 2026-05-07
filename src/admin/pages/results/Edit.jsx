import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { adminApi } from '../../lib/api';
import { useToast } from '../../components/Toast';

const CATEGORIES = ['Banking', 'SSC', 'State', 'Defence', 'Teaching'];

const EMPTY = {
  studentName: '', examName: '', rank: '', category: 'SSC',
  year: new Date().getFullYear(), testimonial: '',
};

export default function ResultsEdit() {
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
    adminApi.get(`/results/${id}`)
      .then(res => {
        const d = res?.data || res;
        setForm({
          studentName: d.studentName || '',
          examName: d.examName || '',
          rank: d.rank || '',
          category: d.category || 'SSC',
          year: d.year || new Date().getFullYear(),
          testimonial: d.testimonial || '',
        });
        if (d.photo || d.image) setImagePreview(d.photo || d.image);
      })
      .catch(async () => {
        try {
          const list = await adminApi.get('/results');
          const all = Array.isArray(list) ? list : (list?.data || []);
          const found = all.find(r => r._id === id);
          if (found) {
            setForm({
              studentName: found.studentName || '',
              examName: found.examName || '',
              rank: found.rank || '',
              category: found.category || 'SSC',
              year: found.year || new Date().getFullYear(),
              testimonial: found.testimonial || '',
            });
            if (found.photo || found.image) setImagePreview(found.photo || found.image);
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
    if (!form.studentName.trim()) return toast.error('Student name is required');
    if (!form.examName.trim()) return toast.error('Exam name is required');
    if (!form.rank.trim()) return toast.error('Rank is required');
    if (isNew && !imageFile) return toast.error('Photo is required');

    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('studentName', form.studentName);
      fd.append('examName', form.examName);
      fd.append('rank', form.rank);
      fd.append('category', form.category);
      fd.append('year', form.year);
      fd.append('testimonial', form.testimonial);
      if (imageFile) {
        fd.append('photo', imageFile);
        fd.append('image', imageFile);
      }

      const res = isNew
        ? await adminApi.post('/results', fd)
        : await adminApi.put(`/results/${id}`, fd);

      toast.success(isNew ? 'Achiever added!' : 'Result saved!');
      const newId = res?._id || res?.data?._id || id;
      if (isNew && newId) navigate(`/results/${newId}`, { replace: true });
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
          <Link to="/results" className="text-sm text-gray-500 hover:text-gray-700">
            ← Back
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {isNew ? 'Add Achiever' : `Edit: ${form.studentName || '…'}`}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <h2 className="text-base font-semibold text-gray-800">Student Details</h2>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.studentName}
                onChange={e => setForm(p => ({ ...p, studentName: e.target.value }))}
                required
                placeholder="e.g. Rahul Sharma"
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Exam Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.examName}
                onChange={e => setForm(p => ({ ...p, examName: e.target.value }))}
                required
                placeholder="e.g. SSC CGL 2023"
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rank / Achievement <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.rank}
                onChange={e => setForm(p => ({ ...p, rank: e.target.value }))}
                required
                placeholder="e.g. AIR 45, Selected"
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <input
                type="number"
                value={form.year}
                onChange={e => setForm(p => ({ ...p, year: parseInt(e.target.value) || new Date().getFullYear() }))}
                min="2000"
                max="2099"
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Testimonial (optional)</label>
              <textarea
                value={form.testimonial}
                onChange={e => setForm(p => ({ ...p, testimonial: e.target.value }))}
                rows={3}
                placeholder="Student's words about the coaching..."
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Photo */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="text-base font-semibold text-gray-800">
            Student Photo {isNew && <span className="text-red-500">*</span>}
          </h2>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
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
            {saving ? 'Saving…' : isNew ? 'Add Achiever' : 'Save Changes'}
          </button>
          <Link to="/results" className="text-sm text-gray-500 hover:text-gray-700">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
