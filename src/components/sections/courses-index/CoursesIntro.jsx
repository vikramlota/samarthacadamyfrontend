import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { slideInLeft, slideInRight, viewportConfig } from '@/lib/motion';

const STATS = [
  { value: '18+',   label: 'Years of Excellence' },
  { value: '5000+', label: 'Students Trained'     },
  { value: '800+',  label: 'Govt Selections'      },
  { value: '15+',   label: 'Expert Faculty'        },
];

const POINTS = [
  'Both founders served in government posts — Sidharth as Bank Manager (Bank of India) and Deepika as GST & Customs Inspector.',
  'Every batch is capped at 30 students. You get individual attention, not a lecture hall experience.',
  'Curriculum is built around actual exam patterns — not textbooks. No filler, no wasted sessions.',
  'End-to-end support: written exam, document verification, and interview prep all covered under one roof.',
];

export default function CoursesIntro() {
  return (
    <section className="py-16 md:py-24 bg-white" aria-labelledby="courses-intro-heading">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <motion.div
            initial={slideInLeft.initial}
            whileInView={slideInLeft.animate}
            transition={slideInLeft.transition}
            viewport={viewportConfig}
            className="space-y-6"
          >
            <div>
              <p className="text-sm font-semibold text-red-500 uppercase tracking-wider mb-2">Why Samarth Academy?</p>
              <h2 id="courses-intro-heading" className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                Officer-Led Coaching That Actually Works
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Most coaching institutes are run by career tutors who've never sat in a government exam hall. Samarth Academy is different — our founders cleared their exams, served in their posts, and then built the institute they wished had existed when they were preparing.
              </p>
            </div>

            <ul className="space-y-3">
              {POINTS.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
                  <FaCheckCircle className="text-green-500 mt-0.5 shrink-0" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={slideInRight.initial}
            whileInView={slideInRight.animate}
            transition={slideInRight.transition}
            viewport={viewportConfig}
          >
            <div className="bg-brand-bg rounded-2xl p-8 border border-gray-100">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6 text-center">
                Academy at a Glance
              </p>
              <div className="grid grid-cols-2 gap-6">
                {STATS.map(stat => (
                  <div key={stat.label} className="text-center">
                    <p className="text-4xl font-black text-red-500 leading-none">{stat.value}</p>
                    <p className="text-sm text-gray-600 mt-2 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-500 italic">
                  "I sat on the other side of the table. I know exactly what government officers look for — and I teach it."
                </p>
                <p className="text-xs text-red-500 font-medium mt-2">— Sidharth, Co-Founder</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
