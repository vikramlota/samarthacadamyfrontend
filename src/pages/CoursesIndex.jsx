import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useApiData } from '@/hooks/useApiData';
import { useSearchParamsState } from '@/hooks/useSearchParamsState';
import { getCoursesListSchema } from '@/lib/seo';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import {
  CoursesHero,
  CoursesIntro,
  CoursesSearchFilter,
  CoursesGrid,
  CoursesEmpty,
  CoursesPagination,
  CoursesCta,
} from '@/components/sections/courses-index';
import { fallbackCourses } from '@/data/courses';

const SITE_URL   = 'https://thesamarthacademy.in';
const DEFAULT_OG = `${SITE_URL}/og.jpg`;
const PAGE_SIZE  = 9;

const CATEGORIES = [
  { value: 'all',      label: 'All Courses'   },
  { value: 'ssc',      label: 'SSC'           },
  { value: 'banking',  label: 'Banking'        },
  { value: 'police',   label: 'Police & State' },
  { value: 'railway',  label: 'Railway'        },
  { value: 'other',    label: 'Other'          },
];

function categorizeCourse(course) {
  const s = (course.slug || '').toLowerCase();
  if (/ssc|cgl|chsl/.test(s)) return 'ssc';
  if (/bank|ibps|sbi|rbi/.test(s)) return 'banking';
  if (/police|patwari|psssb|ppsc/.test(s)) return 'police';
  if (/rrb|railway|ntpc|group.?d/.test(s)) return 'railway';
  return 'other';
}

export default function CoursesIndex() {
  const { data: allCourses, isLoading } = useApiData('/landing-pages', { fallback: fallbackCourses });

  const [search,      setSearch]   = useSearchParamsState('search',   '');
  const [category,    setCategory] = useSearchParamsState('category', 'all');
  const [pageStr,     setPage]     = useSearchParamsState('page',     '1');
  const page = Math.max(1, parseInt(pageStr, 10) || 1);

  const { filteredCourses, paginatedCourses, totalPages } = useMemo(() => {
    let filtered = allCourses || [];

    if (category !== 'all') {
      filtered = filtered.filter((c) => categorizeCourse(c) === category);
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      filtered = filtered.filter((c) => {
        const hay = [
          c.examShortName, c.examFullName, c.title,
          c.seo?.title, c.hero?.headline, c.description,
        ].filter(Boolean).join(' ').toLowerCase();
        return hay.includes(q);
      });
    }

    const total = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const safePage = Math.min(page, total);
    const start = (safePage - 1) * PAGE_SIZE;

    return {
      filteredCourses:  filtered,
      paginatedCourses: filtered.slice(start, start + PAGE_SIZE),
      totalPages:       total,
    };
  }, [allCourses, search, category, page]);

  const handleCategoryChange = (c) => {
    setCategory(c);
    setPage('1');
  };

  const handleClearFilters = () => {
    setSearch('');
    setCategory('all');
    setPage('1');
  };

  const title = 'All Courses | Samarth Academy — Government Exam Coaching in Amritsar';
  const desc  = 'Explore all coaching programs at Samarth Academy: SSC, Banking, Punjab Police, Railway and more. Officer-led coaching in Amritsar. Free demo class available.';

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <meta name="keywords" content="coaching courses Amritsar, government exam coaching Punjab, SSC bank Punjab Police coaching Amritsar" />
        <link rel="canonical" href={`${SITE_URL}/courses`} />

        <meta property="og:title"       content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:image"       content={DEFAULT_OG} />
        <meta property="og:url"         content={`${SITE_URL}/courses`} />
        <meta property="og:type"        content="website" />

        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content={title} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image"       content={DEFAULT_OG} />

        {allCourses && allCourses.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify(getCoursesListSchema(allCourses))}
          </script>
        )}
      </Helmet>

      <BreadcrumbSchema items={[{ name: 'Courses', href: '/courses' }]} />

      <CoursesHero />
      <CoursesIntro />

      <CoursesSearchFilter
        search={search}
        category={category}
        categories={CATEGORIES}
        onSearchChange={(v) => { setSearch(v); setPage('1'); }}
        onCategoryChange={handleCategoryChange}
        totalResults={filteredCourses.length}
      />

      {isLoading ? (
        <CoursesGrid isLoading />
      ) : paginatedCourses.length === 0 ? (
        <CoursesEmpty search={search} onClear={handleClearFilters} />
      ) : (
        <>
          <CoursesGrid courses={paginatedCourses} />
          <CoursesPagination
            currentPage={Math.min(page, totalPages)}
            totalPages={totalPages}
            onPageChange={(p) => setPage(String(p))}
          />
        </>
      )}

      <CoursesCta />
    </>
  );
}
