import React from 'react';
import { cn } from '../../lib/utils';
import { useCounter } from '../../hooks';

const VARIANTS = {
  light:  { value: 'text-red-500',  label: 'text-gray-700',  desc: 'text-gray-500',  icon: 'bg-red-50 text-red-500' },
  dark:   { value: 'text-white',    label: 'text-gray-200',  desc: 'text-gray-400',  icon: 'bg-white/10 text-white' },
  tinted: { value: 'text-red-600',  label: 'text-gray-800',  desc: 'text-gray-600',  icon: 'bg-white text-red-500' },
};

/**
 * StatCard — animated count-up stat display.
 * Intentionally has no card wrapper — use inside a Card or section container.
 *
 * Props:
 *   value    — target number (e.g. 5000)
 *   prefix   — text before number (e.g. '')
 *   suffix   — text after number (e.g. '+', '%')
 *   label    — descriptive label below number
 *   description — optional smaller text
 *   icon     — react-icon component
 *   variant  — 'light' | 'dark' | 'tinted'
 */
const StatCard = ({
  value,
  prefix      = '',
  suffix      = '+',
  label,
  description,
  icon: Icon,
  variant     = 'light',
  className,
}) => {
  const [ref, count] = useCounter(value);
  const c = VARIANTS[variant];

  return (
    <div ref={ref} className={cn('flex flex-col', className)}>
      {Icon && (
        <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center mb-4 flex-shrink-0', c.icon)}>
          <Icon className="text-xl" aria-hidden="true" />
        </div>
      )}

      <div className="flex items-baseline gap-0.5">
        {prefix && (
          <span className={cn('text-3xl lg:text-4xl font-black font-display', c.value)}>{prefix}</span>
        )}
        <span className={cn('text-5xl lg:text-6xl font-black font-display leading-none tabular-nums', c.value)}>
          {count}
        </span>
        {suffix && (
          <span className={cn('text-3xl lg:text-4xl font-black font-display', c.value)}>{suffix}</span>
        )}
      </div>

      {label && (
        <p className={cn('text-base font-semibold mt-2', c.label)}>{label}</p>
      )}
      {description && (
        <p className={cn('text-sm mt-1', c.desc)}>{description}</p>
      )}
    </div>
  );
};

export default StatCard;
