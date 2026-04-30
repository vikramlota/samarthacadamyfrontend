import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaClock, FaUsers, FaCheckCircle, FaGraduationCap, FaUniversity, FaShieldAlt, FaBookOpen } from 'react-icons/fa';
import { SectionHeader, Badge, SkeletonCard } from '@/components/ui';
import { getIcon } from '@/lib/iconMap';
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/motion';

// ─── Category config ──────────────────────────────────────────────────────

const CATEGORIES = [
  {
    key:   'banking',
    title: 'Banking Exams',
    Icon:  FaUniversity,
    match: s => /bank|ibps|sbi|rbi/.test(s),
  },
  {
    key:   'ssc',
    title: 'SSC Exams',
    Icon:  FaGraduationCap,
    match: s => /ssc|cgl|chsl/.test(s),
  },
  {
    key:   'railway',
    title: 'Railway Exams',
    Icon:  FaBookOpen,
    match: s => /rrb|railway|ntpc|group.?d/.test(s),
  },
  {
    key:   'police',
    title: 'Police & State Exams',
    Icon:  FaShieldAlt,
    match: s => /police|patwari|psssb|ppsc|pcs/.test(s),
  },
  {
    key:   'other',
    title: 'Skill & Other Programs',
    Icon:  FaBookOpen,
    match: () => true, // catch-all
  },
];

function groupCourses(courses) {
  const assigned = new Set();
  const result = [];

  for (const cat of CATEGORIES) {
    const matched = courses.filter(c => {
      const s = (c.slug || '').toLowerCase();
      return !assigned.has(c.slug) && cat.match(s);
    });
    matched.forEach(c => assigned.add(c.slug));
    if (matched.length > 0) result.push({ ...cat, courses: matched });
  }

  return result;
}

// ─── Course card ──────────────────────────────────────────────────────────

function CourseIndexCard({ course }) {
  const Icon = course.hero?.iconName ? getIcon(course.hero.iconName) : null;

  return (
    <Link to={`/${course.slug}`} className="block group h-full">
      <article className="bg-white rounded-2xl border border-gray-100 shadow-soft hover:-translate-y-0.5 hover:shadow-card transition-all duration-base p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center shrink-0">
            {Icon
              ? <Icon className="text-xl text-red-500" aria-hidden="true" />
              : <span className="text-lg font-black text-red-400">{(course.examShortName || course.slug)?.[0]?.toUpperCase()}</span>
            }
          </div>
          {course.featured && <Badge variant="orange" size="sm">Featured</Badge>}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 text-base leading-snug mb-1">
          {course.examShortName || course.slug}
        </h3>
        <p className="text-xs text-gray-500 mb-3 leading-relaxed line-clamp-2">
          {course.hero?.headline || course.examFullName || ''}
        </p>

        {/* Quick info */}
        {course.quickInfo && (
          <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-4">
            {course.quickInfo.duration && (
              <span className="flex items-center gap-1">
                <FaClock className="text-red-400 shrink-0" aria-hidden="true" />
                {course.quickInfo.duration}
              </span>
            )}
            {course.quickInfo.batchSize && (
              <span className="flex items-center gap-1">
                <FaUsers className="text-red-400 shrink-0" aria-hidden="true" />
                {course.quickInfo.batchSize}
              </span>
            )}
          </div>
        )}

        {/* Key bullets */}
        {course.whyChoose?.slice(0, 2).map((w, i) => (
          <div key={i} className="flex items-center gap-2 text-xs text-gray-600 mb-1">
            <FaCheckCircle className="text-green-400 shrink-0 text-[10px]" aria-hidden="true" />
            {w.title || w}
          </div>
        ))}

        {/* CTA */}
        <div className="mt-auto pt-4 flex items-center gap-1.5 text-sm text-red-500 font-medium group-hover:gap-2.5 transition-all duration-150">
          View Course Details
          <FaArrowRight className="text-xs" aria-hidden="true" />
        </div>
      </article>
    </Link>
  );
}

// ─── Skeleton grid ────────────────────────────────────────────────────────

function SkeletonGroup() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gray-200 animate-pulse" />
        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────

export default function CoursesByCategory({ courses, isLoading }) {
  const groups = useMemo(() => groupCourses(courses || []), [courses]);

  return (
    <section className="py-16 md:py-24 bg-brand-bg" aria-labelledby="courses-grid-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="All Programs"
          title="Choose Your Exam"
          description="Click any course for detailed info, batch dates, fees, and to book a free demo class."
          className="mb-14"
        />

        {isLoading ? (
          <div className="space-y-16">
            <SkeletonGroup />
            <SkeletonGroup />
          </div>
        ) : groups.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No courses found. Please check back soon.</p>
        ) : (
          <div className="space-y-16">
            {groups.map(group => (
              <div key={group.key}>
                {/* Category header */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 shadow-soft flex items-center justify-center shrink-0">
                    <group.Icon className="text-xl text-red-500" aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{group.title}</h2>
                  <span className="text-sm text-gray-400 font-normal">({group.courses.length})</span>
                </div>

                <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={viewportConfig}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {group.courses.map(course => (
                    <motion.div key={course.slug || course._id} variants={staggerItem}>
                      <CourseIndexCard course={course} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
