import React from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { cn } from '@/lib/utils';

export default function CoursesSearchFilter({
  search,
  category,
  categories,
  onSearchChange,
  onCategoryChange,
  totalResults,
}) {
  return (
    <section className="sticky top-20 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-100 py-4">
      <div className="container-custom">
        <div className="relative max-w-2xl mx-auto">
          <FaSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search courses (e.g. 'SSC', 'IBPS', 'Punjab Police')…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-12 py-3 rounded-2xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 text-base outline-none transition"
            aria-label="Search courses"
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

        <div className="flex flex-wrap gap-2 justify-center mt-4" role="group" aria-label="Filter by category">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => onCategoryChange(cat.value)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150',
                category === cat.value
                  ? 'bg-red-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
              )}
              aria-pressed={category === cat.value}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mt-3" aria-live="polite">
          {totalResults === 0
            ? 'No courses found'
            : totalResults === 1
            ? '1 course found'
            : `${totalResults} courses found`}
        </p>
      </div>
    </section>
  );
}
