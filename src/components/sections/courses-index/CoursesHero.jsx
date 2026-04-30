import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/motion';

export default function CoursesHero() {
  return (
    <section className="relative gradient-accent-soft section-padding overflow-hidden" aria-labelledby="courses-hero-heading">
      <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" aria-hidden="true" />

      <div className="container-custom relative z-10 text-center">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.p
            variants={staggerItem}
            className="text-red-500 text-sm font-semibold uppercase tracking-wider mb-4"
          >
            Our Courses
          </motion.p>
          <motion.h1
            id="courses-hero-heading"
            variants={staggerItem}
            className="heading-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-balance mb-6"
          >
            Find Your Path to a{' '}
            <span className="text-red-500">Government Job</span>
          </motion.h1>
          <motion.p
            variants={staggerItem}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            From SSC to Punjab Police — comprehensive coaching for every major government exam, taught by ex-government officers who cleared them.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
