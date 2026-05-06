import React from 'react';
import { FaEye, FaClock, FaCalendar } from 'react-icons/fa';

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

export default function BlogPostMeta({ post, variant = 'bottom' }) {
  if (variant === 'top') return null; // meta shown inside BlogPostHeader

  return (
    <section className="py-6 border-t border-b border-gray-100">
      <div className="container-custom max-w-3xl">
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-500">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5">
              <FaCalendar className="text-red-500" aria-hidden="true" />
              Published {formatDate(post.publishedAt)}
            </span>
            {post.readingTimeMinutes && (
              <span className="flex items-center gap-1.5">
                <FaClock className="text-red-500" aria-hidden="true" />
                {post.readingTimeMinutes} min read
              </span>
            )}
            {post.views > 0 && (
              <span className="flex items-center gap-1.5">
                <FaEye className="text-red-500" aria-hidden="true" />
                {post.views.toLocaleString()} views
              </span>
            )}
          </div>
          {post.wordCount && <span>{post.wordCount.toLocaleString()} words</span>}
        </div>
      </div>
    </section>
  );
}
