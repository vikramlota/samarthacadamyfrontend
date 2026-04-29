import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader, TestimonialCard } from '../ui';
import { useApiData } from '../../utils/customHooks';
import { staggerContainer, staggerItem, viewportConfig } from '../../lib/motion';

const SkeletonCard = () => (
  <div className="h-64 bg-gray-100 rounded-card animate-pulse" aria-hidden="true" />
);

export default function Testimonials() {
  const { data, loading } = useApiData('/testimonials', { limit: 6, featured: true });
  const items = data?.data ?? [];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Student Stories"
          title="Real Results, Real People"
          titleAccent="Real Results"
          description="Over 1,200 students have cleared government exams with Samarth Academy. Here's what some of them have to say."
        />

        <div className="mt-12">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={viewportConfig}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {items.map(t => (
                <motion.div key={t._id} variants={staggerItem}>
                  <TestimonialCard
                    name={t.name}
                    exam={t.exam}
                    selectionYear={t.selectionYear}
                    rank={t.rank}
                    photo={t.photo}
                    quote={t.quote}
                    rating={t.rating}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
