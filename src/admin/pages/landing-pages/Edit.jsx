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
    seo: { title: '', description: '', keywords: '', canonical: '', ogImage: '' },
    hero: { badge: '', headline: '', headlineAccent: '', subheadline: '', trustPoints: [] },
    quickInfo: { duration: '', fees: '', batchSize: '', mode: '' },
    overview: { paragraphs: [], examStats: [] },
    whyChoose: [],
    courseDetails: { enrollNowLink: '', inclusions: [], fees: { original: 0, discounted: 0, currency: '₹', emiAvailable: false, emiNote: '' } },
    syllabus: { subjects: [] },
    faqs: [],
    midCta: { eyebrow: '', title: '', description: '', trustPoints: [] },
    finalCta: { eyebrow: '', title: '', subtitle: '' },
    facultyTags: [],
  };
}

const TABS = [
  {
    id: 'general', label: 'General',
    render: ({ data: d, update }) => (
      <div className="grid md:grid-cols-2 gap-5">
        <FormField label="Exam Short Name" required><TInput value={d.examShortName} onChange={v => update('examShortName', v)} placeholder="SSC" required /></FormField>
        <FormField label="Exam Full Name" required><TInput value={d.examFullName} onChange={v => update('examFullName', v)} placeholder="SSC CGL / CHSL / MTS / CPO" required /></FormField>
        <FormField label="URL Slug" required hint="e.g. ssc-coaching-amritsar — used in the page URL"><TInput value={d.slug} onChange={v => update('slug', v.toLowerCase().replace(/\s+/g, '-'))} placeholder="ssc-coaching-amritsar" required /></FormField>
        <FormField label="Status"><TToggle label="Active (visible on site)" checked={d.active} onChange={v => update('active', v)} /></FormField>
        <div className="md:col-span-2"><FormField label="Display Order" hint="Lower numbers appear first"><TInput type="number" value={d.displayOrder || 0} onChange={v => update('displayOrder', Number(v))} placeholder="1" /></FormField></div>
      </div>
    ),
  },
  {
    id: 'seo', label: 'SEO',
    render: ({ data: d, update }) => (
      <div className="space-y-5">
        <FormField label="Meta Title" hint="Ideal: 150–200 chars" required><TInput value={d.seo?.title} onChange={v => update('seo.title', v)} placeholder="UPSC Coaching in Prayagraj | Samarth Academy" required /></FormField>
        <FormField label="Meta Description" hint="Ideal: 150–500 chars" required><TTextarea value={d.seo?.description} onChange={v => update('seo.description', v)} rows={5} required /></FormField>
        <FormField label="Canonical URL" required hint="e.g. https://thesamarthacademy.in/ssc-coaching-amritsar"><TInput value={d.seo?.canonical} onChange={v => update('seo.canonical', v)} placeholder="https://thesamarthacademy.in/..." required /></FormField>
        <FormField label="Keywords"><TInput value={d.seo?.keywords} onChange={v => update('seo.keywords', v)} placeholder="Comma-separated keywords" /></FormField>
        <FormField label="OG Image URL"><TInput value={d.seo?.ogImage} onChange={v => update('seo.ogImage', v)} placeholder="https://..." /></FormField>
      </div>
    ),
  },
  {
    id: 'hero', label: 'Hero',
    render: ({ data: d, update }) => (
      <div className="space-y-5">
        <FormField label="Badge" hint="e.g. 🏆 500+ SSC Selections"><TInput value={d.hero?.badge} onChange={v => update('hero.badge', v)} placeholder="🏆 500+ SSC Selections" /></FormField>
        <FormField label="Headline" required><TInput value={d.hero?.headline} onChange={v => update('hero.headline', v)} placeholder="Best SSC Coaching in" required /></FormField>
        <FormField label="Headline Accent" hint="Part of headline with different styling"><TInput value={d.hero?.headlineAccent} onChange={v => update('hero.headlineAccent', v)} placeholder="Amritsar" /></FormField>
        <FormField label="Subheadline" required><TTextarea value={d.hero?.subheadline} onChange={v => update('hero.subheadline', v)} rows={2} required /></FormField>
        <FieldArray
          label="Trust Points"
          value={d.hero?.trustPoints || []}
          onChange={v => update('hero.trustPoints', v)}
          itemSchema={[{ name: 'text', type: 'text', label: 'Trust point', required: true }]}
          emptyItem={{ text: '' }}
        />
      </div>
    ),
  },
  {
    id: 'quickInfo', label: 'Quick Info',
    render: ({ data: d, update }) => (
      <div className="grid md:grid-cols-2 gap-5">
        <FormField label="Duration"><TInput value={d.quickInfo?.duration} onChange={v => update('quickInfo.duration', v)} placeholder="6–12 months (exam-wise)" /></FormField>
        <FormField label="Fees"><TInput value={d.quickInfo?.fees} onChange={v => update('quickInfo.fees', v)} placeholder="₹12,000 – ₹18,000" /></FormField>
        <FormField label="Batch Size"><TInput value={d.quickInfo?.batchSize} onChange={v => update('quickInfo.batchSize', v)} placeholder="30 students max" /></FormField>
        <FormField label="Mode"><TInput value={d.quickInfo?.mode} onChange={v => update('quickInfo.mode', v)} placeholder="Classroom (Amritsar)" /></FormField>
      </div>
    ),
  },
  {
    id: 'overview', label: 'Overview',
    render: ({ data: d, update }) => (
      <div className="space-y-5">
        <FieldArray
          label="Overview Paragraphs"
          value={d.overview?.paragraphs || []}
          onChange={v => update('overview.paragraphs', v)}
          itemSchema={[{ name: 'text', type: 'textarea', label: 'Paragraph', required: true, span: 'full' }]}
          emptyItem={{ text: '' }}
        />
        <FieldArray
          label="Exam Stats"
          value={d.overview?.examStats || []}
          onChange={v => update('overview.examStats', v)}
          itemSchema={[
            { name: 'iconName', type: 'text', label: 'Icon Name (e.g., FaBriefcase)', required: true },
            { name: 'label', type: 'text', label: 'Label', required: true },
            { name: 'value', type: 'text', label: 'Value', required: true },
          ]}
          emptyItem={{ iconName: '', label: '', value: '' }}
        />
      </div>
    ),
  },
  {
    id: 'whyChoose', label: 'Why Choose',
    render: ({ data: d, update }) => (
      <FieldArray
        label="Why Choose Points"
        value={d.whyChoose || []}
        onChange={v => update('whyChoose', v)}
        itemSchema={[
          { name: 'iconName', type: 'text', label: 'Icon Name (e.g., FaUserTie)', required: true },
          { name: 'title', type: 'text', label: 'Title', required: true },
          { name: 'description', type: 'textarea', label: 'Description', required: true, span: 'full' },
          { name: 'iconBg', type: 'select', label: 'Icon Background', options: ['red', 'orange'] },
        ]}
        emptyItem={{ iconName: '', title: '', description: '', iconBg: 'red' }}
      />
    ),
  },
  {
    id: 'courseDetails', label: 'Course Details',
    render: ({ data: d, update }) => (
      <div className="space-y-5">
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">Fees</h3>
          <div className="grid md:grid-cols-2 gap-5">
            <FormField label="Original Price"><TInput type="number" value={d.courseDetails?.fees?.original || 0} onChange={v => update('courseDetails.fees.original', Number(v))} placeholder="18000" /></FormField>
            <FormField label="Discounted Price" required><TInput type="number" value={d.courseDetails?.fees?.discounted || 0} onChange={v => update('courseDetails.fees.discounted', Number(v))} placeholder="15000" required /></FormField>
          </div>
          <FormField label="Currency"><TInput value={d.courseDetails?.fees?.currency} onChange={v => update('courseDetails.fees.currency', v)} placeholder="₹" /></FormField>
          <FormField label="EMI Available"><TToggle checked={d.courseDetails?.fees?.emiAvailable} onChange={v => update('courseDetails.fees.emiAvailable', v)} /></FormField>
          {d.courseDetails?.fees?.emiAvailable && (
            <FormField label="EMI Note"><TInput value={d.courseDetails?.fees?.emiNote} onChange={v => update('courseDetails.fees.emiNote', v)} placeholder="Pay ₹7,500 now + ₹7,500 after 3 months" /></FormField>
          )}
        </div>
        <FormField label="Enroll Now Link" hint="Link for the Enroll Now button on this course page"><TInput value={d.courseDetails?.enrollNowLink} onChange={v => update('courseDetails.enrollNowLink', v)} placeholder="/book-demo or https://..." /></FormField>
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
        label="Subjects"
        value={d.syllabus?.subjects || []}
        onChange={v => update('syllabus.subjects', v)}
        itemSchema={[
          { name: 'name', type: 'text', label: 'Subject Name', required: true },
          { name: 'topics', type: 'textarea', label: 'Topics (comma separated)', span: 'full' },
        ]}
        emptyItem={{ name: '', topics: '' }}
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
          { name: 'order', type: 'number', label: 'Display Order' },
        ]}
        emptyItem={{ question: '', answer: '', order: 0 }}
      />
    ),
  },
  {
    id: 'midCta', label: 'Mid-Page CTA',
    render: ({ data: d, update }) => (
      <div className="space-y-5">
        <FormField label="Eyebrow"><TInput value={d.midCta?.eyebrow} onChange={v => update('midCta.eyebrow', v)} placeholder="🔥 Batch Filling Fast" /></FormField>
        <FormField label="Title"><TInput value={d.midCta?.title} onChange={v => update('midCta.title', v)} placeholder="Only 30 Seats Per Batch — Book Yours Today" /></FormField>
        <FormField label="Description"><TTextarea value={d.midCta?.description} onChange={v => update('midCta.description', v)} rows={3} placeholder="Join the coaching centre trusted by 500+ SSC selections in Amritsar. Free demo class — no commitment needed." /></FormField>
        <FieldArray
          label="Trust Points"
          value={d.midCta?.trustPoints || []}
          onChange={v => update('midCta.trustPoints', v)}
          itemSchema={[{ name: 'text', type: 'text', label: 'Trust point', required: true }]}
          emptyItem={{ text: '' }}
        />
      </div>
    ),
  },
  {
    id: 'finalCta', label: 'Final CTA',
    render: ({ data: d, update }) => (
      <div className="space-y-5">
        <FormField label="Eyebrow"><TInput value={d.finalCta?.eyebrow} onChange={v => update('finalCta.eyebrow', v)} placeholder="Your government job is one decision away" /></FormField>
        <FormField label="Title"><TInput value={d.finalCta?.title} onChange={v => update('finalCta.title', v)} placeholder="Start Your SSC Preparation Today" /></FormField>
        <FormField label="Subtitle"><TInput value={d.finalCta?.subtitle} onChange={v => update('finalCta.subtitle', v)} placeholder="Call us, WhatsApp us, or walk into our centre in Amritsar. We'll match you to the right batch." /></FormField>
      </div>
    ),
  },
  {
    id: 'tags', label: 'Faculty Tags',
    render: ({ data: d, update }) => (
      <FormField label="Tags"><TagInput value={d.facultyTags || []} onChange={v => update('facultyTags', v)} /></FormField>
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
    adminApi.get(`/landing-pages/admin/${id}`).then(res => { 
      const data = res.data;
      // Convert data from backend format to frontend format
      if (data.hero?.trustPoints) {
        data.hero.trustPoints = data.hero.trustPoints.map(tp => ({ text: tp }));
      }
      if (data.midCta?.trustPoints) {
        data.midCta.trustPoints = data.midCta.trustPoints.map(tp => ({ text: tp }));
      }
      if (data.syllabus?.subjects) {
        data.syllabus.subjects = data.syllabus.subjects.map(s => ({
          ...s,
          topics: Array.isArray(s.topics) ? s.topics.join(', ') : s.topics
        }));
      }
      if (data.overview?.paragraphs) {
        data.overview.paragraphs = data.overview.paragraphs.map(p => ({ text: p }));
      }
      if (data.courseDetails?.inclusions) {
        data.courseDetails.inclusions = data.courseDetails.inclusions.map(i => ({ text: i }));
      }
      setData(data); 
      setIsLoading(false); 
    }).catch(() => setIsLoading(false));
  }, [id, isNew]);

  async function handleSave(d) {
    // Transform data to match backend expectations
    const processedData = {
      ...d,
      hero: {
        ...d.hero,
        trustPoints: (d.hero?.trustPoints || []).map(tp => typeof tp === 'string' ? tp : tp.text).filter(Boolean)
      },
      midCta: d.midCta ? {
        ...d.midCta,
        trustPoints: (d.midCta?.trustPoints || []).map(tp => typeof tp === 'string' ? tp : tp.text).filter(Boolean)
      } : undefined,
      overview: {
        ...d.overview,
        paragraphs: (d.overview?.paragraphs || []).map(p => typeof p === 'string' ? p : p.text).filter(Boolean)
      },
      courseDetails: {
        ...d.courseDetails,
        inclusions: (d.courseDetails?.inclusions || []).map(i => typeof i === 'string' ? i : i.text).filter(Boolean)
      },
      syllabus: {
        ...d.syllabus,
        subjects: (d.syllabus?.subjects || []).map(s => ({
          ...s,
          topics: typeof s.topics === 'string' 
            ? s.topics.split(',').map(t => t.trim()).filter(Boolean)
            : s.topics || []
        }))
      }
    };

    const res = isNew
      ? await adminApi.post('/landing-pages/admin', processedData)
      : await adminApi.put(`/landing-pages/admin/${id}`, processedData);
    toast.success(isNew ? 'Created!' : 'Saved!');
    if (isNew) navigate(`/admin/landing-pages/${res.data._id}`, { replace: true });
  }

  async function handleDelete() {
    await adminApi.delete(`/landing-pages/admin/${id}`);
    toast.success('Deleted');
    navigate('/admin/landing-pages');
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
      backUrl="/admin/landing-pages"
    />
  );
}
