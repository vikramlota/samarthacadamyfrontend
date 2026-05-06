import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaClock } from 'react-icons/fa';
import { Badge } from '@/components/ui';

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

function safeBadgeVariant(color) {
  return ['red', 'orange', 'green', 'gray'].includes(color) ? color : 'red';
}

export default function BlogPostHeader({ post }) {
  return (
    <header className="bg-brand-bg pt-12 pb-8 md:pt-16 md:pb-12">
      <div className="container-custom max-w-4xl">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-red-500 transition-colors mb-6"
        >
          <FaArrowLeft aria-hidden="true" /> Back to blog
        </Link>

        {post.categories?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map(cat => (
              <Link key={cat._id || cat.slug} to={`/blog/category/${cat.slug}`}>
                <Badge variant={safeBadgeVariant(cat.color)} size="md">
                  {cat.name}
                </Badge>
              </Link>
            ))}
          </div>
        )}

        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-[1.15] text-balance">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-lg md:text-xl text-gray-600 mt-4 leading-relaxed text-pretty">
            {post.excerpt}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-6 text-sm text-gray-600">
          <span>By {post.author?.name || 'Samarth Academy'}</span>
          <span aria-hidden="true">•</span>
          <span>{formatDate(post.publishedAt)}</span>
          {post.readingTimeMinutes && (
            <>
              <span aria-hidden="true">•</span>
              <span className="flex items-center gap-1">
                <FaClock className="text-red-500" aria-hidden="true" />
                {post.readingTimeMinutes} min read
              </span>
            </>
          )}
        </div>
      </div>

      {post.coverImage && (
        <div className="container-custom max-w-4xl mt-8">
          <img
            src={post.coverImage}
            alt={post.coverImageAlt || post.title}
            className="w-full aspect-video object-cover rounded-card shadow-card"
            loading="eager"
          />
        </div>
      )}
    </header>
  );
}
