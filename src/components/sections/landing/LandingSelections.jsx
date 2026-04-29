import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { useApiData } from '@/hooks/useApiData';
import { SectionHeader, Button, Badge } from '@/components/ui';
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/motion';

function SelectionCard({ student }) {
  return (
    <div className="bg-white rounded-card shadow-soft border border-gray-100 p-5 flex flex-col items-center text-center gap-3 transition-all duration-base hover:-translate-y-0.5 hover:shadow-card">
      {student.photo ? (
        <img
          src={student.photo}
          alt={student.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-red-100"
          loading="lazy"
        />
      ) : (
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center shrink-0">
          <span className="text-xl font-black text-red-500">{student.name?.[0]}</span>
        </div>
      )}
      <div>
        <p className="font-semibold text-gray-900 text-sm">{student.name}</p>
        <p className="text-xs text-red-500 font-medium mt-0.5">{student.post || student.exam}</p>
        {student.organization && (
          <p className="text-xs text-gray-500 mt-0.5">{student.organization}</p>
        )}
        {student.year && <p className="text-xs text-gray-400 mt-1">{student.year}</p>}
      </div>
      {student.rank && <Badge variant="red" size="sm">Rank {student.rank}</Badge>}
    </div>
  );
}

export default function LandingSelections({ courseSlug, examShortName }) {
  const { data: selections, isLoading } = useApiData(
    `/selections?exam=${courseSlug}&limit=8&featured=true`,
    { fallback: [] },
  );

  if (!isLoading && !selections?.length) return null;

  return (
    <section className="bg-brand-bg section-padding" aria-labelledby="selections-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Success Stories"
          title={`Recent ${examShortName} Selections`}
          description="Students who trained at Samarth Academy and cleared their exams."
          className="mb-12"
        />

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-card p-5 border border-gray-100 animate-pulse flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-gray-200" />
                <div className="h-3 w-3/4 bg-gray-200 rounded" />
                <div className="h-3 w-1/2 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {selections.map((student, i) => (
              <motion.div key={student.id || i} variants={staggerItem}>
                <SelectionCard student={student} />
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="text-center mt-10">
          <Button to="/Selections" variant="outline" iconRight={FaArrowRight}>
            View All Selections
          </Button>
        </div>
      </div>
    </section>
  );
}
