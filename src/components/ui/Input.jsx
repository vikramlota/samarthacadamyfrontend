import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Input — styled text input with label, error, and icon support.
 *
 * Props:
 *   label, error, helperText — UX copy
 *   icon, iconRight          — react-icon components
 *   containerClassName       — class for the outer wrapper
 *   All native <input> props forwarded (name, value, onChange, placeholder, type, …)
 */
const Input = React.forwardRef(function Input(
  {
    label,
    error,
    icon:      Icon,
    iconRight: IconRight,
    helperText,
    containerClassName,
    className,
    disabled,
    id,
    ...rest
  },
  ref,
) {
  const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <div className={cn('flex flex-col gap-1.5', containerClassName)}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
          {rest.required && <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none" aria-hidden="true">
            <Icon className="text-sm" />
          </span>
        )}

        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          className={cn(
            'w-full rounded-input border bg-white text-base text-gray-900 px-4 py-2.5',
            'placeholder:text-gray-400',
            'transition-all duration-150',
            'focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500',
            error       ? 'border-red-500 ring-1 ring-red-500'   : 'border-gray-300',
            Icon        && 'pl-10',
            IconRight   && 'pr-10',
            disabled    && 'bg-gray-50 cursor-not-allowed opacity-60',
            className,
          )}
          {...rest}
        />

        {IconRight && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 pointer-events-none" aria-hidden="true">
            <IconRight className="text-sm" />
          </span>
        )}
      </div>

      {error      && <p className="text-sm text-red-600" role="alert">{error}</p>}
      {helperText && !error && <p className="text-xs text-gray-500">{helperText}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
