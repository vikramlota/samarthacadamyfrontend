import React from 'react';
import { SectionHeader, FAQ } from '@/components/ui';
import { CONTACT } from '@/data/homeStaticContent';

export default function LandingFaq({ faqs, examShortName }) {
  if (!faqs?.length) return null;

  // Backend may send HTML strings (Jodit-edited) — wrap in span for safe rendering
  const items = faqs.map(faq => ({
    question: faq.question,
    answer: typeof faq.answer === 'string' && faq.answer.includes('<')
      ? <span dangerouslySetInnerHTML={{ __html: faq.answer }} />
      : faq.answer,
  }));

  return (
    <section className="bg-white section-padding" aria-labelledby="faq-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Frequently Asked Questions"
          title={`${examShortName} Coaching FAQs`}
          description="Common questions from students before they enrol."
          className="mb-10"
        />

        <div className="max-w-3xl mx-auto">
          <FAQ items={items} allowMultiple={false} defaultOpen={0} />
        </div>

        <p className="text-center text-sm text-gray-500 mt-10">
          Have a question not listed here?{' '}
          <a href={CONTACT.phoneTel} className="text-red-500 font-medium hover:underline">
            Call us
          </a>
          {' '}or{' '}
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-500 font-medium hover:underline"
          >
            WhatsApp us
          </a>
          .
        </p>
      </div>
    </section>
  );
}
