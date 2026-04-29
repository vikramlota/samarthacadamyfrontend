import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { useApiData } from '@/hooks/useApiData';
import { Button } from '@/components/ui';
import { ICON_MAP } from '@/lib/iconMap';
import { CONTACT } from '@/data/homeStaticContent';
import { fallbackCourses } from '@/data/courses';

function MiniCourseCard({ course }) {
  const Icon = ICON_MAP[course.icon];
  return (
    <Link
      to={`/courses/${course.slug}`}
      className="flex items-center gap-4 bg-white rounded-card border border-gray-100 shadow-soft p-4 hover:shadow-card hover:-translate-y-0.5 transition-all duration-base group"
    >
      {Icon && (
        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
          <Icon className="text-red-500" aria-hidden="true" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 text-sm truncate">{course.title}</p>
        <p className="text-xs text-gray-500 mt-0.5">{course.duration}</p>
      </div>
      <FaArrowRight className="text-gray-300 group-hover:text-red-500 transition-colors duration-150 shrink-0" aria-hidden="true" />
    </Link>
  );
}

export default function LandingNotFound({ slug }) {
  const { data: courses } = useApiData('/courses', { fallback: fallbackCourses });
  const list = courses || fallbackCourses;

  const formattedSlug = slug
    ? slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    : 'this exam';

  return (
    <>
      <Helmet>
        <title>Page Not Found — Samarth Academy</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="bg-brand-bg min-h-[80vh] flex items-center section-padding">
        <div className="container-custom max-w-2xl mx-auto text-center space-y-6">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto">
            <span className="text-4xl" aria-hidden="true">📚</span>
          </div>

          <div>
            <h1 className="heading-display text-3xl font-bold text-gray-900">
              We don't have a coaching page for{' '}
              <span className="text-red-500">{formattedSlug}</span> yet
            </h1>
            <p className="text-gray-600 mt-3 leading-relaxed">
              But we may still offer coaching for it — call us to confirm. Browse our
              available courses below, or contact us directly.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Button href={CONTACT.phoneTel} icon={FaPhoneAlt}>
              Call Us
            </Button>
            <Button
              href={CONTACT.whatsapp}
              variant="outline"
              icon={FaWhatsapp}
            >
              WhatsApp
            </Button>
            <Button to="/courses" variant="ghost">
              Browse All Courses
            </Button>
          </div>

          {list.length > 0 && (
            <div className="mt-8 text-left space-y-3">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide text-center">
                Available Courses
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {list.map(course => (
                  <MiniCourseCard key={course.slug || course.id} course={course} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
