import React from 'react';
import { motion } from 'framer-motion';
import { useApiData } from '@/hooks/useApiData';
import { SectionHeader, Card, Badge } from '@/components/ui';
import { SkeletonCard } from '@/components/ui/Skeleton';
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/motion';

export default function LandingFaculty({ courseSlug, examShortName }) {
  const { data: faculty, isLoading } = useApiData(
    `/faculty?exam=${courseSlug}`,
    { fallback: [] },
  );

  if (!isLoading && !faculty?.length) return null;

  return (
    <section className="bg-white section-padding" aria-labelledby="faculty-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Meet Your Teachers"
          title={`Learn From ${examShortName} Experts`}
          description="Faculty who have cleared the exam themselves — or spent years training those who did."
          className="mb-12"
        />

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {faculty.map((f, i) => (
              <motion.div key={f.id || i} variants={staggerItem}>
                <Card hover className="text-center p-6">
                  <img
                    src={f.photo}
                    alt={f.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-red-50"
                    loading="lazy"
                    onError={e => { e.currentTarget.style.display = 'none'; }}
                  />
                  <h3 className="heading-display text-lg font-semibold text-gray-900">{f.name}</h3>
                  <p className="text-sm text-red-500 font-medium mt-1">{f.designation}</p>
                  {f.experience && (
                    <p className="text-xs text-gray-500 mt-1">{f.experience}+ years experience</p>
                  )}
                  {f.qualification && (
                    <p className="text-sm text-gray-600 mt-2 leading-snug">{f.qualification}</p>
                  )}
                  {f.subjects?.length > 0 && (
                    <div className="flex flex-wrap gap-1 justify-center mt-3">
                      {f.subjects.map(sub => (
                        <Badge variant="gray" size="sm" key={sub}>{sub}</Badge>
                      ))}
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
