import React from 'react';
import { motion } from 'framer-motion';
import { useApiData } from '@/hooks/useApiData';
import { fallbackStats, statDisplayConfig } from '@/data/stats';
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/motion';

function StatItem({ config, value }) {
  return (
    <div className="text-center">
      <p className="text-4xl md:text-5xl font-black text-red-500 tabular-nums leading-none">
        {value}{config.suffix}
      </p>
      <p className="font-semibold text-gray-900 mt-2 text-sm md:text-base">{config.label}</p>
      <p className="text-xs text-gray-500 mt-1">{config.description}</p>
    </div>
  );
}

export default function AboutStats() {
  const { data: stats } = useApiData('/stats', { fallback: fallbackStats });
  const resolved = { ...fallbackStats, ...(stats || {}) };

  return (
    <section className="py-16 md:py-20 bg-white border-y border-gray-100" aria-label="Academy statistics">
      <div className="container-custom">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12"
        >
          {statDisplayConfig.map(config => (
            <motion.div key={config.key} variants={staggerItem}>
              <StatItem config={config} value={resolved[config.key] ?? fallbackStats[config.key]} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
