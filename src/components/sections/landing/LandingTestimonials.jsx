import React from 'react';
import { motion } from 'framer-motion';
import { useApiData } from '@/hooks/useApiData';
import { SectionHeader, TestimonialCard } from '@/components/ui';
import { SkeletonCard } from '@/components/ui/Skeleton';
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/motion';

export default function LandingTestimonials({ courseSlug, examShortName }) {
  const { data: testimonials, isLoading } = useApiData(
    `/testimonials?exam=${courseSlug}&limit=4`,
    { fallback: [] },
  );

  if (!isLoading && !testimonials?.length) return null;

  return (
    <section className="bg-white section-padding" aria-labelledby="testimonials-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Student Voices"
          title={`What Our ${examShortName} Students Say`}
          description="Unfiltered feedback from students who cleared their exams after training with us."
          className="mb-12"
        />

        {isLoading ? (
          <div className="grid sm:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            className="grid sm:grid-cols-2 gap-6"
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
