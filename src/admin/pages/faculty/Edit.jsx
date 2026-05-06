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
  name: '', designation: '', subject: '', experience: '', photo: '', slug: '', active: true,
  bio: '', shortBio: '', qualifications: [], achievements: [], socialLinks: {}, tags: [],
});

const TABS = [
  {
    id: 'basic', label: 'Basic Info',
    render: ({ data: d, update }) => (
      <div className="grid md:grid-cols-2 gap-5">
        <FormField label="Full Name" required><TInput value={d.name} onChange={v => update('name', v)} required /></FormField>
        <FormField label="Designation"><TInput value={d.designation} onChange={v => update('designation', v)} placeholder="Senior Faculty" /></FormField>
        <FormField label="Subject / Specialisation"><TInput value={d.subject} onChange={v => update('subject', v)} placeholder="History, Geography" /></FormField>
        <FormField label="Experience"><TInput value={d.experience} onChange={v => update('experience', v)} placeholder="10+ Years" /></FormField>
        <FormField label="URL Slug"><TInput value={d.slug} onChange={v => update('slug', v.toLowerCase().replace(/\s+/g, '-'))} /></FormField>
        <FormField label="Status"><TToggle label="Active" checked={d.active !== false} onChange={v => update('active', v)} /></FormField>
        <FormField label="Short Bio" hint="Used in cards"><TTextarea value={d.shortBio} onChange={v => update('shortBio', v)} rows={2} /></FormField>
      </div>
    ),
  },
  {
    id: 'bio', label: 'Bio',
    render: ({ data: d, update }) => (
      <JoditEditor label="Detailed Biography" value={d.bio} onChange={v => update('bio', v)} />
    ),
  },
  {
    id: 'achievements', label: 'Achievements',
    render: ({ data: d, update }) => (
      <div className="space-y-5">
        <FieldArray
          label="Qualifications"
          value={d.qualifications || []}
          onChange={v => update('qualifications', v)}
          itemSchema={[{ name: 'text', type: 'text', label: 'Qualification', required: true }]}
          emptyItem={{ text: '' }}
        />
        <FieldArray
          label="Achievements"
          value={d.achievements || []}
          onChange={v => update('achievements', v)}
          itemSchema={[{ name: 'text', type: 'text', label: 'Achievement', required: true }]}
          emptyItem={{ text: '' }}
        />
      </div>
    ),
  },
  {
    id: 'tags', label: 'Tags',
    render: ({ data: d, update }) => (
      <FormField label="Tags"><TagInput value={d.tags || []} onChange={v => update('tags', v)} /></FormField>
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
    adminApi.get(`/faculty/admin/${id}`).then(res => { setData(res.data); setIsLoading(false); }).catch(() => setIsLoading(false));
  }, [id]);

  async function handleSave(d) {
    const res = isNew
      ? await adminApi.post('/faculty/admin', d)
      : await adminApi.put(`/faculty/admin/${id}`, d);
    toast.success(isNew ? 'Faculty created!' : 'Saved!');
    if (isNew) navigate(`/faculty/${res.data._id}`, { replace: true });
  }

  async function handleDelete() {
    await adminApi.delete(`/faculty/admin/${id}`);
    toast.success('Deleted');
    navigate('/faculty');
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
      backUrl="/faculty"
    />
  );
}
