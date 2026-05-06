import React from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import BlogCategoryPills from './BlogCategoryPills';

export default function BlogSearchFilter({
  search,
  category,
  onSearchChange,
  onCategoryChange,
  totalResults,
}) {
  return (
    <section className="sticky top-20 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-100 py-4">
      <div className="container-custom space-y-4">
        <div className="relative max-w-2xl mx-auto">
          <FaSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search articles…"
            value={search}
            onChange={e => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-12 py-3 rounded-2xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 text-base outline-none transition"
            aria-label="Search blog posts"
          />
          {search && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Clear search"
            >
              <FaTimes />
            </button>
          )}
        </div>

        <BlogCategoryPills active={category} onChange={onCategoryChange} />

        {totalResults !== undefined && (
          <p className="text-center text-sm text-gray-500" aria-live="polite">
            {totalResults === 0
              ? 'No posts found'
              : totalResults === 1
              ? '1 post found'
              : `${totalResults} posts found`}
          </p>
        )}
      </div>
    </section>
  );
}
