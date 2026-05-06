import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useApiData } from '@/hooks/useApiData';
import { useSearchParamsState } from '@/hooks/useSearchParamsState';
import {
  BlogHero,
  BlogFeaturedSection,
  BlogSearchFilter,
  BlogPostGrid,
  BlogPagination,
  BlogEmptyState,
} from '@/components/sections/blog';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { getBlogSchema, getBlogPostListSchema } from '@/lib/seo';

const SITE_URL   = 'https://thesamarthacademy.in';
const DEFAULT_OG = `${SITE_URL}/og.jpg`;
const PAGE_SIZE  = 9;

export default function BlogIndex() {
  const [search,   setSearch]   = useSearchParamsState('search',   '');
  const [category, setCategory] = useSearchParamsState('category', 'all');
  const [pageStr,  setPage]     = useSearchParamsState('page',     '1');
  const page = Math.max(1, parseInt(pageStr, 10) || 1);

  const queryString = useMemo(() => {
    const p = new URLSearchParams();
    if (category !== 'all') p.set('category', category);
    if (search)             p.set('search',   search);
    p.set('page',  String(page));
    p.set('limit', String(PAGE_SIZE));
    return p.toString();
  }, [category, search, page]);

  const { data: postsRes, isLoading } = useApiData(`/blog/posts?${queryString}`, {
    fallback: { data: [], total: 0, totalPages: 0 },
  });

  // Featured section — only on page 1 with no filters active
  const showFeatured = page === 1 && !search && category === 'all';
  const { data: featuredRes } = useApiData('/blog/posts?featured=true&limit=3', {
    fallback: { data: [] },
    enabled:  showFeatured,
  });

  const posts      = postsRes?.data  || (Array.isArray(postsRes)  ? postsRes  : []);
  const total      = postsRes?.total ?? posts.length;
  const totalPages = postsRes?.totalPages ?? 1;
  const featured   = featuredRes?.data || (Array.isArray(featuredRes) ? featuredRes : []);

  const title        = 'Blog | Samarth Academy — Government Exam Tips & Updates';
  const description  = 'Expert tips, exam strategies, and the latest government exam updates from Samarth Academy, Amritsar. SSC, Banking, Punjab Police preparation guides.';
  const canonicalUrl = `${SITE_URL}/blog${page > 1 ? `?page=${page}` : ''}`;

  const handleClearFilters = () => {
    setSearch('');
    setCategory('all');
    setPage('1');
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:title"       content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image"       content={DEFAULT_OG} />
        <meta property="og:url"         content={canonicalUrl} />
        <meta property="og:type"        content="website" />

        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image"       content={DEFAULT_OG} />

        <script type="application/ld+json">{JSON.stringify(getBlogSchema())}</script>
        {posts.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify(getBlogPostListSchema(posts, 'Latest Blog Posts'))}
          </script>
        )}
      </Helmet>

      <BreadcrumbSchema items={[{ name: 'Blog', href: '/blog' }]} />

      <BlogHero />

      {showFeatured && featured.length > 0 && (
        <BlogFeaturedSection posts={featured} />
      )}

      <BlogSearchFilter
        search={search}
        category={category}
        onSearchChange={v => { setSearch(v); setPage('1'); }}
        onCategoryChange={c => { setCategory(c); setPage('1'); }}
        totalResults={isLoading ? undefined : total}
      />

      <section className="py-12 md:py-16">
        <div className="container-custom">
          {!isLoading && posts.length === 0 ? (
            <BlogEmptyState
              search={search}
              onClear={(search || category !== 'all') ? handleClearFilters : null}
            />
          ) : (
            <>
              <BlogPostGrid posts={posts} isLoading={isLoading} columns={3} />
              {totalPages > 1 && (
                <BlogPagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={p => {
                    setPage(String(p));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
