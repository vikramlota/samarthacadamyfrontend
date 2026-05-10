import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useApiData } from '@/hooks/useApiData';
import { useSearchParamsState } from '@/hooks/useSearchParamsState';
import {
  BlogPostGrid,
  BlogPagination,
  BlogEmptyState,
} from '@/components/sections/blog';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { Badge, Button, Skeleton } from '@/components/ui';
import { getBlogPostListSchema } from '@/lib/seo';
import { getIcon } from '@/lib/iconMap';
import { FaArrowLeft } from 'react-icons/fa';

const SITE_URL   = 'https://thesamarthacademy.in';
const DEFAULT_OG = `${SITE_URL}/og.jpg`;
const PAGE_SIZE  = 9;

function safeBadgeVariant(color) {
  return ['red', 'orange', 'green', 'gray', 'blue'].includes(color) ? color : 'red';
}

export default function BlogCategory() {
  const { slug }   = useParams();
  const navigate   = useNavigate();

  const [pageStr, setPage] = useSearchParamsState('page', '1');
  const page = Math.max(1, parseInt(pageStr, 10) || 1);

  const { data: category, isLoading: catLoading, error: catError } = useApiData(
    `/blog/categories/${slug}`,
  );

  const queryString = useMemo(() => {
    const p = new URLSearchParams();
    p.set('category', slug);
    p.set('page',     String(page));
    p.set('limit',    String(PAGE_SIZE));
    return p.toString();
  }, [slug, page]);

  const { data: postsRes, isLoading: postsLoading } = useApiData(
    `/blog/posts?${queryString}`,
    { fallback: { data: [], total: 0, totalPages: 0 } },
  );

  if (catLoading) {
    return (
      <section className="py-16">
        <div className="container-custom">
          <Skeleton className="h-12 w-1/2 mb-4" />
          <Skeleton className="h-6 w-3/4 mb-12" />
          <BlogPostGrid isLoading columns={3} />
        </div>
      </section>
    );
  }

  if (catError || !category) {
    return (
      <>
        <Helmet>
          <title>Category Not Found | Samarth Academy Blog</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <section className="py-24">
          <div className="container-custom max-w-md mx-auto text-center">
            <h1 className="font-display text-3xl font-bold text-gray-900">Category Not Found</h1>
            <p className="text-gray-600 mt-3">This category doesn&rsquo;t exist or has been removed.</p>
            <Button variant="primary" icon={FaArrowLeft} to="/blog" className="mt-6">
              Browse All Posts
            </Button>
          </div>
        </section>
      </>
    );
  }

  const posts      = postsRes?.data  || (Array.isArray(postsRes)  ? postsRes  : []);
  const totalPages = postsRes?.totalPages ?? 1;

  const title        = category.seo?.title || `${category.name} | Samarth Academy Blog`;
  const description  = category.seo?.description || category.description
    || `Explore ${category.name} articles from Samarth Academy. Government exam preparation tips and updates.`;
  const canonicalUrl = `${SITE_URL}/blog/category/${slug}${page > 1 ? `?page=${page}` : ''}`;

  const Icon = category.iconName ? getIcon(category.iconName) : null;

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

        {posts.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify(getBlogPostListSchema(posts, `${category.name} Articles`))}
          </script>
        )}
      </Helmet>

      <BreadcrumbSchema items={[
        { name: 'Blog',           href: '/blog' },
        { name: category.name,    href: `/blog/category/${slug}` },
      ]} />

      {/* Category hero */}
      <section className="py-16 md:py-20 bg-brand-bg">
        <div className="container-custom">
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-red-500 transition-colors mb-6"
          >
            <FaArrowLeft aria-hidden="true" /> Back to all articles
          </button>

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              {Icon && (
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="text-xl text-red-500" aria-hidden="true" />
                </div>
              )}
              {category.postCount > 0 && (
                <Badge variant={safeBadgeVariant(category.color)}>
                  {category.postCount} {category.postCount === 1 ? 'article' : 'articles'}
                </Badge>
              )}
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              {category.name}
            </h1>

            {category.description && (
              <p className="text-lg text-gray-600 mt-4 max-w-2xl leading-relaxed">
                {category.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          {!postsLoading && posts.length === 0 ? (
            <BlogEmptyState />
          ) : (
            <>
              <BlogPostGrid posts={posts} isLoading={postsLoading} columns={3} />
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
