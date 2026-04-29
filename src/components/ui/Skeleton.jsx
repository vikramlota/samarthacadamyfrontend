import React from 'react';
import { cn } from '@/lib/utils';

const Skeleton = ({ className, ...props }) => (
  <div className={cn('animate-pulse rounded-lg bg-gray-200', className)} {...props} />
);

export const SkeletonText = ({ lines = 3, className }) => (
  <div className={cn('space-y-2', className)}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton key={i} className={cn('h-4', i === lines - 1 ? 'w-3/4' : 'w-full')} />
    ))}
  </div>
);

export const SkeletonCard = ({ className }) => (
  <div className={cn('rounded-card p-6 border border-gray-100 space-y-4', className)}>
    <Skeleton className="h-12 w-12 rounded-2xl" />
    <Skeleton className="h-5 w-3/4" />
    <SkeletonText lines={2} />
  </div>
);

export default Skeleton;
