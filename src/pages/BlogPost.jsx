import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useApiData } from '@/hooks/useApiData';
import {
  BlogPostHeader,
  BlogPostContent,
  BlogPostMeta,
  BlogShareButtons,
  BlogRelatedPosts,
  BlogWhatsAppCta,
  BlogNotFound,
} from '@/components/sections/blog';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { Skeleton } from '@/components/ui';
import { generateArticleSchema } from '@/utils/schemaHelpers';

const SITE_URL   = 'https://thesamarthacademy.in';
const DEFAULT_OG = `${SITE_URL}/og.jpg`;

function BlogPostSkeleton() {
  return (
    <div className="py-16">
      <div className="container-custom max-w-3xl">
        <Skeleton className="h-6 w-32 mb-4" />
        <Skeleton className="h-12 w-full mb-3" />
        <Skeleton className="h-12 w-3/4 mb-6" />
        <Skeleton className="h-6 w-48 mb-8" />
        <Skeleton className="aspect-video w-full mb-8 rounded-card" />
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className={`h-4 ${i % 5 === 4 ? 'w-2/3' : 'w-full'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const { data: post, isLoading, error } = useApiData(`/blog/posts/${slug}`);

  if (isLoading) return <BlogPostSkeleton />;
  if (error || !post) return <BlogNotFound />;

  const title        = post.seo?.title       || post.title;
  const description  = post.seo?.description || post.excerpt;
  const rawOg        = post.seo?.ogImage     || post.coverImage || DEFAULT_OG;
  const ogImage      = rawOg.startsWith('http') ? rawOg : `${SITE_URL}${rawOg}`;
  const canonicalUrl = post.seo?.canonicalUrl || `${SITE_URL}/blog/${post.slug}`;
  const noindex      = post.seo?.noindex;

  const breadcrumbItems = [
    { name: 'Blog', href: '/blog' },
    ...(post.categories?.[0]
      ? [{ name: post.categories[0].name, href: `/blog/category/${post.categories[0].slug}` }]
      : []),
    { name: post.title, href: `/blog/${post.slug}` },
  ];

  const articleSchema = generateArticleSchema(
    title,
    description,
    ogImage,
    new Date(post.publishedAt).toISOString(),
    new Date(post.updatedAt || post.publishedAt).toISOString(),
    post.slug
  );

  return (
    <>
      <Helmet>
        <title>{title} | Samarth Academy Blog</title>
        <meta name="description" content={description} />
        {post.seo?.keywords && (
          <meta 
            name="keywords" 
            content={Array.isArray(post.seo.keywords) ? post.seo.keywords.join(', ') : post.seo.keywords} 
          />
        )}
        <link rel="canonical" href={canonicalUrl} />
        {noindex && <meta name="robots" content="noindex" />}

        <meta property="og:title"       content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image"       content={ogImage} />
        <meta property="og:url"         content={canonicalUrl} />
        <meta property="og:type"        content="article" />
        <meta property="article:published_time" content={new Date(post.publishedAt).toISOString()} />
        {post.updatedAt && (
          <meta property="article:modified_time" content={new Date(post.updatedAt).toISOString()} />
        )}
        {post.categories?.map(cat => (
          <meta key={cat.slug} property="article:section" content={cat.name} />
        ))}

        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image"       content={ogImage} />

        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      <BreadcrumbSchema items={breadcrumbItems} />

      <article>
        <BlogPostHeader   post={post} />
        <BlogPostContent  post={post} />
        <BlogShareButtons post={post} url={canonicalUrl} />
        <BlogPostMeta     post={post} variant="bottom" />
        <BlogWhatsAppCta />
        <BlogRelatedPosts slug={post.slug} />
      </article>
    </>
  );
}
