import React from 'react';
import { motion } from 'framer-motion';
import { FaPenNib } from 'react-icons/fa';
import { Badge } from '@/components/ui';
import { staggerContainer, staggerItem } from '@/lib/motion';

export default function BlogHero() {
  return (
    <section
      className="relative bg-brand-bg py-16 md:py-24 overflow-hidden"
      aria-labelledby="blog-hero-heading"
    >
      <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none" aria-hidden="true" />

      <div className="container-custom relative">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div variants={staggerItem}>
            <Badge variant="red" icon={FaPenNib} size="md">FROM OUR BLOG</Badge>
          </motion.div>

          <motion.h1
            id="blog-hero-heading"
            variants={staggerItem}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mt-4 leading-[1.1] text-balance"
          >
            Insights for Your{' '}
            <span className="text-red-500">Government Job Journey</span>
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="text-lg md:text-xl text-gray-600 mt-6 max-w-2xl mx-auto leading-relaxed"
          >
            Exam strategies, syllabus deep-dives, career guidance, and the latest
            updates — written by ex-government officers and subject experts.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
