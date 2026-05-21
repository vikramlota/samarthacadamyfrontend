import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { adminApi } from '../../lib/api';
import { useToast } from '../../components/Toast';
import { useAuth } from '../../context/AuthContext';
import FormBuilder from '../../components/FormBuilder';
import FieldArray from '../../components/FieldArray';
import ImageUpload from '../../components/ImageUpload';
import FormField, { TInput, TTextarea, TToggle, TagInput } from '../../components/FormField';
import JoditEditor from '../../components/JoditEditor';

const empty = () => ({
  name: '', slug: '', designation: '', qualification: '', experience: '', yearsAtSamarth: '',
  active: true, featured: false, displayOrder: 0,
  shortBio: '', bio: '', photo: '', subjects: [], examTags: [],
  achievements: [], examsCleared: [], awards: [],
  linkedin: '', email: ''
});

const TABS = [
  {
    id: 'basic', label: 'Basic Info',
    render: ({ data: d, update }) => (
      <div className="grid md:grid-cols-2 gap-5">
        <FormField label="Full Name" required><TInput value={d.name} onChange={v => update('name', v)} required /></FormField>
        <FormField label="URL Slug"><TInput value={d.slug} onChange={v => update('slug', v.toLowerCase().replace(/\s+/g, '-'))} /></FormField>
        <FormField label="Designation" required><TInput value={d.designation} onChange={v => update('designation', v)} placeholder="Senior Faculty" required /></FormField>
        <FormField label="Qualification" required><TInput value={d.qualification} onChange={v => update('qualification', v)} placeholder="M.A., B.Ed." required /></FormField>
        <FormField label="Experience (Years)" required><TInput type="number" value={d.experience} onChange={v => update('experience', v)} placeholder="10" required /></FormField>
        <FormField label="Years at Samarth"><TInput type="number" value={d.yearsAtSamarth} onChange={v => update('yearsAtSamarth', v)} placeholder="4" /></FormField>
        <FormField label="Status"><TToggle label="Active" checked={d.active !== false} onChange={v => update('active', v)} /></FormField>
        <FormField label="Featured"><TToggle label="Featured Faculty" checked={d.featured === true} onChange={v => update('featured', v)} /></FormField>
        <FormField label="Display Order" hint="Lower number = higher position"><TInput type="number" value={d.displayOrder} onChange={v => update('displayOrder', v)} /></FormField>
        <div className="md:col-span-2">
          <FormField label="Short Bio" hint="Used in cards (max 200 chars)"><TTextarea value={d.shortBio} onChange={v => update('shortBio', v)} rows={2} /></FormField>
        </div>
      </div>
    ),
  },
  {
    id: 'bio', label: 'Biography',
    render: ({ data: d, update }) => (
      <JoditEditor label="Detailed Biography" value={d.bio} onChange={v => update('bio', v)} />
    ),
  },
  {
    id: 'details', label: 'Details',
    render: ({ data: d, update }) => (
      <div className="space-y-5">
        <FormField label="Subjects / Specialisations"><TagInput value={d.subjects || []} onChange={v => update('subjects', v)} placeholder="Add subject (e.g. Indian Polity)" /></FormField>
        <FormField label="Exam Tags" hint="Used for filtering (e.g. ssc, banking, upsc)"><TagInput value={d.examTags || []} onChange={v => update('examTags', v)} placeholder="Add tag" /></FormField>
      </div>
    ),
  },
  {
    id: 'achievements', label: 'Achievements',
    render: ({ data: d, update }) => (
      <div className="space-y-5">
        <FieldArray
          label="Achievements"
          value={d.achievements || []}
          onChange={v => update('achievements', v)}
          itemSchema={[{ name: 'text', type: 'text', label: 'Achievement' }]}
          emptyItem={{ text: '' }}
        />
        <FieldArray
          label="Exams Cleared"
          value={d.examsCleared || []}
          onChange={v => update('examsCleared', v)}
          itemSchema={[{ name: 'text', type: 'text', label: 'Exam (e.g. SSC CGL 2015)' }]}
          emptyItem={{ text: '' }}
        />
      </div>
    ),
  },
  {
    id: 'awards', label: 'Awards',
    render: ({ data: d, update }) => (
      <div className="space-y-5">
        <FieldArray
          label="Awards"
          value={d.awards || []}
          onChange={v => update('awards', v)}
          itemSchema={[
            { name: 'year', type: 'number', label: 'Year' },
            { name: 'title', type: 'text', label: 'Title', required: true },
            { name: 'awardedBy', type: 'text', label: 'Awarded By' },
          ]}
          emptyItem={{ year: new Date().getFullYear(), title: '', awardedBy: '' }}
        />
      </div>
    ),
  },
  {
    id: 'contact', label: 'Contact',
    render: ({ data: d, update }) => (
      <div className="grid md:grid-cols-2 gap-5">
        <FormField label="Email Address"><TInput type="email" value={d.email} onChange={v => update('email', v)} /></FormField>
        <FormField label="LinkedIn URL"><TInput type="url" value={d.linkedin} onChange={v => update('linkedin', v)} /></FormField>
      </div>
    ),
  },
  {
    id: 'photo', label: 'Photo',
    render: ({ data: d, update }) => (
      <ImageUpload label="Profile Photo" value={d.photo} onChange={v => update('photo', v)} />
    ),
  },
];

export default function FacultyEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { canDelete } = useAuth();
  const isNew = !id || id === 'new';

  const [data, setData] = useState(empty());
  const [isLoading, setIsLoading] = useState(!isNew);

  useEffect(() => {
    if (isNew) return;
    adminApi.get(`/faculty/admin/${id}`).then(res => {
      const d = res.data?.data || res.data;
      // Map string arrays back to objects for FieldArray
      d.achievements = d.achievements?.map(a => ({ text: a })) || [];
      d.examsCleared = d.examsCleared?.map(e => ({ text: e })) || [];
      setData(d);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, [id]);

  async function handleSave(d) {
    const payload = { ...d };
    // Flatten arrays from FieldArray before saving
    payload.achievements = payload.achievements?.map(a => a.text).filter(Boolean);
    payload.examsCleared = payload.examsCleared?.map(e => e.text).filter(Boolean);

    try {
      const res = isNew
        ? await adminApi.post('/faculty/admin', payload)
        : await adminApi.put(`/faculty/admin/${id}`, payload);
      toast.success(isNew ? 'Faculty created!' : 'Saved!');
      if (isNew) {
         const newId = res.data?.data?._id || res.data?._id;
         navigate(`/admin/faculty/${newId}`, { replace: true });
      }
    } catch (err) {
      toast.error(err.response?.data?.error || err.message);
    }
  }

  async function handleDelete() {
    try {
      await adminApi.delete(`/faculty/admin/${id}`);
      toast.success('Deleted');
      navigate('/admin/faculty');
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <FormBuilder
      title={isNew ? 'Add Faculty' : `Edit: ${data.name || '…'}`}
      tabs={TABS}
      data={data}
      onChange={setData}
      onSubmit={handleSave}
      onDelete={!isNew && canDelete ? handleDelete : undefined}
      isLoading={isLoading}
      backUrl="/admin/faculty"
    />
  );
}
