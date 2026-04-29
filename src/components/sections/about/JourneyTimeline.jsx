import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui';
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/motion';

const FALLBACK_MILESTONES = [
  { year: '2006', title: 'Founded',             description: 'Sidharth and Deepika leave government service to start Samarth Academy near GNDU, Amritsar.' },
  { year: '2009', title: 'First 100 Selections', description: '100 students place in Banking and SSC exams within the first three years.' },
  { year: '2013', title: 'Punjab Police Wing',   description: 'Dedicated batch for Punjab Police and State PSC exams, led by ex-officers.' },
  { year: '2016', title: '500+ Selections',      description: 'Half a thousand government selections milestone crossed. Batch size held firm at 30.' },
  { year: '2019', title: 'New Campus',           description: 'Expanded to a dedicated campus — still SCF 68, UT Market, with improved infrastructure.' },
  { year: '2024', title: '800+ Selections',      description: '18 years, 800+ government selections, and both founders still in the classroom every day.' },
];

export default function JourneyTimeline({ milestones: apiMilestones }) {
  const items = (apiMilestones && apiMilestones.length > 0) ? apiMilestones : FALLBACK_MILESTONES;

  return (
    <section className="py-16 md:py-24 bg-white" aria-labelledby="journey-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="18 Years"
          title="Our Journey"
          description="From a small batch near GNDU to 800+ government selections — milestone by milestone."
          className="mb-14"
        />

        <div className="relative max-w-3xl mx-auto">
          {/* vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-red-100" aria-hidden="true" />

          <motion.ol
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            className="space-y-10 pl-16"
          >
            {items.map((item, i) => (
              <motion.li key={item.year || i} variants={staggerItem} className="relative">
                {/* dot */}
                <div className="absolute -left-[2.6rem] top-1 w-5 h-5 rounded-full bg-red-500 border-4 border-white shadow-soft" aria-hidden="true" />

                <div className="bg-brand-bg rounded-2xl px-6 py-5">
                  <span className="inline-block text-xs font-bold text-red-500 bg-red-50 px-3 py-1 rounded-full mb-2">
                    {item.year}
                  </span>
                  <h3 className="font-semibold text-gray-900 text-base">{item.title}</h3>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">{item.description}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
