import React from 'react';
import { Skeleton } from '@/components/ui';

export default function AboutPageSkeleton() {
  return (
    <div aria-hidden="true" aria-label="Loading about page">
      {/* Hero */}
      <div className="gradient-primary section-padding">
        <div className="container-custom space-y-4 max-w-xl">
          <Skeleton className="h-5 w-24 bg-white/20" />
          <Skeleton className="h-12 w-3/4 bg-white/20" />
          <Skeleton className="h-6 w-full bg-white/20" />
          <div className="flex gap-3 pt-2">
            <Skeleton className="h-11 w-36 bg-white/20 rounded-xl" />
            <Skeleton className="h-11 w-36 bg-white/20 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Story */}
      <div className="py-16 bg-white">
        <div className="container-custom grid lg:grid-cols-2 gap-12">
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
          <div className="space-y-4">
            <Skeleton className="h-28 rounded-2xl" />
            <Skeleton className="h-28 rounded-2xl" />
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="py-12 bg-white border-y border-gray-100">
        <div className="container-custom grid grid-cols-5 gap-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Skeleton className="h-10 w-16" />
              <Skeleton className="h-3 w-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
