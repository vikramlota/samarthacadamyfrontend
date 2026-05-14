import React from 'react';
import { motion } from 'framer-motion';
import { useApiData } from '@/hooks/useApiData';
import { fallbackStats, statDisplayConfig } from '@/data/stats';
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/motion';

function StatItem({ config, value, label }) {
  return (
    <div className="text-center">
      <p className="text-4xl md:text-5xl font-black text-red-500 tabular-nums leading-none">
        {value}
      </p>
      <p className="font-semibold text-gray-900 mt-2 text-sm md:text-base">{label || config.label}</p>
    </div>
  );
}

export default function AboutStats({ stats: pageStats }) {
  const { data: globalStats } = useApiData('/stats', { fallback: fallbackStats, enabled: !pageStats });
  
  const displayStats = pageStats && pageStats.length > 0 
    ? pageStats 
    : statDisplayConfig.map(c => ({ 
        label: c.label, 
        value: (globalStats ? globalStats[c.key] : fallbackStats[c.key]) + (c.suffix || '') 
      }));

  return (
    <section className="py-16 md:py-20 bg-white border-y border-gray-100" aria-label="Academy statistics">
      <div className="container-custom">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className={`grid gap-8 md:gap-12 ${displayStats.length <= 3 ? 'grid-cols-2 md:grid-cols-3 max-w-2xl mx-auto' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'}`}
        >
          {displayStats.map((stat, i) => (
            <motion.div key={i} variants={staggerItem}>
              <StatItem value={stat.value} label={stat.label} config={{}} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
