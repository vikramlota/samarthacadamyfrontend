import React from 'react';
import { cn } from '../../lib/utils';

/**
 * TextArea — styled multi-line input. Same API as Input, minus icon props.
 *
 * Props:
 *   label, error, helperText, containerClassName
 *   rows — visible line count (default: 4)
 *   All native <textarea> props forwarded.
 */
const TextArea = React.forwardRef(function TextArea(
  {
    label,
    error,
    helperText,
    containerClassName,
    className,
    disabled,
    id,
    rows = 4,
    ...rest
  },
  ref,
) {
  const taId = id || (label ? `textarea-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <div className={cn('flex flex-col gap-1.5', containerClassName)}>
      {label && (
        <label htmlFor={taId} className="text-sm font-medium text-gray-700">
          {label}
          {rest.required && <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>}
        </label>
      )}

      <textarea
        ref={ref}
        id={taId}
        rows={rows}
        disabled={disabled}
        className={cn(
          'w-full rounded-input border bg-white text-base text-gray-900 px-4 py-2.5 resize-y',
          'placeholder:text-gray-400',
          'transition-all duration-150',
          'focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500',
          error    ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300',
          disabled && 'bg-gray-50 cursor-not-allowed opacity-60',
          className,
        )}
        {...rest}
      />

      {error      && <p className="text-sm text-red-600" role="alert">{error}</p>}
      {helperText && !error && <p className="text-xs text-gray-500">{helperText}</p>}
    </div>
  );
});

TextArea.displayName = 'TextArea';
export default TextArea;
