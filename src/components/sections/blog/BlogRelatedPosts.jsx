import React from 'react';
import { SectionHeader } from '@/components/ui';
import { useApiData } from '@/hooks/useApiData';
import BlogPostGrid from './BlogPostGrid';

export default function BlogRelatedPosts({ slug, limit = 3 }) {
  const { data: res, isLoading } = useApiData(
    `/blog/posts/${slug}/related?limit=${limit}`,
    { fallback: { data: [] } },
  );

  const related = res?.data || (Array.isArray(res) ? res : []);

  if (!isLoading && related.length === 0) return null;

  return (
    <section className="py-16 md:py-20 bg-white" aria-labelledby="related-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="KEEP READING"
          title="Related Articles"
          align="center"
          className="mb-12"
        />
        <BlogPostGrid posts={related} isLoading={isLoading} columns={3} />
      </div>
    </section>
  );
}
