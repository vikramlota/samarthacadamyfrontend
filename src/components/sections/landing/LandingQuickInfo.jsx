import React, { useRef, useState, useEffect } from 'react';
import { FaCalendarAlt, FaRupeeSign, FaUsers, FaMapMarkerAlt } from 'react-icons/fa';
import { cn } from '@/lib/utils';

const ICONS = {
  duration: FaCalendarAlt,
  fees:     FaRupeeSign,
  batchSize: FaUsers,
  mode:     FaMapMarkerAlt,
};

const LABELS = {
  duration:  'Duration',
  fees:      'Fees',
  batchSize: 'Batch Size',
  mode:      'Mode',
};

export default function LandingQuickInfo({ info }) {
  const [isStuck, setIsStuck] = useState(false);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { rootMargin: '-80px 0px 0px 0px', threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  if (!info) return null;

  const items = [
    { key: 'duration',  value: info.duration },
    { key: 'fees',      value: info.fees },
    { key: 'batchSize', value: info.batchSize },
    { key: 'mode',      value: info.mode },
  ].filter(item => item.value);

  return (
    <>
      {/* Sentinel — triggers sticky detection when scrolled off screen */}
      <div ref={sentinelRef} aria-hidden="true" />

      <div
        className={cn(
          'sticky top-[72px] z-20 transition-all duration-200',
          isStuck
            ? 'bg-white/95 backdrop-blur-sm shadow-card py-3'
            : 'bg-white shadow-soft py-4',
        )}
      >
        <div className="container-custom">
          {/* Desktop: row */}
          <div className="hidden sm:grid sm:grid-cols-4 gap-4">
            {items.map(({ key, value }) => {
              const Icon = ICONS[key];
              return (
                <div key={key} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                    <Icon className="text-red-500 text-sm" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 leading-none">{LABELS[key]}</p>
                    <p className="text-sm font-semibold text-gray-900 mt-0.5">{value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile: horizontal scroll */}
          <div className="flex sm:hidden gap-4 overflow-x-auto snap-x pb-0.5 no-scrollbar">
            {items.map(({ key, value }) => {
              const Icon = ICONS[key];
              return (
                <div
                  key={key}
                  className="flex items-center gap-2.5 snap-start shrink-0"
                >
                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                    <Icon className="text-red-500 text-xs" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 leading-none">{LABELS[key]}</p>
                    <p className="text-xs font-semibold text-gray-900 mt-0.5 whitespace-nowrap">{value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
