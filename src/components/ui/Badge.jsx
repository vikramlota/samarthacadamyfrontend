import React from 'react';
import { cn } from '../../lib/utils';

const VARIANTS = {
  red:    'bg-red-100 text-red-700',
  orange: 'bg-orange-100 text-orange-700',
  green:  'bg-green-100 text-green-700',
  gray:   'bg-gray-100 text-gray-700',
};

const SIZES = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
};

/**
 * Badge — pill tag for labels like "New Batch", "Hot", "Limited Seats".
 *
 * Props:
 *   variant — 'red' | 'orange' | 'green' | 'gray'
 *   size    — 'sm' | 'md'
 *   icon    — react-icon component
 *   pulse   — enables animate-pulse-soft for emphasis
 */
const Badge = ({
  variant  = 'red',
  size     = 'sm',
  icon:    Icon,
  pulse    = false,
  children,
  className,
}) => (
  <span
    className={cn(
      'inline-flex items-center gap-1 rounded-full font-semibold',
      VARIANTS[variant],
      SIZES[size],
      pulse && 'animate-pulse-soft',
      className,
    )}
  >
    {Icon && <Icon className="flex-shrink-0 text-[10px]" aria-hidden="true" />}
    {children}
  </span>
);

export default Badge;
