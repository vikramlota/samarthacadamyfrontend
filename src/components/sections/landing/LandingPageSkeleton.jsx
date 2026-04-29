import React from 'react';
import Skeleton, { SkeletonText } from '@/components/ui/Skeleton';

function PulseBlock({ className }) {
  return <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />;
}

export default function LandingPageSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <div className="gradient-accent-soft py-12 md:py-20">
        <div className="container-custom grid lg:grid-cols-[3fr_2fr] gap-10 items-center">
          <div className="space-y-5">
            <PulseBlock className="h-6 w-32" />
            <PulseBlock className="h-14 w-full" />
            <PulseBlock className="h-14 w-4/5" />
            <PulseBlock className="h-5 w-full" />
            <PulseBlock className="h-5 w-3/4" />
            <div className="flex gap-3 pt-2">
              <PulseBlock className="h-12 w-36 rounded-btn" />
              <PulseBlock className="h-12 w-40 rounded-btn" />
            </div>
          </div>
          <div className="bg-white rounded-card shadow-card p-6 space-y-4">
            <PulseBlock className="h-6 w-3/4" />
            <PulseBlock className="h-10 w-full rounded-input" />
            <PulseBlock className="h-10 w-full rounded-input" />
            <PulseBlock className="h-10 w-full rounded-input" />
            <PulseBlock className="h-12 w-full rounded-btn" />
          </div>
        </div>
      </div>

      {/* Quick info bar skeleton */}
      <div className="bg-white shadow-soft py-4">
        <div className="container-custom grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <PulseBlock className="w-9 h-9 rounded-xl" />
              <div className="space-y-1.5 flex-1">
                <PulseBlock className="h-2.5 w-1/2" />
                <PulseBlock className="h-4 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overview skeleton */}
      <div className="bg-white section-padding">
        <div className="container-custom space-y-6">
          <div className="max-w-lg mx-auto text-center space-y-3">
            <PulseBlock className="h-4 w-32 mx-auto" />
            <PulseBlock className="h-10 w-3/4 mx-auto" />
            <PulseBlock className="h-5 w-full" />
            <PulseBlock className="h-5 w-4/5 mx-auto" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-red-50 rounded-card p-6 text-center space-y-3">
                <PulseBlock className="w-10 h-10 rounded-full mx-auto" />
                <PulseBlock className="h-7 w-1/2 mx-auto" />
                <PulseBlock className="h-3 w-3/4 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section skeleton × 2 */}
      {Array.from({ length: 2 }).map((_, s) => (
        <div key={s} className={`${s % 2 === 0 ? 'bg-brand-bg' : 'bg-white'} section-padding`}>
          <div className="container-custom space-y-8">
            <div className="max-w-sm mx-auto text-center space-y-3">
              <PulseBlock className="h-3 w-24 mx-auto" />
              <PulseBlock className="h-9 w-full mx-auto" />
              <PulseBlock className="h-4 w-3/4 mx-auto" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-card p-6 border border-gray-100 space-y-3">
                  <PulseBlock className="w-12 h-12 rounded-2xl" />
                  <PulseBlock className="h-5 w-3/4" />
                  <SkeletonText lines={2} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
