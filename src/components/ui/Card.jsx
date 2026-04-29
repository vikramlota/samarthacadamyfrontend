import React from 'react';
import { cn } from '../../lib/utils';

const VARIANTS = {
  default:  'bg-white shadow-soft border border-gray-100',
  elevated: 'bg-white shadow-card',
  bordered: 'bg-white border-2 border-gray-200',
  tinted:   'bg-red-50',
  dark:     'bg-gray-900 text-white',
};

/**
 * Card — universal content container.
 *
 * Props:
 *   variant  — 'default' | 'elevated' | 'bordered' | 'tinted' | 'dark'
 *   hover    — enables translate + shadow lift on hover (default: true)
 *   as       — render as any element, e.g. 'article', 'section' (default: 'div')
 */
const Card = React.forwardRef(function Card(
  { variant = 'default', className, children, hover = true, as: Tag = 'div', ...rest },
  ref,
) {
  return (
    <Tag
      ref={ref}
      className={cn(
        'rounded-card p-6 md:p-8',
        VARIANTS[variant],
        hover && [
          'transition-all duration-[250ms]',
          'hover:-translate-y-0.5',
          variant === 'default'  && 'hover:shadow-card',
          variant === 'elevated' && 'hover:shadow-lifted',
          variant === 'dark'     && 'hover:bg-gray-800',
          variant === 'tinted'   && 'hover:shadow-soft',
        ],
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
});

Card.displayName = 'Card';
export default Card;
