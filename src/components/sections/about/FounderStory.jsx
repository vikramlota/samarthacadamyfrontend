import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';
import { SectionHeader } from '@/components/ui';
import { FOUNDERS } from '@/data/homeStaticContent';
import { slideInLeft, slideInRight, viewportConfig } from '@/lib/motion';

export default function FounderStory({ story }) {
  const eyebrow     = story?.eyebrow     || 'The Origin';
  const title       = story?.headline    || 'Why We Started Samarth Academy';
  const paragraphs  = Array.isArray(story?.paragraphs) ? story.paragraphs : [];
  const photo       = story?.photo       || null;

  return (
    <section className="py-16 md:py-24 bg-white" aria-labelledby="founder-story-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          id="founder-story-heading"
          className="mb-14"
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={slideInLeft.initial}
            whileInView={slideInLeft.animate}
            transition={slideInLeft.transition}
            viewport={viewportConfig}
            className="space-y-5"
          >
            {paragraphs.length > 0 ? (
              paragraphs.map((p, i) => (
                <p key={i} className={`text-gray-700 leading-relaxed ${i === 0 ? 'text-lg font-medium' : 'text-base'}`}>
                  {p}
                </p>
              ))
            ) : (
              <>
                <p className="text-gray-700 leading-relaxed text-lg">
                  In 2006, Sidharth — an ex-Bank Manager at Bank of India — and Deepika — an ex-GST & Customs Inspector — saw a gap: students were being coached by people who had never sat in a government exam hall, let alone served in a government post.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  They founded Samarth Academy on a single conviction: the best person to prepare you for a government exam is someone who has already cleared one — and knows the real skills that matter inside the job, not just on paper.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Eighteen years and 800+ selections later, that conviction hasn't changed. Every batch is capped at 30 students. Both founders still teach. And every faculty member has direct government exam experience.
                </p>
              </>
            )}
          </motion.div>

          <motion.div
            initial={slideInRight.initial}
            whileInView={slideInRight.animate}
            transition={slideInRight.transition}
            viewport={viewportConfig}
            className="space-y-6"
          >
            {FOUNDERS.map(founder => (
              <blockquote
                key={founder.name}
                className="bg-red-50 border-l-4 border-red-500 rounded-r-2xl p-6 relative"
              >
                <FaQuoteLeft className="text-red-200 text-3xl mb-3" aria-hidden="true" />
                <p className="text-gray-800 leading-relaxed italic mb-4">"{founder.quote}"</p>
                <footer className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-sm">{founder.initials}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{founder.name}</p>
                    <p className="text-xs text-red-500">{founder.credential}</p>
                  </div>
                </footer>
              </blockquote>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
