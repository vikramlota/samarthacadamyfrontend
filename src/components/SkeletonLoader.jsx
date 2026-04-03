import React from 'react';

/**
 * Generic Skeleton Loader Component
 * Used as fallback while components are loading
 */
const SkeletonLoader = ({ count = 1, height = 'h-12', width = 'w-full' }) => {
  return (
    <div className="space-y-4">
      {Array(count).fill(0).map((_, i) => (
        <div
          key={i}
          className={`${width} ${height} bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse`}
        />
      ))}
    </div>
  );
};

/**
 * Homepage Skeleton - shows while loading
 */
export const HomePageSkeleton = () => (
  <div className="space-y-12 p-8">
    {/* Hero skeleton */}
    <div className="w-full h-96 bg-gray-200 rounded-2xl animate-pulse" />
    
    {/* Section Title skeleton */}
    <div className="space-y-4">
      <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
      <div className="h-4 w-96 bg-gray-200 rounded animate-pulse" />
    </div>

    {/* Grid skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array(8).fill(0).map((_, i) => (
        <div key={i} className="space-y-3">
          <div className="w-full h-48 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
        </div>
      ))}
    </div>
  </div>
);

/**
 * Component Skeleton - generic for any component
 */
export const ComponentSkeleton = ({ size = 'medium' }) => {
  const heights = {
    small: 'h-32',
    medium: 'h-64',
    large: 'h-96'
  };

  return (
    <div className={`${heights[size]} w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse`} />
  );
};

/**
 * Card Grid Skeleton - multiple cards
 */
export const CardGridSkeleton = ({ count = 4 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {Array(count).fill(0).map((_, i) => (
      <div key={i} className="rounded-lg overflow-hidden">
        <div className="h-40 w-full bg-gray-200 animate-pulse" />
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    ))}
  </div>
);

/**
 * Text Skeleton - multiple lines
 */
export const TextSkeleton = ({ lines = 3 }) => (
  <SkeletonLoader count={lines} height="h-4" width="w-full" />
);

export default SkeletonLoader;
