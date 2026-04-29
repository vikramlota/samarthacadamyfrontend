import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader, Card } from '@/components/ui';
import { getIcon } from '@/lib/iconMap';
import { cn } from '@/lib/utils';
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/motion';

export default function LandingWhyChoose({ features, examShortName }) {
  if (!features?.length) return null;

  return (
    <section className="bg-brand-bg section-padding" aria-labelledby="why-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow={`Why Samarth for ${examShortName}`}
          title={`${examShortName}-Specific Excellence`}
          description="Everything about our coaching is built around this specific exam — the syllabus, mock tests, interview prep, and faculty."
          className="mb-12"
        />

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, i) => {
            const Icon = getIcon(feature.iconName);
            const colorBase = feature.iconBg || 'red';
            return (
              <motion.div key={i} variants={staggerItem}>
                <Card hover={false} className="h-full">
                  {Icon && (
                    <div
                      className={cn(
                        'w-14 h-14 rounded-2xl flex items-center justify-center mb-4',
                        `bg-${colorBase}-50`,
                      )}
                    >
                      <Icon
                        className={cn('text-2xl', `text-${colorBase}-500`)}
                        aria-hidden="true"
                      />
                    </div>
                  )}
                  <h3 className="heading-display text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
