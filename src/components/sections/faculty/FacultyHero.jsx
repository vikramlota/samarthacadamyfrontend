import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui';
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/motion';

export default function FacultyHero({ hero }) {
  const eyebrow     = hero?.eyebrow     || 'Our Faculty';
  const title       = hero?.title       || 'Every Teacher Here Has Cleared an Exam Like Yours';
  const description = hero?.description || 'We don\'t hire career tutors. Every faculty member at Samarth Academy served in a government post before joining the classroom.';

  return (
    <section className="relative gradient-primary section-padding" aria-labelledby="faculty-hero-heading">
      <div className="absolute inset-0 bg-dot-pattern-dark opacity-10 pointer-events-none" aria-hidden="true" />

      <div className="container-custom relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-3xl"
        >
          <motion.p variants={staggerItem} className="text-orange-200 text-sm font-semibold uppercase tracking-wider mb-3">
            {eyebrow}
          </motion.p>
          <motion.h1
            id="faculty-hero-heading"
            variants={staggerItem}
            className="heading-display text-4xl md:text-5xl font-bold text-white leading-tight text-balance mb-5"
          >
            {title}
          </motion.h1>
          <motion.p variants={staggerItem} className="text-lg text-red-100 leading-relaxed max-w-2xl">
            {description}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
