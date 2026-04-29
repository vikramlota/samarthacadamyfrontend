import React from 'react';
import { motion } from 'framer-motion';
import {
  FaCalendarCheck, FaUserGraduate, FaTrophy, FaChalkboardTeacher,
} from 'react-icons/fa';
import { useApiData } from '../../utils/customHooks';
import { staggerContainer, staggerItem, viewportConfig } from '../../lib/motion';

const STATS = [
  { key: 'yearsOfExperience', fallback: 20,   suffix: '+',  label: 'Years of Excellence', icon: FaCalendarCheck,    color: 'text-red-400' },
  { key: 'totalStudents',     fallback: 5000,  suffix: '+',  label: 'Students Trained',    icon: FaUserGraduate,     color: 'text-orange-400' },
  { key: 'totalSelections',   fallback: 1200,  suffix: '+',  label: 'Govt. Selections',    icon: FaTrophy,           color: 'text-red-400' },
  { key: 'facultyCount',      fallback: 12,    suffix: '+',  label: 'Expert Faculty',      icon: FaChalkboardTeacher,color: 'text-orange-400' },
  { key: 'successRate',      fallback: 92,    suffix: '%',  label: 'SUccess Rate',      icon: FaChalkboardTeacher,color: 'text-orange-400' },
];

const fmt = (n) => n >= 1000 ? n.toLocaleString('en-IN') : String(n);

export default function StatsBar() {
  const { data } = useApiData('/stats');
  const stats = data?.data;

  return (
    <section className="bg-gray-900">
      <div className="container-custom">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="grid grid-cols-2 md:grid-cols-4"
        >
          {STATS.map(({ key, fallback, suffix, label, icon: Icon, color }, idx) => {
            const value = stats?.[key] ?? fallback;
            return (
              <motion.div
                key={key}
                variants={staggerItem}
                className={`flex flex-col items-center gap-1 py-10 px-6 text-center
                  ${idx < STATS.length - 1 ? 'md:border-r md:border-white/10' : ''}
                  ${idx < 2 ? 'border-b md:border-b-0 border-white/10' : ''}`}
              >
                <Icon className={`text-2xl mb-2 ${color}`} aria-hidden="true" />
                <p className="heading-display text-5xl font-black text-white tabular-nums leading-none">
                  {fmt(value)}<span className="text-3xl">{suffix}</span>
                </p>
                <p className="text-sm font-semibold text-gray-400 mt-1">{label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
