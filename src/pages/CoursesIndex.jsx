import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useApiData } from '@/hooks/useApiData';
import { Breadcrumbs } from '@/components/ui';
import { getCoursesListSchema } from '@/lib/seo';
import {
  CoursesHero,
  CoursesIntro,
  CoursesByCategory,
  CoursesCta,
} from '@/components/sections/courses-index';
import { fallbackCourses } from '@/data/courses';

const SITE_URL    = 'https://thesamarthacademy.in';
const DEFAULT_OG  = `${SITE_URL}/og.jpg`;

export default function CoursesIndex() {
  // Fetch live landing pages for richer course cards; fall back to static list
  const { data: courses, isLoading } = useApiData('/landing-pages', { fallback: fallbackCourses });

  return (
    <>
      <Helmet>
        <title>All Courses | Samarth Academy — Government Exam Coaching in Amritsar</title>
        <meta
          name="description"
          content="Explore all coaching programs at Samarth Academy: SSC, Banking, Punjab Police, Railway and more. Officer-led coaching in Amritsar. Free demo class available."
        />
        <meta name="keywords" content="coaching courses Amritsar, government exam coaching Punjab, SSC bank Punjab Police coaching Amritsar" />
        <link rel="canonical" href={`${SITE_URL}/courses`} />

        <meta property="og:title"       content="All Courses at Samarth Academy" />
        <meta property="og:description" content="Government exam coaching in Amritsar — SSC, Banking, Punjab Police, Railway and more. Taught by ex-officers." />
        <meta property="og:url"         content={`${SITE_URL}/courses`} />
        <meta property="og:image"       content={DEFAULT_OG} />
        <meta property="og:type"        content="website" />

        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content="All Courses at Samarth Academy" />
        <meta name="twitter:description" content="Government exam coaching in Amritsar — officer-led, small batches, proven results." />
        <meta name="twitter:image"       content={DEFAULT_OG} />

        {courses && courses.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify(getCoursesListSchema(courses))}
          </script>
        )}
      </Helmet>

      <Breadcrumbs items={[{ name: 'Courses' }]} />
      <CoursesHero />
      <CoursesIntro />
      <CoursesByCategory courses={courses} isLoading={isLoading} />
      <CoursesCta />
    </>
  );
}
