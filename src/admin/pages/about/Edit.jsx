import { useState, useEffect } from 'react';
import { adminApi } from '../../lib/api';
import { useToast } from '../../components/Toast';
import FormBuilder from '../../components/FormBuilder';
import FieldArray from '../../components/FieldArray';
import ImageUpload from '../../components/ImageUpload';
import FormField, { TInput, TTextarea, TToggle } from '../../components/FormField';

const empty = () => ({
  hero: { eyebrow: 'ABOUT US', headline: '', subheadline: '', backgroundImage: '' },
  founderStory: { eyebrow: 'OUR STORY', headline: '', paragraphs: [], photo: '' },
  founders: [],
  stats: [],
  mission: '', vision: '', values: [],
  journey: { eyebrow: 'OUR JOURNEY', headline: '16 Years of Excellence', subheadline: '', milestones: [] },
  awards: { eyebrow: 'ACHIEVEMENTS', headline: 'Awards & Recognition', subheadline: '', items: [] },
  infrastructure: { eyebrow: 'OUR SPACE', headline: 'World-Class Learning Environment', subheadline: '', photos: [] },
  video: { enabled: false, youtubeId: '', title: '', description: '' },
  cta: { eyebrow: 'READY TO JOIN?', title: "Be Part of Amritsar's Leading Coaching Family", subtitle: '' },
  seo: { title: '', description: '', keywords: '', canonical: '', ogImage: '' }
});

const TABS = [
  {
    id: 'hero', label: 'Hero',
    render: ({ data: d, update }) => (
      <div className="space-y-5">
        <FormField label="Eyebrow"><TInput value={d.hero?.eyebrow} onChange={v => update('hero.eyebrow', v)} /></FormField>
        <FormField label="Headline"><TInput value={d.hero?.headline} onChange={v => update('hero.headline', v)} /></FormField>
        <FormField label="Subheadline"><TTextarea value={d.hero?.subheadline} onChange={v => update('hero.subheadline', v)} rows={2} /></FormField>
        <ImageUpload label="Hero Background Image" value={d.hero?.backgroundImage} onChange={v => update('hero.backgroundImage', v)} />
      </div>
    ),
  },
  {
    id: 'founderStory', label: 'Our Story',
    render: ({ data: d, update }) => (
      <div className="space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <FormField label="Eyebrow"><TInput value={d.founderStory?.eyebrow} onChange={v => update('founderStory.eyebrow', v)} /></FormField>
          <FormField label="Headline"><TInput value={d.founderStory?.headline} onChange={v => update('founderStory.headline', v)} /></FormField>
        </div>
        <FieldArray
          label="Story Paragraphs"
          value={d.founderStory?.paragraphs || []}
          onChange={v => update('founderStory.paragraphs', v)}
          itemSchema={[{ name: 'text', type: 'textarea', label: 'Paragraph', span: 'full' }]}
          emptyItem={{ text: '' }}
        />
        <ImageUpload label="Story Photo" value={d.founderStory?.photo} onChange={v => update('founderStory.photo', v)} />
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
          { name: 'title', type: 'text', label: 'Title', required: true },
          { name: 'formerRole', type: 'text', label: 'Former Role (optional)' },
          { name: 'yearsOfService', type: 'number', label: 'Years of Exp' },
          { name: 'bio', type: 'textarea', label: 'Bio', span: 'full', required: true },
          { name: 'credentials', type: 'textarea', label: 'Credentials (comma separated)', span: 'full' },
          { name: 'linkedin', type: 'url', label: 'LinkedIn URL' },
          { name: 'twitter', type: 'url', label: 'Twitter URL' },
          { name: 'photo', type: 'text', label: 'Photo URL' },
          { name: 'displayOrder', type: 'number', label: 'Display Order' },
        ]}
        emptyItem={{ name: '', title: '', formerRole: '', yearsOfService: '', bio: '', credentials: '', linkedin: '', twitter: '', photo: '', displayOrder: 0 }}
      />
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
          { name: 'iconName', type: 'text', label: 'Icon (e.g. FaUserGraduate)', required: true },
        ]}
        emptyItem={{ value: '', label: '', iconName: '' }}
      />
    ),
  },
  {
    id: 'mvv', label: 'MVV',
    render: ({ data: d, update }) => (
      <div className="space-y-5">
        <FormField label="Mission"><TTextarea value={d.mission} onChange={v => update('mission', v)} rows={4} /></FormField>
        <FormField label="Vision"><TTextarea value={d.vision} onChange={v => update('vision', v)} rows={4} /></FormField>
        <FieldArray
          label="Values"
          value={d.values || []}
          onChange={v => update('values', v)}
          itemSchema={[
            { name: 'iconName', type: 'text', label: 'Icon (e.g. FaStar)', required: true },
            { name: 'title', type: 'text', label: 'Value Title', required: true },
            { name: 'description', type: 'textarea', label: 'Description', span: 'full', required: true },
          ]}
          emptyItem={{ iconName: '', title: '', description: '' }}
        />
      </div>
    ),
  },
  {
    id: 'journey', label: 'Journey',
    render: ({ data: d, update }) => (
      <div className="space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <FormField label="Eyebrow"><TInput value={d.journey?.eyebrow} onChange={v => update('journey.eyebrow', v)} /></FormField>
          <FormField label="Headline"><TInput value={d.journey?.headline} onChange={v => update('journey.headline', v)} /></FormField>
        </div>
        <FormField label="Subheadline"><TTextarea value={d.journey?.subheadline} onChange={v => update('journey.subheadline', v)} rows={2} /></FormField>
        <FieldArray
          label="Milestones"
          value={d.journey?.milestones || []}
          onChange={v => update('journey.milestones', v)}
          itemSchema={[
            { name: 'year', type: 'number', label: 'Year', required: true },
            { name: 'title', type: 'text', label: 'Title', required: true },
            { name: 'description', type: 'textarea', label: 'Description', span: 'full', required: true },
            { name: 'icon', type: 'text', label: 'Icon Name' },
            { name: 'highlight', type: 'select', label: 'Highlight?', options: [{label: 'Yes', value: 'true'}, {label: 'No', value: 'false'}] },
          ]}
          emptyItem={{ year: new Date().getFullYear(), title: '', description: '', icon: '', highlight: 'false' }}
        />
      </div>
    ),
  },
  {
    id: 'awards', label: 'Awards',
    render: ({ data: d, update }) => (
      <div className="space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <FormField label="Eyebrow"><TInput value={d.awards?.eyebrow} onChange={v => update('awards.eyebrow', v)} /></FormField>
          <FormField label="Headline"><TInput value={d.awards?.headline} onChange={v => update('awards.headline', v)} /></FormField>
        </div>
        <FormField label="Subheadline"><TTextarea value={d.awards?.subheadline} onChange={v => update('awards.subheadline', v)} rows={2} /></FormField>
        <FieldArray
          label="Awards Items"
          value={d.awards?.items || []}
          onChange={v => update('awards.items', v)}
          itemSchema={[
            { name: 'year', type: 'number', label: 'Year', required: true },
            { name: 'title', type: 'text', label: 'Award Title', required: true },
            { name: 'awardedBy', type: 'text', label: 'Awarded By', required: true },
            { name: 'description', type: 'textarea', label: 'Description', span: 'full' },
            { name: 'image', type: 'text', label: 'Image URL' },
          ]}
          emptyItem={{ year: new Date().getFullYear(), title: '', awardedBy: '', description: '', image: '' }}
        />
      </div>
    ),
  },
  {
    id: 'infra', label: 'Infrastructure',
    render: ({ data: d, update }) => (
      <div className="space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <FormField label="Eyebrow"><TInput value={d.infrastructure?.eyebrow} onChange={v => update('infrastructure.eyebrow', v)} /></FormField>
          <FormField label="Headline"><TInput value={d.infrastructure?.headline} onChange={v => update('infrastructure.headline', v)} /></FormField>
        </div>
        <FormField label="Subheadline"><TTextarea value={d.infrastructure?.subheadline} onChange={v => update('infrastructure.subheadline', v)} rows={2} /></FormField>
        <FieldArray
          label="Infrastructure Photos"
          value={d.infrastructure?.photos || []}
          onChange={v => update('infrastructure.photos', v)}
          itemSchema={[
            { name: 'url', type: 'text', label: 'Image URL', required: true },
            { name: 'caption', type: 'text', label: 'Caption', required: true },
            { name: 'category', type: 'select', label: 'Category', options: ['classroom', 'library', 'reception', 'computer-lab', 'discussion-room', 'exterior', 'other'] },
            { name: 'displayOrder', type: 'number', label: 'Order' },
          ]}
          emptyItem={{ url: '', caption: '', category: 'other', displayOrder: 0 }}
        />
      </div>
    ),
  },
  {
    id: 'video', label: 'Video',
    render: ({ data: d, update }) => (
      <div className="space-y-5">
        <FormField label="Enable Video"><TToggle checked={d.video?.enabled} onChange={v => update('video.enabled', v)} /></FormField>
        <FormField label="YouTube ID"><TInput value={d.video?.youtubeId} onChange={v => update('video.youtubeId', v)} placeholder="e.g. dQw4w9WgXcQ" /></FormField>
        <FormField label="Title"><TInput value={d.video?.title} onChange={v => update('video.title', v)} /></FormField>
        <FormField label="Description"><TTextarea value={d.video?.description} onChange={v => update('video.description', v)} rows={3} /></FormField>
      </div>
    ),
  },
  {
    id: 'cta', label: 'Bottom CTA',
    render: ({ data: d, update }) => (
      <div className="space-y-5">
        <FormField label="Eyebrow"><TInput value={d.cta?.eyebrow} onChange={v => update('cta.eyebrow', v)} /></FormField>
        <FormField label="Title"><TInput value={d.cta?.title} onChange={v => update('cta.title', v)} /></FormField>
        <FormField label="Subtitle"><TTextarea value={d.cta?.subtitle} onChange={v => update('cta.subtitle', v)} rows={3} /></FormField>
      </div>
    ),
  },
  {
    id: 'seo', label: 'SEO',
    render: ({ data: d, update }) => (
      <div className="space-y-5">
        <FormField label="Meta Title"><TInput value={d.seo?.title} onChange={v => update('seo.title', v)} /></FormField>
        <FormField label="Meta Description"><TTextarea value={d.seo?.description} onChange={v => update('seo.description', v)} rows={3} /></FormField>
        <FormField label="Canonical URL"><TInput value={d.seo?.canonical} onChange={v => update('seo.canonical', v)} /></FormField>
        <FormField label="Keywords"><TInput value={d.seo?.keywords} onChange={v => update('seo.keywords', v)} /></FormField>
        <FormField label="OG Image"><TInput value={d.seo?.ogImage} onChange={v => update('seo.ogImage', v)} /></FormField>
      </div>
    ),
  },
];

export default function AboutEdit() {
  const toast = useToast();
  const [data, setData] = useState(empty());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    adminApi.get('/about').then(res => {
      const d = res.data?.data || res.data || empty();
      
      // Transform mappings for frontend FieldArrays
      if (d.founderStory?.paragraphs) {
        d.founderStory.paragraphs = d.founderStory.paragraphs.map(p => ({ text: p }));
      }
      
      if (d.founders) {
        d.founders = d.founders.map(f => ({
          ...f,
          credentials: Array.isArray(f.credentials) ? f.credentials.join(', ') : '',
          linkedin: f.socialLinks?.linkedin || '',
          twitter: f.socialLinks?.twitter || '',
        }));
      }

      if (d.journey?.milestones) {
        d.journey.milestones = d.journey.milestones.map(m => ({
          ...m,
          highlight: m.highlight ? 'true' : 'false'
        }));
      }
      
      setData(d);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  async function handleSave(d) {
    const payload = { ...d };
    
    // Transform mappings back for backend
    if (payload.founderStory?.paragraphs) {
      payload.founderStory.paragraphs = payload.founderStory.paragraphs.map(p => typeof p === 'string' ? p : p.text).filter(Boolean);
    }
    
    if (payload.founders) {
      payload.founders = payload.founders.map(f => {
        const { linkedin, twitter, credentials, ...rest } = f;
        return {
          ...rest,
          credentials: typeof credentials === 'string' ? credentials.split(',').map(c => c.trim()).filter(Boolean) : credentials,
          socialLinks: { linkedin, twitter }
        };
      });
    }

    if (payload.journey?.milestones) {
      payload.journey.milestones = payload.journey.milestones.map(m => ({
        ...m,
        highlight: m.highlight === 'true' || m.highlight === true
      }));
    }

    try {
      await adminApi.put('/about/admin', payload);
      toast.success('About page saved!');
    } catch (err) {
      toast.error(err.response?.data?.error || err.message);
    }
  }

  return (
    <FormBuilder
      title="About Page"
      tabs={TABS}
      data={data}
      onChange={setData}
      onSubmit={handleSave}
      isLoading={isLoading}
      backUrl="/admin"
    />
  );
}
