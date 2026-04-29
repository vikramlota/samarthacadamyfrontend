import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui';
import { getIcon } from '@/lib/iconMap';
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/motion';

export default function LandingOverview({ overview, examShortName }) {
  if (!overview) return null;

  return (
    <section className="bg-white section-padding" aria-labelledby="overview-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="About the Exam"
          title={`What is ${examShortName}?`}
          description={overview.paragraphs?.[0]}
          className="mb-10"
        />

        {/* Additional paragraphs */}
        {overview.paragraphs?.slice(1).map((para, i) => (
          <p key={i} className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 max-w-3xl mx-auto text-center">
            {para}
          </p>
        ))}

        {/* Exam stats grid */}
        {overview.examStats?.length > 0 && (
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10"
          >
            {overview.examStats.map((stat, i) => {
              const Icon = getIcon(stat.iconName);
              return (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="bg-red-50 rounded-card p-6 text-center"
                >
                  {Icon && (
                    <Icon className="text-red-500 text-3xl mx-auto mb-3" aria-hidden="true" />
                  )}
                  <p className="heading-display text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
