import React from 'react';
import { motion } from 'framer-motion';
import { useApiData } from '@/hooks/useApiData';
import { StatCard } from '@/components/ui';
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/motion';
import { fallbackStats, statDisplayConfig } from '@/data/stats';

export default function StatsBar() {
  const { data: stats } = useApiData('/stats', { fallback: fallbackStats });
  // Merge so API-missing fields (e.g. successRate) always have a fallback value
  const resolved = { ...fallbackStats, ...(stats || {}) };

  return (
    <section className="bg-gray-900 py-14 md:py-16" aria-label="Key statistics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12"
        >
          {statDisplayConfig.map(cfg => (
            <motion.div key={cfg.key} variants={staggerItem}>
              <StatCard
                value={resolved[cfg.key] ?? 0}
                suffix={cfg.suffix}
                label={cfg.label}
                description={cfg.description}
                variant="dark"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
