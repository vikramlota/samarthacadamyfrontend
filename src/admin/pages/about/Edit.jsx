import { useState, useEffect } from 'react';
import { adminApi } from '../../lib/api';
import { useToast } from '../../components/Toast';
import FormBuilder from '../../components/FormBuilder';
import FieldArray from '../../components/FieldArray';
import ImageUpload from '../../components/ImageUpload';
import JoditEditor from '../../components/JoditEditor';
import FormField, { TInput, TTextarea, TToggle, TagInput } from '../../components/FormField';

const empty = () => ({
  hero: { headline: '', subheadline: '', image: '' },
  mission: '', vision: '', values: [],
  stats: [],
  journey: { intro: '', milestones: [] },
  founders: [],
  awards: [],
  infrastructure: { description: '', images: [] },
  seo: { title: '', description: '' },
});

const TABS = [
  {
    id: 'hero', label: 'Hero',
    render: ({ data: d, update }) => (
      <div className="space-y-5">
        <FormField label="Headline"><TInput value={d.hero?.headline} onChange={v => update('hero.headline', v)} /></FormField>
        <FormField label="Subheadline"><TTextarea value={d.hero?.subheadline} onChange={v => update('hero.subheadline', v)} rows={2} /></FormField>
        <ImageUpload label="Hero Image" value={d.hero?.image} onChange={v => update('hero.image', v)} />
      </div>
    ),
  },
  {
    id: 'mvv', label: 'Mission / Vision',
    render: ({ data: d, update }) => (
      <div className="space-y-5">
        <FormField label="Mission"><TTextarea value={d.mission} onChange={v => update('mission', v)} rows={4} /></FormField>
        <FormField label="Vision"><TTextarea value={d.vision} onChange={v => update('vision', v)} rows={4} /></FormField>
        <FieldArray
          label="Values"
          value={d.values || []}
          onChange={v => update('values', v)}
          itemSchema={[
            { name: 'title', type: 'text', label: 'Value', required: true },
            { name: 'description', type: 'textarea', label: 'Description' },
          ]}
          emptyItem={{ title: '', description: '' }}
        />
      </div>
    ),
  },
  {
    id: 'stats', label: 'Stats',
    render: ({ data: d, update }) => (
      <FieldArray
        label="Key Stats"
        value={d.stats || []}
        onChange={v => update('stats', v)}
        itemSchema={[
          { name: 'value', type: 'text', label: 'Value', required: true },
          { name: 'label', type: 'text', label: 'Label', required: true },
          { name: 'icon', type: 'text', label: 'Icon (Fa...)' },
        ]}
        emptyItem={{ value: '', label: '', icon: '' }}
      />
    ),
  },
  {
    id: 'journey', label: 'Journey',
    render: ({ data: d, update }) => (
      <div className="space-y-5">
        <FormField label="Intro Text"><TTextarea value={d.journey?.intro} onChange={v => update('journey.intro', v)} rows={3} /></FormField>
        <FieldArray
          label="Milestones"
          value={d.journey?.milestones || []}
          onChange={v => update('journey.milestones', v)}
          itemSchema={[
            { name: 'year', type: 'number', label: 'Year', required: true },
            { name: 'title', type: 'text', label: 'Title', required: true },
            { name: 'description', type: 'textarea', label: 'Description', span: 'full' },
          ]}
          emptyItem={{ year: 2020, title: '', description: '' }}
        />
      </div>
    ),
  },
  {
    id: 'founders', label: 'Founders',
    render: ({ data: d, update }) => (
      <FieldArray
        label="Founders / Directors"
        value={d.founders || []}
        onChange={v => update('founders', v)}
        itemSchema={[
          { name: 'name', type: 'text', label: 'Name', required: true },
          { name: 'role', type: 'text', label: 'Role / Designation' },
          { name: 'bio', type: 'textarea', label: 'Bio', span: 'full' },
          { name: 'photo', type: 'text', label: 'Photo URL' },
        ]}
        emptyItem={{ name: '', role: '', bio: '', photo: '' }}
      />
    ),
  },
  {
    id: 'awards', label: 'Awards',
    render: ({ data: d, update }) => (
      <FieldArray
        label="Awards & Recognition"
        value={d.awards || []}
        onChange={v => update('awards', v)}
        itemSchema={[
          { name: 'title', type: 'text', label: 'Award Title', required: true },
          { name: 'year', type: 'number', label: 'Year' },
          { name: 'description', type: 'textarea', label: 'Description', span: 'full' },
          { name: 'image', type: 'text', label: 'Image URL' },
        ]}
        emptyItem={{ title: '', year: '', description: '', image: '' }}
      />
    ),
  },
  {
    id: 'infra', label: 'Infrastructure',
    render: ({ data: d, update }) => (
      <div className="space-y-5">
        <FormField label="Description"><TTextarea value={d.infrastructure?.description} onChange={v => update('infrastructure.description', v)} rows={3} /></FormField>
        <FieldArray
          label="Gallery Images"
          value={(d.infrastructure?.images || []).map(url => ({ url }))}
          onChange={v => update('infrastructure.images', v.map(i => i.url))}
          itemSchema={[{ name: 'url', type: 'text', label: 'Image URL', required: true }]}
          emptyItem={{ url: '' }}
        />
      </div>
    ),
  },
  {
    id: 'seo', label: 'SEO',
    render: ({ data: d, update }) => (
      <div className="space-y-5">
        <FormField label="Meta Title"><TInput value={d.seo?.title} onChange={v => update('seo.title', v)} /></FormField>
        <FormField label="Meta Description"><TTextarea value={d.seo?.description} onChange={v => update('seo.description', v)} rows={3} /></FormField>
      </div>
    ),
  },
];

export default function AboutEdit() {
  const toast = useToast();
  const [data, setData] = useState(empty());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    adminApi.get('/about/admin').then(res => {
      setData(res.data || empty());
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  async function handleSave(d) {
    await adminApi.put('/about/admin', d);
    toast.success('About page saved!');
  }

  return (
    <FormBuilder
      title="About Page"
      tabs={TABS}
      data={data}
      onChange={setData}
      onSubmit={handleSave}
      isLoading={isLoading}
    />
  );
}
