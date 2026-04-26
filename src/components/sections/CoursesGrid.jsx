import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { useApiData } from '@/hooks/useApiData';
import { SectionHeader, Card, Button, Badge, SkeletonCard } from '@/components/ui';
import { ICON_MAP } from '@/lib/iconMap';
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/motion';
import { fallbackCourses } from '@/data/courses';

function CourseItem({ course }) {
  const Icon = ICON_MAP[course.icon];
  return (
    <Card as="article" className="flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        {Icon ? (
          <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center shrink-0">
            <Icon className="text-xl text-red-500" aria-hidden="true" />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-2xl bg-gray-100 shrink-0" />
        )}
        {course.isPopular && (
          <Badge variant="primary" size="sm">Popular</Badge>
        )}
      </div>

      <h3 className="text-base font-semibold text-gray-900 mb-2">{course.title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed flex-1 line-clamp-2">{course.description}</p>

      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <span>{course.duration}</span>
        <span className="font-medium text-red-500">{course.batchSize}</span>
      </div>

      <Button
        to={course.slug ? `/courses/${course.slug}` : '/courses'}
        variant="ghost"
        size="sm"
        iconRight={FaArrowRight}
        className="mt-3 -mx-1 justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
      >
        Learn more
      </Button>
    </Card>
  );
}

export default function CoursesGrid() {
  const { data: courses, isLoading } = useApiData('/courses', { fallback: fallbackCourses });
  const list = courses || fallbackCourses;

  return (
    <section className="py-16 md:py-24 bg-white" aria-labelledby="courses-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="What We Teach"
          title="Courses for Every Government Exam"
          description="IBPS, SBI, SSC, Railway, Punjab Police — every major exam, taught by officers who cleared them. All in batches capped at 30."
          className="mb-12"
        />

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {list.map(course => (
              <motion.div key={course.id || course.slug} variants={staggerItem}>
                <CourseItem course={course} />
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="text-center mt-10">
          <Button to="/courses" variant="outline" size="lg" iconRight={FaArrowRight}>
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
}
