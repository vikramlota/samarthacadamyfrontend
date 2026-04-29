import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

const Spinner = () => (
  <svg className="animate-spin h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);

const VARIANTS = {
  primary: 'bg-red-500 text-white hover:bg-red-600 shadow-soft hover:shadow-primary-glow focus-visible:ring-red-500',
  accent:  'bg-orange-500 text-white hover:bg-orange-600 shadow-soft hover:shadow-accent-glow focus-visible:ring-orange-500',
  outline: 'border-2 border-red-500 text-red-500 bg-transparent hover:bg-red-50 focus-visible:ring-red-500',
  ghost:   'bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-400',
  link:    'bg-transparent text-red-500 hover:underline underline-offset-2 focus-visible:ring-red-500',
};

const SIZES = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-6 py-3 text-base gap-2',
  xl: 'px-8 py-4 text-lg gap-2.5',
};

/**
 * Button — polymorphic CTA component.
 *
 * Renders as:
 *   <button>  by default
 *   <Link>    when `to` prop is given  (React Router)
 *   <a>       when `href` prop is given (external links auto-get target=_blank)
 *   <Tag>     when `as` prop is given
 *
 * Props: variant, size, icon, iconRight, loading, disabled, to, href, as, type
 */
const Button = React.forwardRef(function Button(
  {
    variant    = 'primary',
    size       = 'md',
    className,
    icon:      Icon,
    iconRight: IconRight,
    loading    = false,
    disabled   = false,
    as,
    to,
    href,
    type       = 'button',
    children,
    ...rest
  },
  ref,
) {
  const isDisabled = disabled || loading;

  const classes = cn(
    'inline-flex items-center justify-center font-semibold rounded-btn',
    'transition-all duration-[250ms]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    VARIANTS[variant],
    variant !== 'link' && SIZES[size],
    isDisabled && 'opacity-60 cursor-not-allowed pointer-events-none',
    className,
  );

  const content = (
    <>
      {loading ? <Spinner /> : (Icon && <Icon className="flex-shrink-0" aria-hidden="true" />)}
      {children}
      {!loading && IconRight && <IconRight className="flex-shrink-0" aria-hidden="true" />}
    </>
  );

  if (to) {
    return <Link ref={ref} to={to} className={classes} aria-disabled={isDisabled} {...rest}>{content}</Link>;
  }

  if (href) {
    const external = href.startsWith('http');
    return (
      <a
        ref={ref}
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }

  const Tag = as || 'button';
  return (
    <Tag ref={ref} type={type} disabled={isDisabled} className={classes} {...rest}>
      {content}
    </Tag>
  );
});

Button.displayName = 'Button';
export default Button;
