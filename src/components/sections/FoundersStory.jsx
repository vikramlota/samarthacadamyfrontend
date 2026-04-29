import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaCheckCircle } from 'react-icons/fa';
import { SectionHeader, Badge } from '@/components/ui';
import { FOUNDERS } from '@/data/homeStaticContent';
import { staggerContainer, staggerItem, slideInLeft, slideInRight, viewportConfig } from '@/lib/motion';

function FounderCard({ founder, side }) {
  return (
    <motion.div
      initial={side === 'left' ? slideInLeft.initial : slideInRight.initial}
      whileInView={side === 'left' ? slideInLeft.animate : slideInRight.animate}
      transition={side === 'left' ? slideInLeft.transition : slideInRight.transition}
      viewport={viewportConfig}
      className="bg-white rounded-card shadow-soft border border-gray-100 p-6 md:p-8 flex flex-col gap-4"
    >
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center shrink-0">
          <span className="text-2xl font-black text-red-500">{founder.initials}</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">{founder.name}</h3>
          <p className="text-sm font-semibold text-red-500">{founder.credential}</p>
          <p className="text-xs text-gray-500">{founder.years}</p>
        </div>
      </div>

      <blockquote className="relative pl-6 border-l-4 border-red-200">
        <FaQuoteLeft className="absolute -left-1 -top-1 text-red-100 text-3xl" aria-hidden="true" />
        <p className="text-gray-700 italic leading-relaxed text-sm">{founder.quote}</p>
      </blockquote>

      <div className="space-y-2 pt-2">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Teaches</p>
        <div className="flex flex-wrap gap-2">
          {founder.subjects.map(s => (
            <Badge key={s} variant="default" size="sm">{s}</Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function FoundersStory() {
  return (
    <section className="py-16 md:py-24 bg-white" aria-labelledby="founders-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left: Story text */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            className="space-y-6"
          >
            <motion.div variants={staggerItem}>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-500 uppercase tracking-wide">
                <FaCheckCircle aria-hidden="true" /> Our Founders
              </span>
            </motion.div>

            <motion.h2
              variants={staggerItem}
              id="founders-heading"
              className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight"
            >
              Taught by Officers,{' '}
              <span className="text-red-500">Not Just Teachers</span>
            </motion.h2>

            <motion.p variants={staggerItem} className="text-gray-600 leading-relaxed">
              Samarth Academy was founded with a simple belief: the best person to prepare you for
              a government job is someone who has done it. Not someone who studied how to teach it.
            </motion.p>

            <motion.p variants={staggerItem} className="text-gray-600 leading-relaxed">
              Our founders bring a combined <strong className="text-gray-900">18+ years of government service</strong> —
              across banking and taxation — to the classroom. Every strategy, every shortcut, every
              exam insight comes from lived experience at the officer level.
            </motion.p>

            <motion.ul variants={staggerContainer} className="space-y-3">
              {[
                'Small batches — max 30 students, always',
                'Curriculum built from actual exam experience',
                '800+ government selections since 2006',
                'Individual tracking for every student',
              ].map(point => (
                <motion.li
                  key={point}
                  variants={staggerItem}
                  className="flex items-start gap-3 text-gray-700"
                >
                  <FaCheckCircle className="text-red-500 mt-0.5 shrink-0" aria-hidden="true" />
                  {point}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Right: Founder cards */}
          <div className="space-y-6">
            {FOUNDERS.map((founder, i) => (
              <FounderCard key={founder.name} founder={founder} side={i === 0 ? 'right' : 'left'} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
