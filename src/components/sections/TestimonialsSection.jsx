import React from 'react';
import { motion } from 'framer-motion';
import { useApiData } from '@/hooks/useApiData';
import { SectionHeader, TestimonialCard } from '@/components/ui';
import { SkeletonCard } from '@/components/ui/Skeleton';
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/motion';

export default function TestimonialsSection() {
  const { data: testimonials, isLoading } = useApiData(
    '/testimonials?limit=6&featured=true',
    { fallback: [] },
  );

  if (!isLoading && (!testimonials || testimonials.length === 0)) return null;

  return (
    <section className="py-16 md:py-24 bg-white" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Student Stories"
          title="Results That Speak"
          description="Hear from students who cleared their exams after training at Samarth Academy."
          className="mb-12"
        />

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div key={t.id || i} variants={staggerItem}>
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
    </section>
  );
}
