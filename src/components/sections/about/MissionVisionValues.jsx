import React from 'react';
import { motion } from 'framer-motion';
import { FaBullseye, FaEye, FaHeart } from 'react-icons/fa';
import { SectionHeader } from '@/components/ui';
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/motion';

const FALLBACK_MVV = [
  {
    icon:        FaBullseye,
    color:       'red',
    label:       'Mission',
    heading:     'Make government jobs accessible to every deserving aspirant',
    description: 'We eliminate the gap between effort and outcome by teaching what actually matters — exam patterns, interview behaviour, and mental preparation — not padding.',
  },
  {
    icon:        FaEye,
    color:       'orange',
    label:       'Vision',
    heading:     'Become Punjab\'s most trusted officer-led coaching institute',
    description: 'By 2030, every student who walks through our doors should have a credible path to a government selection — with faculty who have lived that path themselves.',
  },
  {
    icon:        FaHeart,
    color:       'green',
    label:       'Values',
    heading:     'Honesty, attention, and accountability — in every batch',
    description: 'We cap batches at 30 because attention is not scalable. We only hire faculty with direct government experience because authenticity cannot be faked.',
  },
];

const COLOR_CLASSES = {
  red:    { bg: 'bg-red-50',    icon: 'text-red-500',    border: 'border-red-100'    },
  orange: { bg: 'bg-orange-50', icon: 'text-orange-500', border: 'border-orange-100' },
  green:  { bg: 'bg-green-50',  icon: 'text-green-500',  border: 'border-green-100'  },
};

export default function MissionVisionValues({ mvv: apiMvv }) {
  const items = (apiMvv && apiMvv.length > 0) ? apiMvv : FALLBACK_MVV;

  return (
    <section className="py-16 md:py-24 bg-brand-bg" aria-labelledby="mvv-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="What Drives Us"
          title="Mission, Vision & Values"
          description="The beliefs that shape every decision we make — from who teaches to how many seats we offer."
          className="mb-12"
        />

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="grid md:grid-cols-3 gap-6"
        >
          {items.map((item, i) => {
            const Icon   = item.icon || FaBullseye;
            const colors = COLOR_CLASSES[item.color] || COLOR_CLASSES.red;

            return (
              <motion.div
                key={item.label || i}
                variants={staggerItem}
                className={`rounded-2xl border ${colors.border} ${colors.bg} p-8`}
              >
                <div className={`w-12 h-12 rounded-2xl bg-white shadow-soft flex items-center justify-center mb-5`}>
                  <Icon className={`text-xl ${colors.icon}`} aria-hidden="true" />
                </div>
                <p className={`text-xs font-bold uppercase tracking-widest ${colors.icon} mb-2`}>{item.label}</p>
                <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug">{item.heading}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
