import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCalendarAlt, FaExclamationCircle } from 'react-icons/fa';
import { useApiData } from '@/hooks/useApiData';
import { Button, Badge, Card } from '@/components/ui';
import { fadeInUp, viewportConfig } from '@/lib/motion';

export default function ExamSpotlight() {
  const { data: exam, isLoading } = useApiData('/featured-exam', { fallback: null });

  if (isLoading || !exam) return null;

  return (
    <section className="py-12 md:py-16 bg-brand-bg" aria-labelledby="spotlight-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={fadeInUp.initial}
          whileInView={fadeInUp.animate}
          transition={fadeInUp.transition}
          viewport={viewportConfig}
        >
          <Card variant="tinted" hover={false} className="border border-red-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="red" pulse>
                    <FaExclamationCircle aria-hidden="true" />
                    Exam Spotlight
                  </Badge>
                  {exam.isNew && <Badge variant="orange">New</Badge>}
                </div>

                <h2 id="spotlight-heading" className="text-2xl font-bold text-gray-900">
                  {exam.title}
                </h2>

                {exam.description && (
                  <p className="text-gray-600 text-sm leading-relaxed max-w-xl">
                    {exam.description}
                  </p>
                )}

                {(exam.notificationDate || exam.examDate) && (
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    {exam.notificationDate && (
                      <span className="flex items-center gap-1.5">
                        <FaCalendarAlt className="text-red-400" aria-hidden="true" />
                        Notification: <strong className="text-gray-700">{exam.notificationDate}</strong>
                      </span>
                    )}
                    {exam.examDate && (
                      <span className="flex items-center gap-1.5">
                        <FaCalendarAlt className="text-red-400" aria-hidden="true" />
                        Exam: <strong className="text-gray-700">{exam.examDate}</strong>
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:items-end gap-3 shrink-0">
                {exam.vacancies && (
                  <p className="text-sm text-gray-500">
                    <span className="text-2xl font-black text-red-500">{exam.vacancies}</span>
                    {' '}vacancies
                  </p>
                )}
                <Button to="/book-demo" size="lg" iconRight={FaArrowRight}>
                  Prepare Now
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
