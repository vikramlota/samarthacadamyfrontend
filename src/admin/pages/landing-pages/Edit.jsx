import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { adminApi } from '../../lib/api';
import { useToast } from '../../components/Toast';
import { useAuth } from '../../context/AuthContext';
import FormBuilder from '../../components/FormBuilder';
import FieldArray from '../../components/FieldArray';
import ImageUpload from '../../components/ImageUpload';
import JoditEditor from '../../components/JoditEditor';
import FormField, { TInput, TTextarea, TToggle, TagInput, TSelect } from '../../components/FormField';

function empty() {
  return {
    examShortName: '', examFullName: '', slug: '', active: true,
    seo: { title: '', description: '', keywords: [] },
    hero: { headline: '', subheadline: '', backgroundImage: '', ctaText: '', ctaLink: '' },
    quickInfo: [],
    overview: { intro: '', highlights: [] },
    whyChoose: { points: [] },
    courseDetails: { duration: '', mode: '', fee: '', inclusions: [] },
    syllabus: { topics: [] },
    faqs: [],
    ctas: { midPageHeadline: '', midPageSubtext: '', finalHeadline: '', finalSubtext: '' },
    tags: [],
  };
}

const TABS = [
  {
    id: 'general', label: 'General',
    render: ({ data: d, update }) => (
      <div className="grid md:grid-cols-2 gap-5">
        <FormField label="Exam Short Name" required><TInput value={d.examShortName} onChange={v => update('examShortName', v)} placeholder="UPSC" required /></FormField>
        <FormField label="Exam Full Name"><TInput value={d.examFullName} onChange={v => update('examFullName', v)} placeholder="Union Public Service Commission" /></FormField>
        <FormField label="URL Slug" required hint="e.g. upsc — used in the page URL"><TInput value={d.slug} onChange={v => update('slug', v.toLowerCase().replace(/\s+/g, '-'))} placeholder="upsc" required /></FormField>
        <FormField label="Status"><TToggle label="Active (visible on site)" checked={d.active} onChange={v => update('active', v)} /></FormField>
        <div className="md:col-span-2"><FormField label="Tags"><TagInput value={d.tags || []} onChange={v => update('tags', v)} /></FormField></div>
      </div>
    ),
  },
  {
    id: 'seo', label: 'SEO',
    render: ({ data: d, update }) => (
      <div className="space-y-5">
        <FormField label="Meta Title" hint="Ideal: 50–60 chars"><TInput value={d.seo?.title} onChange={v => update('seo.title', v)} placeholder="UPSC Coaching in Prayagraj | Samarth Academy" /></FormField>
        <FormField label="Meta Description" hint="Ideal: 150–160 chars"><TTextarea value={d.seo?.description} onChange={v => update('seo.description', v)} rows={3} /></FormField>
        <FormField label="Keywords"><TagInput value={d.seo?.keywords || []} onChange={v => update('seo.keywords', v)} /></FormField>
      </div>
    ),
  },
  {
    id: 'hero', label: 'Hero',
    render: ({ data: d, update }) => (
      <div className="space-y-5">
        <FormField label="Headline"><TInput value={d.hero?.headline} onChange={v => update('hero.headline', v)} /></FormField>
        <FormField label="Subheadline"><TTextarea value={d.hero?.subheadline} onChange={v => update('hero.subheadline', v)} rows={2} /></FormField>
        <ImageUpload label="Background Image" value={d.hero?.backgroundImage} onChange={v => update('hero.backgroundImage', v)} />
        <div className="grid md:grid-cols-2 gap-5">
          <FormField label="CTA Button Text"><TInput value={d.hero?.ctaText} onChange={v => update('hero.ctaText', v)} placeholder="Enroll Now" /></FormField>
          <FormField label="CTA Link"><TInput value={d.hero?.ctaLink} onChange={v => update('hero.ctaLink', v)} placeholder="/contact" /></FormField>
        </div>
      </div>
    ),
  },
  {
    id: 'quickInfo', label: 'Quick Info',
    render: ({ data: d, update }) => (
      <FieldArray
        label="Quick Info Cards"
        value={d.quickInfo || []}
        onChange={v => update('quickInfo', v)}
        itemSchema={[
          { name: 'icon', type: 'text', label: 'Icon name (FaBook etc.)' },
          { name: 'label', type: 'text', label: 'Label', required: true },
          { name: 'value', type: 'text', label: 'Value', required: true },
        ]}
        emptyItem={{ icon: '', label: '', value: '' }}
      />
    ),
  },
  {
    id: 'overview', label: 'Overview',
    render: ({ data: d, update }) => (
      <div className="space-y-5">
        <FormField label="Intro Text"><TTextarea value={d.overview?.intro} onChange={v => update('overview.intro', v)} rows={4} /></FormField>
        <FieldArray
          label="Highlights"
          value={d.overview?.highlights || []}
          onChange={v => update('overview.highlights', v)}
          itemSchema={[{ name: 'text', type: 'text', label: 'Highlight point', required: true }]}
          emptyItem={{ text: '' }}
        />
      </div>
    ),
  },
  {
    id: 'whyChoose', label: 'Why Choose',
    render: ({ data: d, update }) => (
      <FieldArray
        label="Why Choose Points"
        value={d.whyChoose?.points || []}
        onChange={v => update('whyChoose.points', v)}
        itemSchema={[
          { name: 'title', type: 'text', label: 'Title', required: true },
          { name: 'description', type: 'textarea', label: 'Description', span: 'full' },
          { name: 'icon', type: 'text', label: 'Icon (Fa...)' },
        ]}
        emptyItem={{ title: '', description: '', icon: '' }}
      />
    ),
  },
  {
    id: 'courseDetails', label: 'Course Details',
    render: ({ data: d, update }) => (
      <div className="space-y-5">
        <div className="grid md:grid-cols-3 gap-5">
          <FormField label="Duration"><TInput value={d.courseDetails?.duration} onChange={v => update('courseDetails.duration', v)} placeholder="1 Year" /></FormField>
          <FormField label="Mode"><TInput value={d.courseDetails?.mode} onChange={v => update('courseDetails.mode', v)} placeholder="Offline / Online" /></FormField>
          <FormField label="Fee"><TInput value={d.courseDetails?.fee} onChange={v => update('courseDetails.fee', v)} placeholder="₹45,000" /></FormField>
        </div>
        <FieldArray
          label="What's Included"
          value={d.courseDetails?.inclusions || []}
          onChange={v => update('courseDetails.inclusions', v)}
          itemSchema={[{ name: 'text', type: 'text', label: 'Inclusion', required: true }]}
          emptyItem={{ text: '' }}
        />
      </div>
    ),
  },
  {
    id: 'syllabus', label: 'Syllabus',
    render: ({ data: d, update }) => (
      <FieldArray
        label="Syllabus Topics"
        value={d.syllabus?.topics || []}
        onChange={v => update('syllabus.topics', v)}
        itemSchema={[
          { name: 'subject', type: 'text', label: 'Subject', required: true },
          { name: 'topics', type: 'textarea', label: 'Topics (comma separated)', span: 'full' },
        ]}
        emptyItem={{ subject: '', topics: '' }}
      />
    ),
  },
  {
    id: 'faqs', label: 'FAQs',
    render: ({ data: d, update }) => (
      <FieldArray
        label="Frequently Asked Questions"
        value={d.faqs || []}
        onChange={v => update('faqs', v)}
        itemSchema={[
          { name: 'question', type: 'text', label: 'Question', required: true },
          { name: 'answer', type: 'textarea', label: 'Answer', span: 'full', required: true },
        ]}
        emptyItem={{ question: '', answer: '' }}
      />
    ),
  },
  {
    id: 'ctas', label: 'CTAs',
    render: ({ data: d, update }) => (
      <div className="grid md:grid-cols-2 gap-5">
        <FormField label="Mid-Page Headline"><TInput value={d.ctas?.midPageHeadline} onChange={v => update('ctas.midPageHeadline', v)} /></FormField>
        <FormField label="Mid-Page Subtext"><TInput value={d.ctas?.midPageSubtext} onChange={v => update('ctas.midPageSubtext', v)} /></FormField>
        <FormField label="Final CTA Headline"><TInput value={d.ctas?.finalHeadline} onChange={v => update('ctas.finalHeadline', v)} /></FormField>
        <FormField label="Final CTA Subtext"><TInput value={d.ctas?.finalSubtext} onChange={v => update('ctas.finalSubtext', v)} /></FormField>
      </div>
    ),
  },
];

export default function LandingPageEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { canDelete } = useAuth();
  const isNew = !id || id === 'new';

  const [data, setData] = useState(empty());
  const [isLoading, setIsLoading] = useState(!isNew);

  useEffect(() => {
    if (isNew) return;
    adminApi.get(`/landing-pages/admin/${id}`).then(res => { setData(res.data); setIsLoading(false); }).catch(() => setIsLoading(false));
  }, [id]);

  async function handleSave(d) {
    const res = isNew
      ? await adminApi.post('/landing-pages/admin', d)
      : await adminApi.put(`/landing-pages/admin/${id}`, d);
    toast.success(isNew ? 'Created!' : 'Saved!');
    if (isNew) navigate(`/landing-pages/${res.data._id}`, { replace: true });
  }

  async function handleDelete() {
    await adminApi.delete(`/landing-pages/admin/${id}`);
    toast.success('Deleted');
    navigate('/landing-pages');
  }

  return (
    <FormBuilder
      title={isNew ? 'New Landing Page' : `Edit: ${data.examShortName || '…'}`}
      tabs={TABS}
      data={data}
      onChange={setData}
      onSubmit={handleSave}
      onDelete={!isNew && canDelete ? handleDelete : undefined}
      isLoading={isLoading}
      backUrl="/landing-pages"
    />
  );
}
