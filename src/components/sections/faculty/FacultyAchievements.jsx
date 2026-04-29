import React from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaStar } from 'react-icons/fa';
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/motion';

export default function FacultyAchievements({ member }) {
  if (!member) return null;

  const hasHighlights   = member.highlights?.length > 0;
  const hasAchievements = member.achievements?.length > 0;
  const hasTestimonials = member.testimonials?.length > 0;

  if (!hasHighlights && !hasAchievements && !hasTestimonials) return null;

  return (
    <section className="py-16 md:py-24 bg-brand-bg" aria-label={`${member.name}'s achievements`}>
      <div className="container-custom space-y-16">

        {hasHighlights && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Key Highlights</h2>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={viewportConfig}
              className="grid sm:grid-cols-2 md:grid-cols-3 gap-4"
            >
              {member.highlights.map((item, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="bg-white rounded-2xl border border-gray-100 shadow-soft p-5 flex gap-3"
                >
                  <FaStar className="text-yellow-400 mt-0.5 shrink-0" aria-hidden="true" />
                  <p className="text-sm text-gray-700 leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {hasAchievements && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Achievements & Recognition</h2>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={viewportConfig}
              className="grid sm:grid-cols-2 gap-4"
            >
              {member.achievements.map((item, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="bg-white rounded-2xl border border-yellow-100 shadow-soft p-5 flex gap-3"
                >
                  <FaTrophy className="text-yellow-500 mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{item.title || item}</p>
                    {item.year && <p className="text-xs text-gray-400 mt-0.5">{item.year}</p>}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {hasTestimonials && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">What Students Say</h2>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={viewportConfig}
              className="grid md:grid-cols-2 gap-6"
            >
              {member.testimonials.map((t, i) => (
                <motion.blockquote
                  key={i}
                  variants={staggerItem}
                  className="bg-white rounded-2xl border border-gray-100 shadow-soft p-6"
                >
                  <p className="text-gray-700 italic leading-relaxed text-sm">"{t.text}"</p>
                  <footer className="mt-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-red-500">{t.name?.[0]}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                      {t.exam && <p className="text-xs text-gray-500">{t.exam}</p>}
                    </div>
                  </footer>
                </motion.blockquote>
              ))}
            </motion.div>
          </div>
        )}

      </div>
    </section>
  );
}
