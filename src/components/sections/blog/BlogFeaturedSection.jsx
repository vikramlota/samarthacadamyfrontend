import React from 'react';
import { SectionHeader } from '@/components/ui';
import BlogPostCard from './BlogPostCard';

export default function BlogFeaturedSection({ posts = [] }) {
  if (!posts || posts.length === 0) return null;

  const [primary, ...secondary] = posts;

  return (
    <section className="py-16 md:py-20 bg-white" aria-labelledby="featured-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="FEATURED ARTICLES"
          title="Editor's Picks"
          align="center"
          className="mb-12"
        />

        <div className="space-y-6">
          {primary && <BlogPostCard post={primary} variant="featured" />}

          {secondary.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {secondary.map(post => (
                <BlogPostCard key={post._id || post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
