import React from 'react';
import { useApiData } from '@/hooks/useApiData';
import { cn } from '@/lib/utils';

export default function BlogCategoryPills({ active, onChange }) {
  const { data: categories } = useApiData('/blog/categories', { fallback: [] });

  const all = [
    { slug: 'all', name: 'All Posts', postCount: 0 },
    ...(categories || []),
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center" role="group" aria-label="Filter by category">
      {all.map(cat => (
        <button
          key={cat.slug}
          onClick={() => onChange(cat.slug)}
          aria-pressed={active === cat.slug}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150',
            active === cat.slug
              ? 'bg-red-500 text-white shadow-soft'
              : 'bg-white border border-gray-200 text-gray-700 hover:border-red-200 hover:bg-red-50',
          )}
        >
          {cat.name}
          {cat.postCount > 0 && (
            <span className={cn('ml-1.5 text-xs', active === cat.slug ? 'text-red-100' : 'text-gray-400')}>
              ({cat.postCount})
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
