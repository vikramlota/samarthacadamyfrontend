import React from 'react';
import { cn } from '../../lib/utils';
import { useCounter } from '../../hooks';

/**
 * AnimatedCounter — standalone count-up number.
 * Uses the existing useCounter hook (starts from 0, counts to `end`).
 *
 * Props:
 *   end      — target number (required)
 *   duration — animation duration in ms (default: 2000)
 *   prefix   — text before number, e.g. '₹'
 *   suffix   — text after number, e.g. '+', '%'
 *   className
 *
 * Note: the underlying useCounter hook increments by 1 per step,
 * so very large numbers (10 000+) animate faster than smaller ones.
 * For large display numbers, prefer using StatCard which is purpose-built.
 */
const AnimatedCounter = ({
  end,
  duration  = 2000,
  prefix    = '',
  suffix    = '',
  className,
}) => {
  const [ref, count] = useCounter(end, duration);

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}{count}{suffix}
    </span>
  );
};

export default AnimatedCounter;
