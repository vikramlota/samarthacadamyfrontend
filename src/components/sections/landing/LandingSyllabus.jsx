import React from 'react';
import { SectionHeader, FAQ } from '@/components/ui';

export default function LandingSyllabus({ syllabus }) {
  if (!syllabus?.subjects?.length) return null;

  const items = syllabus.subjects.map(subject => ({
    question: subject.name,
    answer: (
      <ul className="list-disc pl-5 space-y-1.5 text-gray-700 text-sm">
        {subject.topics?.map(topic => <li key={topic}>{topic}</li>)}
      </ul>
    ),
  }));

  return (
    <section className="bg-brand-bg section-padding" aria-labelledby="syllabus-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Exam Syllabus"
          title="What We Cover"
          description="Topic-by-topic breakdown of the complete exam syllabus, exactly as taught in our batches."
          className="mb-10"
        />
        <div className="max-w-3xl mx-auto">
          <FAQ items={items} allowMultiple={true} defaultOpen={0} variant="boxed" />
        </div>
      </div>
    </section>
  );
}
