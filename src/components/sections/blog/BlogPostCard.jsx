import React from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaArrowRight } from 'react-icons/fa';
import { Badge } from '@/components/ui';
import { cn } from '@/lib/utils';

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

// Badge only supports red/orange/green/gray/blue — map anything else to red
function safeBadgeVariant(color) {
  const supported = ['red', 'orange', 'green', 'gray', 'blue'];
  return supported.includes(color) ? color : 'red';
}

export default function BlogPostCard({ post, variant = 'default' }) {
  if (!post) return null;

  const isFeatured = variant === 'featured';

  return (
    <Link to={`/blog/${post.slug}`} className="group block h-full">
      <article
        className={cn(
          'h-full overflow-hidden flex flex-col',
          'bg-white rounded-card border border-gray-100 shadow-soft',
          'transition-all duration-[250ms] hover:-translate-y-0.5 hover:shadow-card',
          isFeatured && 'lg:flex-row',
        )}
      >
        {/* Cover image */}
        {post.coverImage && (
          <div
            className={cn(
              'relative overflow-hidden bg-gray-100 shrink-0',
              isFeatured ? 'aspect-video lg:aspect-auto lg:w-1/2' : 'aspect-video',
            )}
          >
            <img
              src={post.coverImage}
              alt={post.coverImageAlt || post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {post.featured && !isFeatured && (
              <Badge variant="orange" size="sm" className="absolute top-3 left-3">
                Featured
              </Badge>
            )}
          </div>
        )}

        {/* Content */}
        <div
          className={cn(
            'flex flex-col flex-1 p-5',
            isFeatured && 'lg:w-1/2 lg:p-8 lg:justify-center',
          )}
        >
          {/* Categories */}
          {post.categories?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {post.categories.slice(0, 2).map(cat => (
                <Badge
                  key={cat._id || cat.slug}
                  variant={safeBadgeVariant(cat.color)}
                  size="sm"
                >
                  {cat.name}
                </Badge>
              ))}
            </div>
          )}

          {/* Title */}
          <h3
            className={cn(
              'font-display font-semibold text-gray-900 line-clamp-2',
              'group-hover:text-red-500 transition-colors duration-150',
              isFeatured ? 'text-2xl md:text-3xl' : 'text-lg',
            )}
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          {post.excerpt && (
            <p
              className={cn(
                'text-gray-600 mt-2 leading-relaxed',
                isFeatured ? 'text-base line-clamp-3' : 'text-sm line-clamp-2',
              )}
            >
              {post.excerpt}
            </p>
          )}

          {/* Meta row */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 text-xs text-gray-500">
            <div className="flex items-center gap-3">
              <span>{formatDate(post.publishedAt)}</span>
              {post.readingTimeMinutes && (
                <span className="flex items-center gap-1">
                  <FaClock className="text-red-500" aria-hidden="true" />
                  {post.readingTimeMinutes} min read
                </span>
              )}
            </div>
            <FaArrowRight
              className="text-red-500 group-hover:translate-x-1 transition-transform duration-150"
              aria-hidden="true"
            />
          </div>
        </div>
      </article>
    </Link>
  );
}
