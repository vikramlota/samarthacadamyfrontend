import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { Badge } from '../ui';
import { useApiData } from '../../utils/customHooks';
import { staggerContainer, staggerItem, viewportConfig } from '../../lib/motion';

export default function FeaturedExam() {
  const { data, loading } = useApiData('/featured-exam');
  const exam = data?.data;

  if (loading || !exam || !exam.isActive) return null;

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="gradient-primary rounded-section overflow-hidden shadow-lifted">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto]">

            {/* ── Text side ── */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={viewportConfig}
              className="p-10 md:p-14 flex flex-col gap-6 justify-center"
            >
              <motion.div variants={staggerItem}>
                <Badge variant="orange" size="md" pulse>{exam.badge}</Badge>
              </motion.div>

              <motion.div variants={staggerItem}>
                <p className="text-red-200 text-xs font-bold uppercase tracking-widest mb-2">
                  {exam.tagline}
                </p>
                <h2 className="heading-display text-3xl md:text-4xl font-black text-white">
                  {exam.name}
                </h2>
              </motion.div>

              <motion.p variants={staggerItem} className="text-red-100 leading-relaxed max-w-lg">
                {exam.description}
              </motion.p>

              <motion.dl
                variants={staggerItem}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {exam.highlights.map(h => (
                  <div key={h.label} className="flex items-start gap-2">
                    <FaCheckCircle className="text-orange-300 mt-0.5 text-sm shrink-0" aria-hidden="true" />
                    <div>
                      <dt className="text-xs text-red-300 uppercase tracking-wider">{h.label}</dt>
                      <dd className="text-white font-semibold text-sm">{h.value}</dd>
                    </div>
                  </div>
                ))}
              </motion.dl>

              <motion.div variants={staggerItem} className="flex flex-wrap gap-3 pt-2">
                <Link
                  to={exam.ctaPrimaryHref}
                  className="inline-flex items-center gap-2 bg-white text-red-600 hover:bg-red-50 font-semibold px-6 py-3 rounded-btn text-base transition-all duration-base shadow-md hover:shadow-lg"
                >
                  {exam.ctaPrimaryLabel}
                  <FaArrowRight className="text-xs" aria-hidden="true" />
                </Link>
                {exam.ctaSecondaryHref && (
                  <Link
                    to={exam.ctaSecondaryHref}
                    className="inline-flex items-center gap-2 border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-btn text-base transition-all duration-base"
                  >
                    {exam.ctaSecondaryLabel}
                  </Link>
                )}
              </motion.div>
            </motion.div>

            {/* ── Image side ── */}
            {exam.image && (
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                viewport={viewportConfig}
                className="hidden lg:block w-72 xl:w-80 relative overflow-hidden"
              >
                <img
                  src={exam.image}
                  alt={exam.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-red-700/40 to-transparent" aria-hidden="true" />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
