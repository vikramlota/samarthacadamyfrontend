import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaClock, FaUsers, FaCheckCircle } from 'react-icons/fa';
import { Badge, SkeletonCard } from '@/components/ui';
import { getIcon } from '@/lib/iconMap';
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/motion';

function CourseCard({ course }) {
  const iconName = course.hero?.iconName || course.icon;
  const Icon = getIcon(iconName);
  const name = course.examShortName || course.title || course.slug;
  const sub = course.hero?.headline || course.examFullName || course.description || '';
  const duration = course.quickInfo?.duration || course.duration;
  const batchSize = course.quickInfo?.batchSize || course.batchSize;
  const featured = course.featured || course.isPopular;

  return (
    <Link to={`/${course.slug}`} className="block group h-full">
      <article className="bg-white rounded-2xl border border-gray-100 shadow-soft hover:-translate-y-0.5 hover:shadow-card transition-all duration-150 flex flex-col h-full overflow-hidden">
        {course.courseThumbnail ? (
          <div className="w-full h-44 overflow-hidden">
            <img
              src={course.courseThumbnail}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        ) : null}
        <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center shrink-0">
            {Icon
              ? <Icon className="text-xl text-red-500" aria-hidden="true" />
              : <span className="text-lg font-black text-red-400">{name[0]?.toUpperCase()}</span>
            }
          </div>
          {featured && <Badge variant="orange" size="sm">Popular</Badge>}
        </div>

        <h3 className="font-semibold text-gray-900 text-base leading-snug mb-1">{name}</h3>

        {sub && (
          <div 
            className="text-xs text-gray-500 mb-3 leading-relaxed line-clamp-2"
            dangerouslySetInnerHTML={{ __html: sub }}
          />
        )}

        {(duration || batchSize) && (
          <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-4">
            {duration && (
              <span className="flex items-center gap-1">
                <FaClock className="text-red-400 shrink-0" aria-hidden="true" />
                {duration}
              </span>
            )}
            {batchSize && (
              <span className="flex items-center gap-1">
                <FaUsers className="text-red-400 shrink-0" aria-hidden="true" />
                {batchSize}
              </span>
            )}
          </div>
        )}

        {course.whyChoose?.slice(0, 2).map((w, i) => (
          <div key={i} className="flex items-center gap-2 text-xs text-gray-600 mb-1">
            <FaCheckCircle className="text-green-400 shrink-0 text-[10px]" aria-hidden="true" />
            {w.title || w}
          </div>
        ))}

        <div className="mt-auto pt-4 flex items-center gap-1.5 text-sm text-red-500 font-medium group-hover:gap-2.5 transition-all duration-150">
          View Course Details
          <FaArrowRight className="text-xs" aria-hidden="true" />
        </div>
        </div>
      </article>
    </Link>
  );
}

export default function CoursesGrid({ courses = [], isLoading = false }) {
  if (isLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {courses.map((course) => (
            <motion.div key={course.slug || course.id} variants={staggerItem}>
              <CourseCard course={course} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
