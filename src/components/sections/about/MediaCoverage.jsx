import React from 'react';
import { motion } from 'framer-motion';
import { FaNewspaper, FaExternalLinkAlt } from 'react-icons/fa';
import { SectionHeader } from '@/components/ui';
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/motion';

export default function MediaCoverage({ media }) {
  if (!media || media.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-brand-bg" aria-labelledby="media-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="In the News"
          title="Media Coverage"
          description="How the press has covered Samarth Academy's results and approach."
          className="mb-12"
        />

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {media.map((item, i) => (
            <motion.a
              key={item.id || i}
              variants={staggerItem}
              href={item.url || '#'}
              target={item.url ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="bg-white rounded-2xl border border-gray-100 shadow-soft p-6 flex flex-col gap-4 hover:-translate-y-0.5 hover:shadow-card transition-all duration-base group"
            >
              <div className="flex items-center justify-between">
                {item.logo ? (
                  <img src={item.logo} alt={item.outlet} className="h-7 object-contain" />
                ) : (
                  <div className="flex items-center gap-2">
                    <FaNewspaper className="text-gray-400" aria-hidden="true" />
                    <span className="font-semibold text-sm text-gray-700">{item.outlet}</span>
                  </div>
                )}
                {item.date && <span className="text-xs text-gray-400">{item.date}</span>}
              </div>

              <p className="text-sm text-gray-800 font-medium leading-snug flex-1">{item.headline}</p>

              {item.url && (
                <div className="flex items-center gap-1.5 text-xs text-red-500 font-medium group-hover:text-red-600">
                  Read article <FaExternalLinkAlt className="text-[10px]" aria-hidden="true" />
                </div>
              )}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
