import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { Button, Badge } from '@/components/ui';
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/motion';

export default function FacultyDetailHero({ member }) {
  if (!member) return null;

  return (
    <section className="py-12 md:py-16 bg-white border-b border-gray-100" aria-labelledby="faculty-detail-heading">
      <div className="container-custom">
        <div className="mb-6">
          <Button to="/faculty" variant="ghost" icon={FaArrowLeft} size="sm">
            All Faculty
          </Button>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="grid md:grid-cols-[auto_1fr] gap-8 items-start"
        >
          {/* Avatar */}
          <motion.div variants={staggerItem}>
            {member.photo ? (
              <img
                src={member.photo}
                alt={member.name}
                className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover border-4 border-red-50"
              />
            ) : (
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-red-50 flex items-center justify-center border-4 border-red-100">
                <span className="text-5xl font-black text-red-300">{member.name?.[0]}</span>
              </div>
            )}
          </motion.div>

          <motion.div variants={staggerItem} className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <h1 id="faculty-detail-heading" className="heading-display text-2xl md:text-3xl font-bold text-gray-900">
                {member.name}
              </h1>
              {member.isFounder && <Badge variant="red" size="sm">Founder</Badge>}
            </div>

            <p className="text-red-500 font-medium">{member.credential}</p>
            {member.experience && <p className="text-sm text-gray-500">{member.experience}</p>}

            {member.bio && (
              <p className="text-gray-600 leading-relaxed max-w-2xl">{member.bio}</p>
            )}

            {member.subjects?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Teaches</p>
                <div className="flex flex-wrap gap-2">
                  {member.subjects.map(s => (
                    <span key={s} className="inline-flex items-center gap-1.5 text-xs bg-red-50 text-red-600 px-3 py-1 rounded-full font-medium">
                      <FaCheckCircle className="text-red-400 text-[10px]" aria-hidden="true" />
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
