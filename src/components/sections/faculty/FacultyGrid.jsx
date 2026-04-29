import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import { useApiData } from '@/hooks/useApiData';
import { SectionHeader, Badge, SkeletonCard } from '@/components/ui';
import FacultyFilters from './FacultyFilters';
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/motion';

function FacultyCard({ member }) {
  return (
    <Link
      to={`/faculty/${member.slug || member.id}`}
      className="block bg-white rounded-2xl border border-gray-100 shadow-soft hover:-translate-y-0.5 hover:shadow-card transition-all duration-base group"
    >
      {/* Avatar */}
      <div className="relative">
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            className="w-full h-48 object-cover rounded-t-2xl"
          />
        ) : (
          <div className="w-full h-48 bg-red-50 rounded-t-2xl flex items-center justify-center">
            <span className="text-5xl font-black text-red-300">{member.name?.[0]}</span>
          </div>
        )}
        {member.isFounder && (
          <Badge variant="red" size="sm" className="absolute top-3 left-3">
            Founder
          </Badge>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-bold text-gray-900">{member.name}</h3>
        <p className="text-xs text-red-500 font-medium mt-0.5">{member.credential}</p>
        {member.experience && (
          <p className="text-xs text-gray-500 mt-0.5">{member.experience}</p>
        )}

        {member.subjects?.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {member.subjects.slice(0, 3).map(s => (
              <li key={s} className="flex items-center gap-2 text-xs text-gray-600">
                <FaCheckCircle className="text-green-400 shrink-0" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex items-center gap-1 text-xs text-red-500 font-medium group-hover:gap-2 transition-all duration-150">
          View profile <FaArrowRight className="text-[10px]" aria-hidden="true" />
        </div>
      </div>
    </Link>
  );
}

export default function FacultyGrid() {
  const { data: faculty, isLoading } = useApiData('/faculty', { fallback: [] });
  const [activeFilter, setActiveFilter] = useState('');

  const allSubjects = useMemo(() => {
    if (!faculty) return [];
    const set = new Set();
    faculty.forEach(m => m.subjects?.forEach(s => set.add(s)));
    return Array.from(set);
  }, [faculty]);

  const filtered = useMemo(() => {
    if (!faculty) return [];
    if (!activeFilter) return faculty;
    return faculty.filter(m => m.subjects?.includes(activeFilter));
  }, [faculty, activeFilter]);

  if (!isLoading && (!faculty || faculty.length === 0)) return null;

  return (
    <>
      <FacultyFilters
        subjects={allSubjects}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <section className="py-16 md:py-24 bg-brand-bg" aria-labelledby="faculty-grid-heading">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Meet the Team"
            title="Our Faculty"
            description="Officers-turned-educators with combined decades of government service."
            className="mb-12"
          />

          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={viewportConfig}
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((member, i) => (
                  <motion.div
                    key={member.id || member.slug || i}
                    variants={staggerItem}
                    layout
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <FacultyCard member={member} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
