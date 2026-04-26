import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SectionHeader, CourseCard } from '../ui';
import { useApiData } from '../../utils/customHooks';
import { ICON_MAP } from '../../lib/iconMap';
import { staggerContainer, staggerItem, viewportConfig } from '../../lib/motion';

const SkeletonCard = () => (
  <div className="h-56 bg-gray-100 rounded-card animate-pulse" aria-hidden="true" />
);

export default function CoursesGrid() {
  const { data, loading } = useApiData('/courses');
  const courses = data?.data ?? [];

  return (
    <section className="section-padding bg-brand-bg">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Our Courses"
          title="Choose Your Path to a Government Job"
          titleAccent="Government Job"
          description="From SSC to Banking to Police — we offer dedicated batches with expert faculty for every major competitive exam."
        />

        <div className="mt-12">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={viewportConfig}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {courses.map(course => (
                <motion.div key={course._id} variants={staggerItem}>
                  <CourseCard
                    title={course.title}
                    description={course.shortDescription}
                    icon={ICON_MAP[course.icon] ?? null}
                    duration={course.duration}
                    studentCount={course.studentCount}
                    href={`/courses/${course.slug}`}
                    featured={course.featured}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {!loading && courses.length > 0 && (
          <div className="text-center mt-10">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 text-red-500 font-bold hover:text-red-600 transition-colors duration-150"
            >
              View all courses →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
