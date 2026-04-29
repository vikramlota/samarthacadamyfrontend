import React from 'react';
import { motion } from 'framer-motion';
import { FaTrophy } from 'react-icons/fa';
import { SectionHeader, Badge } from '@/components/ui';
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/motion';

export default function AwardsRecognition({ awards }) {
  if (!awards || awards.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-brand-bg" aria-labelledby="awards-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Recognition"
          title="Awards & Achievements"
          description="Formal recognition of the results our students achieve."
          className="mb-12"
        />

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {awards.map((award, i) => (
            <motion.div
              key={award.id || i}
              variants={staggerItem}
              className="bg-white rounded-2xl border border-yellow-100 p-6 flex gap-4 items-start shadow-soft"
            >
              <div className="w-11 h-11 rounded-xl bg-yellow-50 flex items-center justify-center shrink-0">
                <FaTrophy className="text-yellow-500 text-lg" aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm leading-snug">{award.title}</p>
                {award.year && (
                  <Badge variant="orange" size="sm" className="mt-2">{award.year}</Badge>
                )}
                {award.description && (
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">{award.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
