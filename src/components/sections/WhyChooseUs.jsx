import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader, Card } from '@/components/ui';
import { ICON_MAP } from '@/lib/iconMap';
import { WHY_FEATURES } from '@/data/homeStaticContent';
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/motion';

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-brand-bg" aria-labelledby="why-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Why Samarth Academy"
          title="This Is Not Mass Coaching"
          description="Every decision we make — batch size, curriculum, teaching style — is built around one goal: your selection."
          className="mb-12"
        />

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {WHY_FEATURES.map(feature => {
            const Icon = ICON_MAP[feature.icon];
            return (
              <motion.div key={feature.title} variants={staggerItem}>
                <Card hover={false} className="h-full">
                  {Icon && (
                    <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
                      <Icon className="text-xl text-red-500" aria-hidden="true" />
                    </div>
                  )}
                  <h3 className="text-base font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
